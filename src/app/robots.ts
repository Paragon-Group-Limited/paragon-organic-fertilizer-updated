import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://paragonorganicfertilizer.com'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/editor', '/api/', '/checkout', '/wishlist'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
