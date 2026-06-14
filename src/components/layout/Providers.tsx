'use client'

import { LanguageProvider } from '@/contexts/LanguageContext'
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
}

export function Providers({
  children,
  siteSettings,
}: {
  children: React.ReactNode
  siteSettings: SiteSettings | null
}) {
  return (
    <LanguageProvider>
      <Navbar siteSettings={siteSettings} />
      <main>{children}</main>
      <Footer socialLinks={siteSettings?.socialLinks} logo={siteSettings?.logo} siteName={siteSettings?.siteName} siteSubtitle={siteSettings?.siteSubtitle} />
    </LanguageProvider>
  )
}
