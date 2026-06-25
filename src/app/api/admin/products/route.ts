import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function GET() {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'products',
      limit: 200,
      depth: 1,
      sort: '-createdAt',
    })
    return NextResponse.json({ products: result.docs, total: result.totalDocs })
  } catch (err) {
    console.error('[admin/products GET]', err)
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const payload = await getPayload({ config })
    const body = await req.json()
    const product = await payload.create({
      collection: 'products',
      data: body,
    })
    return NextResponse.json({ product })
  } catch (err) {
    console.error('[admin/products POST]', err)
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const payload = await getPayload({ config })
    const body = await req.json()
    const { id, ...data } = body
    if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })
    const product = await payload.update({
      collection: 'products',
      id,
      data,
      overrideAccess: true,
    })
    return NextResponse.json({ product })
  } catch (err) {
    console.error('[admin/products PATCH]', err)
    const msg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: msg || 'Failed to update product' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const payload = await getPayload({ config })
    const { searchParams } = req.nextUrl
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })
    await payload.delete({ collection: 'products', id })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[admin/products DELETE]', err)
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 })
  }
}
