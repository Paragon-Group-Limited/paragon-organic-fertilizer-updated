import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function GET() {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'blocked-phones',
      limit: 1000,
      overrideAccess: true,
    })
    return NextResponse.json({ phones: result.docs.map(d => d.phone) })
  } catch (err) {
    console.error('[blocked-phones GET]', err)
    return NextResponse.json({ phones: [] })
  }
}

export async function POST(req: NextRequest) {
  try {
    const payload = await getPayload({ config })
    const { phone, reason, blockedBy, orderCount } = await req.json()
    if (!phone) return NextResponse.json({ error: 'phone required' }, { status: 400 })

    // Upsert: delete existing then create fresh
    const existing = await payload.find({
      collection: 'blocked-phones',
      where: { phone: { equals: phone } },
      overrideAccess: true,
    })
    for (const doc of existing.docs) {
      await payload.delete({ collection: 'blocked-phones', id: String(doc.id), overrideAccess: true })
    }

    await payload.create({
      collection: 'blocked-phones',
      data: { phone, reason: reason || 'Blocked by admin', blockedBy: blockedBy || 'admin', blockedAt: new Date().toISOString(), orderCount: orderCount ?? 0 },
      overrideAccess: true,
    })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[blocked-phones POST]', err)
    return NextResponse.json({ error: 'Failed to block phone' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const payload = await getPayload({ config })
    const phone = req.nextUrl.searchParams.get('phone')
    if (!phone) return NextResponse.json({ error: 'phone required' }, { status: 400 })

    const existing = await payload.find({
      collection: 'blocked-phones',
      where: { phone: { equals: phone } },
      overrideAccess: true,
    })
    for (const doc of existing.docs) {
      await payload.delete({ collection: 'blocked-phones', id: String(doc.id), overrideAccess: true })
    }
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[blocked-phones DELETE]', err)
    return NextResponse.json({ error: 'Failed to unblock phone' }, { status: 500 })
  }
}
