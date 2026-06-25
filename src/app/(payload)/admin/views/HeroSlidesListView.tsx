'use client'

import { useState, useEffect, useCallback } from 'react'
import { AdminTable, type TableColumn } from '@/components/payload/AdminTable'

type MediaDoc = { id?: string | number; url?: string }

type HeroSlide = {
  id: string
  headingBn?: string
  tagBn?: string
  tagEn?: string
  cta1Label?: string
  cta1Href?: string
  image?: MediaDoc | string | number | null
  bgColor?: string
  order?: number
  active?: boolean
  createdAt?: string
}

function ImageThumb({ image, bgColor }: { image: HeroSlide['image']; bgColor?: string }) {
  const [url, setUrl] = useState<string | null>(null)

  useEffect(() => {
    if (!image) return
    if (typeof image === 'object' && 'url' in image && image.url) {
      setUrl(image.url)
    } else {
      const id = typeof image === 'object' && 'id' in image ? (image as MediaDoc).id : image
      if (id == null) return
      fetch(`/api/media/${id}`).then(r => r.json()).then(d => setUrl(d.url)).catch(() => null)
    }
  }, [image])

  if (url) {
    return <img src={url} alt="" style={{ width: 56, height: 36, borderRadius: 6, objectFit: 'cover', border: '1px solid #e5e7eb' }} />
  }
  return (
    <div style={{ width: 56, height: 36, borderRadius: 6, background: bgColor ?? '#1B4D3E', border: '1px solid #e5e7eb', opacity: 0.7 }} />
  )
}

// ── Active toggle ─────────────────────────────────────────────────────────────
function ActiveToggle({ slideId, active, onChange }: {
  slideId: string; active?: boolean; onChange: (id: string, active: boolean) => void
}) {
  const [saving, setSaving] = useState(false)

  const handleToggle = async () => {
    setSaving(true)
    try {
      const res = await fetch(`/api/hero-slides/${slideId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !active }),
      })
      if (res.ok) onChange(slideId, !active)
    } finally { setSaving(false) }
  }

  return (
    <button
      onClick={handleToggle}
      disabled={saving}
      style={{
        padding: '4px 12px', borderRadius: 999, border: 'none', cursor: saving ? 'default' : 'pointer',
        background: active ? '#dcfce7' : '#f3f4f6',
        color: active ? '#166534' : '#6b7280',
        fontSize: 12, fontWeight: 700, fontFamily: 'inherit',
        display: 'inline-flex', alignItems: 'center', gap: 5,
      }}
    >
      {saving ? '⏳' : active ? '✅ Active' : '⬜ Inactive'}
    </button>
  )
}

// ── Main list view ────────────────────────────────────────────────────────────
export default function HeroSlidesListView() {
  const [slides, setSlides]     = useState<HeroSlide[]>([])
  const [loading, setLoading]   = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/hero-slides?limit=50&depth=1&sort=order')
      const data = await res.json()
      setSlides(data.docs ?? [])
    } finally { setLoading(false) }
  }, [])

  useEffect(() => { load() }, [load])

  const handleDelete = async (s: HeroSlide) => {
    if (!confirm(`Delete slide "${s.headingBn}"?`)) return
    setDeletingId(s.id)
    try {
      await fetch(`/api/hero-slides/${s.id}`, { method: 'DELETE' })
      setSlides(prev => prev.filter(x => x.id !== s.id))
    } finally { setDeletingId(null) }
  }

  const handleActiveChange = (id: string, active: boolean) => {
    setSlides(prev => prev.map(s => s.id === id ? { ...s, active } : s))
  }

  const columns: TableColumn<HeroSlide>[] = [
    {
      key: 'preview',
      header: '',
      width: '72px',
      render: (s) => <ImageThumb image={s.image} bgColor={s.bgColor} />,
    },
    {
      key: 'heading',
      header: 'Heading',
      render: (s) => (
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#1a2e1a' }}>{s.headingBn ?? '—'}</div>
          {(s.tagBn || s.tagEn) && (
            <div style={{ fontSize: 11, color: '#9ca3af' }}>{s.tagBn}{s.tagEn ? ` / ${s.tagEn}` : ''}</div>
          )}
        </div>
      ),
    },
    {
      key: 'cta',
      header: 'Button',
      render: (s) => (
        <span style={{ fontSize: 12, color: '#374151' }}>{s.cta1Label ?? '—'}</span>
      ),
    },
    {
      key: 'order',
      header: 'Order',
      render: (s) => (
        <span style={{ fontSize: 13, fontWeight: 700, color: '#374151', background: '#f3f4f6', padding: '2px 8px', borderRadius: 6 }}>
          #{s.order ?? '—'}
        </span>
      ),
    },
    {
      key: 'active',
      header: 'Active',
      render: (s) => <ActiveToggle slideId={s.id} active={s.active} onChange={handleActiveChange} />,
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (s) => (
        <div style={{ display: 'flex', gap: 6 }}>
          <a href={`/admin/collections/hero-slides/${s.id}`}
            style={{ padding: '5px 12px', borderRadius: 7, border: '1px solid #d1d5db', background: '#fff', fontSize: 11, fontWeight: 700, color: '#1B4D3E', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            ✏️ Edit
          </a>
          <button onClick={() => handleDelete(s)} disabled={deletingId === s.id}
            style={{ padding: '5px 10px', borderRadius: 7, border: '1px solid #fecaca', background: '#fff5f5', fontSize: 11, fontWeight: 700, color: '#dc2626', cursor: deletingId === s.id ? 'default' : 'pointer' }}>
            {deletingId === s.id ? '⏳' : '🗑️'}
          </button>
        </div>
      ),
    },
  ]

  return (
    <div style={{ padding: '32px 32px 48px', minHeight: '100vh', background: '#f9fafb', fontFamily: 'var(--font-hind, system-ui, sans-serif)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: '#111827' }}>Hero Slides</h1>
          <p style={{ margin: '4px 0 0', fontSize: 13, color: '#6b7280' }}>
            {loading ? '…' : `${slides.length} slides · ${slides.filter(s => s.active).length} active`}
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={load} style={{ padding: '8px 14px', borderRadius: 8, border: '1px solid #e5e7eb', background: '#fff', fontSize: 12, fontWeight: 600, color: '#374151', cursor: 'pointer' }}>🔄 Refresh</button>
          <a href="/admin/collections/hero-slides/create" style={{ padding: '8px 16px', borderRadius: 8, background: '#1B4D3E', color: '#fff', fontSize: 12, fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            + Add Slide
          </a>
        </div>
      </div>

      <AdminTable
        columns={columns}
        data={slides}
        loading={loading}
        emptyMessage="No slides yet — add your first banner slide"
        defaultPageSize={10}
      />
    </div>
  )
}
