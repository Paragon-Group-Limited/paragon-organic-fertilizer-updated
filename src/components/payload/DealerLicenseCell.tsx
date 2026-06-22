'use client'

type MediaDoc = { id?: string | number; url?: string; mimeType?: string; filename?: string }

type Props = {
  cellData?: MediaDoc | string | number | null
  rowData?: Record<string, unknown>
}

export default function DealerLicenseCell({ cellData, rowData }: Props) {
  // Payload v3 may send cellData as a populated object (depth>=1) or just an ID (depth=0)
  let media: MediaDoc | null = null

  if (cellData && typeof cellData === 'object') {
    media = cellData as MediaDoc
  } else if (rowData?.tradeLicense && typeof rowData.tradeLicense === 'object') {
    media = rowData.tradeLicense as MediaDoc
  }

  if (!media?.url) {
    // If we have a raw ID but no URL, link to the media admin page
    const rawId = typeof cellData === 'string' || typeof cellData === 'number' ? cellData : null
    if (rawId) {
      return (
        <a
          href={`/admin/collections/media/${rawId}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: 11, padding: '3px 8px', borderRadius: 4, background: '#e0f2fe', color: '#0369a1', fontWeight: 600, textDecoration: 'none', border: '1px solid #bae6fd', whiteSpace: 'nowrap' }}
        >
          📄 View
        </a>
      )
    }
    return <span style={{ color: '#9ca3af', fontSize: 12 }}>—</span>
  }

  const isPDF = media.mimeType?.includes('pdf')

  if (isPDF) {
    return (
      <a
        href={media.url}
        target="_blank"
        rel="noopener noreferrer"
        style={{ fontSize: 11, padding: '3px 8px', borderRadius: 4, background: '#fef3c7', color: '#92400e', fontWeight: 600, textDecoration: 'none', border: '1px solid #fde68a', whiteSpace: 'nowrap' }}
      >
        📄 PDF
      </a>
    )
  }

  return (
    <a
      href={media.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ display: 'inline-block' }}
      onClick={e => e.stopPropagation()}
    >
      <img
        src={media.url}
        alt="Trade License"
        style={{ width: 36, height: 36, objectFit: 'cover', borderRadius: 4, border: '1px solid #e5e7eb', display: 'block' }}
      />
    </a>
  )
}
