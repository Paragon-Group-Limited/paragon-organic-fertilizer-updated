'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { AdminTable, type TableColumn } from '@/components/payload/AdminTable'

type MediaDoc = { id?: string | number; url?: string; filename?: string }

type Dealer = {
  id: string
  name?: string
  org?: string
  district?: string
  upazila?: string
  address?: string
  phone?: string
  alternatePhone?: string
  tradeLicense?: MediaDoc | string | number | null
  status?: string
  type?: string
  createdAt?: string
}

const STATUS_META: Record<string, { label: string; bg: string; color: string }> = {
  pending:  { label: 'New Application', bg: '#fef9c3', color: '#92400e' },
  approved: { label: 'Approved',        bg: '#dcfce7', color: '#166534' },
  rejected: { label: 'Rejected',        bg: '#fee2e2', color: '#991b1b' },
}

const TYPE_META: Record<string, { label: string; bg: string; color: string }> = {
  main: { label: 'Main Dealer', bg: '#dbeafe', color: '#1e40af' },
  sub:  { label: 'Sub Dealer',  bg: '#ede9fe', color: '#5b21b6' },
}

function fmtDate(d?: string) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('en-BD', { dateStyle: 'medium' })
}

// ── Trade license view/download cell ─────────────────────────────────────────
function LicenseActions({ license }: { license: Dealer['tradeLicense'] }) {
  const [downloading, setDownloading] = useState(false)
  const [media, setMedia] = useState<MediaDoc | null>(null)

  useEffect(() => {
    if (!license) return
    if (typeof license === 'object' && 'url' in license && license.url) {
      setMedia(license as MediaDoc)
    } else {
      const id = typeof license === 'object' && 'id' in license ? (license as MediaDoc).id : license
      if (id == null) return
      fetch(`/api/media/${id}`)
        .then(r => r.json())
        .then(data => setMedia(data))
        .catch(() => null)
    }
  }, [license])

  if (!license) return <span style={{ color: '#9ca3af', fontSize: 12 }}>—</span>
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
      a.download = media.filename || 'license'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(objUrl)
    } catch { window.open(media.url!, '_blank') }
    finally { setDownloading(false) }
  }

  return (
    <div style={{ display: 'flex', gap: 6 }} onClick={e => e.stopPropagation()}>
      <a href={media.url} target="_blank" rel="noopener noreferrer"
        title="View License"
        style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 30, height: 30, borderRadius: 7, border: '1px solid #d1d5db', background: '#f0fdf4', textDecoration: 'none', fontSize: 15 }}>
        👁
      </a>
      <button onClick={handleDownload} disabled={downloading} title="Download License"
        style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 30, height: 30, borderRadius: 7, border: '1px solid #d1d5db', background: '#eff6ff', cursor: downloading ? 'default' : 'pointer', fontSize: 15, fontFamily: 'inherit' }}>
        {downloading ? '⏳' : '⬇️'}
      </button>
    </div>
  )
}

// ── Inline status select ──────────────────────────────────────────────────────
function InlineStatus({ dealerId, current, onChange }: {
  dealerId: string; current?: string; onChange: (id: string, s: string) => void
}) {
  const [saving, setSaving] = useState(false)
  const s = current && STATUS_META[current] ? current : 'pending'
  const m = STATUS_META[s]

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value
    setSaving(true)
    try {
      const res = await fetch(`/api/dealers/${dealerId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: val }),
      })
      if (res.ok) onChange(dealerId, val)
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

// ── Detail drawer ─────────────────────────────────────────────────────────────
function DealerDrawer({ dealer, onClose, onStatusChange }: {
  dealer: Dealer; onClose: () => void; onStatusChange: (id: string, s: string) => void
}) {
  const ref = useRef<HTMLDivElement>(null)

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

  const DR = ({ label, value }: { label: string; value?: string | null }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 14, marginBottom: 8 }}>
      <span style={{ fontSize: 13, color: '#9ca3af', fontWeight: 600, flexShrink: 0 }}>{label}</span>
      <span style={{ fontSize: 13, color: '#374151', textAlign: 'right', wordBreak: 'break-word' }}>{value || '—'}</span>
    </div>
  )

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
        <div style={{ padding: '20px 28px', background: 'linear-gradient(135deg,#1B4D3E,#2D7A5B)', display: 'flex', alignItems: 'center', gap: 14, flexShrink: 0 }}>
          <button onClick={onClose} style={{ width: 34, height: 34, borderRadius: 9, border: 'none', cursor: 'pointer', background: 'rgba(255,255,255,0.15)', color: '#fff', fontSize: 17, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#fff' }}>{dealer.name ?? '—'}</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', marginTop: 2 }}>{dealer.district}{dealer.upazila ? `, ${dealer.upazila}` : ''}</div>
          </div>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px' }}>
          <DR label="Name"          value={dealer.name} />
          <DR label="Organization"  value={dealer.org} />
          <DR label="District"      value={dealer.district} />
          <DR label="Upazila"       value={dealer.upazila} />
          <DR label="Address"       value={dealer.address} />
          <DR label="Phone"         value={dealer.phone} />
          <DR label="Alt Phone"     value={dealer.alternatePhone} />
          <DR label="Type"          value={TYPE_META[dealer.type ?? '']?.label} />
          <div style={{ marginTop: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#6b7280', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Trade License</div>
            <LicenseActions license={dealer.tradeLicense} />
          </div>
        </div>
        <div style={{ padding: '14px 28px', borderTop: '1px solid #e5e7eb', display: 'flex', gap: 10, background: '#fafafa', flexShrink: 0 }}>
          <a href={`/admin/collections/dealers/${dealer.id}`}
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

// ── Main list view ────────────────────────────────────────────────────────────
export default function DealersListView() {
  const [dealers, setDealers]   = useState<Dealer[]>([])
  const [loading, setLoading]   = useState(true)
  const [drawerD, setDrawerD]   = useState<Dealer | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [search, setSearch]     = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/dealers?limit=200&depth=1&sort=-createdAt')
      const data = await res.json()
      setDealers(data.docs ?? [])
    } finally { setLoading(false) }
  }, [])

  useEffect(() => { load() }, [load])

  const handleDelete = async (d: Dealer) => {
    if (!confirm(`Delete dealer "${d.name}"?\nThis cannot be undone.`)) return
    setDeletingId(d.id)
    try {
      await fetch(`/api/dealers/${d.id}`, { method: 'DELETE' })
      setDealers(prev => prev.filter(x => x.id !== d.id))
      if (drawerD?.id === d.id) setDrawerD(null)
    } finally { setDeletingId(null) }
  }

  const handleStatusChange = (id: string, status: string) => {
    setDealers(prev => prev.map(d => d.id === id ? { ...d, status } : d))
  }

  const countByStatus = (s: string) => dealers.filter(d => d.status === s).length

  const displayed = search.trim()
    ? dealers.filter(d =>
        (d.name ?? '').toLowerCase().includes(search.toLowerCase()) ||
        (d.district ?? '').toLowerCase().includes(search.toLowerCase()) ||
        (d.phone ?? '').toLowerCase().includes(search.toLowerCase())
      )
    : dealers

  const columns: TableColumn<Dealer>[] = [
    {
      key: 'name',
      header: 'Name',
      render: (d) => (
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#1a2e1a' }}>{d.name ?? '—'}</div>
          {d.org && <div style={{ fontSize: 11, color: '#9ca3af' }}>{d.org}</div>}
        </div>
      ),
    },
    {
      key: 'district',
      header: 'District',
      render: (d) => (
        <div>
          <div style={{ fontSize: 13, color: '#374151' }}>{d.district ?? '—'}</div>
          {d.upazila && <div style={{ fontSize: 11, color: '#9ca3af' }}>{d.upazila}</div>}
        </div>
      ),
    },
    {
      key: 'phone',
      header: 'Phone',
      render: (d) => (
        <a href={`tel:${d.phone}`} style={{ fontSize: 13, color: '#1B4D3E', fontWeight: 600, textDecoration: 'none' }}>
          {d.phone ?? '—'}
        </a>
      ),
    },
    {
      key: 'license',
      header: 'Trade License',
      render: (d) => <LicenseActions license={d.tradeLicense} />,
    },
    {
      key: 'status',
      header: 'Status',
      render: (d) => <InlineStatus dealerId={d.id} current={d.status} onChange={handleStatusChange} />,
    },
    {
      key: 'type',
      header: 'Type',
      render: (d) => {
        const t = TYPE_META[d.type ?? ''] ?? TYPE_META.sub
        return (
          <span style={{ padding: '3px 10px', borderRadius: 999, fontSize: 11, fontWeight: 700, background: t.bg, color: t.color }}>
            {t.label}
          </span>
        )
      },
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (d) => (
        <div style={{ display: 'flex', gap: 6 }}>
          <button onClick={() => setDrawerD(d)}
            style={{ padding: '5px 12px', borderRadius: 7, border: '1px solid #d1d5db', background: '#fff', fontSize: 11, fontWeight: 700, color: '#1B4D3E', cursor: 'pointer' }}>
            👁 Details
          </button>
          <button onClick={() => handleDelete(d)} disabled={deletingId === d.id}
            style={{ padding: '5px 10px', borderRadius: 7, border: '1px solid #fecaca', background: '#fff5f5', fontSize: 11, fontWeight: 700, color: '#dc2626', cursor: deletingId === d.id ? 'default' : 'pointer' }}>
            {deletingId === d.id ? '⏳' : '🗑️'}
          </button>
        </div>
      ),
    },
  ]

  return (
    <div style={{ padding: '32px 32px 48px', minHeight: '100vh', background: '#f9fafb', fontFamily: 'var(--font-hind, system-ui, sans-serif)' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: '#111827' }}>Dealers</h1>
          <p style={{ margin: '4px 0 0', fontSize: 13, color: '#6b7280' }}>
            {loading ? '…' : `${dealers.length} total dealers`}
          </p>
          {!loading && dealers.length > 0 && (
            <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
              {Object.entries(STATUS_META).map(([s, m]) => {
                const cnt = countByStatus(s)
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
          <a href="/admin/collections/dealers/create" style={{ padding: '8px 16px', borderRadius: 8, background: '#1B4D3E', color: '#fff', fontSize: 12, fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            + Create New
          </a>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: '8px 14px', marginBottom: 16, maxWidth: 400 }}>
        <span style={{ fontSize: 14, color: '#9ca3af' }}>🔍</span>
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search by name, district, or phone…"
          style={{ border: 'none', outline: 'none', fontSize: 13, flex: 1, fontFamily: 'inherit', background: 'transparent', color: '#374151' }} />
        {search && <button onClick={() => setSearch('')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, color: '#9ca3af' }}>✕</button>}
      </div>

      <AdminTable
        columns={columns}
        data={displayed}
        loading={loading}
        emptyMessage={search ? `No dealers match "${search}"` : 'No dealers yet'}
        defaultPageSize={10}
      />

      {drawerD && (
        <DealerDrawer
          dealer={drawerD}
          onClose={() => setDrawerD(null)}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  )
}
