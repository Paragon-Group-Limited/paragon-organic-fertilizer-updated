'use client'

import { useRef, useState } from 'react'

type Props = {
  value: string
  onChange: (url: string) => void
}

export function ImageUploader({ value, onChange }: Props) {
  const [file, setFile]       = useState<File | null>(null)
  const [preview, setPreview] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFilePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = e.target.files?.[0]
    if (!picked) return
    setFile(picked)
    setPreview(URL.createObjectURL(picked))
    setError('')
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const dropped = e.dataTransfer.files?.[0]
    if (!dropped || !dropped.type.startsWith('image/')) return
    setFile(dropped)
    setPreview(URL.createObjectURL(dropped))
    setError('')
  }

  const handleUpload = async () => {
    if (!file) return
    setLoading(true)
    setError('')
    try {
      const form = new FormData()
      form.append('image', file)
      const res  = await fetch('/api/upload-image', { method: 'POST', body: form })
      const data = await res.json()
      if (!res.ok || !data.url) throw new Error(data.error || 'Upload failed')
      onChange(data.url)
      setFile(null)
      setPreview('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setLoading(false)
    }
  }

  const handleClear = () => {
    onChange('')
    setFile(null)
    setPreview('')
    setError('')
    if (inputRef.current) inputRef.current.value = ''
  }

  // Already has an uploaded URL
  if (value && !file) {
    return (
      <div style={{ border: '1px solid #d1d5db', borderRadius: 8, overflow: 'hidden', background: 'white' }}>
        <div style={{ position: 'relative', aspectRatio: '16/7', background: '#f3f4f6' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt="Uploaded"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>
        <div style={{ padding: '8px 10px', display: 'flex', gap: 8, alignItems: 'center', borderTop: '1px solid #e5e7eb' }}>
          <span style={{ flex: 1, fontSize: 10, color: '#6b7280', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {value}
          </span>
          <button
            type="button"
            onClick={handleClear}
            style={{ flexShrink: 0, padding: '3px 10px', borderRadius: 4, fontSize: 11, fontWeight: 600, cursor: 'pointer', border: '1px solid #fca5a5', background: '#fef2f2', color: '#dc2626' }}
          >
            ✕ Delete
          </button>
          <button
            type="button"
            onClick={() => { setFile(null); setPreview('') ; inputRef.current?.click() }}
            style={{ flexShrink: 0, padding: '3px 10px', borderRadius: 4, fontSize: 11, fontWeight: 600, cursor: 'pointer', border: '1px solid #d1d5db', background: 'white', color: '#374151' }}
          >
            ↩ Replace
          </button>
          <input ref={inputRef} type="file" accept="image/*" onChange={handleFilePick} style={{ display: 'none' }} />
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Drop zone */}
      <div
        onDrop={handleDrop}
        onDragOver={e => e.preventDefault()}
        onClick={() => !file && inputRef.current?.click()}
        style={{
          border: `2px dashed ${file ? '#1B4D3E' : '#d1d5db'}`,
          borderRadius: 8,
          background: file ? '#f0fdf4' : '#fafafa',
          cursor: file ? 'default' : 'pointer',
          overflow: 'hidden',
          transition: 'border-color .15s, background .15s',
        }}
      >
        {preview ? (
          <div style={{ position: 'relative' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="Preview" style={{ width: '100%', maxHeight: 160, objectFit: 'cover', display: 'block' }} />
            <div style={{
              position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}>
              <span style={{ color: 'white', fontSize: 12, fontWeight: 600 }}>
                {file!.name} ({(file!.size / 1024).toFixed(0)} KB)
              </span>
            </div>
          </div>
        ) : (
          <div style={{ padding: '28px 16px', textAlign: 'center' }}>
            <div style={{ fontSize: 28, marginBottom: 6 }}>🖼️</div>
            <p style={{ fontSize: 12, color: '#6b7280', margin: 0, fontWeight: 600 }}>
              ছবি drag করুন বা click করে select করুন
            </p>
            <p style={{ fontSize: 10, color: '#9ca3af', margin: '4px 0 0' }}>JPG, PNG, WEBP, SVG</p>
          </div>
        )}
      </div>
      <input ref={inputRef} type="file" accept="image/*" onChange={handleFilePick} style={{ display: 'none' }} />

      {/* Action row */}
      {file && (
        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
          <button
            type="button"
            onClick={handleUpload}
            disabled={loading}
            style={{
              flex: 1, padding: '8px 0', borderRadius: 6, fontSize: 13, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
              border: 'none', background: loading ? '#9ca3af' : 'linear-gradient(135deg,#1B4D3E,#2D7A3A)', color: 'white',
            }}
          >
            {loading ? '⏳ Uploading...' : '☁️ Cloudinary-তে Upload করুন'}
          </button>
          <button
            type="button"
            onClick={() => { setFile(null); setPreview('') }}
            disabled={loading}
            style={{ padding: '8px 14px', borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer', border: '1px solid #d1d5db', background: 'white', color: '#6b7280' }}
          >
            বাতিল
          </button>
        </div>
      )}

      {error && (
        <p style={{ fontSize: 11, color: '#dc2626', marginTop: 6, background: '#fef2f2', padding: '4px 8px', borderRadius: 4 }}>
          ❌ {error}
        </p>
      )}
    </div>
  )
}
