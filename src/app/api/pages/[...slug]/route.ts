import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

async function resolveSlug(params: Promise<{ slug: string[] }>) {
  const { slug } = await params
  return Array.isArray(slug) ? slug.join('/') : slug
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> },
) {
  const slug = await resolveSlug(params)
  const body = await req.json()
  const payload = await getPayload({ config })

  const existing = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
  })

  if (existing.docs.length > 0) {
    await payload.update({
      collection: 'pages',
      id: existing.docs[0].id,
      data: { layout: body.layout, status: 'published' },
    })
  } else {
    await payload.create({
      collection: 'pages',
      data: { title: slug, slug, layout: body.layout, status: 'published' },
    })
  }

  return NextResponse.json({ success: true })
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> },
) {
  const slug = await resolveSlug(params)
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
  })

  if (!result.docs.length) {
    return NextResponse.json({ layout: null }, { status: 404 })
  }

  return NextResponse.json({ layout: result.docs[0].layout })
}
