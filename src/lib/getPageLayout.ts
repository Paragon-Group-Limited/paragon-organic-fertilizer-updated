import { getPayload } from 'payload'
import config from '@payload-config'

export async function getPageLayout(slug: string): Promise<object | null> {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'pages',
      where: { slug: { equals: slug } },
      depth: 0,
    })
    return (result.docs[0]?.layout as object) ?? null
  } catch {
    return null
  }
}
