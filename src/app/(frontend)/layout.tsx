import type { Metadata } from 'next'
import { Hind_Siliguri, Inter } from 'next/font/google'
import '../globals.css'
import { Providers } from '@/components/layout/Providers'
import { getPayload } from 'payload'
import config from '@payload-config'

const hindSiliguri = Hind_Siliguri({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['bengali', 'latin'],
  variable: '--font-hind',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://paragonorganicfertilizer.com'
const OG_IMAGE = `${SITE_URL}/og-image.jpg`

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'প্যারাগন জৈব সার — মাটির প্রাণ, কৃষকের আস্থা',
    template: '%s | প্যারাগন জৈব সার',
  },
  description:
    'উপকারী অণুজীব সমৃদ্ধ ১০০% অর্গানিক জৈব সার। মাটির গঠন উন্নত করুন, ফসলের উৎপাদন বাড়ান।',
  keywords: ['জৈব সার', 'organic fertilizer', 'Paragon', 'Bangladesh', 'কৃষি', 'জৈব সার বাংলাদেশ', 'paragon organic fertilizer'],
  alternates: {
    canonical: SITE_URL,
    languages: { 'bn-BD': SITE_URL, 'x-default': SITE_URL },
  },
  openGraph: {
    type: 'website',
    locale: 'bn_BD',
    siteName: 'Paragon Organic Fertilizer',
    url: SITE_URL,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'প্যারাগন জৈব সার' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'প্যারাগন জৈব সার — মাটির প্রাণ, কৃষকের আস্থা',
    description: 'উপকারী অণুজীব সমৃদ্ধ ১০০% অর্গানিক জৈব সার।',
    images: [OG_IMAGE],
  },
  robots: { index: true, follow: true },
  verification: { google: 'zYYHnRDV9munbaEu0xqFst0Zey9Xb03BzGydlGFXdNk' },
}

async function fetchSiteSettings() {
  try {
    const payload = await getPayload({ config })
    return await payload.findGlobal({ slug: 'site-settings' })
  } catch {
    return null
  }
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Paragon Organic Fertilizer',
  url: 'https://paragonorganicfertilizer.com',
  logo: 'https://paragonorganicfertilizer.com/og-image.jpg',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+880',
    contactType: 'customer service',
    areaServed: 'BD',
    availableLanguage: ['Bengali', 'English'],
  },
  sameAs: ['https://paragonorganicfertilizer.com'],
}

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  const siteSettings = await fetchSiteSettings()

  return (
    <html lang="bn" className={`${hindSiliguri.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="antialiased">
        <Providers siteSettings={siteSettings}>
          {children}
        </Providers>
      </body>
    </html>
  )
}
