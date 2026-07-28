'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save, ExternalLink, CheckCircle, AlertCircle, Plus, Trash2 } from 'lucide-react'

type Product = {
  id: string
  name: string
  nameBn: string
  slug: string
  price?: number | null
  comparePrice?: number | null
  weight?: string | null
  status?: string | null
  featured?: boolean
  showDeliveryNote?: boolean
  deliveryNote?: string | null
  shortDescription?: string | null
  rating?: number | null
  reviewCount?: number | null
  category?: string | null
  benefits?: Array<{ benefit: string }>
}

type FormState = {
  name: string
  nameBn: string
  price: string
  comparePrice: string
  weight: string
  status: string
  featured: boolean
  showDeliveryNote: boolean
  deliveryNote: string
  shortDescription: string
  rating: string
  reviewCount: string
  category: string
  benefits: string[]
}

const CATEGORIES = [
  { value: '', label: '— None —' },
  { value: 'organic-fertilizer', label: 'Organic Fertilizer' },
  { value: 'vermicompost', label: 'Vermicompost' },
  { value: 'organic-pesticide', label: 'Organic Pesticide' },
  { value: 'soil-improver', label: 'Soil Improver' },
]

const STATUSES = [
  { value: 'published', label: 'Published' },
  { value: 'upcoming', label: 'Upcoming (Coming Soon)' },
  { value: 'draft', label: 'Draft' },
]

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '8px 12px', border: '1.5px solid #d1d5db',
  borderRadius: 8, fontSize: 14, fontFamily: 'inherit', outline: 'none',
  background: '#fff', boxSizing: 'border-box', transition: 'border-color 0.2s',
}

const labelStyle: React.CSSProperties = {
  fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 5, display: 'block',
  textTransform: 'uppercase', letterSpacing: '0.04em',
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <label style={labelStyle}>{label}</label>
      {children}
    </div>
  )
}

export function ProductEditorPage({ productSlug }: { productSlug: string }) {
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState<'idle' | 'saved' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [form, setForm] = useState<FormState>({
    name: '', nameBn: '', price: '', comparePrice: '', weight: '',
    status: 'published', featured: false, showDeliveryNote: true,
    deliveryNote: 'Free delivery on orders above Tk 500. Cash on Delivery available.',
    shortDescription: '', rating: '', reviewCount: '', category: '', benefits: [],
  })

  useEffect(() => {
    fetch('/api/admin/products')
      .then(r => r.json())
      .then(d => {
        const p: Product | undefined = d.products?.find((x: Product) => x.slug === productSlug)
        if (p) {
          setProduct(p)
          setForm({
            name: p.name || '',
            nameBn: p.nameBn || '',
            price: p.price != null ? String(p.price) : '',
            comparePrice: p.comparePrice != null ? String(p.comparePrice) : '',
            weight: p.weight || '',
            status: p.status || 'published',
            featured: !!p.featured,
            showDeliveryNote: p.showDeliveryNote !== false,
            deliveryNote: p.deliveryNote || 'Free delivery on orders above Tk 500. Cash on Delivery available.',
            shortDescription: p.shortDescription || '',
            rating: p.rating != null ? String(p.rating) : '',
            reviewCount: p.reviewCount != null ? String(p.reviewCount) : '',
            category: p.category || '',
            benefits: p.benefits?.map(b => b.benefit) || [],
          })
        }
      })
      .finally(() => setLoading(false))
  }, [productSlug])

  const set = <K extends keyof FormState>(key: K, val: FormState[K]) =>
    setForm(f => ({ ...f, [key]: val }))

  const handleSave = async () => {
    if (!product) return
    setSaving(true)
    setStatus('idle')
    try {
      const payload = {
        id: product.id,
        name: form.name,
        nameBn: form.nameBn,
        price: form.price ? Number(form.price) : null,
        comparePrice: form.comparePrice ? Number(form.comparePrice) : null,
        weight: form.weight || null,
        status: form.status,
        featured: form.featured,
        showDeliveryNote: form.showDeliveryNote,
        deliveryNote: form.deliveryNote,
        shortDescription: form.shortDescription || null,
        rating: form.rating ? Number(form.rating) : null,
        reviewCount: form.reviewCount ? Number(form.reviewCount) : null,
        category: form.category || null,
        benefits: form.benefits.filter(b => b.trim()).map(b => ({ benefit: b })),
      }
      const res = await fetch('/api/admin/products', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Save failed')
      setStatus('saved')
      setTimeout(() => setStatus('idle'), 3000)
    } catch (e) {
      setErrorMsg(e instanceof Error ? e.message : 'Save failed')
      setStatus('error')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f4f7f4' }}>
        <div style={{ fontFamily: 'sans-serif', color: '#6b7280' }}>Loading product…</div>
      </div>
    )
  }

  if (!product) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f4f7f4', gap: 16 }}>
        <div style={{ fontSize: 48 }}>📦</div>
        <p style={{ fontFamily: 'sans-serif', color: '#6b7280' }}>Product not found: <strong>{productSlug}</strong></p>
        <button onClick={() => router.push('/editor/products')}
          style={{ padding: '8px 20px', background: '#1B4D3E', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontFamily: 'inherit' }}>
          ← Back to Products
        </button>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f4f7f4', fontFamily: 'var(--font-hind, sans-serif)', paddingTop: 80 }}>
      {/* Sticky header */}
      <div style={{
        position: 'sticky', top: 80, zIndex: 40,
        background: '#fff', borderBottom: '1px solid #e5e7eb',
        padding: '12px 24px', display: 'flex', alignItems: 'center', gap: 16,
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      }}>
        <button onClick={() => router.push('/editor/products')}
          style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', border: '1.5px solid #d1d5db', borderRadius: 8, background: 'transparent', cursor: 'pointer', fontSize: 13, color: '#374151', fontFamily: 'inherit' }}>
          <ArrowLeft size={14} /> Products
        </button>

        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#1a2e1a' }}>{form.nameBn || form.name || productSlug}</div>
          <div style={{ fontSize: 11, color: '#9ca3af' }}>/{productSlug}</div>
        </div>

        <a href={`/shop/${productSlug}`} target="_blank" rel="noopener noreferrer"
          style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '6px 14px', border: '1.5px solid #d1d5db', borderRadius: 8, color: '#374151', textDecoration: 'none', fontSize: 13, fontFamily: 'inherit' }}>
          <ExternalLink size={13} /> Preview
        </a>

        <button onClick={handleSave} disabled={saving}
          style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 20px', background: saving ? '#9ca3af' : '#1B4D3E', color: '#fff', border: 'none', borderRadius: 8, cursor: saving ? 'not-allowed' : 'pointer', fontSize: 13, fontWeight: 700, fontFamily: 'inherit' }}>
          <Save size={14} /> {saving ? 'Saving…' : 'Save Changes'}
        </button>
      </div>

      {/* Status banner */}
      {status === 'saved' && (
        <div style={{ background: '#dcfce7', borderBottom: '1px solid #bbf7d0', padding: '10px 24px', display: 'flex', alignItems: 'center', gap: 8, color: '#166534', fontSize: 13 }}>
          <CheckCircle size={15} /> Changes saved successfully!
        </div>
      )}
      {status === 'error' && (
        <div style={{ background: '#fee2e2', borderBottom: '1px solid #fecaca', padding: '10px 24px', display: 'flex', alignItems: 'center', gap: 8, color: '#991b1b', fontSize: 13 }}>
          <AlertCircle size={15} /> {errorMsg}
        </div>
      )}

      {/* Form body */}
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '32px 24px' }}>

        {/* Basic Info */}
        <Section title="Basic Information">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <Field label="Product Name (English)">
              <input style={inputStyle} value={form.name} onChange={e => set('name', e.target.value)} />
            </Field>
            <Field label="Product Name (বাংলা)">
              <input style={inputStyle} value={form.nameBn} onChange={e => set('nameBn', e.target.value)} />
            </Field>
          </div>

          <Field label="Short Description">
            <textarea style={{ ...inputStyle, resize: 'vertical', minHeight: 80 }}
              value={form.shortDescription} onChange={e => set('shortDescription', e.target.value)} />
          </Field>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <Field label="Category">
              <select style={{ ...inputStyle, cursor: 'pointer' }} value={form.category} onChange={e => set('category', e.target.value)}>
                {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </Field>
            <Field label="Status">
              <select style={{ ...inputStyle, cursor: 'pointer' }} value={form.status} onChange={e => set('status', e.target.value)}>
                {STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </Field>
          </div>

          <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontSize: 14, color: '#374151' }}>
            <input type="checkbox" checked={form.featured} onChange={e => set('featured', e.target.checked)}
              style={{ width: 16, height: 16, cursor: 'pointer', accentColor: '#1B4D3E' }} />
            <span>⭐ Featured Product (shows Best Seller badge)</span>
          </label>
        </Section>

        {/* Pricing */}
        <Section title="Pricing & Details">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
            <Field label="Price (Tk)">
              <input type="number" style={inputStyle} value={form.price} onChange={e => set('price', e.target.value)} min={0} />
            </Field>
            <Field label="Compare-at Price (Tk)">
              <input type="number" style={inputStyle} value={form.comparePrice} onChange={e => set('comparePrice', e.target.value)} min={0} />
            </Field>
            <Field label="Weight / Size">
              <input style={inputStyle} value={form.weight} onChange={e => set('weight', e.target.value)} placeholder="e.g. 1 kg, 5 kg" />
            </Field>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <Field label="Rating (0–5)">
              <input type="number" style={inputStyle} value={form.rating} onChange={e => set('rating', e.target.value)} min={0} max={5} step={0.1} />
            </Field>
            <Field label="Review Count">
              <input type="number" style={inputStyle} value={form.reviewCount} onChange={e => set('reviewCount', e.target.value)} min={0} />
            </Field>
          </div>
        </Section>

        {/* Delivery Note */}
        <Section title="Delivery & Shipping">
          <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontSize: 14, color: '#374151', marginBottom: 16 }}>
            <input type="checkbox" checked={form.showDeliveryNote} onChange={e => set('showDeliveryNote', e.target.checked)}
              style={{ width: 16, height: 16, cursor: 'pointer', accentColor: '#1B4D3E' }} />
            <span>Show delivery note on product page</span>
          </label>

          {form.showDeliveryNote && (
            <Field label="Delivery Note Text">
              <input style={inputStyle} value={form.deliveryNote} onChange={e => set('deliveryNote', e.target.value)}
                placeholder="Free delivery on orders above Tk 500. Cash on Delivery available." />
            </Field>
          )}
        </Section>

        {/* Benefits */}
        <Section title="Benefits">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {form.benefits.map((b, i) => (
              <div key={i} style={{ display: 'flex', gap: 8 }}>
                <input style={{ ...inputStyle, flex: 1 }} value={b}
                  onChange={e => set('benefits', form.benefits.map((x, j) => j === i ? e.target.value : x))}
                  placeholder={`Benefit ${i + 1}`} />
                <button onClick={() => set('benefits', form.benefits.filter((_, j) => j !== i))}
                  style={{ padding: '8px 10px', border: '1.5px solid #fecaca', borderRadius: 8, background: '#fee2e2', color: '#991b1b', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                  <Trash2 size={13} />
                </button>
              </div>
            ))}
            <button onClick={() => set('benefits', [...form.benefits, ''])}
              style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', border: '1.5px dashed #1B4D3E', borderRadius: 8, background: 'transparent', color: '#1B4D3E', cursor: 'pointer', fontSize: 13, fontWeight: 600, fontFamily: 'inherit', alignSelf: 'flex-start' }}>
              <Plus size={13} /> Add Benefit
            </button>
          </div>
        </Section>

        {/* Advanced link */}
        <div style={{ marginTop: 8, padding: '14px 18px', background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 10, fontSize: 13, color: '#92400e' }}>
          <strong>For images, rich text description, and usage instructions</strong> — edit in{' '}
          <a href={`/admin/collections/products/${product.id}`} target="_blank" rel="noopener noreferrer"
            style={{ color: '#1B4D3E', fontWeight: 700, textDecoration: 'underline' }}>
            Payload Admin ↗
          </a>
        </div>

        {/* Bottom save */}
        <div style={{ marginTop: 32, display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={handleSave} disabled={saving}
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 32px', background: saving ? '#9ca3af' : '#1B4D3E', color: '#fff', border: 'none', borderRadius: 10, cursor: saving ? 'not-allowed' : 'pointer', fontSize: 15, fontWeight: 700, fontFamily: 'inherit' }}>
            <Save size={16} /> {saving ? 'Saving…' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: '#fff', borderRadius: 12, padding: '24px', marginBottom: 20, boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
      <h2 style={{ margin: '0 0 20px', fontSize: 15, fontWeight: 700, color: '#1B4D3E', borderBottom: '1px solid #e5e7eb', paddingBottom: 12, fontFamily: 'var(--font-hind, sans-serif)' }}>
        {title}
      </h2>
      {children}
    </div>
  )
}
