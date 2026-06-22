'use client'

type MediaDoc = { url?: string; mimeType?: string; filename?: string }

type Props = {
  cellData?: MediaDoc | null
}

export default function DealerLicenseCell({ cellData }: Props) {
  if (!cellData?.url) {
    return <span style={{ color: '#9ca3af', fontSize: 12 }}>—</span>
  }

  const isPDF = cellData.mimeType?.includes('pdf')

  if (isPDF) {
    return (
      <a href={cellData.url} target="_blank" rel="noopener noreferrer"
        style={{ fontSize: 11, padding: '3px 8px', borderRadius: 4, background: '#fef3c7', color: '#92400e', fontWeight: 600, textDecoration: 'none', border: '1px solid #fde68a', whiteSpace: 'nowrap' }}>
        📄 PDF
      </a>
    )
  }

  return (
    <a href={cellData.url} target="_blank" rel="noopener noreferrer"
      style={{ display: 'inline-block' }} onClick={e => e.stopPropagation()}>
      <img
        src={cellData.url}
        alt="Trade License"
        style={{ width: 36, height: 36, objectFit: 'cover', borderRadius: 4, border: '1px solid #e5e7eb', display: 'block' }}
      />
    </a>
  )
}
