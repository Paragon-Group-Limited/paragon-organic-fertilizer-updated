'use client'

import { useState, useEffect } from 'react'

type MediaDoc = { id?: string | number; url?: string; mimeType?: string; filename?: string }

type Props = {
  cellData?: MediaDoc | string | number | null
  rowData?: Record<string, unknown>
}

function LicenseActions({ url, filename }: { url: string; filename?: string }) {
  const [downloading, setDownloading] = useState(false)

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    setDownloading(true)
    try {
      const res = await fetch(url)
      const blob = await res.blob()
      const objUrl = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = objUrl
      a.download = filename || 'trade-license'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(objUrl)
    } catch {
      window.open(url, '_blank')
    } finally { setDownloading(false) }
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }} onClick={e => e.stopPropagation()}>
      {/* View */}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={e => e.stopPropagation()}
        title="View trade license"
        style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: 30, height: 30, borderRadius: 7,
          border: '1px solid #d1d5db', background: '#f0fdf4',
          color: '#1B4D3E', textDecoration: 'none', fontSize: 15,
          cursor: 'pointer', flexShrink: 0,
        }}
      >
        👁
      </a>

      {/* Download */}
      <button
        onClick={handleDownload}
        disabled={downloading}
        title="Download trade license"
        style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: 30, height: 30, borderRadius: 7,
          border: '1px solid #d1d5db', background: '#eff6ff',
          color: '#1d4ed8', fontSize: 15,
          cursor: downloading ? 'default' : 'pointer', flexShrink: 0,
          fontFamily: 'inherit',
        }}
      >
        {downloading ? '⏳' : '⬇️'}
      </button>
    </div>
  )
}

function FetchedLicenseCell({ id }: { id: string | number }) {
  const [media, setMedia] = useState<MediaDoc | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/media/${id}`)
      .then(r => r.json())
      .then(data => setMedia(data))
      .catch(() => setMedia(null))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <span style={{ fontSize: 11, color: '#9ca3af' }}>…</span>
  if (!media?.url) return <span style={{ fontSize: 12, color: '#999' }}>#{id}</span>
  return <LicenseActions url={media.url} filename={media.filename} />
}

export default function DealerLicenseCell({ cellData }: Props) {
  if (!cellData) return <span style={{ color: '#9ca3af' }}>—</span>

  // Populated relation object with URL
  if (typeof cellData === 'object' && 'url' in cellData && cellData.url) {
    return <LicenseActions url={cellData.url} filename={cellData.filename} />
  }

  // Raw ID (relation not populated) — fetch from API
  const id = typeof cellData === 'object' && 'id' in cellData ? cellData.id : cellData
  if (id == null) return <span style={{ color: '#9ca3af' }}>—</span>
  return <FetchedLicenseCell id={id as string | number} />
}
