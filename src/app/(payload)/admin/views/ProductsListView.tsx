'use client'

import { useState, useEffect, useCallback } from 'react'
import { AdminTable, type TableColumn } from '@/components/payload/AdminTable'

type MediaDoc = { id?: string | number; url?: string; filename?: string }

type Product = {
  id: string
  name?: string
  nameBn?: string
  slug?: string
  category?: string
  image?: MediaDoc | string | number | null
  price?: number
  comparePrice?: number
  weight?: string
  status?: string
  featured?: boolean
  createdAt?: string
}

const STATUS_META: Record<string, { label: string; bg: string; color: string }> = {
  published: { label: 'Published', bg: '#dcfce7', color: '#166534' },
  upcoming:  { label: 'Upcoming',  bg: '#dbeafe', color: '#1e40af' },
  draft:     { label: 'Draft',     bg: '#fef9c3', color: '#92400e' },
}

const CATEGORY_LABELS: Record<string, string> = {
  'organic-fertilizer': 'Organic Fertilizer',
  'vermicompost':       'Vermicompost',
  'organic-pesticide':  'Organic Pesticide',
  'soil-improver':      'Soil Improver',
}

// ── Inline status select ──────────────────────────────────────────────────────
function InlineStatus({ productId, current, onChange }: {
  productId: string; current?: string; onChange: (id: string, s: string) => void
}) {
  const [saving, setSaving] = useState(false)
  const s = current && STATUS_META[current] ? current : 'published'
  const m = STATUS_META[s]

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value
    setSaving(true)
    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: val }),
      })
      if (res.ok) onChange(productId, val)
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

function ImageThumb({ image }: { image: Product['image'] }) {
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

  if (!url) return <div style={{ width: 40, height: 40, borderRadius: 7, background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>📦</div>
  return (
    <img src={url} alt="" style={{ width: 40, height: 40, borderRadius: 7, objectFit: 'cover', border: '1px solid #e5e7eb' }} />
  )
}

// ── Main list view ────────────────────────────────────────────────────────────
export default function ProductsListView() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading]   = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [search, setSearch]     = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/products?limit=200&depth=1&sort=-createdAt')
      const data = await res.json()
      setProducts(data.docs ?? [])
    } finally { setLoading(false) }
  }, [])

  useEffect(() => { load() }, [load])

  const handleDelete = async (p: Product) => {
    if (!confirm(`Delete product "${p.name}"?\nThis cannot be undone.`)) return
    setDeletingId(p.id)
    try {
      await fetch(`/api/products/${p.id}`, { method: 'DELETE' })
      setProducts(prev => prev.filter(x => x.id !== p.id))
    } finally { setDeletingId(null) }
  }

  const handleStatusChange = (id: string, status: string) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, status } : p))
  }

  const countByStatus = (s: string) => products.filter(p => p.status === s).length

  const displayed = search.trim()
    ? products.filter(p =>
        (p.name ?? '').toLowerCase().includes(search.toLowerCase()) ||
        (p.nameBn ?? '').toLowerCase().includes(search.toLowerCase()) ||
        (p.slug ?? '').toLowerCase().includes(search.toLowerCase())
      )
    : products

  const columns: TableColumn<Product>[] = [
    {
      key: 'image',
      header: '',
      width: '56px',
      render: (p) => <ImageThumb image={p.image} />,
    },
    {
      key: 'name',
      header: 'Product Name',
      render: (p) => (
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#1a2e1a' }}>{p.name ?? '—'}</div>
          {p.nameBn && <div style={{ fontSize: 11, color: '#6b7280' }}>{p.nameBn}</div>}
          {p.slug && <code style={{ fontSize: 10, color: '#9ca3af', background: '#f3f4f6', padding: '1px 5px', borderRadius: 4 }}>{p.slug}</code>}
        </div>
      ),
    },
    {
      key: 'category',
      header: 'Category',
      render: (p) => (
        <span style={{ fontSize: 12, color: '#374151' }}>{CATEGORY_LABELS[p.category ?? ''] ?? p.category ?? '—'}</span>
      ),
    },
    {
      key: 'price',
      header: 'Price',
      render: (p) => (
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#1B4D3E' }}>
            {p.price != null ? `Tk ${p.price.toLocaleString()}` : '—'}
          </div>
          {p.comparePrice && p.comparePrice > (p.price ?? 0) && (
            <div style={{ fontSize: 11, color: '#9ca3af', textDecoration: 'line-through' }}>Tk {p.comparePrice.toLocaleString()}</div>
          )}
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (p) => <InlineStatus productId={p.id} current={p.status} onChange={handleStatusChange} />,
    },
    {
      key: 'featured',
      header: 'Featured',
      render: (p) => (
        <span style={{ fontSize: 16 }}>{p.featured ? '⭐' : '—'}</span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (p) => (
        <div style={{ display: 'flex', gap: 6 }}>
          <a href={`/admin/collections/products/${p.id}`}
            style={{ padding: '5px 12px', borderRadius: 7, border: '1px solid #d1d5db', background: '#fff', fontSize: 11, fontWeight: 700, color: '#1B4D3E', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            ✏️ Edit
          </a>
          <button onClick={() => handleDelete(p)} disabled={deletingId === p.id}
            style={{ padding: '5px 10px', borderRadius: 7, border: '1px solid #fecaca', background: '#fff5f5', fontSize: 11, fontWeight: 700, color: '#dc2626', cursor: deletingId === p.id ? 'default' : 'pointer' }}>
            {deletingId === p.id ? '⏳' : '🗑️'}
          </button>
        </div>
      ),
    },
  ]

  return (
    <div style={{ padding: '32px 32px 48px', minHeight: '100vh', background: '#f9fafb', fontFamily: 'var(--font-hind, system-ui, sans-serif)' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: '#111827' }}>Products</h1>
          <p style={{ margin: '4px 0 0', fontSize: 13, color: '#6b7280' }}>
            {loading ? '…' : `${products.length} total products`}
          </p>
          {!loading && products.length > 0 && (
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
          <a href="/admin/collections/products/create" style={{ padding: '8px 16px', borderRadius: 8, background: '#1B4D3E', color: '#fff', fontSize: 12, fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            + Create New
          </a>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: '8px 14px', marginBottom: 16, maxWidth: 400 }}>
        <span style={{ fontSize: 14, color: '#9ca3af' }}>🔍</span>
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search by name or slug…"
          style={{ border: 'none', outline: 'none', fontSize: 13, flex: 1, fontFamily: 'inherit', background: 'transparent', color: '#374151' }} />
        {search && <button onClick={() => setSearch('')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, color: '#9ca3af' }}>✕</button>}
      </div>

      <AdminTable
        columns={columns}
        data={displayed}
        loading={loading}
        emptyMessage={search ? `No products match "${search}"` : 'No products yet'}
        defaultPageSize={10}
      />
    </div>
  )
}
