'use client'

import { useState, useRef, useCallback, useEffect, useMemo, useLayoutEffect, type ReactNode } from 'react'
import { Puck, usePuck } from '@puckeditor/core'
import { puckConfig } from '@/puck/config'
import '@puckeditor/core/dist/index.css'
import { useRouter } from 'next/navigation'
import { LanguageSwitcherDark } from '@/components/LanguageSwitcher'
import { useLanguage } from '@/contexts/LanguageContext'

type Props = {
  slug: string
  initialData?: object
  singlePage?: boolean
}

type PageItem = {
  slug?: string
  label: string
  labelEn: string
  icon?: string
  isGroup?: boolean
  disabled?: boolean
  children?: PageItem[]
}

const PAGE_TREE: PageItem[] = [
  { slug: 'home', label: 'হোম পেজ', labelEn: 'Home', icon: '🏠' },
  {
    label: 'সম্পর্কে', labelEn: 'About', icon: '📖', isGroup: true,
    children: [
      { slug: 'about/our-story', label: 'আমাদের গল্প', labelEn: 'Our Story', icon: '📜' },
      { slug: 'about/soil-benefit', label: 'মাটির উপকারিতা', labelEn: 'Soil Benefit', icon: '🌱' },
      { slug: 'about/why-this-product', label: 'কেন এই পণ্য', labelEn: 'Why This Product', icon: '✅' },
      { slug: 'about/paragon-group', label: 'প্যারাগন গ্রুপ', labelEn: 'Paragon Group', icon: '🏢' },
    ],
  },
  { slug: 'products', label: 'পণ্য ও ক্রয়', labelEn: 'Products & Purchase', icon: '🛒' },
  { slug: 'location', label: 'লোকেশন / ডিলারশিপ', labelEn: 'Location', icon: '📍' },
  { slug: 'career', label: 'ক্যারিয়ার', labelEn: 'Career', icon: '💼' },
  { slug: 'contact', label: 'যোগাযোগ', labelEn: 'Contact', icon: '📞' },
]

function flatPages(tree: PageItem[]): PageItem[] {
  return tree.flatMap(p => p.children ? flatPages(p.children) : [p])
}

function PageNavigator({ currentSlug, onNavigate }: { currentSlug: string; onNavigate: (slug: string) => void }) {
  const { lang } = useLanguage()
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    about: currentSlug.startsWith('about/'),
  })

  const toggle = (key: string) => setOpenGroups(p => ({ ...p, [key]: !p[key] }))
  const L = (item: PageItem) => lang === 'en' ? item.labelEn : item.label

  const renderItem = (item: PageItem) => {
    if (item.isGroup) {
      const key = item.labelEn.toLowerCase()
      const open = openGroups[key] ?? false
      const hasActive = item.children?.some(c => c.slug === currentSlug)

      return (
        <div key={key}>
          <button
            onClick={() => toggle(key)}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: '8px',
              padding: '7px 10px', background: hasActive ? 'rgba(27,77,62,0.08)' : 'transparent',
              border: 'none', borderRadius: '7px', cursor: 'pointer', marginBottom: '2px',
            }}
          >
            <span style={{ fontSize: '14px' }}>{item.icon}</span>
            <div style={{ flex: 1, textAlign: 'left' }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: hasActive ? '#1B4D3E' : '#1a2e1a' }}>{L(item)}</div>
            </div>
            <span style={{ fontSize: '10px', color: '#9ca3af', flexShrink: 0 }}>{open ? '▲' : '▼'}</span>
          </button>

          {open && (
            <div style={{ marginLeft: '10px', paddingLeft: '10px', borderLeft: '2px solid rgba(27,77,62,0.15)', marginBottom: '4px' }}>
              {item.children?.map(child => renderItem(child))}
            </div>
          )}
        </div>
      )
    }

    const active = item.slug === currentSlug
    return (
      <button
        key={item.slug}
        disabled={item.disabled}
        onClick={() => item.slug && onNavigate(item.slug)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: '8px',
          padding: '7px 10px',
          background: active ? 'rgba(27,77,62,0.1)' : 'transparent',
          border: active ? '1.5px solid rgba(27,77,62,0.35)' : '1.5px solid transparent',
          borderRadius: '7px', cursor: item.disabled ? 'default' : 'pointer',
          marginBottom: '2px', opacity: item.disabled ? 0.45 : 1, textAlign: 'left',
        }}
      >
        <span style={{ fontSize: '14px', flexShrink: 0 }}>{item.icon}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontSize: '12px', fontWeight: active ? 700 : 500,
            color: active ? '#1B4D3E' : '#374151',
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          }}>{L(item)}</div>
          {item.disabled && (
            <div style={{ fontSize: '9px', color: '#9ca3af' }}>
              {lang === 'en' ? 'Coming soon' : 'শীঘ্রই'}
            </div>
          )}
        </div>
        {active && <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#1B4D3E', flexShrink: 0 }} />}
      </button>
    )
  }

  return (
    <div style={{ padding: '12px 10px 10px', borderBottom: '1px solid #e5e7eb' }}>
      <div style={{ fontSize: '10px', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '0 10px', marginBottom: '8px' }}>
        {lang === 'en' ? 'All Pages' : 'সব পেজ'}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {PAGE_TREE.map(item => renderItem(item))}
      </div>
    </div>
  )
}

// ─── Unsaved-changes modal ────────────────────────────────────────────────────

function NavModal({ pageLabel, onSaveAndGo, onDiscard, onStay, saving }: {
  pageLabel: string
  onSaveAndGo: () => void
  onDiscard: () => void
  onStay: () => void
  saving: boolean
}) {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 99999,
      background: 'rgba(0,0,0,0.45)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        background: 'white', borderRadius: '14px', padding: '28px 32px',
        maxWidth: '400px', width: '90%',
        boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
        fontFamily: 'var(--font-hind, sans-serif)',
      }}>
        <div style={{ fontSize: '28px', marginBottom: '10px', textAlign: 'center' }}>⚠️</div>
        <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#1a2e1a', margin: '0 0 8px', textAlign: 'center' }}>
          অসেভড পরিবর্তন আছে
        </h2>
        <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 24px', textAlign: 'center', lineHeight: 1.6 }}>
          <b style={{ color: '#1B4D3E' }}>{pageLabel}</b> পেজে সেভ না করা পরিবর্তন আছে।<br />
          অন্য পেজে যাওয়ার আগে কী করবেন?
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button
            onClick={onSaveAndGo}
            disabled={saving}
            style={{
              padding: '10px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer',
              background: saving ? '#9ca3af' : '#1B4D3E', color: 'white',
              fontSize: '13px', fontWeight: 700,
            }}
          >
            {saving ? '⏳ সেভ হচ্ছে...' : '💾 এই পেজ সেভ করে যান'}
          </button>
          <button
            onClick={onDiscard}
            disabled={saving}
            style={{
              padding: '10px 16px', borderRadius: '8px', cursor: 'pointer',
              background: 'transparent', border: '1px solid #e5e7eb',
              fontSize: '13px', fontWeight: 600, color: '#6b7280',
            }}
          >
            🗑️ পরিবর্তন বাদ দিয়ে যান
          </button>
          <button
            onClick={onStay}
            style={{
              padding: '8px 16px', borderRadius: '8px', cursor: 'pointer',
              background: 'transparent', border: 'none',
              fontSize: '12px', color: '#9ca3af', textDecoration: 'underline',
            }}
          >
            এই পেজেই থাকুন
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Publish confirmation modal ───────────────────────────────────────────────

function PublishConfirmModal({ pageLabel, onConfirm, onCancel, publishing }: {
  pageLabel: string; onConfirm: () => void; onCancel: () => void; publishing: boolean
}) {
  return (
    <div style={{ position:'fixed', inset:0, zIndex:999999, background:'rgba(0,0,0,0.5)', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ background:'white', borderRadius:'16px', padding:'32px', maxWidth:'420px', width:'90%', boxShadow:'0 24px 64px rgba(0,0,0,0.3)', fontFamily:'sans-serif' }}>
        <div style={{ fontSize:'36px', textAlign:'center', marginBottom:'12px' }}>🌐</div>
        <h2 style={{ fontSize:'18px', fontWeight:700, color:'#1a2e1a', margin:'0 0 10px', textAlign:'center' }}>
          পাবলিশ করবেন?
        </h2>
        <p style={{ fontSize:'13px', color:'#6b7280', margin:'0 0 6px', textAlign:'center', lineHeight:1.7 }}>
          <b style={{ color:'#1B4D3E' }}>{pageLabel}</b> পেজের পরিবর্তনগুলো পাবলিশ করলে<br />
          সাথে সাথে <b>live সাইটে</b> দেখা যাবে।
        </p>
        <p style={{ fontSize:'12px', color:'#9ca3af', margin:'0 0 24px', textAlign:'center' }}>এটি কি এখনই করতে চান?</p>
        <div style={{ display:'flex', gap:'10px' }}>
          <button
            onClick={onCancel}
            disabled={publishing}
            style={{ flex:1, padding:'10px', borderRadius:'8px', cursor:'pointer', background:'#f3f4f6', border:'none', fontSize:'13px', fontWeight:600, color:'#374151' }}
          >
            বাতিল
          </button>
          <button
            onClick={onConfirm}
            disabled={publishing}
            style={{ flex:2, padding:'10px', borderRadius:'8px', border:'none', cursor: publishing ? 'default' : 'pointer', background: publishing ? '#9ca3af' : 'linear-gradient(135deg,#1B4D3E,#2D7A3A)', color:'white', fontSize:'13px', fontWeight:700 }}
          >
            {publishing ? '⏳ পাবলিশ হচ্ছে...' : '🚀 হ্যাঁ, পাবলিশ করুন'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Publish success modal ────────────────────────────────────────────────────

function PublishSuccessModal({ pageLabel, slug, onClose }: {
  pageLabel: string; slug: string; onClose: () => void
}) {
  const liveUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/${slug === 'home' ? '' : slug}`
  return (
    <div style={{ position:'fixed', inset:0, zIndex:999999, background:'rgba(0,0,0,0.5)', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ background:'white', borderRadius:'16px', padding:'32px', maxWidth:'420px', width:'90%', boxShadow:'0 24px 64px rgba(0,0,0,0.3)', fontFamily:'sans-serif' }}>
        <div style={{ fontSize:'48px', textAlign:'center', marginBottom:'12px' }}>✅</div>
        <h2 style={{ fontSize:'18px', fontWeight:700, color:'#1B4D3E', margin:'0 0 10px', textAlign:'center' }}>
          সফলভাবে পাবলিশ হয়েছে!
        </h2>
        <p style={{ fontSize:'13px', color:'#6b7280', margin:'0 0 20px', textAlign:'center', lineHeight:1.7 }}>
          <b style={{ color:'#1B4D3E' }}>{pageLabel}</b> পেজের পরিবর্তনগুলো<br />
          live সাইটে আপডেট হয়ে গেছে।
        </p>
        <div style={{ background:'#f0fdf4', border:'1px solid #bbf7d0', borderRadius:'8px', padding:'10px 14px', marginBottom:'20px', display:'flex', alignItems:'center', gap:'8px' }}>
          <span style={{ fontSize:'14px' }}>🔗</span>
          <a href={liveUrl} target="_blank" rel="noreferrer" style={{ fontSize:'12px', color:'#1B4D3E', fontWeight:600, wordBreak:'break-all' }}>
            {liveUrl}
          </a>
        </div>
        <button
          onClick={onClose}
          style={{ width:'100%', padding:'11px', borderRadius:'8px', border:'none', cursor:'pointer', background:'#1B4D3E', color:'white', fontSize:'13px', fontWeight:700 }}
        >
          ✓ ঠিক আছে
        </button>
      </div>
    </div>
  )
}

// ─── Custom Left Sidebar ──────────────────────────────────────────────────────

const SIDEBAR_W = 272

function PuckCustomSidebar() {
  const [mode, setMode] = useState<'outline' | 'add'>('outline')
  const { dispatch } = usePuck()
  const { lang } = useLanguage()
  const t = (bn: string, en: string) => lang === 'en' ? en : bn

  useLayoutEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dispatch({ type: 'setUi', ui: (ui: any) => ({ ...ui, leftSideBarVisible: false }) } as any)
  }, [dispatch])

  // Shared section-label style
  const sectionLabel = (label: string) => (
    <div style={{
      padding: '7px 12px 6px',
      background: '#fafafa',
      borderBottom: '1px solid #f0f0f0',
      fontSize: 10,
      fontWeight: 700,
      color: '#9ca3af',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.08em',
      flexShrink: 0,
    }}>
      {label}
    </div>
  )

  if (mode === 'add') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
        {/* Header with back arrow */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '0 6px 0 4px', borderBottom: '1px solid #e5e7eb',
          background: '#fafafa', flexShrink: 0, minHeight: 36,
        }}>
          <button
            onClick={() => setMode('outline')}
            title={t('ফিরে যান', 'Back')}
            style={{
              width: 28, height: 28, borderRadius: 6, border: 'none',
              background: 'transparent', cursor: 'pointer', fontSize: 16,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#6b7280', transition: 'background 0.12s',
              flexShrink: 0,
            }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#e5e7eb'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
          >
            ←
          </button>
          <span style={{ fontSize: 10, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            {t('নতুন Block যোগ করুন', 'Add New Block')}
          </span>
        </div>

        <div style={{ fontSize: 9.5, color: '#b0b7bf', padding: '4px 12px 5px', background: '#fafafa', borderBottom: '1px solid #f0f0f0', flexShrink: 0 }}>
          {t('Page-এ drag করে block যোগ করুন', 'Drag a block onto the page')}
        </div>

        <div style={{ flex: 1, overflow: 'auto', minHeight: 0 }}>
          <Puck.Components />
        </div>
      </div>
    )
  }

  // ── Outline / existing-blocks view ───────────────────────────────────────────
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>

      {sectionLabel(t('বিদ্যমান Blocks', 'Existing Blocks'))}

      {/* Current page outline */}
      <div style={{ flex: 1, overflow: 'auto', minHeight: 0 }}>
        <Puck.Outline />
      </div>

      {/* Add New Block — same icon row style as outline items */}
      <div style={{ borderTop: '1px solid #f0f0f0', padding: '4px 6px', flexShrink: 0 }}>
        <button
          onClick={() => setMode('add')}
          style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: 8,
            padding: '7px 10px', borderRadius: 6, border: 'none',
            background: 'transparent', cursor: 'pointer',
            transition: 'background 0.12s',
          }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#f0fdf4'}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
        >
          {/* Grid-dots icon — mirrors Puck's outline drag-handle look */}
          <span style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2,
            width: 16, height: 16, flexShrink: 0, opacity: 0.45,
          }}>
            {[0,1,2,3].map(i => (
              <span key={i} style={{ width: 5, height: 5, borderRadius: 1.5, background: '#1B4D3E', display: 'block' }} />
            ))}
          </span>
          {/* Green + badge */}
          <div style={{
            width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
            background: 'linear-gradient(135deg,#1B4D3E,#2D7A3A)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14, color: 'white', fontWeight: 700, lineHeight: 1,
          }}>+</div>
          <span style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>
            {t('Add New Block', 'Add New Block')}
          </span>
        </button>
      </div>
    </div>
  )
}

// ─── Custom Puck header with undo/redo + translated title ─────────────────────

function PuckHeader({ slug, actions }: { slug: string; actions: ReactNode }) {
  const { lang } = useLanguage()
  const { history } = usePuck()

  const currentPage = flatPages(PAGE_TREE).find(p => p.slug === slug)
  const title = lang === 'en' ? (currentPage?.labelEn || slug) : (currentPage?.label || slug)

  const btnBase: React.CSSProperties = {
    width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
    borderRadius: '6px', border: 'none', cursor: 'pointer', fontSize: '16px',
    background: 'transparent', color: '#374151', transition: 'background 0.1s',
  }

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '4px',
      padding: '0 12px', height: '56px', width: '100%',
      borderBottom: '1px solid #e5e7eb', background: 'white',
    }}>
      {/* Undo */}
      <button
        onClick={history.back}
        disabled={!history.hasPast}
        title={lang === 'en' ? 'Undo' : 'আনডু'}
        style={{ ...btnBase, opacity: history.hasPast ? 1 : 0.3, cursor: history.hasPast ? 'pointer' : 'default' }}
      >↩</button>
      {/* Redo */}
      <button
        onClick={history.forward}
        disabled={!history.hasFuture}
        title={lang === 'en' ? 'Redo' : 'রিডু'}
        style={{ ...btnBase, opacity: history.hasFuture ? 1 : 0.3, cursor: history.hasFuture ? 'pointer' : 'default' }}
      >↪</button>

      {/* Page title — centered */}
      <div style={{ flex: 1, textAlign: 'center', fontSize: '14px', fontWeight: 700, color: '#1a2e1a' }}>
        {title}
      </div>

      {/* Actions (language switcher, save, reset, publish) */}
      {actions}
    </div>
  )
}

// ─── Header actions bar ───────────────────────────────────────────────────────

function HeaderActions({ saveStatus, onSave, onReset, onPublish }: {
  saveStatus: 'saved' | 'unsaved' | 'saving'
  onSave: () => void
  onReset: () => void
  onPublish: () => void
}) {
  const { lang } = useLanguage()
  const t = (bn: string, en: string) => lang === 'en' ? en : bn

  const saveBtnLabel =
    saveStatus === 'saving' ? t('সেভ হচ্ছে...', 'Saving...') :
    saveStatus === 'saved'  ? t('সেভড', 'Saved') :
                              t('সেভ করুন', 'Save')

  const saveBtnIcon = saveStatus === 'saving' ? '⏳' : saveStatus === 'saved' ? '✓' : '💾'

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
      {/* Language switcher */}
      <LanguageSwitcherDark />

      {/* Divider */}
      <div style={{ width: '1px', height: '20px', background: 'rgba(0,0,0,0.12)', margin: '0 2px' }} />

      {/* Save status dot */}
      {saveStatus === 'unsaved' && (
        <span style={{ fontSize: '10px', color: '#e53e3e', fontWeight: 600, whiteSpace: 'nowrap' }}>
          ● {t('অসেভড', 'Unsaved')}
        </span>
      )}

      {/* Save button */}
      <button
        onClick={onSave}
        disabled={saveStatus !== 'unsaved'}
        title={t('এই পেজ সেভ করুন', 'Save this page')}
        style={{
          display: 'flex', alignItems: 'center', gap: '4px',
          padding: '5px 12px', borderRadius: '6px', cursor: saveStatus !== 'unsaved' ? 'default' : 'pointer',
          background: saveStatus === 'saved' ? '#f0fdf4' : saveStatus === 'saving' ? '#f3f4f6' : '#1B4D3E',
          border: saveStatus === 'saved' ? '1px solid #bbf7d0' : '1px solid transparent',
          fontSize: '12px', fontWeight: 600, whiteSpace: 'nowrap',
          color: saveStatus === 'saved' ? '#2D7A3A' : saveStatus === 'saving' ? '#9ca3af' : 'white',
          opacity: saveStatus === 'saving' ? 0.7 : 1,
          transition: 'all 0.15s',
        }}
      >
        <span>{saveBtnIcon}</span>
        <span>{saveBtnLabel}</span>
      </button>

      {/* Reset button */}
      <button
        onClick={onReset}
        title={t('আগের ডিজাইনে ফিরে যান', 'Revert to last published design')}
        style={{
          display: 'flex', alignItems: 'center', gap: '4px',
          padding: '5px 10px', borderRadius: '6px', cursor: 'pointer',
          background: 'transparent', border: '1px solid #d1d5db',
          fontSize: '12px', fontWeight: 500, color: '#6b7280',
          whiteSpace: 'nowrap',
        }}
      >
        ↩ {t('রিসেট', 'Reset')}
      </button>

      {/* Publish button */}
      <button
        onClick={onPublish}
        style={{
          display: 'flex', alignItems: 'center', gap: '5px',
          padding: '6px 16px', borderRadius: '7px', border: 'none', cursor: 'pointer',
          background: 'linear-gradient(135deg, #1B5E4A, #1B4D3E)',
          color: 'white', fontSize: '13px', fontWeight: 700, whiteSpace: 'nowrap',
          boxShadow: '0 2px 8px rgba(27,77,62,0.35)',
        }}
      >
        🌐 {t('পাবলিশ', 'Publish')}
      </button>
    </div>
  )
}


// ─── Main editor ─────────────────────────────────────────────────────────────

export function PuckEditor({ slug, initialData, singlePage }: Props) {
  const router = useRouter()
  const { lang } = useLanguage()
  const latestData = useRef<object>(initialData ?? { content: [], root: { props: { title: slug } } })
  const [saveStatus, setSaveStatus] = useState<'saved' | 'unsaved' | 'saving'>('saved')
  // Skip the first onChange after a lang-switch remount (Puck fires onChange on init)
  const skipNextChange = useRef(false)
  const prevLang = useRef(lang)
  if (prevLang.current !== lang) {
    prevLang.current = lang
    skipNextChange.current = true
  }
  const [navModal, setNavModal] = useState<{ targetSlug: string } | null>(null)
  const [modalSaving, setModalSaving] = useState(false)
  const [publishState, setPublishState] = useState<'idle' | 'confirm' | 'publishing' | 'success'>('idle')

  const currentPage = flatPages(PAGE_TREE).find(p => p.slug === slug)
  const currentPageLabel = lang === 'en' ? (currentPage?.labelEn || slug) : (currentPage?.label || slug)

  // Filter component fields by language:
  // EN → show only *En fields + fields that have no En variant
  // BN → show only non-En fields
  const langFilteredComponents = useMemo(() => {
    const result: Record<string, unknown> = {}
    for (const [key, comp] of Object.entries(puckConfig.components || {})) {
      const rawFields = (comp as Record<string, unknown>).fields as Record<string, unknown> | undefined
      if (!rawFields) { result[key] = comp; continue }
      const filtered: Record<string, unknown> = {}
      for (const [fieldName, fieldDef] of Object.entries(rawFields)) {
        const isEnField = fieldName.endsWith('En')
        const hasEnVariant = Object.prototype.hasOwnProperty.call(rawFields, `${fieldName}En`)
        if (lang === 'en') {
          if (isEnField || !hasEnVariant) filtered[fieldName] = fieldDef
        } else {
          if (!isEnField) filtered[fieldName] = fieldDef
        }
      }
      result[key] = { ...(comp as object), fields: filtered }
    }
    return result
  }, [lang])

  // Translated category labels for the left panel
  const translatedConfig = useMemo(() => ({
    ...puckConfig,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    components: langFilteredComponents as any,
    categories: lang === 'en' ? {
      'Page Content':       { components: ['StaticPageBlock'] },
      '🎨 Page Banner':     { components: ['PageBannerBlock'] },
      '📖 About — Our Story': { components: ['OurStoryFoundingBlock', 'OurStoryTimelineBlock', 'OurStorySuccessStoriesBlock', 'OurStoryValuesBlock'] },
      '🌱 About — Soil Benefit': puckConfig.categories?.['🌱 About — Soil Benefit'] ?? { components: [] },
      '✅ About — Why This Product': puckConfig.categories?.['✅ About — Why This Product'] ?? { components: [] },
      '🏢 About — Paragon Group': puckConfig.categories?.['🏢 About — Paragon Group'] ?? { components: [] },
      '📍 Location':        puckConfig.categories?.['📍 Location'] ?? { components: [] },
      '💼 Career':          puckConfig.categories?.['💼 Career'] ?? { components: [] },
      '📞 Contact':         puckConfig.categories?.['📞 Contact'] ?? { components: [] },
      '📦 Products':        puckConfig.categories?.['📦 Products'] ?? { components: [] },
      'Home Page Sections': { components: ['HomeSlidesBlock', 'StatsSectionBlock', 'AboutSectionBlock', 'ProblemSectionBlock', 'HowItWorksBlock', 'ProductsPreviewBlock', 'CTASectionBlock'] },
      '🎬 YouTube Videos':  { components: ['YouTubeVideoGridBlock'] },
      'General Blocks':     { components: ['HeroBanner', 'ContentBlock', 'SectionHeading', 'StatsRow', 'TextBlock', 'CardGrid', 'CTABanner'] },
    } : puckConfig.categories,
  }), [lang, langFilteredComponents])

  const saveToDb = useCallback(async (data: object): Promise<boolean> => {
    try {
      const res = await fetch(`/api/pages/${slug}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ layout: data, slug }),
      })
      return res.ok
    } catch {
      return false
    }
  }, [slug])

  // Called by Puck's onPublish (needed for internal Puck state) — we bypass it via our own button
  const handlePublish = async (data: object) => {
    setSaveStatus('saving')
    const ok = await saveToDb(data)
    setSaveStatus(ok ? 'saved' : 'unsaved')
  }

  // Our custom Publish button → shows confirm modal
  const handlePublishClick = () => setPublishState('confirm')

  // User confirmed → actually publish
  const handlePublishConfirm = async () => {
    setPublishState('publishing')
    const ok = await saveToDb(latestData.current)
    if (ok) {
      setSaveStatus('saved')
      setPublishState('success')
    } else {
      setPublishState('idle')
      alert('❌ পাবলিশ ব্যর্থ হয়েছে। আবার চেষ্টা করুন।')
    }
  }

  // Called by our custom "Save" button in the header
  const handleSave = async () => {
    setSaveStatus('saving')
    const ok = await saveToDb(latestData.current)
    setSaveStatus(ok ? 'saved' : 'unsaved')
    if (!ok) alert('❌ সেভ ব্যর্থ হয়েছে।')
  }

  // Track changes without re-rendering the heavy Puck editor
  const handleChange = useCallback((data: object) => {
    latestData.current = data
    if (skipNextChange.current) { skipNextChange.current = false; return }
    setSaveStatus('unsaved')
  }, [])

  const handleReset = () => {
    if (confirm(`"${currentPageLabel}" পেজের default design-এ ফিরে যাবেন?\nসব unsaved changes হারিয়ে যাবে।`)) {
      window.location.reload()
    }
  }

  const handleNavigate = (newSlug: string) => {
    if (newSlug === slug) return
    if (saveStatus !== 'saved') {
      setNavModal({ targetSlug: newSlug })
    } else {
      router.push(`/editor/${newSlug}`)
    }
  }

  const handleModalSaveAndGo = async () => {
    if (!navModal) return
    setModalSaving(true)
    await saveToDb(latestData.current)
    setModalSaving(false)
    setNavModal(null)
    router.push(`/editor/${navModal.targetSlug}`)
  }

  const handleModalDiscard = () => {
    if (!navModal) return
    const target = navModal.targetSlug
    setNavModal(null)
    router.push(`/editor/${target}`)
  }

  // Warn on browser tab close / refresh if unsaved
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (saveStatus === 'unsaved') {
        e.preventDefault()
      }
    }
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [saveStatus])

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999, background: 'white' }}>

      {navModal && (
        <NavModal
          pageLabel={currentPageLabel}
          saving={modalSaving}
          onSaveAndGo={handleModalSaveAndGo}
          onDiscard={handleModalDiscard}
          onStay={() => setNavModal(null)}
        />
      )}

      {(publishState === 'confirm' || publishState === 'publishing') && (
        <PublishConfirmModal
          pageLabel={currentPageLabel}
          publishing={publishState === 'publishing'}
          onConfirm={handlePublishConfirm}
          onCancel={() => setPublishState('idle')}
        />
      )}

      {publishState === 'success' && (
        <PublishSuccessModal
          pageLabel={currentPageLabel}
          slug={slug}
          onClose={() => setPublishState('idle')}
        />
      )}

      <Puck
        key={lang}
        config={translatedConfig}
        data={latestData.current as object}
        onPublish={handlePublish}
        onChange={handleChange}
        iframe={{ enabled: false }}
        overrides={{
          puck: ({ children }: { children: React.ReactNode }) => (
            <div style={{ position: 'relative', height: '100%' }}>
              {/* Default layout — left sidebar hidden via dispatch inside PuckCustomSidebar */}
              {children}
              {/* Custom sidebar overlaid on the left panel area, below the 56px header */}
              <div style={{
                position: 'absolute',
                top: 56,
                left: 0,
                bottom: 0,
                width: SIDEBAR_W,
                background: 'white',
                zIndex: 200,
                display: 'flex',
                flexDirection: 'column',
                borderRight: '1.5px solid #e5e7eb',
                boxShadow: '2px 0 10px rgba(0,0,0,0.05)',
              }}>
                <PuckCustomSidebar />
              </div>
            </div>
          ),
          header: ({ actions }: { actions: ReactNode }) => (
            <PuckHeader slug={slug} actions={actions} />
          ),
          headerActions: () => (
            <HeaderActions
              saveStatus={saveStatus}
              onSave={handleSave}
              onReset={handleReset}
              onPublish={handlePublishClick}
            />
          ),
          fields: ({ children }: { children: React.ReactNode }) => (
            <>
              {!singlePage && <PageNavigator currentSlug={slug} onNavigate={handleNavigate} />}
              {children}
            </>
          ),
        }}
      />
    </div>
  )
}
