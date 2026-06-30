'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown, Leaf, Heart } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { useCart } from '@/contexts/CartContext'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import CartDropdown from '@/components/shop/CartDropdown'
import NavSearch from '@/components/shop/NavSearch'

const navLinks = [
  { href: '/', bn: 'হোম', en: 'Home' },
  {
    bn: 'সম্পর্কে', en: 'About',
    children: [
      { href: '/about/our-story',        bn: 'আমাদের গল্প',       en: 'Our Story' },
      { href: '/about/soil-benefit',     bn: 'মাটির উপকার',       en: 'Soil Benefit' },
      { href: '/about/why-this-product', bn: 'কেন এই পণ্য?',      en: 'Why This Product?' },
      { href: '/about/paragon-group',    bn: 'প্যারাগন গ্রুপ',    en: 'Paragon Group' },
    ],
  },
  { href: '/shop',       bn: 'পণ্য ও ক্রয়',   en: 'Products' },
  { href: '/dealership', bn: 'ডিলারশিপ',       en: 'Dealership' },
  { href: '/career',     bn: 'ক্যারিয়ার',      en: 'Career' },
  { href: '/contact',    bn: 'যোগাযোগ',        en: 'Contact' },
]

type SiteSettings = {
  siteName?: string
  siteSubtitle?: string
  ctaLabel?: string
  ctaHref?: string
  logo?: { url?: string; alt?: string }
}

type NavLink = { href?: string; bn: string; en: string }

type NavbarPuckProps = {
  siteName?: string
  siteSubtitle?: string
  ctaLabel?: string
  ctaLabelEn?: string
  ctaHref?: string
  logoUrl?: string
  navLinks?: NavLink[]
  aboutChildren?: NavLink[]
}

function extractNavbarPuck(data: unknown): NavbarPuckProps | null {
  if (!data || typeof data !== 'object') return null
  const d = data as { content?: Array<{ type: string; props: NavbarPuckProps }> }
  const block = d.content?.find(b => b.type === 'NavbarConfigBlock')
  return block?.props ?? null
}

export default function Navbar({
  siteSettings,
  navbarPuckData,
}: {
  siteSettings?: SiteSettings | null
  navbarPuckData?: unknown
}) {
  const { lang } = useLanguage()
  const { wishlist } = useCart()

  const puck = extractNavbarPuck(navbarPuckData)

  const siteName     = puck?.siteName     || siteSettings?.siteName     || 'প্যারাগন'
  const siteSubtitle = puck?.siteSubtitle || siteSettings?.siteSubtitle || 'Organic Fertilizer'
  const ctaHref      = puck?.ctaHref      || siteSettings?.ctaHref      || '/shop'
  const ctaLabel     = lang === 'en'
    ? (puck?.ctaLabelEn || 'Order Now')
    : (puck?.ctaLabel   || siteSettings?.ctaLabel || 'এখনই কিনুন')
  const logoUrl      = puck?.logoUrl      || (siteSettings as { logo?: { url?: string } } | null)?.logo?.url || ''

  // Build active nav links — use Puck data when available, fallback to hardcoded
  const activeNavLinks = puck?.navLinks?.length
    ? puck.navLinks.map(l => ({
        href: l.href || '',
        bn: l.bn,
        en: l.en,
        children: (!l.href && puck.aboutChildren?.length)
          ? puck.aboutChildren.map(c => ({ href: c.href || '/', bn: c.bn, en: c.en }))
          : undefined,
      }))
    : navLinks

  const [scrolled,       setScrolled]       = useState(false)
  const [mobileOpen,     setMobileOpen]     = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const label = (link: { bn: string; en: string }) => lang === 'en' ? link.en : link.bn

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: (scrolled || mobileOpen)
          ? 'rgba(27, 77, 62, 0.97)'
          : 'linear-gradient(to bottom, rgba(0,0,0,0.4), transparent)',
        backdropFilter: (scrolled || mobileOpen) ? 'blur(12px)' : 'none',
        boxShadow: (scrolled || mobileOpen) ? '0 4px 30px rgba(0,0,0,0.15)' : 'none',
      }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-3">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            {logoUrl
              ? <img src={logoUrl} alt="Logo" className="h-10 w-auto object-contain" />
              : (
                <div className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #D4A017, #F5C842)' }}>
                  <Leaf className="w-5 h-5 text-white" strokeWidth={2.5} />
                </div>
              )
            }
            <div className="leading-tight">
              <div className="text-white font-bold text-base tracking-wide" style={{ fontFamily: 'var(--font-hind)' }}>
                {siteName}
              </div>
              <div className="text-xs font-medium tracking-widest uppercase"
                style={{ color: '#D4A017', fontFamily: 'var(--font-inter)' }}>
                {siteSubtitle}
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-1">
            {activeNavLinks.map((link) => (
              <li key={link.bn} className="relative"
                onMouseEnter={() => link.children && setActiveDropdown(link.bn)}
                onMouseLeave={() => setActiveDropdown(null)}>
                {link.href ? (
                  <Link href={link.href}
                    className="flex items-center gap-1 px-4 py-2 text-white/90 hover:text-white text-sm font-medium rounded-lg transition-all duration-200 hover:bg-white/10"
                    style={{ fontFamily: 'var(--font-hind)' }}>
                    {label(link)}
                  </Link>
                ) : (
                  <button
                    className="flex items-center gap-1 px-4 py-2 text-white/90 hover:text-white text-sm font-medium rounded-lg transition-all duration-200 hover:bg-white/10"
                    style={{ fontFamily: 'var(--font-hind)' }}>
                    {label(link)}
                    <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200"
                      style={{ transform: activeDropdown === link.bn ? 'rotate(180deg)' : 'none' }} />
                  </button>
                )}

                {link.children && (
                  <AnimatePresence>
                    {activeDropdown === link.bn && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-1 w-52 rounded-xl overflow-hidden"
                        style={{ background: 'rgba(27,77,62,0.97)', backdropFilter: 'blur(12px)', boxShadow: '0 20px 60px rgba(0,0,0,0.25)' }}>
                        {link.children.map((child) => (
                          <Link key={child.href} href={child.href}
                            className="block px-5 py-3 text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors duration-150 border-b border-white/5 last:border-0"
                            style={{ fontFamily: 'var(--font-hind)' }}>
                            {label(child)}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-2">
            <LanguageSwitcher />

            {/* Search */}
            <NavSearch />

            {/* Wishlist icon — visible when wishlist has items */}
            <AnimatePresence>
              {wishlist.length > 0 && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }} transition={{ type: 'spring', stiffness: 400, damping: 25 }}>
                  <Link href="/wishlist"
                    className="relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 hover:bg-white/20"
                    style={{ color: '#fff' }}>
                    <Heart className="w-5 h-5" style={{ fill: '#ef4444', color: '#ef4444' }} />
                    <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full flex items-center justify-center text-xs font-bold px-1"
                      style={{ background: '#ef4444', color: '#fff' }}>
                      {wishlist.length}
                    </span>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Cart dropdown */}
            <CartDropdown />

            <Link href={ctaHref}
              className="px-5 py-2.5 text-sm font-semibold rounded-full transition-all duration-300 hover:scale-105 active:scale-95"
              style={{ background: 'linear-gradient(135deg, #D4A017, #F5C842)', color: '#1B4D3E', fontFamily: 'var(--font-hind)' }}>
              {ctaLabel}
            </Link>
          </div>

          {/* Mobile: cart + toggle */}
          <div className="lg:hidden flex items-center gap-1">
            <CartDropdown size="sm" />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-white rounded-lg hover:bg-white/10 transition-colors">
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden"
            style={{ background: 'rgba(15, 46, 36, 0.98)', backdropFilter: 'blur(16px)' }}>
            <div className="px-4 py-4 space-y-1">
              {activeNavLinks.map((link, i) => (
                <motion.div key={link.bn}
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}>
                  {link.href ? (
                    <Link href={link.href} onClick={() => setMobileOpen(false)}
                      className="block px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg text-base font-medium transition-colors"
                      style={{ fontFamily: 'var(--font-hind)' }}>
                      {label(link)}
                    </Link>
                  ) : (
                    <>
                      <div className="px-4 py-3 text-white/60 text-xs uppercase tracking-widest font-medium"
                        style={{ fontFamily: 'var(--font-inter)' }}>
                        {label(link)}
                      </div>
                      {link.children?.map((child) => (
                        <Link key={child.href} href={child.href} onClick={() => setMobileOpen(false)}
                          className="block px-6 py-2.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg text-sm transition-colors"
                          style={{ fontFamily: 'var(--font-hind)' }}>
                          → {label(child)}
                        </Link>
                      ))}
                    </>
                  )}
                </motion.div>
              ))}
              <div className="pt-2 pb-1 px-4 flex items-center gap-3">
                <span className="text-white/50 text-xs" style={{ fontFamily: 'var(--font-inter)' }}>Language:</span>
                <LanguageSwitcher size="sm" />
              </div>
              <div className="pt-2 pb-2">
                <Link href={ctaHref} onClick={() => setMobileOpen(false)}
                  className="block text-center px-6 py-3 font-semibold rounded-full"
                  style={{ background: 'linear-gradient(135deg, #D4A017, #F5C842)', color: '#1B4D3E', fontFamily: 'var(--font-hind)' }}>
                  {ctaLabel}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
