import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function PATCH(req: NextRequest) {
  try {
    const payload = await getPayload({ config })
    const body = await req.json()
    const { id, showInNavbar, status } = body
    if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: Record<string, any> = {}
    if (showInNavbar !== undefined) data.showInNavbar = showInNavbar
    if (status !== undefined) data.status = status
    const page = await payload.update({
      collection: 'pages',
      id,
      data,
      overrideAccess: true,
    })
    return NextResponse.json({ page })
  } catch (err) {
    console.error('[admin/pages PATCH]', err)
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const payload = await getPayload({ config })
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })
    await payload.delete({
      collection: 'pages',
      id,
      overrideAccess: true,
    })
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[admin/pages DELETE]', err)
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
