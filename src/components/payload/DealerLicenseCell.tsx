'use client'

type MediaDoc = { id?: string | number; url?: string; mimeType?: string; filename?: string }

type Props = {
  cellData?: MediaDoc | string | number | null
  rowData?: Record<string, unknown>
}

export default function DealerLicenseCell({ cellData }: Props) {
  if (!cellData) return <span style={{ color: '#999' }}>—</span>

  // Populated relation object
  if (typeof cellData === 'object' && cellData.url) {
    const isPdf = cellData.mimeType?.includes('pdf') || cellData.filename?.endsWith('.pdf')
    return (
      <a
        href={cellData.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={e => e.stopPropagation()}
        style={{ color: '#0070f3', textDecoration: 'underline', fontSize: 12 }}
      >
        {isPdf ? 'PDF' : 'View'}
      </a>
    )
  }

  // Raw ID (not populated) — just show a badge
  const id = typeof cellData === 'object' ? cellData.id : cellData
  return <span style={{ fontSize: 12, color: '#666' }}>#{id}</span>
}
