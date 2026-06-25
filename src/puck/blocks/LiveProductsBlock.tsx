'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

type Product = {
  id: string
  name: string
  nameBn: string
  slug: string
  price?: number | null
  comparePrice?: number | null
  weight?: string | null
  status?: string | null
  category?: string | null
  rating?: number | null
  reviewCount?: number | null
  image?: { url?: string | null } | null
}

export function LiveProductsBlock() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { lang } = useLanguage()

  useEffect(() => {
    fetch('/api/admin/products')
      .then(r => r.json())
      .then(d => setProducts(d.products ?? []))
      .finally(() => setLoading(false))
  }, [])

  const getName = (p: Product) => lang === 'en' ? p.name : (p.nameBn || p.name)

  const statusColor: Record<string, string> = {
    published: '#16a34a',
    upcoming: '#d97706',
    draft: '#9ca3af',
  }

  return (
    <div style={{ padding: '32px 24px', background: '#f4f7f4', minHeight: 400 }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(27,77,62,0.08)', borderRadius: 20, padding: '4px 14px', marginBottom: 10 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#1B4D3E', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            {lang === 'en' ? 'Live Product Data' : 'লাইভ পণ্য ডেটা'}
          </span>
        </div>
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: '#1a2e1a', fontFamily: 'var(--font-hind,sans-serif)' }}>
          {lang === 'en' ? 'All Products' : 'সকল পণ্য'}
        </h2>
        <p style={{ margin: '6px 0 0', fontSize: 13, color: '#6b7280' }}>
          {loading ? '...' : `${products.length} ${lang === 'en' ? 'products' : 'টি পণ্য'}`}
        </p>
      </div>

      {loading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{ borderRadius: 14, background: '#e5e7eb', height: 240, animation: 'pulse 1.5s infinite' }} />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '48px 0', color: '#9ca3af' }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>📦</div>
          <p style={{ fontSize: 14, fontWeight: 600, margin: 0 }}>
            {lang === 'en' ? 'No products yet. Use the right panel to add some.' : 'এখনো পণ্য নেই। ডান প্যানেল থেকে পণ্য যোগ করুন।'}
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
          {products.map(p => (
            <div key={p.id} style={{ borderRadius: 14, background: '#fff', boxShadow: '0 2px 12px rgba(0,0,0,0.07)', overflow: 'hidden', border: '1px solid #f0f0f0' }}>
              {/* Image */}
              <div style={{ height: 130, background: p.image?.url ? '#f9fafb' : 'linear-gradient(135deg,#e8f5e9,#c8e6c9)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {p.image?.url ? (
                  <img src={p.image.url} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <span style={{ fontSize: 36, opacity: 0.4 }}>📦</span>
                )}
                <span style={{ position: 'absolute', top: 8, right: 8, padding: '2px 7px', borderRadius: 20, fontSize: 9, fontWeight: 700, background: 'rgba(255,255,255,0.9)', color: statusColor[p.status ?? 'draft'] ?? '#9ca3af' }}>
                  {p.status?.toUpperCase()}
                </span>
              </div>
              {/* Info */}
              <div style={{ padding: '10px 12px' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#1a2e1a', marginBottom: 2, lineHeight: 1.3, fontFamily: 'var(--font-hind,sans-serif)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {getName(p)}
                </div>
                {p.weight && <div style={{ fontSize: 10, color: '#9ca3af', marginBottom: 4 }}>{p.weight}</div>}
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                  {p.price != null && <span style={{ fontSize: 14, fontWeight: 800, color: '#1B4D3E' }}>Tk {p.price.toLocaleString()}</span>}
                  {p.comparePrice != null && p.comparePrice > (p.price ?? 0) && (
                    <span style={{ fontSize: 11, textDecoration: 'line-through', color: '#9ca3af' }}>Tk {p.comparePrice}</span>
                  )}
                </div>
                {p.rating != null && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginTop: 4 }}>
                    <span style={{ fontSize: 10, color: '#F59E0B' }}>★ {p.rating}</span>
                    {p.reviewCount != null && <span style={{ fontSize: 10, color: '#9ca3af' }}>({p.reviewCount})</span>}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <p style={{ textAlign: 'center', fontSize: 11, color: '#9ca3af', marginTop: 20 }}>
        {lang === 'en'
          ? '✏️ Use the right panel to add, edit, or delete products'
          : '✏️ ডান প্যানেল থেকে পণ্য যোগ, সম্পাদনা বা মুছুন'}
      </p>
    </div>
  )
}
