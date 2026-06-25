import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function POST(req: NextRequest) {
  try {
    const { ids } = await req.json() as { ids: string[] }

    if (!ids || ids.length === 0) {
      return NextResponse.json({ products: [] })
    }

    const payload = await getPayload({ config })

    const result = await payload.find({
      collection: 'products',
      where: { id: { in: ids } },
      limit: 50,
      depth: 2,
    })

    return NextResponse.json({ products: result.docs })
  } catch (err) {
    console.error('[api/products/by-ids]', err)
    return NextResponse.json({ products: [] }, { status: 500 })
  }
}
