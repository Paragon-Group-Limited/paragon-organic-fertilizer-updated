import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function GET() {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'applied-candidates',
      limit: 500,
      depth: 1,
      sort: '-createdAt',
      overrideAccess: true,
    })
    return NextResponse.json({ docs: result.docs, total: result.totalDocs })
  } catch (err) {
    console.error('[applied-candidates GET]', err)
    return NextResponse.json({ error: 'Failed to fetch candidates' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const payload = await getPayload({ config })
    const { id, ...data } = await req.json()
    if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })
    const doc = await payload.update({ collection: 'applied-candidates', id, data, overrideAccess: true })
    return NextResponse.json({ doc })
  } catch (err) {
    console.error('[applied-candidates PATCH]', err)
    return NextResponse.json({ error: 'Failed to update candidate' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const payload = await getPayload({ config })
    const id = req.nextUrl.searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })
    await payload.delete({ collection: 'applied-candidates', id, overrideAccess: true })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[applied-candidates DELETE]', err)
    return NextResponse.json({ error: 'Failed to delete candidate' }, { status: 500 })
  }
}
