import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function GET() {
  const payload = await getPayload({ config })
  const settings = await payload.findGlobal({ slug: 'site-settings', depth: 0 })
  return NextResponse.json({ layout: (settings as Record<string, unknown>).navbarData ?? null })
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const payload = await getPayload({ config })
  await payload.updateGlobal({
    slug: 'site-settings',
    data: { navbarData: body.layout },
    overrideAccess: true,
  })
  return NextResponse.json({ success: true })
}
