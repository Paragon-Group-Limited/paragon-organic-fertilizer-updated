'use client'

import { useState, useEffect, useCallback } from 'react'
import { AdminTable, type TableColumn } from '@/components/payload/AdminTable'

type BlockedPhone = {
  id: string
  phone?: string
  reason?: string
  blockedBy?: string
  blockedAt?: string
  orderCount?: number
}

function fmtDate(d?: string) {
  if (!d) return '—'
  return new Date(d).toLocaleString('en-BD', { dateStyle: 'medium', timeStyle: 'short' })
}

// ── Main list view ────────────────────────────────────────────────────────────
export default function BlockedPhonesListView() {
  const [phones, setPhones]     = useState<BlockedPhone[]>([])
  const [loading, setLoading]   = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [search, setSearch]     = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/blocked-phones?limit=200&sort=-blockedAt')
      const data = await res.json()
      setPhones(data.docs ?? [])
    } finally { setLoading(false) }
  }, [])

  useEffect(() => { load() }, [load])

  const handleUnblock = async (p: BlockedPhone) => {
    if (!confirm(`Unblock ${p.phone}?\nThey will be able to place orders again.`)) return
    setDeletingId(p.id)
    try {
      await fetch(`/api/blocked-phones/${p.id}`, { method: 'DELETE' })
      setPhones(prev => prev.filter(x => x.id !== p.id))
    } finally { setDeletingId(null) }
  }

  const displayed = search.trim()
    ? phones.filter(p =>
        (p.phone ?? '').includes(search) ||
        (p.reason ?? '').toLowerCase().includes(search.toLowerCase())
      )
    : phones

  const columns: TableColumn<BlockedPhone>[] = [
    {
      key: 'phone',
      header: 'Phone Number',
      render: (p) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 16 }}>🚫</span>
          <a href={`tel:${p.phone}`} style={{ fontSize: 13, fontWeight: 700, color: '#dc2626', textDecoration: 'none', fontFamily: 'monospace' }}>
            {p.phone ?? '—'}
          </a>
        </div>
      ),
    },
    {
      key: 'reason',
      header: 'Reason',
      render: (p) => (
        <span style={{ fontSize: 12, color: '#6b7280' }}>{p.reason || '—'}</span>
      ),
    },
    {
      key: 'blockedBy',
      header: 'Blocked By',
      render: (p) => (
        <span style={{ fontSize: 12, color: '#374151' }}>{p.blockedBy || 'admin'}</span>
      ),
    },
    {
      key: 'blockedAt',
      header: 'Blocked At',
      render: (p) => (
        <span style={{ fontSize: 12, color: '#6b7280', whiteSpace: 'nowrap' }}>{fmtDate(p.blockedAt)}</span>
      ),
    },
    {
      key: 'orderCount',
      header: 'Orders at Block',
      render: (p) => (
        <span style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>{p.orderCount ?? 0}</span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (p) => (
        <button
          onClick={() => handleUnblock(p)}
          disabled={deletingId === p.id}
          style={{ padding: '5px 14px', borderRadius: 7, border: '1px solid #bbf7d0', background: '#f0fdf4', fontSize: 11, fontWeight: 700, color: '#166534', cursor: deletingId === p.id ? 'default' : 'pointer', display: 'inline-flex', alignItems: 'center', gap: 5 }}
        >
          {deletingId === p.id ? '⏳' : '✅ Unblock'}
        </button>
      ),
    },
  ]

  return (
    <div style={{ padding: '32px 32px 48px', minHeight: '100vh', background: '#f9fafb', fontFamily: 'var(--font-hind, system-ui, sans-serif)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: '#111827', display: 'flex', alignItems: 'center', gap: 10 }}>
            🚫 Blocked Numbers
          </h1>
          <p style={{ margin: '4px 0 0', fontSize: 13, color: '#6b7280' }}>
            {loading ? '…' : `${phones.length} blocked number${phones.length !== 1 ? 's' : ''}`}
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={load} style={{ padding: '8px 14px', borderRadius: 8, border: '1px solid #e5e7eb', background: '#fff', fontSize: 12, fontWeight: 600, color: '#374151', cursor: 'pointer' }}>🔄 Refresh</button>
          <a href="/admin/collections/orders" style={{ padding: '8px 14px', borderRadius: 8, border: '1px solid #d1d5db', background: '#fff', fontSize: 12, fontWeight: 600, color: '#374151', textDecoration: 'none' }}>
            ← Back to Orders
          </a>
        </div>
      </div>

      <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 10, padding: '12px 18px', marginBottom: 20, fontSize: 13, color: '#991b1b' }}>
        Numbers listed here cannot place new orders. Click <strong>Unblock</strong> to restore order access.
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: '8px 14px', marginBottom: 16, maxWidth: 400 }}>
        <span style={{ fontSize: 14, color: '#9ca3af' }}>🔍</span>
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search by phone or reason…"
          style={{ border: 'none', outline: 'none', fontSize: 13, flex: 1, fontFamily: 'inherit', background: 'transparent', color: '#374151' }} />
        {search && <button onClick={() => setSearch('')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, color: '#9ca3af' }}>✕</button>}
      </div>

      <AdminTable
        columns={columns}
        data={displayed}
        loading={loading}
        emptyMessage="No blocked numbers — all clear ✅"
        defaultPageSize={10}
        getRowBg={() => ({ bg: '#fff5f5', hoverBg: '#fff0f0' })}
      />
    </div>
  )
}
