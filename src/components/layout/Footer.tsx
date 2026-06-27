'use client'

import Link from 'next/link'
import { Leaf, Phone, Mail, MapPin } from 'lucide-react'
import { useT } from '@/hooks/useT'

type SocialLink = { icon?: string; url?: string; label?: string }
type FooterLink = { href?: string; bn: string; en: string }

type FooterPuckProps = {
  logoUrl?: string
  description?: string
  descriptionEn?: string
  contactAddress?: string
  contactAddressEn?: string
  contactPhone?: string
  contactEmail?: string
  quickLinks?: FooterLink[]
  productLinks?: FooterLink[]
}

function extractFooterPuck(data: unknown): FooterPuckProps | null {
  if (!data || typeof data !== 'object') return null
  const d = data as { content?: Array<{ type: string; props: FooterPuckProps }> }
  const block = d.content?.find(b => b.type === 'FooterConfigBlock')
  return block?.props ?? null
}

const SocialIcon = ({ type }: { type?: string }) => {
  if (type === 'facebook') return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
  if (type === 'linkedin') return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
    </svg>
  )
  if (type === 'youtube') return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
    </svg>
  )
  if (type === 'instagram') return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  )
  // default: link/website icon
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  )
}

const quickLinks = [
  { href: '/', bn: 'হোম', en: 'Home' },
  { href: '/about/our-story', bn: 'আমাদের গল্প', en: 'Our Story' },
  { href: '/products', bn: 'পণ্যসমূহ', en: 'Products' },
  { href: '/dealership', bn: 'ডিলারশিপ', en: 'Dealership' },
  { href: '/career', bn: 'ক্যারিয়ার', en: 'Career' },
  { href: '/contact', bn: 'যোগাযোগ', en: 'Contact' },
]

const products = [
  { href: '/products', bn: 'প্যারাগন জৈব সার', en: 'Paragon Organic Fertilizer' },
  { href: '/products', bn: 'জৈব কীটনাশক', en: 'Organic Pesticide' },
  { href: '/products', bn: 'মাটি উন্নয়নকারী', en: 'Soil Improver' },
]

export default function Footer({
  socialLinks,
  logo,
  siteName,
  siteSubtitle,
  footerPuckData,
}: {
  socialLinks?: SocialLink[]
  logo?: { url?: string; alt?: string }
  siteName?: string
  siteSubtitle?: string
  footerPuckData?: unknown
}) {
  const t = useT()
  const puck = extractFooterPuck(footerPuckData)

  const description    = puck?.description    || 'উপকারী অণুজীব সমৃদ্ধ ১০০% অর্গানিক জৈব সার। বাংলাদেশের কৃষকদের মাটির সুস্বাস্থ্য ফিরিয়ে আনতে আমরা প্রতিশ্রুতিবদ্ধ।'
  const descriptionEn  = puck?.descriptionEn  || '100% organic fertilizer enriched with beneficial microorganisms. We are committed to restoring soil health for Bangladeshi farmers.'
  const contactAddr    = puck?.contactAddress  || 'প্যারাগন গ্রুপ, ঢাকা, বাংলাদেশ'
  const contactAddrEn  = puck?.contactAddressEn || 'Paragon Group, Dhaka, Bangladesh'
  const contactPhone   = puck?.contactPhone    || '+880 1XXX-XXXXXX'
  const contactEmail   = puck?.contactEmail    || 'info@paragonorganic.com.bd'
  const activeLogo         = puck?.logoUrl || logo?.url || ''
  const activeQuickLinks   = (puck?.quickLinks   && puck.quickLinks.length   > 0) ? puck.quickLinks   : quickLinks
  const activeProductLinks = (puck?.productLinks && puck.productLinks.length > 0) ? puck.productLinks : products

  return (
    <footer style={{ background: '#0F2E24' }} className="text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              {activeLogo ? (
                <img src={activeLogo} alt={logo?.alt || 'Logo'} className="h-10 w-auto object-contain" />
              ) : (
                <div className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #D4A017, #F5C842)' }}>
                  <Leaf className="w-5 h-5 text-white" strokeWidth={2.5} />
                </div>
              )}
              <div>
                <div className="text-white font-bold text-base" style={{ fontFamily: 'var(--font-hind)' }}>{siteName || 'প্যারাগন'}</div>
                <div className="text-xs tracking-widest" style={{ color: '#D4A017', fontFamily: 'var(--font-inter)' }}>{siteSubtitle || 'ORGANIC FERTILIZER'}</div>
              </div>
            </Link>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-hind)' }}>
              {t(description, descriptionEn)}
            </p>
            {socialLinks && socialLinks.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {socialLinks.map((link, i) => (
                  <a key={i}
                    href={link.url || '#'}
                    aria-label={link.label || link.icon || 'link'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                    style={{ background: 'rgba(255,255,255,0.1)' }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#D4A017')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}>
                    <SocialIcon type={link.icon} />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-base mb-5 pb-2 border-b" style={{ fontFamily: 'var(--font-hind)', borderColor: 'rgba(212,160,23,0.4)' }}>
              {t('দ্রুত লিঙ্ক', 'Quick Links')}
            </h3>
            <ul className="space-y-2.5">
              {activeQuickLinks.map((link) => (
                <li key={(link.href ?? '') + link.bn}>
                  <Link href={link.href || '/'}
                    className="text-sm transition-colors duration-200 hover:text-golden flex items-center gap-2 group"
                    style={{ color: 'rgba(255,255,255,0.65)', fontFamily: 'var(--font-hind)' }}>
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-200 group-hover:scale-125"
                      style={{ background: '#D4A017' }} />
                    {t(link.bn, link.en)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-bold text-base mb-5 pb-2 border-b" style={{ fontFamily: 'var(--font-hind)', borderColor: 'rgba(212,160,23,0.4)' }}>
              {t('আমাদের পণ্য', 'Our Products')}
            </h3>
            <ul className="space-y-2.5">
              {activeProductLinks.map((p) => (
                <li key={p.bn}>
                  <Link href={p.href || '/products'}
                    className="text-sm transition-colors duration-200 flex items-center gap-2 group"
                    style={{ color: 'rgba(255,255,255,0.65)', fontFamily: 'var(--font-hind)' }}>
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: '#D4A017' }} />
                    {t(p.bn, p.en)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-base mb-5 pb-2 border-b" style={{ fontFamily: 'var(--font-hind)', borderColor: 'rgba(212,160,23,0.4)' }}>
              {t('যোগাযোগ', 'Contact')}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#D4A017' }} />
                <span className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)', fontFamily: 'var(--font-hind)' }}>
                  {t(contactAddr, contactAddrEn)}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 flex-shrink-0" style={{ color: '#D4A017' }} />
                <a href={`tel:${contactPhone.replace(/\s/g, '')}`} className="text-sm hover:text-white transition-colors"
                  style={{ color: 'rgba(255,255,255,0.65)', fontFamily: 'var(--font-inter)' }}>
                  {contactPhone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 flex-shrink-0" style={{ color: '#D4A017' }} />
                <a href={`mailto:${contactEmail}`} className="text-sm hover:text-white transition-colors"
                  style={{ color: 'rgba(255,255,255,0.65)', fontFamily: 'var(--font-inter)' }}>
                  {contactEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-hind)' }}>
            {t(`© ${new Date().getFullYear()} প্যারাগন জৈব সার। সর্বস্বত্ব সংরক্ষিত।`, `© ${new Date().getFullYear()} Paragon Organic Fertilizer. All rights reserved.`)}
          </p>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-inter)' }}>
            {t("Paragon Organic Fertilizer — মাটির প্রাণ, কৃষকের আস্থা", "Paragon Organic Fertilizer — Soul of Soil, Farmer's Trust")}
          </p>
        </div>
      </div>
    </footer>
  )
}
