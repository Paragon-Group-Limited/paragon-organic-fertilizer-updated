'use client'

import { useAuth } from '@payloadcms/ui'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export default function UserAvatarDropdown() {
  const { user, logOut } = useAuth()
  const [open, setOpen] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleLogout = async () => {
    setLoggingOut(true)
    try {
      await logOut()
    } catch {
      await fetch('/api/users/logout', { method: 'POST', credentials: 'include' })
    }
    router.push('/admin')
    router.refresh()
  }

  const anyUser = user as any
  const name: string = anyUser?.name || anyUser?.email || 'User'
  const email: string = anyUser?.email || ''
  const photoUrl: string | undefined = anyUser?.photo?.url

  const initial = name.charAt(0).toUpperCase()

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
      {/* Avatar button */}
      <button
        onClick={e => { e.preventDefault(); e.stopPropagation(); setOpen(o => !o) }}
        title={name}
        style={{
          width: 34, height: 34, borderRadius: '50%',
          background: photoUrl ? 'transparent' : '#16a34a',
          color: 'white', border: '2px solid rgba(255,255,255,0.3)',
          cursor: 'pointer', overflow: 'hidden',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 14, fontWeight: 700, padding: 0,
          boxShadow: open ? '0 0 0 3px rgba(22,163,74,0.35)' : 'none',
          transition: 'box-shadow 0.15s',
        }}
      >
        {photoUrl ? (
          <img
            src={photoUrl}
            alt={name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : initial}
      </button>

      {/* Dropdown */}
      {open && (
        <div
          style={{
            position: 'absolute', top: 'calc(100% + 10px)', right: 0,
            background: 'white', border: '1px solid #e5e7eb', borderRadius: 12,
            boxShadow: '0 12px 32px rgba(0,0,0,0.14)', minWidth: 220, zIndex: 9999,
            overflow: 'hidden',
          }}
        >
          {/* User header */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '14px 16px', borderBottom: '1px solid #f3f4f6',
            background: '#f9fafb',
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: '50%',
              background: photoUrl ? 'transparent' : '#16a34a',
              color: 'white', fontSize: 17, fontWeight: 800,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              overflow: 'hidden', flexShrink: 0,
              border: '2px solid #e5e7eb',
            }}>
              {photoUrl ? (
                <img src={photoUrl} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : initial}
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: 13, color: '#111827', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {name}
              </div>
              <div style={{ fontSize: 11, color: '#6b7280', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {email}
              </div>
            </div>
          </div>

          {/* Profile link */}
          <MenuItem
            href="/admin/account"
            icon="👤"
            label="Profile"
            onClick={() => setOpen(false)}
          />

          {/* Logout */}
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            style={{
              display: 'flex', alignItems: 'center', gap: 10, width: '100%',
              padding: '10px 16px', background: 'transparent', border: 'none',
              borderTop: '1px solid #f3f4f6',
              color: '#dc2626', fontSize: 13, fontWeight: 500,
              cursor: loggingOut ? 'default' : 'pointer', textAlign: 'left',
            }}
            onMouseEnter={e => { if (!loggingOut) e.currentTarget.style.background = '#fef2f2' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
          >
            <span style={{ fontSize: 16 }}>{loggingOut ? '⏳' : '🚪'}</span>
            {loggingOut ? 'Logging out…' : 'Logout'}
          </button>
        </div>
      )}
    </div>
  )
}

function MenuItem({ href, icon, label, onClick }: { href: string; icon: string; label: string; onClick?: () => void }) {
  const router = useRouter()
  return (
    <button
      onClick={() => { onClick?.(); router.push(href) }}
      style={{
        display: 'flex', alignItems: 'center', gap: 10, width: '100%',
        padding: '10px 16px', background: 'transparent', border: 'none',
        color: '#374151', fontSize: 13, fontWeight: 500,
        cursor: 'pointer', textAlign: 'left',
      }}
      onMouseEnter={e => { e.currentTarget.style.background = '#f9fafb' }}
      onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
    >
      <span style={{ fontSize: 16 }}>{icon}</span>
      {label}
    </button>
  )
}
