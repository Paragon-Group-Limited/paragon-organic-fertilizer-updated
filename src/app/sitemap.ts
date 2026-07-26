import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://paragonorganicfertilizer.com'

const STATIC_ROUTES: MetadataRoute.Sitemap = [
  { url: SITE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
  { url: `${SITE_URL}/products`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
  { url: `${SITE_URL}/shop`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
  { url: `${SITE_URL}/about/our-story`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  { url: `${SITE_URL}/about/soil-benefit`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  { url: `${SITE_URL}/about/why-this-product`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  { url: `${SITE_URL}/about/paragon-group`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  { url: `${SITE_URL}/dealership`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  { url: `${SITE_URL}/career`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
  { url: `${SITE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const payload = await getPayload({ config })

    const products = await payload.find({
      collection: 'products',
      limit: 500,
      depth: 0,
      select: { slug: true, updatedAt: true },
    })

    const productUrls: MetadataRoute.Sitemap = products.docs
      .filter(p => p.slug)
      .map(p => ({
        url: `${SITE_URL}/shop/${p.slug}`,
        lastModified: new Date(p.updatedAt as string),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }))

    return [...STATIC_ROUTES, ...productUrls]
  } catch {
    return STATIC_ROUTES
  }
}
