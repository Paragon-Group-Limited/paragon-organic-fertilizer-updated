'use client'

import { LanguageProvider } from '@/contexts/LanguageContext'
import { CartProvider } from '@/contexts/CartContext'
import Navbar from './Navbar'
import Footer from './Footer'

type SocialLink = { icon?: string; url?: string; label?: string }

type SiteSettings = {
  siteName?: string
  siteSubtitle?: string
  ctaLabel?: string
  ctaHref?: string
  logo?: { url?: string; alt?: string }
  socialLinks?: SocialLink[]
  navbarData?: unknown
  footerData?: unknown
}

export type NavPage = {
  id: string | number
  slug: string
  title: string
  navLabelBn?: string | null
  navLabelEn?: string | null
  navOrder?: number | null
  showInNavbar?: boolean | null
}

export function Providers({
  children,
  siteSettings,
  navPages = [],
}: {
  children: React.ReactNode
  siteSettings: SiteSettings | null
  navPages?: NavPage[]
}) {
  return (
    <LanguageProvider>
      <CartProvider>
        <Navbar siteSettings={siteSettings} navbarPuckData={siteSettings?.navbarData} navPages={navPages} />
        <main>{children}</main>
        <Footer
          socialLinks={siteSettings?.socialLinks}
          logo={siteSettings?.logo}
          siteName={siteSettings?.siteName}
          siteSubtitle={siteSettings?.siteSubtitle}
          footerPuckData={siteSettings?.footerData}
        />
      </CartProvider>
    </LanguageProvider>
  )
}
