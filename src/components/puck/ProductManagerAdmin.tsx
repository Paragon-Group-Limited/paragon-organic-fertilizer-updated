'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

type MediaDoc = { id: string; url?: string | null; alt?: string }

type Product = {
  id: string
  name: string
  nameBn: string
  slug: string
  category?: string | null
  status?: string | null
  price?: number | null
  comparePrice?: number | null
  weight?: string | null
  rating?: number | null
  reviewCount?: number | null
  shortDescription?: string | null
  image?: MediaDoc | null
  featured?: boolean | null
  benefits?: { benefit: string }[]
}

type FormData = {
  name: string
  nameBn: string
  slug: string
  category: string
  status: string
  price: string
  comparePrice: string
  weight: string
  rating: string
  reviewCount: string
  shortDescription: string
  featured: boolean
  benefits: string
}

const EMPTY_FORM: FormData = {
  name: '', nameBn: '', slug: '', category: 'organic-fertilizer',
  status: 'published', price: '', comparePrice: '', weight: '',
  rating: '', reviewCount: '', shortDescription: '', featured: false, benefits: '',
}

const CATEGORIES = [
  { value: 'organic-fertilizer', label: 'Organic Fertilizer' },
  { value: 'vermicompost',       label: 'Vermicompost' },
  { value: 'organic-pesticide',  label: 'Organic Pesticide' },
  { value: 'soil-improver',      label: 'Soil Improver' },
]
const STATUSES = [
  { value: 'published', label: '✅ Published' },
  { value: 'upcoming',  label: '⏳ Upcoming'  },
  { value: 'draft',     label: '📝 Draft'     },
]

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-')
}

function toFormData(p: Product): FormData {
  return {
    name: p.name,
    nameBn: p.nameBn,
    slug: p.slug,
    category: p.category || 'organic-fertilizer',
    status: p.status || 'published',
    price: p.price != null ? String(p.price) : '',
    comparePrice: p.comparePrice != null ? String(p.comparePrice) : '',
    weight: p.weight || '',
    rating: p.rating != null ? String(p.rating) : '',
    reviewCount: p.reviewCount != null ? String(p.reviewCount) : '',
    shortDescription: p.shortDescription || '',
    featured: !!p.featured,
    benefits: (p.benefits || []).map(b => b.benefit).join('\n'),
  }
}

// ── Inline styles ─────────────────────────────────────────────────────────────
const S = {
  overlay: { position: 'fixed' as const, inset: 0, background: 'rgba(0,0,0,0.35)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  panel: { position: 'fixed' as const, top: 0, right: 0, bottom: 0, width: 480, background: '#fff', boxShadow: '-8px 0 40px rgba(0,0,0,0.15)', zIndex: 60, display: 'flex', flexDirection: 'column' as const, overflowY: 'auto' as const },
  btn: (bg: string, color = '#fff') => ({ padding: '8px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 700, background: bg, color, display: 'inline-flex' as const, alignItems: 'center', gap: 6 }),
  input: { width: '100%', padding: '8px 11px', borderRadius: 7, border: '1px solid #d1d5db', fontSize: 13, outline: 'none', boxSizing: 'border-box' as const, fontFamily: 'var(--font-hind, sans-serif)' },
  label: { display: 'block', fontSize: 11, fontWeight: 700, color: '#374151', marginBottom: 4, textTransform: 'uppercase' as const, letterSpacing: '0.04em' },
  field: { marginBottom: 14 },
  card: { background: '#fff', borderRadius: 14, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', overflow: 'hidden' as const, display: 'flex', flexDirection: 'column' as const, border: '1px solid #f0f0f0' },
}

// ── Product Card in grid ──────────────────────────────────────────────────────
function ProductCard({ product, onEdit, onDelete }: { product: Product; onEdit: () => void; onDelete: () => void }) {
  const imageUrl = product.image?.url ?? null
  const statusColor = product.status === 'published' ? '#16a34a' : product.status === 'upcoming' ? '#d97706' : '#6b7280'
  const catLabel = CATEGORIES.find(c => c.value === product.category)?.label ?? product.category ?? '—'

  return (
    <div style={S.card}>
      {/* Image */}
      <div style={{ height: 160, background: imageUrl ? '#f9fafb' : 'linear-gradient(135deg,#e8f5e9,#c8e6c9)', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
        {imageUrl ? (
          <img src={imageUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40 }}>📦</div>
        )}
        <span style={{ position: 'absolute', top: 8, left: 8, padding: '2px 8px', borderRadius: 20, fontSize: 10, fontWeight: 700, background: '#1B4D3E', color: '#fff', letterSpacing: '0.05em' }}>
          {catLabel}
        </span>
        <span style={{ position: 'absolute', top: 8, right: 8, padding: '2px 8px', borderRadius: 20, fontSize: 10, fontWeight: 700, background: 'rgba(255,255,255,0.9)', color: statusColor }}>
          {product.status ?? 'draft'}
        </span>
      </div>

      {/* Info */}
      <div style={{ padding: '14px 16px', flex: 1 }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: '#1a2e1a', marginBottom: 2, lineHeight: 1.3, fontFamily: 'var(--font-hind, sans-serif)' }}>{product.name}</div>
        <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 8, fontFamily: 'var(--font-hind, sans-serif)' }}>{product.nameBn}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          {product.price != null && (
            <span style={{ fontSize: 16, fontWeight: 800, color: '#1B4D3E' }}>Tk {product.price.toLocaleString()}</span>
          )}
          {product.comparePrice != null && product.comparePrice > (product.price ?? 0) && (
            <span style={{ fontSize: 12, textDecoration: 'line-through', color: '#9ca3af' }}>Tk {product.comparePrice.toLocaleString()}</span>
          )}
          {product.weight && (
            <span style={{ fontSize: 11, color: '#6b7280', marginLeft: 'auto' }}>{product.weight}</span>
          )}
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={S.btn('#1B4D3E')} onClick={onEdit}>✏️ Edit</button>
          <button style={S.btn('#fee2e2', '#dc2626')} onClick={onDelete}>🗑️ Delete</button>
        </div>
      </div>
    </div>
  )
}

// ── Image uploader ────────────────────────────────────────────────────────────
function ImageField({ currentUrl, onUpload }: { currentUrl?: string | null; onUpload: (id: string, url: string) => void }) {
  const fileRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(currentUrl ?? null)

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const fd = new FormData()
    fd.append('file', file)
    try {
      const res = await fetch('/api/admin/media', { method: 'POST', body: fd })
      const data = await res.json()
      if (data.id) {
        setPreview(data.url ?? null)
        onUpload(data.id, data.url ?? '')
      } else {
        alert('Image upload failed: ' + (data.error ?? 'Unknown error'))
      }
    } catch {
      alert('Image upload failed')
    } finally {
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  return (
    <div style={S.field}>
      <label style={S.label}>Product Image</label>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        <div style={{ width: 100, height: 100, borderRadius: 10, background: '#f3f4f6', border: '1px dashed #d1d5db', overflow: 'hidden', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {preview ? (
            <img src={preview} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <span style={{ fontSize: 28, opacity: 0.3 }}>🖼️</span>
          )}
        </div>
        <div style={{ flex: 1 }}>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            style={S.btn(uploading ? '#9ca3af' : '#f3f4f6', '#374151')}>
            {uploading ? '⏳ Uploading…' : '📁 Choose Image'}
          </button>
          <p style={{ fontSize: 11, color: '#9ca3af', marginTop: 6 }}>PNG, JPG, WebP — recommended 800×800px</p>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} style={{ display: 'none' }} />
        </div>
      </div>
    </div>
  )
}

// ── Add / Edit form panel ─────────────────────────────────────────────────────
function ProductFormPanel({
  editProduct,
  onClose,
  onSaved,
}: {
  editProduct: Product | null
  onClose: () => void
  onSaved: (p: Product) => void
}) {
  const [form, setForm] = useState<FormData>(editProduct ? toFormData(editProduct) : EMPTY_FORM)
  const [imageId, setImageId] = useState<string | null>(
    editProduct?.image ? String((editProduct.image as { id?: unknown }).id ?? editProduct.image) : null
  )
  const [imageUrl, setImageUrl] = useState<string | null>(editProduct?.image?.url ?? null)
  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const set = (field: keyof FormData, val: string | boolean) =>
    setForm(prev => {
      const next = { ...prev, [field]: val }
      if (field === 'name' && !editProduct) next.slug = slugify(val as string)
      return next
    })

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'Required'
    if (!form.nameBn.trim()) e.nameBn = 'Required'
    if (!form.slug.trim()) e.slug = 'Required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSave = async () => {
    if (!validate()) return
    setSaving(true)
    try {
      const payload: Record<string, unknown> = {
        name: form.name.trim(),
        nameBn: form.nameBn.trim(),
        slug: form.slug.trim(),
        category: form.category,
        status: form.status,
        price: form.price ? Number(form.price) : null,
        comparePrice: form.comparePrice ? Number(form.comparePrice) : null,
        weight: form.weight || null,
        rating: form.rating ? Number(form.rating) : null,
        reviewCount: form.reviewCount ? Number(form.reviewCount) : null,
        shortDescription: form.shortDescription || null,
        featured: form.featured,
        benefits: form.benefits.trim()
          ? form.benefits.split('\n').filter(Boolean).map(b => ({ benefit: b.trim() }))
          : [],
      }
      if (imageId) payload.image = Number(imageId) || imageId

      if (editProduct) {
        payload.id = editProduct.id
        const res = await fetch('/api/admin/products', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
        const data = await res.json()
        if (!res.ok) { alert(data.error ?? 'Update failed'); return }
        const updated = data.product as Product
        if (imageUrl) updated.image = { id: imageId!, url: imageUrl }
        onSaved(updated)
      } else {
        const res = await fetch('/api/admin/products', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
        const data = await res.json()
        if (!res.ok) { alert(data.error ?? 'Create failed'); return }
        const created = data.product as Product
        if (imageUrl) created.image = { id: imageId!, url: imageUrl }
        onSaved(created)
      }
    } finally {
      setSaving(false)
    }
  }

  const inp = (field: keyof FormData, type = 'text') => (
    <input
      type={type}
      value={String(form[field])}
      onChange={e => set(field, e.target.value)}
      style={{ ...S.input, borderColor: errors[field] ? '#ef4444' : '#d1d5db' }}
    />
  )

  const F = ({ label, field, children }: { label: string; field?: string; children: React.ReactNode }) => (
    <div style={S.field}>
      <label style={S.label}>{label}{field && errors[field] && <span style={{ color: '#ef4444', marginLeft: 6 }}>{errors[field]}</span>}</label>
      {children}
    </div>
  )

  return (
    <>
      {/* Backdrop */}
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.25)', zIndex: 59 }} onClick={onClose} />

      {/* Slide panel */}
      <div style={S.panel}>
        {/* Panel header */}
        <div style={{ padding: '18px 24px', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: 12, background: '#fff', position: 'sticky', top: 0, zIndex: 10 }}>
          <button onClick={onClose} style={{ ...S.btn('#f3f4f6', '#374151'), padding: '6px 12px' }}>✕</button>
          <h2 style={{ flex: 1, margin: 0, fontSize: 16, fontWeight: 800, color: '#1a2e1a' }}>
            {editProduct ? '✏️ Edit Product' : '➕ New Product'}
          </h2>
          <button onClick={handleSave} disabled={saving} style={S.btn(saving ? '#9ca3af' : '#1B4D3E')}>
            {saving ? '⏳ Saving…' : '💾 Save'}
          </button>
        </div>

        {/* Form body */}
        <div style={{ padding: '20px 24px', flex: 1 }}>

          {/* Image */}
          <ImageField
            currentUrl={imageUrl}
            onUpload={(id, url) => { setImageId(id); setImageUrl(url) }}
          />

          <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: 16, marginBottom: 16 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>Basic Info</p>

            <F label="Product Name (English) *" field="name">{inp('name')}</F>
            <F label="Product Name (Bengali) *" field="nameBn">{inp('nameBn')}</F>
            <F label="URL Slug *" field="slug">
              <input
                type="text"
                value={form.slug}
                onChange={e => set('slug', slugify(e.target.value))}
                style={{ ...S.input, fontFamily: 'monospace', borderColor: errors.slug ? '#ef4444' : '#d1d5db' }}
              />
            </F>
          </div>

          <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: 16, marginBottom: 16 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>Category & Status</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <F label="Category">
                <select value={form.category} onChange={e => set('category', e.target.value)} style={S.input}>
                  {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </F>
              <F label="Status">
                <select value={form.status} onChange={e => set('status', e.target.value)} style={S.input}>
                  {STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
              </F>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 4 }}>
              <input type="checkbox" id="featured" checked={form.featured} onChange={e => set('featured', e.target.checked)} style={{ width: 16, height: 16, accentColor: '#D4A017', cursor: 'pointer' }} />
              <label htmlFor="featured" style={{ fontSize: 13, fontWeight: 600, color: '#374151', cursor: 'pointer' }}>⭐ Featured Product (Best Seller badge)</label>
            </div>
          </div>

          <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: 16, marginBottom: 16 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>Pricing</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
              <F label="Price (Tk)"><input type="number" min="0" value={form.price} onChange={e => set('price', e.target.value)} style={S.input} /></F>
              <F label="Compare Price"><input type="number" min="0" value={form.comparePrice} onChange={e => set('comparePrice', e.target.value)} style={S.input} placeholder="Original" /></F>
              <F label="Weight / Size"><input type="text" value={form.weight} onChange={e => set('weight', e.target.value)} style={S.input} placeholder="e.g. 5 kg" /></F>
            </div>
          </div>

          <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: 16, marginBottom: 16 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>Ratings</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <F label="Rating (0–5)"><input type="number" min="0" max="5" step="0.1" value={form.rating} onChange={e => set('rating', e.target.value)} style={S.input} placeholder="4.5" /></F>
              <F label="Review Count"><input type="number" min="0" value={form.reviewCount} onChange={e => set('reviewCount', e.target.value)} style={S.input} placeholder="0" /></F>
            </div>
          </div>

          <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: 16, marginBottom: 16 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>Description & Benefits</p>
            <F label="Short Description">
              <textarea value={form.shortDescription} onChange={e => set('shortDescription', e.target.value)} rows={3} style={{ ...S.input, resize: 'vertical' }} placeholder="One-line product summary…" />
            </F>
            <F label="Benefits (one per line)">
              <textarea value={form.benefits} onChange={e => set('benefits', e.target.value)} rows={4} style={{ ...S.input, resize: 'vertical' }} placeholder={"100% organic\nImproves soil health\nSafe for all crops"} />
            </F>
          </div>
        </div>
      </div>
    </>
  )
}

// ── Delete confirmation ───────────────────────────────────────────────────────
function DeleteModal({ product, onConfirm, onCancel, deleting }: { product: Product; onConfirm: () => void; onCancel: () => void; deleting: boolean }) {
  return (
    <div style={S.overlay}>
      <div style={{ background: '#fff', borderRadius: 16, padding: '32px', maxWidth: 400, width: '90%', boxShadow: '0 24px 64px rgba(0,0,0,0.2)', fontFamily: 'sans-serif' }}>
        <div style={{ fontSize: 40, textAlign: 'center', marginBottom: 12 }}>🗑️</div>
        <h2 style={{ textAlign: 'center', margin: '0 0 8px', fontSize: 17, fontWeight: 800, color: '#1a2e1a' }}>Delete Product?</h2>
        <p style={{ textAlign: 'center', color: '#6b7280', fontSize: 13, lineHeight: 1.7, margin: '0 0 24px' }}>
          <b style={{ color: '#dc2626' }}>{product.name}</b> permanently delete হবে।<br />এই কাজটি undo করা যাবে না।
        </p>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={onCancel} style={{ ...S.btn('#f3f4f6', '#374151'), flex: 1, justifyContent: 'center' }}>বাতিল</button>
          <button onClick={onConfirm} disabled={deleting} style={{ ...S.btn(deleting ? '#9ca3af' : '#dc2626'), flex: 2, justifyContent: 'center' }}>
            {deleting ? '⏳ Deleting…' : '🗑️ Yes, Delete'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Main ProductManagerAdmin ──────────────────────────────────────────────────
export default function ProductManagerAdmin() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [formOpen, setFormOpen] = useState(false)
  const [editProduct, setEditProduct] = useState<Product | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null)
  const [deleting, setDeleting] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/products')
      const data = await res.json()
      setProducts(data.products ?? [])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  const handleSaved = (p: Product) => {
    setProducts(prev => {
      const idx = prev.findIndex(x => x.id === p.id)
      if (idx >= 0) { const next = [...prev]; next[idx] = p; return next }
      return [p, ...prev]
    })
    setFormOpen(false)
    setEditProduct(null)
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      await fetch(`/api/admin/products?id=${deleteTarget.id}`, { method: 'DELETE' })
      setProducts(prev => prev.filter(p => p.id !== deleteTarget.id))
      setDeleteTarget(null)
    } finally {
      setDeleting(false)
    }
  }

  const displayed = products.filter(p => {
    const q = search.toLowerCase()
    const matchSearch = !q || p.name.toLowerCase().includes(q) || p.nameBn.toLowerCase().includes(q)
    const matchStatus = filterStatus === 'all' || p.status === filterStatus
    return matchSearch && matchStatus
  })

  return (
    <div style={{ minHeight: '100vh', background: '#f3f4f6', fontFamily: 'var(--font-hind, sans-serif)' }}>

      {/* Header — matches Puck editor style */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e5e7eb', padding: '0 24px', height: 56, display: 'flex', alignItems: 'center', gap: 12, position: 'sticky', top: 0, zIndex: 40 }}>
        <a href="/admin/collections/pages" style={{ fontSize: 18, textDecoration: 'none', lineHeight: 1 }} title="Back to Pages">←</a>
        <div style={{ width: 1, height: 20, background: '#e5e7eb' }} />
        <span style={{ fontSize: 15, fontWeight: 800, color: '#1a2e1a', flex: 1 }}>🛒 Product Manager</span>
        <span style={{ fontSize: 12, color: '#9ca3af' }}>{products.length} products</span>
        <button onClick={() => { setEditProduct(null); setFormOpen(true) }} style={S.btn('#1B4D3E')}>
          ➕ Add Product
        </button>
      </div>

      {/* Toolbar */}
      <div style={{ background: '#fff', borderBottom: '1px solid #f0f0f0', padding: '12px 24px', display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' as const }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, minWidth: 200, background: '#f3f4f6', borderRadius: 8, padding: '6px 12px' }}>
          <span style={{ fontSize: 14 }}>🔍</span>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search products…"
            style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: 13, flex: 1 }}
          />
          {search && <button onClick={() => setSearch('')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, color: '#9ca3af' }}>✕</button>}
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {['all', 'published', 'upcoming', 'draft'].map(s => (
            <button key={s} onClick={() => setFilterStatus(s)}
              style={{ ...S.btn(filterStatus === s ? '#1B4D3E' : '#f3f4f6', filterStatus === s ? '#fff' : '#374151'), padding: '5px 12px', fontSize: 12, fontWeight: filterStatus === s ? 700 : 500 }}>
              {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
        <button onClick={load} style={{ ...S.btn('#f3f4f6', '#374151'), padding: '5px 10px', fontSize: 12 }}>🔄 Refresh</button>
      </div>

      {/* Grid */}
      <div style={{ padding: 24 }}>
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
            {[1,2,3,4].map(i => (
              <div key={i} style={{ borderRadius: 14, background: '#fff', height: 280, animation: 'pulse 1.5s infinite', opacity: 0.6 }} />
            ))}
          </div>
        ) : displayed.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 20px', color: '#9ca3af' }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>📦</div>
            <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: '#6b7280' }}>
              {search ? `No products match "${search}"` : 'No products yet'}
            </p>
            {!search && (
              <button onClick={() => { setEditProduct(null); setFormOpen(true) }} style={{ ...S.btn('#1B4D3E'), marginTop: 12 }}>
                ➕ Add First Product
              </button>
            )}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
            {displayed.map(p => (
              <ProductCard
                key={p.id}
                product={p}
                onEdit={() => { setEditProduct(p); setFormOpen(true) }}
                onDelete={() => setDeleteTarget(p)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit panel */}
      {formOpen && (
        <ProductFormPanel
          editProduct={editProduct}
          onClose={() => { setFormOpen(false); setEditProduct(null) }}
          onSaved={handleSaved}
        />
      )}

      {/* Delete confirmation */}
      {deleteTarget && (
        <DeleteModal
          product={deleteTarget}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
          deleting={deleting}
        />
      )}
    </div>
  )
}
