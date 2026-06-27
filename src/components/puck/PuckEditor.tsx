'use client'

import { useState, useRef, useCallback, useEffect, useMemo, type ReactNode } from 'react'
import { Puck, createUsePuck } from '@puckeditor/core'

// Module-level hook — call with a selector inside the component
const usePuckSelect = createUsePuck()
import { puckConfig } from '@/puck/config'
import '@puckeditor/core/dist/index.css'
import { useRouter } from 'next/navigation'
import { LanguageSwitcherDark } from '@/components/LanguageSwitcher'
import { useLanguage } from '@/contexts/LanguageContext'
import { ProductManagerPanel } from './ProductManagerPanel'

// Stable reference — defined outside every component so Puck never sees it change
function ProductsFields() { return <ProductManagerPanel /> }

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
  { slug: 'product-manager', label: 'পণ্য ব্যবস্থাপনা', labelEn: 'Product Manager', icon: '🗂️' },
  { slug: 'location', label: 'লোকেশন / ডিলারশিপ', labelEn: 'Location', icon: '📍' },
  { slug: 'career', label: 'ক্যারিয়ার', labelEn: 'Career', icon: '💼' },
  { slug: 'contact', label: 'যোগাযোগ', labelEn: 'Contact', icon: '📞' },
  { slug: 'navbar', label: 'নেভবার', labelEn: 'Navbar', icon: '🔝' },
  { slug: 'footer', label: 'ফুটার', labelEn: 'Footer', icon: '🔻' },
]

function flatPages(tree: PageItem[]): PageItem[] {
  return tree.flatMap(p => p.children ? flatPages(p.children) : [p])
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

// ─── Merge defaultProps into stored page data ────────────────────────────────
// EN field values live only in defaultProps (never saved to DB on first use).
// Puck's store is initialised from raw stored data, so custom field renderers
// see undefined for those fields. Pre-merging defaultProps before passing to
// <Puck data={...}> ensures every field has a value in the store from the start.
function withDefaultProps(
  initialData: object | undefined,
  slug: string
): object {
  type Block = { type: string; props: Record<string, unknown> }
  type PuckData = { content?: Block[]; root?: unknown }
  const base = (initialData ?? { content: [], root: { props: { title: slug } } }) as PuckData
  if (!base.content?.length) return base as object

  const content = base.content.map(block => {
    const comp = puckConfig.components[block.type as keyof typeof puckConfig.components]
    if (!comp) return block
    const defaults = (comp as { defaultProps?: Record<string, unknown> }).defaultProps ?? {}
    return { ...block, props: { ...defaults, ...block.props } }
  })
  return { ...base, content } as object
}

// ─── Stable module-level Puck override components ────────────────────────────
// These MUST live outside PuckEditor so their function references never change
// between renders. If they were inline arrow functions, Puck's useMemo would
// see a new component type on every setSaveStatus update and unmount/remount
// the canvas (scroll-to-top) or fields panel (focus loss on every keystroke).

const PUCK_NAV_STYLE = `
  [class*="PuckLayout-nav"]{display:flex!important;flex-direction:column!important;height:100%!important}
  [class*="PuckLayout-nav"]>*{display:flex!important;flex-direction:column!important;height:100%!important;flex:1!important}
  [class*="PuckLayout-nav"] [class*="NavItem_"]{flex:1!important;display:flex!important;align-items:center!important;justify-content:center!important}
  [class*="PuckLayout-nav"] [class*="NavItem_"]:first-child{order:2!important}
  [class*="PuckLayout-nav"] [class*="NavItem_"]:nth-child(2){order:1!important}
  [class*="PuckLayout-nav"] [class*="NavItem_"]:not(:first-child):not(:nth-child(2)){display:none!important}
  [class*="PuckLayout-nav"] [class*="NavItem-link_"]{font-size:0!important}
  [class*="PuckLayout-nav"] [class*="NavItem_"]:first-child [class*="NavItem-link_"]::after{content:"Add New Blocks";font-size:9px;color:currentColor;display:block;text-align:center;line-height:1.3}
  [class*="PuckLayout-nav"] [class*="NavItem_"]:nth-child(2) [class*="NavItem-link_"]::after{content:"Existing Sections";font-size:9px;color:currentColor;display:block;text-align:center;line-height:1.3}
`

function PuckLayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{PUCK_NAV_STYLE}</style>
      {children}
    </>
  )
}

function FieldsPassthrough({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

// ─── Custom Puck header with undo/redo + translated title ─────────────────────

function PuckHeader({
  slug, actions, singlePage, onNavigate,
}: {
  slug: string
  actions: ReactNode
  singlePage: boolean
  onNavigate: (slug: string) => void
}) {
  const { lang } = useLanguage()
  const history = usePuckSelect((state) => state.history)
  const [dropOpen, setDropOpen] = useState(false)
  const dropRef = useRef<HTMLDivElement>(null)

  const currentPage = flatPages(PAGE_TREE).find(p => p.slug === slug)
  const title = lang === 'en' ? (currentPage?.labelEn || slug) : (currentPage?.label || slug)

  const btnBase: React.CSSProperties = {
    width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
    borderRadius: '6px', border: 'none', cursor: 'pointer', fontSize: '16px',
    background: 'transparent', color: '#374151', transition: 'background 0.1s',
  }

  useEffect(() => {
    if (!dropOpen) return
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setDropOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [dropOpen])

  const renderDropItems = (items: PageItem[], depth = 0): React.ReactNode =>
    items.map(item => {
      if (item.isGroup) {
        return (
          <div key={item.labelEn}>
            <div style={{ padding: '4px 12px 2px', fontSize: 10, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {item.icon} {lang === 'en' ? item.labelEn : item.label}
            </div>
            {item.children && renderDropItems(item.children, depth + 1)}
          </div>
        )
      }
      const isActive = item.slug === slug
      return (
        <button
          key={item.slug}
          onClick={() => { onNavigate(item.slug!); setDropOpen(false) }}
          style={{
            width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 8,
            padding: `5px 12px 5px ${12 + depth * 12}px`,
            background: isActive ? 'rgba(27,77,62,0.1)' : 'transparent',
            border: 'none', cursor: 'pointer', fontSize: 12,
            color: isActive ? '#1B4D3E' : '#374151', fontWeight: isActive ? 700 : 400,
            borderRadius: 4,
          }}
        >
          <span style={{ fontSize: 13 }}>{item.icon}</span>
          {lang === 'en' ? item.labelEn : item.label}
          {isActive && <span style={{ marginLeft: 'auto', fontSize: 10, color: '#1B4D3E' }}>✓</span>}
        </button>
      )
    })

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

      {/* Page title — centered, clickable dropdown when multi-page */}
      <div ref={dropRef} style={{ flex: 1, textAlign: 'center', position: 'relative' }}>
        <button
          onClick={() => !singlePage && setDropOpen(o => !o)}
          style={{
            background: 'none', border: 'none', cursor: singlePage ? 'default' : 'pointer',
            fontSize: '14px', fontWeight: 700, color: '#1a2e1a',
            display: 'inline-flex', alignItems: 'center', gap: 4, padding: '4px 8px', borderRadius: 6,
          }}
        >
          {title}
          {!singlePage && <span style={{ fontSize: 10, color: '#9ca3af' }}>{dropOpen ? '▲' : '▼'}</span>}
        </button>

        {dropOpen && !singlePage && (
          <div style={{
            position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)',
            background: 'white', border: '1px solid #e5e7eb', borderRadius: 8,
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)', zIndex: 9999,
            minWidth: 200, maxHeight: 380, overflowY: 'auto',
            padding: '6px 0',
          }}>
            {renderDropItems(PAGE_TREE)}
          </div>
        )}
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
  // Stable initial data — set once on mount, never updated.
  // withDefaultProps merges puckConfig defaultProps into every block's stored
  // props so EN fields (which live only in defaultProps before first save) are
  // present in Puck's store and shown in the right panel.
  const puckInitData = useRef<object>(withDefaultProps(initialData, slug))
  // latestData: tracks the latest editor state for saving — updated in onChange
  const latestData = useRef<object>(puckInitData.current)
  const [saveStatus, setSaveStatus] = useState<'saved' | 'unsaved' | 'saving'>('saved')
  // Skip the very first onChange Puck fires on mount (before any real user edits)
  const skipNextChange = useRef(true)
  const [navModal, setNavModal] = useState<{ targetSlug: string } | null>(null)
  const [modalSaving, setModalSaving] = useState(false)
  const [publishState, setPublishState] = useState<'idle' | 'confirm' | 'publishing' | 'success'>('idle')

  const currentPage = flatPages(PAGE_TREE).find(p => p.slug === slug)
  const currentPageLabel = lang === 'en' ? (currentPage?.labelEn || slug) : (currentPage?.label || slug)

  // EN mode → show only *En fields (+ fields with no En variant)
  // BN mode → show only non-En fields
  // This keeps the right panel in sync with the canvas language.
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
        config={translatedConfig}
        data={puckInitData.current as object}
        onPublish={handlePublish}
        onChange={handleChange}
        iframe={{ enabled: false }}
        overrides={{
          puck: PuckLayoutWrapper,
          fields: slug === 'products' ? ProductsFields : FieldsPassthrough,
          header: ({ actions }: { actions: ReactNode }) => (
            <PuckHeader slug={slug} actions={actions} singlePage={!!singlePage} onNavigate={handleNavigate} />
          ),
          headerActions: () => (
            <HeaderActions
              saveStatus={saveStatus}
              onSave={handleSave}
              onReset={handleReset}
              onPublish={handlePublishClick}
            />
          ),
        }}
      />
    </div>
  )
}
