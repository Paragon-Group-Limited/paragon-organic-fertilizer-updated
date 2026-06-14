'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export function LanguageSwitcher({ size = 'md' }: { size?: 'sm' | 'md' }) {
  const { lang, setLang } = useLanguage()

  const isSmall = size === 'sm'
  const h = isSmall ? 28 : 32
  const fontSize = isSmall ? 11 : 12

  return (
    <div
      style={{
        display: 'inline-flex', alignItems: 'center',
        background: 'rgba(255,255,255,0.12)',
        borderRadius: 20, padding: 2, gap: 0,
        border: '1px solid rgba(255,255,255,0.2)',
        backdropFilter: 'blur(4px)',
      }}
    >
      {(['bn', 'en'] as const).map((l) => {
        const active = lang === l
        return (
          <button
            key={l}
            onClick={() => setLang(l)}
            style={{
              height: h, minWidth: isSmall ? 30 : 36,
              paddingInline: isSmall ? 7 : 9,
              borderRadius: 18, border: 'none', cursor: 'pointer',
              fontSize, fontWeight: 700, letterSpacing: '0.03em',
              fontFamily: l === 'bn' ? 'var(--font-hind)' : 'var(--font-inter)',
              transition: 'all 0.2s',
              background: active
                ? 'linear-gradient(135deg, #D4A017, #F5C842)'
                : 'transparent',
              color: active ? '#1B4D3E' : 'rgba(255,255,255,0.75)',
              boxShadow: active ? '0 2px 8px rgba(212,160,23,0.35)' : 'none',
            }}
          >
            {l === 'bn' ? 'বাং' : 'EN'}
          </button>
        )
      })}
    </div>
  )
}

// Dark variant for the Puck editor (white bg context)
export function LanguageSwitcherDark() {
  const { lang, setLang } = useLanguage()
  return (
    <div
      style={{
        display: 'inline-flex', alignItems: 'center',
        background: '#f1f5f9', borderRadius: 20, padding: 2,
        border: '1px solid #e2e8f0',
      }}
    >
      {(['bn', 'en'] as const).map((l) => {
        const active = lang === l
        return (
          <button
            key={l}
            onClick={() => setLang(l)}
            style={{
              height: 28, minWidth: 34, paddingInline: 8,
              borderRadius: 18, border: 'none', cursor: 'pointer',
              fontSize: 11, fontWeight: 700,
              fontFamily: l === 'bn' ? 'var(--font-hind)' : 'var(--font-inter)',
              transition: 'all 0.18s',
              background: active ? '#1B4D3E' : 'transparent',
              color: active ? 'white' : '#64748b',
            }}
          >
            {l === 'bn' ? 'বাং' : 'EN'}
          </button>
        )
      })}
    </div>
  )
}
