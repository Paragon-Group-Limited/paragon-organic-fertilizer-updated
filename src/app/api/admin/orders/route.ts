import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function GET() {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'orders',
      limit: 200,
      depth: 0,
      sort: '-createdAt',
      overrideAccess: true,
    })
    return NextResponse.json({ docs: result.docs, total: result.totalDocs })
  } catch (err) {
    console.error('[admin/orders GET]', err)
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const payload = await getPayload({ config })
    const { id, ...data } = await req.json()
    if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })
    const order = await payload.update({ collection: 'orders', id, data, overrideAccess: true })
    return NextResponse.json({ order })
  } catch (err) {
    console.error('[admin/orders PATCH]', err)
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const payload = await getPayload({ config })
    const { searchParams } = req.nextUrl
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })
    await payload.delete({ collection: 'orders', id, overrideAccess: true })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[admin/orders DELETE]', err)
    return NextResponse.json({ error: 'Failed to delete order' }, { status: 500 })
  }
}
