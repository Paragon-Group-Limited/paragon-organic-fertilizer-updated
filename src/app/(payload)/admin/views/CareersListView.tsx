'use client'

import { useState, useEffect, useCallback } from 'react'
import { AdminTable, type TableColumn } from '@/components/payload/AdminTable'

type Career = {
  id: string
  title?: string
  department?: string
  type?: string
  location?: string
  salary?: string
  deadline?: string
  status?: string
  createdAt?: string
}

const STATUS_META: Record<string, { label: string; bg: string; color: string }> = {
  open:   { label: 'Open',   bg: '#dcfce7', color: '#166534' },
  closed: { label: 'Closed', bg: '#fee2e2', color: '#991b1b' },
}

const TYPE_LABELS: Record<string, string> = {
  'full-time': 'Full-time',
  'part-time': 'Part-time',
  'contract':  'Contract',
}

function fmtDeadline(d?: string) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('en-BD', { dateStyle: 'medium' })
}

// ── Inline status select ──────────────────────────────────────────────────────
function InlineStatus({ careerId, current, onChange }: {
  careerId: string; current?: string; onChange: (id: string, s: string) => void
}) {
  const [saving, setSaving] = useState(false)
  const s = current && STATUS_META[current] ? current : 'open'
  const m = STATUS_META[s]

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value
    setSaving(true)
    try {
      const res = await fetch(`/api/careers/${careerId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: val }),
      })
      if (res.ok) onChange(careerId, val)
    } finally { setSaving(false) }
  }

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <select value={s} onChange={handleChange} disabled={saving}
        style={{ padding: '4px 24px 4px 10px', borderRadius: 999, border: `1.5px solid ${m.color}40`, background: m.bg, color: m.color, fontWeight: 700, fontSize: 12, fontFamily: 'inherit', cursor: 'pointer', outline: 'none', appearance: 'none', WebkitAppearance: 'none' }}>
        {Object.entries(STATUS_META).map(([v, meta]) => <option key={v} value={v}>{meta.label}</option>)}
      </select>
      <span style={{ position: 'absolute', right: 7, top: '50%', transform: 'translateY(-50%)', fontSize: 9, color: m.color, pointerEvents: 'none' }}>▼</span>
    </div>
  )
}

// ── Main list view ────────────────────────────────────────────────────────────
export default function CareersListView() {
  const [careers, setCareers]   = useState<Career[]>([])
  const [loading, setLoading]   = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [search, setSearch]     = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/careers?limit=200&sort=-createdAt')
      const data = await res.json()
      setCareers(data.docs ?? [])
    } finally { setLoading(false) }
  }, [])

  useEffect(() => { load() }, [load])

  const handleDelete = async (c: Career) => {
    if (!confirm(`Delete job posting "${c.title}"?\nThis cannot be undone.`)) return
    setDeletingId(c.id)
    try {
      await fetch(`/api/careers/${c.id}`, { method: 'DELETE' })
      setCareers(prev => prev.filter(x => x.id !== c.id))
    } finally { setDeletingId(null) }
  }

  const handleStatusChange = (id: string, status: string) => {
    setCareers(prev => prev.map(c => c.id === id ? { ...c, status } : c))
  }

  const displayed = search.trim()
    ? careers.filter(c =>
        (c.title ?? '').toLowerCase().includes(search.toLowerCase()) ||
        (c.department ?? '').toLowerCase().includes(search.toLowerCase())
      )
    : careers

  const columns: TableColumn<Career>[] = [
    {
      key: 'title',
      header: 'Position',
      render: (c) => (
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#1a2e1a' }}>{c.title ?? '—'}</div>
          {c.location && <div style={{ fontSize: 11, color: '#9ca3af' }}>📍 {c.location}</div>}
        </div>
      ),
    },
    {
      key: 'department',
      header: 'Department',
      render: (c) => <span style={{ fontSize: 13, color: '#374151' }}>{c.department ?? '—'}</span>,
    },
    {
      key: 'type',
      header: 'Type',
      render: (c) => (
        <span style={{ padding: '3px 10px', borderRadius: 999, fontSize: 11, fontWeight: 700, background: '#ede9fe', color: '#5b21b6' }}>
          {TYPE_LABELS[c.type ?? ''] ?? c.type ?? '—'}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (c) => <InlineStatus careerId={c.id} current={c.status} onChange={handleStatusChange} />,
    },
    {
      key: 'deadline',
      header: 'Deadline',
      render: (c) => (
        <span style={{ fontSize: 12, color: '#6b7280', whiteSpace: 'nowrap' }}>{fmtDeadline(c.deadline)}</span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (c) => (
        <div style={{ display: 'flex', gap: 6 }}>
          <a href={`/admin/collections/careers/${c.id}`}
            style={{ padding: '5px 12px', borderRadius: 7, border: '1px solid #d1d5db', background: '#fff', fontSize: 11, fontWeight: 700, color: '#1B4D3E', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            ✏️ Edit
          </a>
          <button onClick={() => handleDelete(c)} disabled={deletingId === c.id}
            style={{ padding: '5px 10px', borderRadius: 7, border: '1px solid #fecaca', background: '#fff5f5', fontSize: 11, fontWeight: 700, color: '#dc2626', cursor: deletingId === c.id ? 'default' : 'pointer' }}>
            {deletingId === c.id ? '⏳' : '🗑️'}
          </button>
        </div>
      ),
    },
  ]

  return (
    <div style={{ padding: '32px 32px 48px', minHeight: '100vh', background: '#f9fafb', fontFamily: 'var(--font-hind, system-ui, sans-serif)' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: '#111827' }}>Careers</h1>
          <p style={{ margin: '4px 0 0', fontSize: 13, color: '#6b7280' }}>
            {loading ? '…' : `${careers.length} job posting${careers.length !== 1 ? 's' : ''}`}
          </p>
          {!loading && careers.length > 0 && (
            <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
              {Object.entries(STATUS_META).map(([s, m]) => {
                const cnt = careers.filter(c => c.status === s).length
                if (cnt === 0) return null
                return (
                  <span key={s} style={{ padding: '3px 11px', borderRadius: 999, fontSize: 12, fontWeight: 700, background: m.bg, color: m.color }}>
                    {m.label}: {cnt}
                  </span>
                )
              })}
            </div>
          )}
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={load} style={{ padding: '8px 14px', borderRadius: 8, border: '1px solid #e5e7eb', background: '#fff', fontSize: 12, fontWeight: 600, color: '#374151', cursor: 'pointer' }}>🔄 Refresh</button>
          <a href="/admin/collections/careers/create" style={{ padding: '8px 16px', borderRadius: 8, background: '#1B4D3E', color: '#fff', fontSize: 12, fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            + Create New
          </a>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: '8px 14px', marginBottom: 16, maxWidth: 400 }}>
        <span style={{ fontSize: 14, color: '#9ca3af' }}>🔍</span>
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search by title or department…"
          style={{ border: 'none', outline: 'none', fontSize: 13, flex: 1, fontFamily: 'inherit', background: 'transparent', color: '#374151' }} />
        {search && <button onClick={() => setSearch('')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, color: '#9ca3af' }}>✕</button>}
      </div>

      <AdminTable
        columns={columns}
        data={displayed}
        loading={loading}
        emptyMessage={search ? `No jobs match "${search}"` : 'No job postings yet'}
        defaultPageSize={10}
      />
    </div>
  )
}
