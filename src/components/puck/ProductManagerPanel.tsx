'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

type MediaDoc = { id?: string; url?: string | null }
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
  featured?: boolean | null
  image?: MediaDoc | null
  benefits?: { benefit: string }[]
}

type FormData = {
  name: string; nameBn: string; slug: string; category: string; status: string
  price: string; comparePrice: string; weight: string; rating: string
  reviewCount: string; shortDescription: string; featured: boolean; benefits: string
}

const EMPTY: FormData = {
  name: '', nameBn: '', slug: '', category: 'organic-fertilizer', status: 'published',
  price: '', comparePrice: '', weight: '', rating: '', reviewCount: '',
  shortDescription: '', featured: false, benefits: '',
}

const CATS = [
  { value: 'organic-fertilizer', label: 'Organic Fertilizer' },
  { value: 'vermicompost',       label: 'Vermicompost'        },
  { value: 'organic-pesticide',  label: 'Organic Pesticide'   },
  { value: 'soil-improver',      label: 'Soil Improver'       },
]
const STATUSES = [
  { value: 'published', label: 'Published' },
  { value: 'upcoming',  label: 'Upcoming'  },
  { value: 'draft',     label: 'Draft'     },
]

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-')
}
function toForm(p: Product): FormData {
  return {
    name: p.name, nameBn: p.nameBn, slug: p.slug,
    category: p.category || 'organic-fertilizer',
    status: p.status || 'published',
    price: p.price != null ? String(p.price) : '',
    comparePrice: p.comparePrice != null ? String(p.comparePrice) : '',
    weight: p.weight || '', rating: p.rating != null ? String(p.rating) : '',
    reviewCount: p.reviewCount != null ? String(p.reviewCount) : '',
    shortDescription: p.shortDescription || '', featured: !!p.featured,
    benefits: (p.benefits || []).map(b => b.benefit).join('\n'),
  }
}

const inp: React.CSSProperties = {
  width: '100%', padding: '6px 8px', borderRadius: 6, border: '1px solid #d1d5db',
  fontSize: 12, outline: 'none', boxSizing: 'border-box', fontFamily: 'var(--font-hind,sans-serif)',
  background: '#fff',
}
const lbl: React.CSSProperties = {
  display: 'block', fontSize: 10, fontWeight: 700, color: '#374151',
  marginBottom: 3, textTransform: 'uppercase', letterSpacing: '0.04em',
}
const btn = (bg: string, col = '#fff'): React.CSSProperties => ({
  padding: '5px 10px', borderRadius: 6, border: 'none', cursor: 'pointer',
  fontSize: 11, fontWeight: 700, background: bg, color: col,
  display: 'inline-flex', alignItems: 'center', gap: 4,
})

// ── Image uploader ────────────────────────────────────────────────────────────
function ImageUpload({ currentUrl, onDone }: { currentUrl?: string | null; onDone: (id: string, url: string) => void }) {
  const ref = useRef<HTMLInputElement>(null)
  const [busy, setBusy] = useState(false)
  const [preview, setPreview] = useState(currentUrl ?? null)

  const pick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return
    setBusy(true)
    const fd = new FormData(); fd.append('file', file)
    const res = await fetch('/api/admin/media', { method: 'POST', body: fd }).catch(() => null)
    const data = res ? await res.json().catch(() => ({})) : {}
    if (data.id) { setPreview(data.url); onDone(data.id, data.url ?? '') }
    else alert('Upload failed')
    setBusy(false)
    if (ref.current) ref.current.value = ''
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
      <div style={{ width: 52, height: 52, borderRadius: 8, background: '#f3f4f6', border: '1px dashed #d1d5db', overflow: 'hidden', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
        {preview ? <img src={preview} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" /> : '🖼️'}
      </div>
      <div>
        <button type="button" onClick={() => ref.current?.click()} disabled={busy} style={btn(busy ? '#9ca3af' : '#e5e7eb', '#374151')}>
          {busy ? '⏳' : '📁'} {busy ? 'Uploading…' : 'Image'}
        </button>
        <input ref={ref} type="file" accept="image/*" onChange={pick} style={{ display: 'none' }} />
      </div>
    </div>
  )
}

// ── Product row in list ───────────────────────────────────────────────────────
function ProductRow({ p, onEdit, onDelete }: { p: Product; onEdit: () => void; onDelete: () => void }) {
  const statusColor = p.status === 'published' ? '#16a34a' : p.status === 'upcoming' ? '#d97706' : '#9ca3af'
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', borderBottom: '1px solid #f3f4f6', background: '#fff' }}>
      {/* Thumbnail */}
      <div style={{ width: 38, height: 38, borderRadius: 7, background: p.image?.url ? '#f9fafb' : 'linear-gradient(135deg,#e8f5e9,#c8e6c9)', flexShrink: 0, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>
        {p.image?.url ? <img src={p.image.url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" /> : '📦'}
      </div>
      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: '#1a2e1a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</div>
        <div style={{ fontSize: 10, color: '#9ca3af', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.nameBn}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
          {p.price != null && <span style={{ fontSize: 11, fontWeight: 700, color: '#1B4D3E' }}>Tk {p.price}</span>}
          <span style={{ fontSize: 9, color: statusColor, fontWeight: 700, textTransform: 'uppercase' }}>{p.status}</span>
        </div>
      </div>
      {/* Actions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <button onClick={onEdit} style={{ ...btn('#1B4D3E'), padding: '3px 7px', fontSize: 10 }}>✏️</button>
        <button onClick={onDelete} style={{ ...btn('#fef2f2', '#dc2626'), padding: '3px 7px', fontSize: 10 }}>🗑️</button>
      </div>
    </div>
  )
}

// ── Form field wrapper — module level so React never remounts children on re-render ──
function FormField({ label, field, errors, children }: {
  label: string; field?: string; errors?: Record<string, string>; children: React.ReactNode
}) {
  return (
    <div style={{ marginBottom: 10 }}>
      <label style={lbl}>
        {label}
        {field && errors?.[field] && <span style={{ color: '#ef4444', marginLeft: 4 }}>{errors[field]}</span>}
      </label>
      {children}
    </div>
  )
}

// ── Compact form ──────────────────────────────────────────────────────────────
function ProductForm({
  editProduct, onBack, onSaved,
}: { editProduct: Product | null; onBack: () => void; onSaved: (p: Product) => void }) {
  const [form, setForm] = useState<FormData>(editProduct ? toForm(editProduct) : EMPTY)
  const [imgId, setImgId] = useState<string | null>(
    editProduct?.image?.id != null ? String(editProduct.image.id) : null
  )
  const [imgUrl, setImgUrl] = useState<string | null>(editProduct?.image?.url ?? null)
  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const set = (k: keyof FormData, v: string | boolean) =>
    setForm(prev => {
      const next = { ...prev, [k]: v }
      if (k === 'name' && !editProduct) next.slug = slugify(v as string)
      return next
    })

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = '!'
    if (!form.nameBn.trim()) e.nameBn = '!'
    if (!form.slug.trim()) e.slug = '!'
    setErrors(e); return !Object.keys(e).length
  }

  const save = async () => {
    if (!validate()) return
    setSaving(true)
    try {
      const body: Record<string, unknown> = {
        name: form.name.trim(), nameBn: form.nameBn.trim(), slug: form.slug.trim(),
        category: form.category, status: form.status,
        price: form.price ? Number(form.price) : null,
        comparePrice: form.comparePrice ? Number(form.comparePrice) : null,
        weight: form.weight || null,
        rating: form.rating ? Number(form.rating) : null,
        reviewCount: form.reviewCount ? Number(form.reviewCount) : null,
        shortDescription: form.shortDescription || null,
        featured: form.featured,
        benefits: form.benefits.trim() ? form.benefits.split('\n').filter(Boolean).map(b => ({ benefit: b.trim() })) : [],
      }
      if (imgId) body.image = imgId

      const method = editProduct ? 'PATCH' : 'POST'
      if (editProduct) body.id = editProduct.id
      const res = await fetch('/api/admin/products', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      const data = await res.json()
      if (!res.ok) { alert(data.error ?? 'Failed'); return }
      const saved = data.product as Product
      if (imgUrl) saved.image = { id: imgId ?? undefined, url: imgUrl }
      onSaved(saved)
    } finally { setSaving(false) }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Form header */}
      <div style={{ padding: '10px 12px', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: 8, background: '#fff', flexShrink: 0 }}>
        <button onClick={onBack} style={btn('#f3f4f6', '#374151')}>← Back</button>
        <span style={{ flex: 1, fontSize: 12, fontWeight: 800, color: '#1a2e1a' }}>
          {editProduct ? '✏️ Edit Product' : '➕ New Product'}
        </span>
        <button onClick={save} disabled={saving} style={btn(saving ? '#9ca3af' : '#1B4D3E')}>
          {saving ? '⏳' : '💾'} Save
        </button>
      </div>

      {/* Form body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px' }}>
        {/* Image */}
        <ImageUpload currentUrl={imgUrl} onDone={(id, url) => { setImgId(id); setImgUrl(url) }} />

        <FormField label="Name (EN) *" field="name" errors={errors}>
          <input style={{ ...inp, borderColor: errors.name ? '#ef4444' : '#d1d5db' }} value={form.name} onChange={e => set('name', e.target.value)} />
        </FormField>
        <FormField label="Name (BN) *" field="nameBn" errors={errors}>
          <input style={{ ...inp, borderColor: errors.nameBn ? '#ef4444' : '#d1d5db' }} value={form.nameBn} onChange={e => set('nameBn', e.target.value)} />
        </FormField>
        <FormField label="Slug *" field="slug" errors={errors}>
          <input style={{ ...inp, fontFamily: 'monospace', fontSize: 11, borderColor: errors.slug ? '#ef4444' : '#d1d5db' }} value={form.slug} onChange={e => set('slug', slugify(e.target.value))} />
        </FormField>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 10 }}>
          <div>
            <label style={lbl}>Category</label>
            <select style={inp} value={form.category} onChange={e => set('category', e.target.value)}>
              {CATS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </div>
          <div>
            <label style={lbl}>Status</label>
            <select style={inp} value={form.status} onChange={e => set('status', e.target.value)}>
              {STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 10 }}>
          <FormField label="Price (Tk)">
            <input type="number" style={inp} value={form.price} onChange={e => set('price', e.target.value)} />
          </FormField>
          <FormField label="Compare Price">
            <input type="number" style={inp} value={form.comparePrice} onChange={e => set('comparePrice', e.target.value)} placeholder="Original" />
          </FormField>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 10 }}>
          <FormField label="Weight / Size">
            <input style={inp} value={form.weight} onChange={e => set('weight', e.target.value)} placeholder="e.g. 5 kg" />
          </FormField>
          <FormField label="Rating (0–5)">
            <input type="number" min="0" max="5" step="0.1" style={inp} value={form.rating} onChange={e => set('rating', e.target.value)} />
          </FormField>
        </div>

        <FormField label="Review Count">
          <input type="number" min="0" style={inp} value={form.reviewCount} onChange={e => set('reviewCount', e.target.value)} />
        </FormField>

        <FormField label="Short Description">
          <textarea rows={3} style={{ ...inp, resize: 'vertical' }} value={form.shortDescription} onChange={e => set('shortDescription', e.target.value)} />
        </FormField>

        <FormField label="Benefits (one per line)">
          <textarea rows={3} style={{ ...inp, resize: 'vertical' }} value={form.benefits} onChange={e => set('benefits', e.target.value)} placeholder={"100% organic\nImproves soil"} />
        </FormField>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
          <input type="checkbox" id="pm-featured" checked={form.featured} onChange={e => set('featured', e.target.checked)}
            style={{ width: 14, height: 14, accentColor: '#D4A017', cursor: 'pointer' }} />
          <label htmlFor="pm-featured" style={{ fontSize: 12, color: '#374151', cursor: 'pointer' }}>⭐ Featured / Best Seller</label>
        </div>
      </div>
    </div>
  )
}

// ── Delete confirm ────────────────────────────────────────────────────────────
function DeleteConfirm({ name, onConfirm, onCancel, busy }: { name: string; onConfirm: () => void; onCancel: () => void; busy: boolean }) {
  return (
    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div style={{ background: '#fff', borderRadius: 12, padding: 20, width: '100%', boxShadow: '0 8px 32px rgba(0,0,0,0.2)', textAlign: 'center' }}>
        <div style={{ fontSize: 28, marginBottom: 8 }}>🗑️</div>
        <p style={{ fontSize: 12, fontWeight: 700, color: '#1a2e1a', margin: '0 0 6px' }}>Delete Product?</p>
        <p style={{ fontSize: 11, color: '#dc2626', margin: '0 0 16px' }}>{name}</p>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={onCancel} style={{ ...btn('#f3f4f6', '#374151'), flex: 1, justifyContent: 'center' }}>Cancel</button>
          <button onClick={onConfirm} disabled={busy} style={{ ...btn(busy ? '#9ca3af' : '#dc2626'), flex: 1, justifyContent: 'center' }}>
            {busy ? '⏳' : '🗑️'} Delete
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Main panel ────────────────────────────────────────────────────────────────
export function ProductManagerPanel() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [view, setView] = useState<'list' | 'form'>('list')
  const [editProduct, setEditProduct] = useState<Product | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null)
  const [deleting, setDeleting] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/products')
      const data = await res.json()
      setProducts(data.products ?? [])
    } finally { setLoading(false) }
  }, [])

  useEffect(() => { load() }, [load])

  const handleSaved = (p: Product) => {
    setProducts(prev => {
      const idx = prev.findIndex(x => x.id === p.id)
      if (idx >= 0) { const n = [...prev]; n[idx] = p; return n }
      return [p, ...prev]
    })
    setView('list')
    setEditProduct(null)
  }

  const confirmDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    await fetch(`/api/admin/products?id=${deleteTarget.id}`, { method: 'DELETE' })
    setProducts(prev => prev.filter(p => p.id !== deleteTarget.id))
    setDeleteTarget(null)
    setDeleting(false)
  }

  const displayed = search
    ? products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.nameBn.toLowerCase().includes(search.toLowerCase()))
    : products

  if (view === 'form') {
    return (
      <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <ProductForm
          editProduct={editProduct}
          onBack={() => { setView('list'); setEditProduct(null) }}
          onSaved={handleSaved}
        />
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
      {/* Header */}
      <div style={{ padding: '10px 12px', borderBottom: '1px solid #e5e7eb', background: '#fff', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 800, color: '#1a2e1a' }}>🛒 Product Manager</span>
          <div style={{ display: 'flex', gap: 5 }}>
            <button onClick={load} style={btn('#f3f4f6', '#6b7280')} title="Refresh">🔄</button>
            <button onClick={() => { setEditProduct(null); setView('form') }} style={btn('#1B4D3E')}>
              ➕ Add
            </button>
          </div>
        </div>
        {/* Search */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#f3f4f6', borderRadius: 7, padding: '5px 8px' }}>
          <span style={{ fontSize: 12 }}>🔍</span>
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search products…"
            style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: 11, flex: 1, fontFamily: 'var(--font-hind,sans-serif)' }}
          />
          {search && <button onClick={() => setSearch('')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 11, color: '#9ca3af' }}>✕</button>}
        </div>
        <div style={{ fontSize: 10, color: '#9ca3af', marginTop: 5 }}>{products.length} products total</div>
      </div>

      {/* List */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {loading ? (
          <div style={{ padding: 20, textAlign: 'center', fontSize: 12, color: '#9ca3af' }}>⏳ Loading…</div>
        ) : displayed.length === 0 ? (
          <div style={{ padding: 24, textAlign: 'center' }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>📦</div>
            <p style={{ fontSize: 11, color: '#9ca3af', margin: 0 }}>
              {search ? `No results for "${search}"` : 'No products yet'}
            </p>
            {!search && (
              <button onClick={() => { setEditProduct(null); setView('form') }}
                style={{ ...btn('#1B4D3E'), marginTop: 10, fontSize: 11 }}>
                ➕ Add First Product
              </button>
            )}
          </div>
        ) : (
          displayed.map(p => (
            <ProductRow
              key={p.id}
              p={p}
              onEdit={() => { setEditProduct(p); setView('form') }}
              onDelete={() => setDeleteTarget(p)}
            />
          ))
        )}
      </div>

      {/* Delete overlay */}
      {deleteTarget && (
        <DeleteConfirm
          name={deleteTarget.name}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
          busy={deleting}
        />
      )}
    </div>
  )
}
