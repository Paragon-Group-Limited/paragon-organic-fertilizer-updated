import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function PATCH(req: NextRequest) {
  try {
    const payload = await getPayload({ config })
    const { id, showInNavbar } = await req.json()
    if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })
    const page = await payload.update({
      collection: 'pages',
      id,
      data: { showInNavbar },
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
