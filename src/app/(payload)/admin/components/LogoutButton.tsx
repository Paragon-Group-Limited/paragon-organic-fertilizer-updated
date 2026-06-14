'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LogoutButton() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleLogout = async () => {
    setLoading(true)
    try {
      await fetch('/api/users/logout', { method: 'POST', credentials: 'include' })
    } catch {
      // ignore
    }
    router.push('/admin')
    router.refresh()
  }

  return (
    <div style={{ padding: '12px 16px', borderTop: '1px solid var(--theme-elevation-100, #e5e7eb)', marginTop: 8 }}>
      <button
        onClick={handleLogout}
        disabled={loading}
        style={{
          display: 'flex', alignItems: 'center', gap: 10,
          width: '100%', padding: '9px 14px',
          background: loading ? 'rgba(220,38,38,0.08)' : 'transparent',
          border: '1px solid rgba(220,38,38,0.25)',
          borderRadius: 7, cursor: loading ? 'default' : 'pointer',
          color: '#dc2626', fontSize: 13, fontWeight: 600,
          transition: 'all 0.15s',
        }}
        onMouseEnter={e => { if (!loading) e.currentTarget.style.background = 'rgba(220,38,38,0.08)' }}
        onMouseLeave={e => { if (!loading) e.currentTarget.style.background = 'transparent' }}
      >
        <span style={{ fontSize: 16 }}>{loading ? '⏳' : '🚪'}</span>
        {loading ? 'Logging out…' : 'Logout'}
      </button>
    </div>
  )
}
