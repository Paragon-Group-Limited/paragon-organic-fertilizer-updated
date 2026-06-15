import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    depth: 0,
  })

  if (!result.docs.length) {
    return NextResponse.json({ error: 'Page not found' }, { status: 404 })
  }

  const page = result.docs[0]
  return NextResponse.json({ title: page.title, slug: page.slug, layout: page.layout, status: page.status })
}
