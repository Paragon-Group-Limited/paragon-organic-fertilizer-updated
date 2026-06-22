import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Products } from './collections/Products'
import { Dealers } from './collections/Dealers'
import { Careers } from './collections/Careers'
import { HeroSlides } from './collections/HeroSlides'
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    theme: 'light',
    meta: {
      titleSuffix: '— Paragon Admin',
      description: 'Paragon Organic Fertilizer CMS',
    },
    avatar: {
      Component: '@/app/(payload)/admin/components/UserAvatarDropdown',
    },
  },
  onInit: async (payload) => {
    const email = process.env.ADMIN_EMAIL || 'admin@paragon.com.bd'
    const password = process.env.ADMIN_PASSWORD || 'Paragon@123'
    const existing = await payload.find({ collection: 'users', where: { email: { equals: email } }, limit: 1 })
    if (existing.totalDocs === 0) {
      await payload.create({
        collection: 'users',
        data: { email, password, name: 'Admin', role: 'admin' },
      })
      payload.logger.info(`Admin user created: ${email}`)
    }
  },
  collections: [Users, Media, Pages, Products, Dealers, Careers, HeroSlides],
  globals: [SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'paragon-secret-change-in-production',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
    push: true,
  }),
  sharp,
  cors: [process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'],
})
