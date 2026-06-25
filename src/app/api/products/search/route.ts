import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q') ?? ''
  if (q.trim().length < 2) return NextResponse.json({ products: [] })

  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'products',
      where: {
        or: [
          { name: { like: q } },
          { nameBn: { like: q } },
        ],
      },
      limit: 6,
      depth: 1,
    })

    const products = result.docs.map(p => {
      const extra = p as Record<string, unknown>
      return {
        id: String(p.id),
        name: p.name,
        nameBn: extra.nameBn as string | undefined,
        slug: p.slug,
        price: p.price,
        image: (p.image as { url?: string | null } | null)?.url ?? null,
      }
    })

    return NextResponse.json({ products })
  } catch {
    return NextResponse.json({ products: [] }, { status: 500 })
  }
}
