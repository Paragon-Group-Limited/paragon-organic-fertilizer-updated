'use client'

import { useState, useEffect, useCallback } from 'react'
import { AdminTable, type TableColumn } from '@/components/payload/AdminTable'

type User = {
  id: string
  name?: string
  email?: string
  role?: string
  createdAt?: string
}

const ROLE_META: Record<string, { label: string; bg: string; color: string }> = {
  admin:  { label: 'Admin',  bg: '#dbeafe', color: '#1e40af' },
  editor: { label: 'Editor', bg: '#ede9fe', color: '#5b21b6' },
}

function fmtDate(d?: string) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('en-BD', { dateStyle: 'medium' })
}

// ── Main list view ────────────────────────────────────────────────────────────
export default function UsersListView() {
  const [users, setUsers]     = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch]   = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/users?limit=200&sort=-createdAt')
      const data = await res.json()
      setUsers(data.docs ?? [])
    } finally { setLoading(false) }
  }, [])

  useEffect(() => { load() }, [load])

  const displayed = search.trim()
    ? users.filter(u =>
        (u.name ?? '').toLowerCase().includes(search.toLowerCase()) ||
        (u.email ?? '').toLowerCase().includes(search.toLowerCase())
      )
    : users

  const columns: TableColumn<User>[] = [
    {
      key: 'name',
      header: 'Name',
      render: (u) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 34, height: 34, borderRadius: '50%',
            background: 'linear-gradient(135deg,#1B4D3E,#2D7A5B)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14, fontWeight: 700, color: '#fff', flexShrink: 0,
          }}>
            {(u.name ?? u.email ?? '?')[0].toUpperCase()}
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#1a2e1a' }}>{u.name ?? '—'}</div>
            <div style={{ fontSize: 11, color: '#9ca3af' }}>Since {fmtDate(u.createdAt)}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'email',
      header: 'Email',
      render: (u) => (
        <a href={`mailto:${u.email}`} style={{ fontSize: 13, color: '#1B4D3E', textDecoration: 'none' }}>
          {u.email ?? '—'}
        </a>
      ),
    },
    {
      key: 'role',
      header: 'Role',
      render: (u) => {
        const r = ROLE_META[u.role ?? ''] ?? ROLE_META.editor
        return (
          <span style={{ padding: '4px 12px', borderRadius: 999, fontSize: 12, fontWeight: 700, background: r.bg, color: r.color }}>
            {r.label}
          </span>
        )
      },
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (u) => (
        <a href={`/admin/collections/users/${u.id}`}
          style={{ padding: '5px 12px', borderRadius: 7, border: '1px solid #d1d5db', background: '#fff', fontSize: 11, fontWeight: 700, color: '#1B4D3E', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
          ✏️ Edit
        </a>
      ),
    },
  ]

  return (
    <div style={{ padding: '32px 32px 48px', minHeight: '100vh', background: '#f9fafb', fontFamily: 'var(--font-hind, system-ui, sans-serif)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: '#111827' }}>Users</h1>
          <p style={{ margin: '4px 0 0', fontSize: 13, color: '#6b7280' }}>
            {loading ? '…' : `${users.length} admin user${users.length !== 1 ? 's' : ''}`}
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={load} style={{ padding: '8px 14px', borderRadius: 8, border: '1px solid #e5e7eb', background: '#fff', fontSize: 12, fontWeight: 600, color: '#374151', cursor: 'pointer' }}>🔄 Refresh</button>
          <a href="/admin/collections/users/create" style={{ padding: '8px 16px', borderRadius: 8, background: '#1B4D3E', color: '#fff', fontSize: 12, fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            + Add User
          </a>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: '8px 14px', marginBottom: 16, maxWidth: 400 }}>
        <span style={{ fontSize: 14, color: '#9ca3af' }}>🔍</span>
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search by name or email…"
          style={{ border: 'none', outline: 'none', fontSize: 13, flex: 1, fontFamily: 'inherit', background: 'transparent', color: '#374151' }} />
        {search && <button onClick={() => setSearch('')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, color: '#9ca3af' }}>✕</button>}
      </div>

      <AdminTable
        columns={columns}
        data={displayed}
        loading={loading}
        emptyMessage="No users found"
        defaultPageSize={10}
      />
    </div>
  )
}
