'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { AdminTable, type TableColumn } from '@/components/payload/AdminTable'

type MediaDoc = { id?: string | number; url?: string; filename?: string; mimeType?: string }

type Candidate = {
  id: string
  fullName?: string
  mobile?: string
  address?: string
  applyingFor?: string
  cv?: MediaDoc | string | number | null
  status?: string
  createdAt?: string
}

const STATUS_META: Record<string, { label: string; bg: string; color: string }> = {
  new:         { label: 'New',         bg: '#dbeafe', color: '#1e40af' },
  reviewed:    { label: 'Reviewed',    bg: '#ede9fe', color: '#5b21b6' },
  shortlisted: { label: 'Shortlisted', bg: '#dcfce7', color: '#166534' },
  rejected:    { label: 'Rejected',    bg: '#fee2e2', color: '#991b1b' },
}
const STATUS_KEYS = Object.keys(STATUS_META)

function fmtDate(d?: string) {
  if (!d) return '—'
  return new Date(d).toLocaleString('en-BD', { dateStyle: 'medium', timeStyle: 'short' })
}

// ── CV actions cell (module-level) ────────────────────────────────────────────
function CVActions({ cv }: { cv: Candidate['cv'] }) {
  const [downloading, setDownloading] = useState(false)
  const [media, setMedia] = useState<MediaDoc | null>(null)

  useEffect(() => {
    if (!cv) return
    if (typeof cv === 'object' && 'url' in cv && cv.url) {
      setMedia(cv as MediaDoc)
    } else {
      const id = typeof cv === 'object' && 'id' in cv ? (cv as MediaDoc).id : cv
      if (id == null) return
      fetch(`/api/media/${id}`)
        .then(r => r.json())
        .then(data => setMedia(data))
        .catch(() => null)
    }
  }, [cv])

  if (!cv) return <span style={{ color: '#9ca3af', fontSize: 12 }}>—</span>
  if (!media?.url) return <span style={{ fontSize: 11, color: '#9ca3af' }}>⏳</span>

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation()
    setDownloading(true)
    try {
      const res = await fetch(media.url!)
      const blob = await res.blob()
      const objUrl = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = objUrl
      a.download = media.filename || 'cv'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(objUrl)
    } catch { window.open(media.url!, '_blank') }
    finally { setDownloading(false) }
  }

  return (
    <div style={{ display: 'flex', gap: 6 }} onClick={e => e.stopPropagation()}>
      <a href={media.url} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
        title="View CV" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 30, height: 30, borderRadius: 7, border: '1px solid #d1d5db', background: '#f0fdf4', color: '#1B4D3E', textDecoration: 'none', fontSize: 15 }}>
        👁
      </a>
      <button onClick={handleDownload} disabled={downloading} title="Download CV"
        style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 30, height: 30, borderRadius: 7, border: '1px solid #d1d5db', background: '#eff6ff', cursor: downloading ? 'default' : 'pointer', fontSize: 15, fontFamily: 'inherit' }}>
        {downloading ? '⏳' : '⬇️'}
      </button>
    </div>
  )
}

// ── Inline status select (module-level) ───────────────────────────────────────
function InlineStatus({ candidateId, current, onChange }: {
  candidateId: string; current?: string; onChange: (id: string, s: string) => void
}) {
  const [saving, setSaving] = useState(false)
  const s = current ?? 'new'
  const m = STATUS_META[s] ?? STATUS_META.new

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value
    setSaving(true)
    try {
      const res = await fetch('/api/admin/applied-candidates', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: candidateId, status: val }),
      })
      if (res.ok) onChange(candidateId, val)
    } finally { setSaving(false) }
  }

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <select value={s} onChange={handleChange} disabled={saving}
        style={{ padding: '4px 24px 4px 10px', borderRadius: 999, border: `1.5px solid ${m.color}40`, background: m.bg, color: m.color, fontWeight: 700, fontSize: 12, fontFamily: 'inherit', cursor: 'pointer', outline: 'none', appearance: 'none', WebkitAppearance: 'none' }}>
        {STATUS_KEYS.map(v => <option key={v} value={v}>{STATUS_META[v].label}</option>)}
      </select>
      <span style={{ position: 'absolute', right: 7, top: '50%', transform: 'translateY(-50%)', fontSize: 9, color: m.color, pointerEvents: 'none' }}>▼</span>
    </div>
  )
}

// ── Detail drawer ─────────────────────────────────────────────────────────────
function CandidateDrawer({ candidate, onClose, onStatusChange }: {
  candidate: Candidate
  onClose: () => void
  onStatusChange: (id: string, s: string) => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState(candidate.status ?? 'new')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) onClose() }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [onClose])

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', h)
    return () => document.removeEventListener('keydown', h)
  }, [onClose])

  const saveStatus = async () => {
    setSaving(true)
    try {
      const res = await fetch('/api/admin/applied-candidates', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: candidate.id, status }),
      })
      if (res.ok) onStatusChange(candidate.id, status)
    } finally { setSaving(false) }
  }

  const m = STATUS_META[status] ?? STATUS_META.new

  return (
    <>
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 1000, backdropFilter: 'blur(3px)' }} />
      <div ref={ref} style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, width: 560,
        background: '#fff', zIndex: 1001,
        boxShadow: '-16px 0 60px rgba(0,0,0,0.2)',
        display: 'flex', flexDirection: 'column',
        fontFamily: 'var(--font-hind, system-ui, sans-serif)',
        animation: 'slideIn 0.22s cubic-bezier(0.16,1,0.3,1)',
      }}>
        <style>{`@keyframes slideIn { from { transform: translateX(80px); opacity:0; } to { transform: translateX(0); opacity:1; } }`}</style>

        {/* Header */}
        <div style={{ padding: '20px 28px', background: 'linear-gradient(135deg,#1B4D3E,#2D7A5B)', display: 'flex', alignItems: 'center', gap: 14, flexShrink: 0 }}>
          <button onClick={onClose} style={{ width: 34, height: 34, borderRadius: 9, border: 'none', cursor: 'pointer', background: 'rgba(255,255,255,0.15)', color: '#fff', fontSize: 17, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>✕</button>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#fff' }}>{candidate.fullName ?? '—'}</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', marginTop: 2 }}>{fmtDate(candidate.createdAt)}</div>
          </div>
          <span style={{ padding: '4px 12px', borderRadius: 999, fontSize: 12, fontWeight: 700, background: m.bg, color: m.color }}>{m.label}</span>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 0 24px' }}>

          <div style={{ padding: '20px 28px', borderBottom: '1px solid #f3f4f6' }}>
            <h3 style={{ margin: '0 0 14px', fontSize: 12, fontWeight: 800, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.06em' }}>👤 Applicant Info</h3>
            <InfoRow label="Full Name"    value={candidate.fullName} />
            <InfoRow label="Mobile"       value={candidate.mobile} highlight />
            <InfoRow label="Address"      value={candidate.address} />
            <InfoRow label="Applying For" value={candidate.applyingFor} />
          </div>

          <div style={{ padding: '20px 28px', borderBottom: '1px solid #f3f4f6' }}>
            <h3 style={{ margin: '0 0 12px', fontSize: 12, fontWeight: 800, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.06em' }}>📄 CV / Resume</h3>
            <CVActions cv={candidate.cv} />
          </div>

          <div style={{ padding: '20px 28px', borderBottom: '1px solid #f3f4f6' }}>
            <h3 style={{ margin: '0 0 12px', fontSize: 12, fontWeight: 800, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.06em' }}>🔄 Update Status</h3>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <select value={status} onChange={e => setStatus(e.target.value)}
                style={{ flex: 1, padding: '9px 12px', borderRadius: 9, border: '1px solid #d1d5db', fontSize: 14, outline: 'none', fontFamily: 'inherit', background: '#fff' }}>
                {STATUS_KEYS.map(v => <option key={v} value={v}>{STATUS_META[v].label}</option>)}
              </select>
              <button onClick={saveStatus} disabled={saving || status === candidate.status}
                style={{ padding: '9px 16px', borderRadius: 9, border: 'none', fontWeight: 700, fontSize: 13, cursor: saving || status === candidate.status ? 'default' : 'pointer', background: saving || status === candidate.status ? '#e5e7eb' : '#1B4D3E', color: saving || status === candidate.status ? '#9ca3af' : '#fff' }}>
                {saving ? '⏳' : '💾'} Save
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: '14px 28px', borderTop: '1px solid #e5e7eb', display: 'flex', gap: 10, background: '#fafafa', flexShrink: 0 }}>
          <a href={`/admin/collections/applied-candidates/${candidate.id}`}
            style={{ flex: 1, padding: '10px', borderRadius: 9, border: '1px solid #d1d5db', background: '#fff', color: '#374151', fontSize: 13, fontWeight: 600, textDecoration: 'none', textAlign: 'center' }}>
            ✏️ Full Edit
          </a>
          <button onClick={onClose}
            style={{ flex: 1, padding: '10px', borderRadius: 9, border: 'none', background: '#1B4D3E', color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
            Close
          </button>
        </div>
      </div>
    </>
  )
}

function InfoRow({ label, value, highlight }: { label: string; value?: string | null; highlight?: boolean }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 14, marginBottom: 8 }}>
      <span style={{ fontSize: 13, color: '#9ca3af', fontWeight: 600, flexShrink: 0 }}>{label}</span>
      <span style={{ fontSize: 14, color: highlight ? '#1B4D3E' : '#374151', fontWeight: highlight ? 700 : 400, textAlign: 'right', wordBreak: 'break-word' }}>{value || '—'}</span>
    </div>
  )
}

// ── Main view ─────────────────────────────────────────────────────────────────
export default function AppliedCandidatesListView() {
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [loading, setLoading]       = useState(true)
  const [drawerC, setDrawerC]       = useState<Candidate | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [search, setSearch]         = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/applied-candidates')
      const data = await res.json()
      setCandidates(data.docs ?? [])
    } finally { setLoading(false) }
  }, [])

  useEffect(() => { load() }, [load])

  const handleDelete = async (c: Candidate) => {
    if (!confirm(`Delete application from ${c.fullName}?\nThis cannot be undone.`)) return
    setDeletingId(c.id)
    try {
      await fetch(`/api/admin/applied-candidates?id=${c.id}`, { method: 'DELETE' })
      setCandidates(prev => prev.filter(x => x.id !== c.id))
      if (drawerC?.id === c.id) setDrawerC(null)
    } finally { setDeletingId(null) }
  }

  const handleStatusChange = (id: string, status: string) => {
    setCandidates(prev => prev.map(c => c.id === id ? { ...c, status } : c))
    setDrawerC(prev => prev?.id === id ? { ...prev, status } : prev)
  }

  const displayed = search.trim()
    ? candidates.filter(c =>
        (c.fullName ?? '').toLowerCase().includes(search.toLowerCase()) ||
        (c.mobile ?? '').toLowerCase().includes(search.toLowerCase()) ||
        (c.applyingFor ?? '').toLowerCase().includes(search.toLowerCase())
      )
    : candidates

  const countByStatus = (s: string) => candidates.filter(c => c.status === s).length

  // Column definitions — closed over component state
  const columns: TableColumn<Candidate>[] = [
    {
      key: 'fullName',
      header: 'Full Name',
      render: (c) => (
        <span style={{ fontSize: 13, fontWeight: 600, color: '#1a2e1a' }}>{c.fullName ?? '—'}</span>
      ),
    },
    {
      key: 'mobile',
      header: 'Mobile',
      render: (c) => (
        <a href={`tel:${c.mobile}`} style={{ fontSize: 13, color: '#1B4D3E', fontWeight: 600, textDecoration: 'none' }}>
          {c.mobile ?? '—'}
        </a>
      ),
    },
    {
      key: 'applyingFor',
      header: 'Applying For',
      width: '180px',
      render: (c) => (
        <span style={{ fontSize: 13, color: '#374151', maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}>
          {c.applyingFor || '—'}
        </span>
      ),
    },
    {
      key: 'cv',
      header: 'CV',
      render: (c) => <CVActions cv={c.cv} />,
    },
    {
      key: 'status',
      header: 'Status',
      render: (c) => (
        <InlineStatus candidateId={c.id} current={c.status} onChange={handleStatusChange} />
      ),
    },
    {
      key: 'createdAt',
      header: 'Applied At',
      render: (c) => (
        <span style={{ fontSize: 12, color: '#6b7280', whiteSpace: 'nowrap' }}>{fmtDate(c.createdAt)}</span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (c) => (
        <div style={{ display: 'flex', gap: 6 }}>
          <button
            onClick={() => setDrawerC(c)}
            style={{ padding: '5px 12px', borderRadius: 7, border: '1px solid #d1d5db', background: '#fff', fontSize: 11, fontWeight: 700, color: '#1B4D3E', cursor: 'pointer' }}
          >
            👁 Details
          </button>
          <button
            onClick={() => handleDelete(c)}
            disabled={deletingId === c.id}
            style={{ padding: '5px 10px', borderRadius: 7, border: '1px solid #fecaca', background: '#fff5f5', fontSize: 11, fontWeight: 700, color: '#dc2626', cursor: deletingId === c.id ? 'default' : 'pointer' }}
          >
            {deletingId === c.id ? '⏳' : '🗑️'}
          </button>
        </div>
      ),
    },
  ]

  return (
    <div style={{ padding: '32px 32px 48px', minHeight: '100vh', background: '#f9fafb', fontFamily: 'var(--font-hind, system-ui, sans-serif)' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: '#111827' }}>Applied Candidates</h1>
          <p style={{ margin: '4px 0 0', fontSize: 13, color: '#6b7280' }}>
            {loading ? '…' : `${candidates.length} total applications`}
          </p>
          {!loading && candidates.length > 0 && (
            <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
              {STATUS_KEYS.map(s => {
                const cnt = countByStatus(s)
                if (cnt === 0) return null
                const m = STATUS_META[s]
                return (
                  <span key={s} style={{ padding: '3px 11px', borderRadius: 999, fontSize: 12, fontWeight: 700, background: m.bg, color: m.color }}>
                    {m.label}: {cnt}
                  </span>
                )
              })}
            </div>
          )}
        </div>
        <button onClick={load} style={{ padding: '8px 14px', borderRadius: 8, border: '1px solid #e5e7eb', background: '#fff', fontSize: 12, fontWeight: 600, color: '#374151', cursor: 'pointer' }}>🔄 Refresh</button>
      </div>

      {/* Search */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: '8px 14px', marginBottom: 16, maxWidth: 400 }}>
        <span style={{ fontSize: 14, color: '#9ca3af' }}>🔍</span>
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search by name, mobile, or position…"
          style={{ border: 'none', outline: 'none', fontSize: 13, flex: 1, fontFamily: 'inherit', background: 'transparent', color: '#374151' }} />
        {search && <button onClick={() => setSearch('')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, color: '#9ca3af' }}>✕</button>}
      </div>

      {/* Table */}
      <AdminTable
        columns={columns}
        data={displayed}
        loading={loading}
        emptyMessage={search ? `No results for "${search}"` : 'No applications yet'}
        defaultPageSize={10}
      />

      {drawerC && (
        <CandidateDrawer
          candidate={drawerC}
          onClose={() => setDrawerC(null)}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  )
}
