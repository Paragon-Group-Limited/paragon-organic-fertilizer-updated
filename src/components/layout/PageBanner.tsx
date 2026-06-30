'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { RichText } from '@/components/puck/RichText'
import { useLanguage } from '@/contexts/LanguageContext'

type BreadcrumbItem = { label: string; href?: string }

type Props = {
  tagText?: string
  title: string
  titleHighlight?: string
  subtitle?: string
  breadcrumbs?: BreadcrumbItem[]
  bgGradient?: string
  bgImageUrl?: string
  align?: 'left' | 'center' | 'right'
  showTag?: 'yes' | 'no'
  showTitle?: 'yes' | 'no'
  showSubtitle?: 'yes' | 'no'
}

export function PageBanner({
  tagText,
  title,
  titleHighlight,
  subtitle,
  breadcrumbs = [],
  bgGradient = 'linear-gradient(135deg, #0a1f14 0%, #1B4D3E 55%, #2D7A3A 100%)',
  bgImageUrl = '',
  align = 'left',
  showTag = 'yes',
  showTitle = 'yes',
  showSubtitle = 'yes',
}: Props) {
  const alignClass = align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : ''
  const justifyClass = align === 'center' ? 'justify-center' : align === 'right' ? 'justify-end' : ''
  const { lang } = useLanguage()
  return (
    <>
      {/*
        S-curve clip-path: both edges at 90%; right-centre rises to ~86%,
        left-centre dips to ~95% — gentle S-wave so the wave sits well
        below the image content. minHeight on the section keeps the wave
        from cutting into the image on short-content pages.
      */}
      <svg
        width="0" height="0"
        aria-hidden="true"
        focusable="false"
        style={{ position: 'absolute', overflow: 'hidden', pointerEvents: 'none' }}
      >
        <defs>
          <clipPath id="page-banner-clip" clipPathUnits="objectBoundingBox">
            <path d="M0,0 L1,0 L1,0.90 C0.67,0.76 0.33,1.06 0,0.90 Z" />
          </clipPath>
        </defs>
      </svg>

      <section
        className="relative pt-20 pb-28 sm:pt-24 sm:pb-32 lg:pt-32 lg:pb-44 overflow-hidden page-banner"
        style={{
          background: bgGradient,
          clipPath: 'url(#page-banner-clip)',
        }}
      >
        {/* Background image + tint */}
        {bgImageUrl && (
          <>
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: `url(${bgImageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }} />
            {/* Semi-transparent gradient tint */}
            <div
              style={{
                position: 'absolute', inset: 0,
                background: bgGradient.replace(
                  /#([0-9a-fA-F]{6})/g,
                  (_, hex) => {
                    const r = parseInt(hex.slice(0, 2), 16)
                    const g = parseInt(hex.slice(2, 4), 16)
                    const b = parseInt(hex.slice(4, 6), 16)
                    return `rgba(${r},${g},${b},0.65)`
                  }
                ),
              }}
            />
          </>
        )}

        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />
        {/* Gold glow — top-right */}
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(212,160,23,0.18) 0%, transparent 65%)',
            transform: 'translate(25%, -35%)',
          }}
        />
        {/* Green glow — bottom-left */}
        <div
          className="absolute bottom-0 left-0 w-80 h-80 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(45,122,58,0.2) 0%, transparent 70%)',
            transform: 'translate(-30%, 30%)',
          }}
        />

        {/* Content */}
        <div
          className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${alignClass}`}
        >
          {breadcrumbs.length > 0 && (
            <nav
              className={`flex items-center gap-1.5 mb-6 text-xs font-medium flex-wrap ${justifyClass}`}
              style={{ fontFamily: 'var(--font-hind)', color: 'rgba(255,255,255,0.5)' }}
            >
              <Link href="/" className="hover:text-white transition-colors">
                {lang === 'en' ? 'Home' : 'হোম'}
              </Link>
              {breadcrumbs.map((crumb, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 opacity-60" />
                  {crumb.href ? (
                    <Link href={crumb.href} className="hover:text-white transition-colors">
                      <RichText html={crumb.label} inline />
                    </Link>
                  ) : (
                    <span style={{ color: '#F5C842' }}>
                      <RichText html={crumb.label} inline />
                    </span>
                  )}
                </span>
              ))}
            </nav>
          )}

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
          >
            {tagText && showTag !== 'no' && (
              <div
                className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-5 ${align === 'center' || align === 'right' ? 'mx-auto' : ''}`}
                style={{
                  background: 'rgba(212,160,23,0.18)',
                  border: '1px solid rgba(212,160,23,0.4)',
                  color: '#F5C842',
                  fontFamily: 'var(--font-inter)',
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background: '#F5C842' }}
                />
                <RichText html={tagText} inline />
              </div>
            )}

            {showTitle !== 'no' && (
              <h1
                className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-5"
                style={{ fontFamily: 'var(--font-hind)' }}
              >
                <RichText html={title} inline />
                {titleHighlight && (
                  <>
                    {' '}
                    <span style={{ color: '#F5C842' }}>
                      <RichText html={titleHighlight} inline />
                    </span>
                  </>
                )}
              </h1>
            )}

            {subtitle && showSubtitle !== 'no' && (
              <div
                className={`text-base lg:text-lg leading-relaxed ${align === 'center' || align === 'right' ? 'max-w-2xl mx-auto' : 'max-w-2xl'}`}
                style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-hind)' }}
              >
                <RichText html={subtitle} />
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </>
  )
}
