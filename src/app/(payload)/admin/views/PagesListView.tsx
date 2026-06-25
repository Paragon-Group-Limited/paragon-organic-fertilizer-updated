'use client'

import { useState, useEffect, useCallback } from 'react'
import { AdminTable, type TableColumn } from '@/components/payload/AdminTable'

type Page = {
  id: string
  title?: string
  slug?: string
  status?: string
  updatedAt?: string
}

const STATUS_META: Record<string, { label: string; bg: string; color: string }> = {
  published: { label: 'Published', bg: '#dcfce7', color: '#166534' },
  draft:     { label: 'Draft',     bg: '#fef9c3', color: '#92400e' },
}

const SLUG_ORDER: Record<string, number> = {
  home: 0, 'about/our-story': 10, 'about/soil-benefit': 11,
  'about/why-this-product': 12, 'about/paragon-group': 13,
  products: 20, location: 30, career: 40, contact: 50,
}

const SLUG_TITLES: Record<string, string> = {
  'home':                   'Home',
  'about/our-story':        'Our Story',
  'about/soil-benefit':     'Soil Benefit',
  'about/why-this-product': 'Why This Product',
  'about/paragon-group':    'Paragon Group',
  'products':               'Products',
  'location':               'Location',
  'career':                 'Career',
  'contact':                'Contact',
}

// ── Main list view ────────────────────────────────────────────────────────────
export default function PagesListView() {
  const [pages, setPages]     = useState<Page[]>([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [search, setSearch]   = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/pages?limit=100&depth=0')
      const data = await res.json()
      const sorted = (data.docs ?? []).sort((a: Page, b: Page) => {
        const oa = SLUG_ORDER[a.slug ?? ''] ?? 99
        const ob = SLUG_ORDER[b.slug ?? ''] ?? 99
        return oa - ob
      })
      setPages(sorted)
    } finally { setLoading(false) }
  }, [])

  useEffect(() => { load() }, [load])

  const handleDelete = async (p: Page) => {
    if (!confirm(`Delete page "${p.title}"?\nThis cannot be undone.`)) return
    setDeletingId(p.id)
    try {
      await fetch(`/api/pages/${p.id}`, { method: 'DELETE' })
      setPages(prev => prev.filter(x => x.id !== p.id))
    } finally { setDeletingId(null) }
  }

  const displayed = search.trim()
    ? pages.filter(p =>
        (p.title ?? '').toLowerCase().includes(search.toLowerCase()) ||
        (p.slug ?? '').toLowerCase().includes(search.toLowerCase())
      )
    : pages

  const columns: TableColumn<Page>[] = [
    {
      key: 'title',
      header: 'Page Title',
      render: (p) => (
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#1a2e1a' }}>
            {(p.slug ?? '').startsWith('about/') && (
              <span style={{ color: '#d1d5db', marginRight: 6, fontFamily: 'monospace' }}>├</span>
            )}
            {SLUG_TITLES[p.slug ?? ''] ?? p.title ?? '—'}
          </div>
        </div>
      ),
    },
    {
      key: 'slug',
      header: 'Slug',
      render: (p) => (
        <code style={{ fontSize: 11, color: '#6b7280', background: '#f3f4f6', padding: '2px 7px', borderRadius: 4 }}>
          {p.slug ?? '—'}
        </code>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (p) => {
        const s = p.status && STATUS_META[p.status] ? p.status : 'draft'
        const m = STATUS_META[s]
        return (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 10px', borderRadius: 999, fontSize: 11, fontWeight: 600, background: m.bg, color: m.color }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: m.color }} />
            {m.label}
          </span>
        )
      },
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (p) => (
        <div style={{ display: 'flex', gap: 6, flexWrap: 'nowrap' }}>
          <a href={`/editor/${p.slug}`} target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '5px 11px', borderRadius: 6, textDecoration: 'none', background: '#1B4D3E', color: 'white', fontSize: 11, fontWeight: 700, whiteSpace: 'nowrap' }}>
            ✏️ Edit This Page
          </a>
          {/* <a href={`/admin/collections/pages/${p.id}`}
            style={{ padding: '5px 10px', borderRadius: 6, border: '1px solid #d1d5db', background: '#fff', fontSize: 11, fontWeight: 600, color: '#374151', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
            ⚙️ Meta
          </a> */}
          <button onClick={() => handleDelete(p)} disabled={deletingId === p.id}
            style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 30, height: 30, borderRadius: 6, background: 'transparent', border: '1px solid #fca5a5', color: '#dc2626', fontSize: 13, cursor: deletingId === p.id ? 'default' : 'pointer' }}>
            {deletingId === p.id ? '⏳' : '🗑️'}
          </button>
        </div>
      ),
    },
  ]

  return (
    <div style={{ padding: '32px 32px 48px', minHeight: '100vh', background: '#f9fafb', fontFamily: 'var(--font-hind, system-ui, sans-serif)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: '#111827' }}>Pages</h1>
          <p style={{ margin: '4px 0 0', fontSize: 13, color: '#6b7280' }}>
            {loading ? '…' : `${pages.length} pages · ${pages.filter(p => p.status === 'published').length} published`}
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={load} style={{ padding: '8px 14px', borderRadius: 8, border: '1px solid #e5e7eb', background: '#fff', fontSize: 12, fontWeight: 600, color: '#374151', cursor: 'pointer' }}>🔄 Refresh</button>
          <a href="/admin/collections/pages/create" style={{ padding: '8px 16px', borderRadius: 8, background: '#1B4D3E', color: '#fff', fontSize: 12, fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            + Create New
          </a>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: '8px 14px', marginBottom: 16, maxWidth: 400 }}>
        <span style={{ fontSize: 14, color: '#9ca3af' }}>🔍</span>
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search by title or slug…"
          style={{ border: 'none', outline: 'none', fontSize: 13, flex: 1, fontFamily: 'inherit', background: 'transparent', color: '#374151' }} />
        {search && <button onClick={() => setSearch('')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, color: '#9ca3af' }}>✕</button>}
      </div>

      <AdminTable
        columns={columns}
        data={displayed}
        loading={loading}
        emptyMessage="No pages found"
        defaultPageSize={20}
      />
    </div>
  )
}
