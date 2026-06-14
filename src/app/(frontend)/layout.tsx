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

export const metadata: Metadata = {
  title: {
    default: 'প্যারাগন জৈব সার — মাটির প্রাণ, কৃষকের আস্থা',
    template: '%s | প্যারাগন জৈব সার',
  },
  description:
    'উপকারী অণুজীব সমৃদ্ধ ১০০% অর্গানিক জৈব সার। মাটির গঠন উন্নত করুন, ফসলের উৎপাদন বাড়ান।',
  keywords: ['জৈব সার', 'organic fertilizer', 'Paragon', 'Bangladesh', 'কৃষি'],
  openGraph: {
    type: 'website',
    locale: 'bn_BD',
    siteName: 'Paragon Organic Fertilizer',
  },
}

async function fetchSiteSettings() {
  try {
    const payload = await getPayload({ config })
    return await payload.findGlobal({ slug: 'site-settings' })
  } catch {
    return null
  }
}

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  const siteSettings = await fetchSiteSettings()

  return (
    <html lang="bn" className={`${hindSiliguri.variable} ${inter.variable}`}>
      <body className="antialiased">
        <Providers siteSettings={siteSettings}>
          {children}
        </Providers>
      </body>
    </html>
  )
}
