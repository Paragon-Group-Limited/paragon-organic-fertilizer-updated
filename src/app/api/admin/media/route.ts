import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function POST(req: NextRequest) {
  try {
    const payload = await getPayload({ config })
    const formData = await req.formData()
    const file = formData.get('file') as File | null
    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })

    const buffer = Buffer.from(await file.arrayBuffer())
    const result = await payload.create({
      collection: 'media',
      data: { alt: file.name },
      file: {
        data: buffer,
        mimetype: file.type,
        name: file.name,
        size: file.size,
      },
    })

    return NextResponse.json({ id: result.id, url: (result as Record<string, unknown>).url })
  } catch (err) {
    console.error('[admin/media POST]', err)
    return NextResponse.json({ error: 'Failed to upload media' }, { status: 500 })
  }
}
