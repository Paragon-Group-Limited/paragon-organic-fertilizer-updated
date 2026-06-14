'use client'

import { useState, useEffect, useCallback } from 'react'

type Doc = { id: string | number; title: string; slug: string; status: string }

const SLUG_ORDER: Record<string, number> = {
  home: 0,
  'about/our-story': 10,
  'about/soil-benefit': 11,
  'about/why-this-product': 12,
  'about/paragon-group': 13,
  products: 20,
  location: 30,
  career: 40,
  contact: 50,
}

function sortByNavOrder(a: Doc, b: Doc): number {
  const oa = SLUG_ORDER[a.slug] ?? 99
  const ob = SLUG_ORDER[b.slug] ?? 99
  return oa - ob
}

function StatusBadge({ status }: { status: string }) {
  const ok = status === 'published'
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '2px 9px', borderRadius: 999, fontSize: 11, fontWeight: 600,
      background: ok ? '#dcfce7' : '#fef9c3',
      color: ok ? '#166534' : '#92400e',
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: ok ? '#22c55e' : '#eab308' }} />
      {ok ? 'Published' : 'Draft'}
    </span>
  )
}

function PageRow({ doc, indent, onDelete }: { doc: Doc; indent?: boolean; onDelete: (id: string | number) => void }) {
  const [hover, setHover] = useState(false)
  return (
    <tr
      style={{ borderBottom: '1px solid #f3f4f6', background: hover ? '#fafafa' : 'white', transition: 'background 0.1s' }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <td style={{ padding: '10px 16px', fontWeight: 500, fontSize: 13, color: '#111827' }}>
        {indent && <span style={{ color: '#d1d5db', marginRight: 6, fontFamily: 'monospace' }}>├</span>}
        {doc.title}
      </td>
      <td style={{ padding: '10px 16px' }}>
        <code style={{ fontSize: 11, color: '#6b7280', background: '#f3f4f6', padding: '2px 6px', borderRadius: 4 }}>
          {doc.slug}
        </code>
      </td>
      <td style={{ padding: '10px 16px' }}>
        <StatusBadge status={doc.status} />
      </td>
      <td style={{ padding: '10px 16px' }}>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'nowrap' }}>
          <a
            href={`/editor/${doc.slug}`}
            onClick={e => e.stopPropagation()}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 4,
              padding: '5px 11px', borderRadius: 6, textDecoration: 'none',
              background: '#1B4D3E', color: 'white', fontSize: 11, fontWeight: 700, whiteSpace: 'nowrap',
            }}
          >
            🎨 Edit in Puck
          </a>
          {/* Meta button hidden — uncomment to restore:
          <a href={`/admin/collections/pages/${doc.id}`} style={{...}}>✏️ Meta</a>
          */}
          <button
            onClick={() => onDelete(doc.id)}
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: 30, height: 30, borderRadius: 6,
              background: 'transparent', border: '1px solid #fca5a5', color: '#dc2626',
              fontSize: 13, cursor: 'pointer',
            }}
            title="Delete"
          >
            🗑️
          </button>
        </div>
      </td>
    </tr>
  )
}

export default function PagesListView() {
  const [docs, setDocs] = useState<Doc[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [aboutOpen, setAboutOpen] = useState(true)
  const [aboutHover, setAboutHover] = useState(false)

  useEffect(() => {
    fetch('/api/pages?limit=100&depth=0')
      .then(r => r.json())
      .then(data => { setDocs(data.docs || []); setLoading(false) })
      .catch(err => { setError(String(err)); setLoading(false) })
  }, [])

  const handleDelete = useCallback(async (id: string | number) => {
    if (!confirm('এই পেজটি মুছে ফেলবেন?')) return
    try {
      const res = await fetch(`/api/pages/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setDocs(prev => prev.filter(d => d.id !== id))
      } else {
        alert('Delete failed')
      }
    } catch {
      alert('Delete failed')
    }
  }, [])

  const aboutDocs = docs.filter(d => String(d.slug).startsWith('about/')).sort(sortByNavOrder)
  const otherDocs = docs.filter(d => !String(d.slug).startsWith('about/')).sort(sortByNavOrder)

  const thStyle: React.CSSProperties = {
    padding: '11px 16px', textAlign: 'left',
    fontSize: 11, fontWeight: 700, color: '#6b7280',
    textTransform: 'uppercase', letterSpacing: '0.06em',
    background: '#f9fafb', borderBottom: '2px solid #e5e7eb',
  }

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '28px 20px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: '#111827', margin: 0 }}>Pages</h1>
        <a
          href="/admin/collections/pages/create"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '8px 18px', borderRadius: 7, textDecoration: 'none',
            background: 'var(--theme-elevation-1000, #0ea5e9)', color: 'white',
            fontSize: 13, fontWeight: 700,
          }}
        >
          + Create New
        </a>
      </div>

      {loading && (
        <div style={{ textAlign: 'center', padding: '60px 0', color: '#9ca3af', fontSize: 14 }}>
          Loading pages…
        </div>
      )}

      {error && (
        <div style={{ padding: 16, background: '#fef2f2', color: '#dc2626', borderRadius: 8, fontSize: 13 }}>
          Error: {error}
        </div>
      )}

      {!loading && !error && (
        <div style={{ background: 'white', borderRadius: 10, border: '1px solid #e5e7eb', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={thStyle}>Page Title</th>
                <th style={thStyle}>Slug</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Non-About pages */}
              {otherDocs.map(doc => (
                <PageRow key={doc.id} doc={doc} onDelete={handleDelete} />
              ))}

              {/* About accordion */}
              {aboutDocs.length > 0 && (
                <>
                  <tr
                    onClick={() => setAboutOpen(o => !o)}
                    style={{
                      cursor: 'pointer',
                      background: aboutHover ? '#dcfce7' : '#f0fdf4',
                      borderBottom: aboutOpen ? '1px solid #bbf7d0' : '1px solid #e5e7eb',
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={() => setAboutHover(true)}
                    onMouseLeave={() => setAboutHover(false)}
                  >
                    <td colSpan={4} style={{ padding: '11px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ fontSize: 16 }}>📖</span>
                        <span style={{ fontWeight: 700, fontSize: 13, color: '#166534' }}>About</span>
                        <span style={{
                          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                          width: 20, height: 20, borderRadius: 999,
                          background: '#166534', color: 'white', fontSize: 10, fontWeight: 800,
                        }}>
                          {aboutDocs.length}
                        </span>
                        <span style={{ marginLeft: 'auto', fontSize: 11, color: '#16a34a', fontWeight: 600 }}>
                          {aboutOpen ? '▲ Collapse' : '▼ Expand'}
                        </span>
                      </div>
                    </td>
                  </tr>
                  {aboutOpen && aboutDocs.map(doc => (
                    <PageRow key={doc.id} doc={doc} indent onDelete={handleDelete} />
                  ))}
                </>
              )}
            </tbody>
          </table>
        </div>
      )}

      {!loading && (
        <div style={{ marginTop: 12, fontSize: 12, color: '#9ca3af', textAlign: 'right' }}>
          {docs.length} page{docs.length !== 1 ? 's' : ''} total
        </div>
      )}
    </div>
  )
}
