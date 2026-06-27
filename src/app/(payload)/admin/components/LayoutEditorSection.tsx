'use client'

const CARD_STYLE: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '16px 20px',
  borderRadius: 10,
  border: '1px solid #e5e7eb',
  background: '#fff',
  marginBottom: 10,
}

const TITLE_STYLE: React.CSSProperties = {
  fontSize: 14,
  fontWeight: 700,
  color: '#111827',
  margin: 0,
}

const SUB_STYLE: React.CSSProperties = {
  fontSize: 12,
  color: '#6b7280',
  margin: '2px 0 0',
}

const BTN_STYLE: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  padding: '7px 14px',
  borderRadius: 7,
  background: '#1B4D3E',
  color: '#fff',
  fontSize: 12,
  fontWeight: 700,
  textDecoration: 'none',
  whiteSpace: 'nowrap',
}

export default function LayoutEditorSection() {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ marginBottom: 12 }}>
        <p style={{ margin: '0 0 4px', fontSize: 13, fontWeight: 700, color: '#374151' }}>
          Site Layout Editor
        </p>
        <p style={{ margin: 0, fontSize: 12, color: '#9ca3af' }}>
          Navbar ও Footer এর বিস্তারিত তথ্য Puck editor থেকে সরাসরি edit করুন।
        </p>
      </div>

      {/* Navbar card */}
      <div style={CARD_STYLE}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 24 }}>🔝</span>
          <div>
            <p style={TITLE_STYLE}>Navbar</p>
            <p style={SUB_STYLE}>Navigation links, logo, CTA button</p>
          </div>
        </div>
        <a href="/editor/navbar" target="_blank" rel="noopener noreferrer" style={BTN_STYLE}>
          ✏️ Edit
        </a>
      </div>

      {/* Footer card */}
      <div style={{ ...CARD_STYLE, marginBottom: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 24 }}>🔻</span>
          <div>
            <p style={TITLE_STYLE}>Footer</p>
            <p style={SUB_STYLE}>Contact info, quick links, product links, description</p>
          </div>
        </div>
        <a href="/editor/footer" target="_blank" rel="noopener noreferrer" style={BTN_STYLE}>
          ✏️ Edit
        </a>
      </div>

      <hr style={{ margin: '24px 0 0', border: 'none', borderTop: '1px solid #f3f4f6' }} />
    </div>
  )
}
