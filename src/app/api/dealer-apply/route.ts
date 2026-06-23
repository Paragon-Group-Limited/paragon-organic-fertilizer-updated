import { getPayload } from 'payload'
import config from '@payload-config'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const payload = await getPayload({ config })
    const form = await req.formData()

    const name = (form.get('name') as string | null)?.trim() || ''
    const org = (form.get('org') as string | null)?.trim() || ''
    const phone = (form.get('phone') as string | null)?.trim() || ''
    const address = (form.get('address') as string | null)?.trim() || ''
    const experience = (form.get('experience') as string | null)?.trim() || ''
    const file = form.get('tradeLicense') as File | null

    if (!name || !phone || !address) {
      return NextResponse.json({ error: 'নাম, ফোন ও ঠিকানা আবশ্যক' }, { status: 400 })
    }

    // Parse district/upazila from address (e.g. "বগুড়া, শেরপুর")
    const parts = address.split(',').map(p => p.trim())
    const district = parts[0] || address
    const upazila = parts[1] || ''

    let tradeLicenseId: number | string | undefined

    if (file && file.size > 0) {
      try {
        const buffer = Buffer.from(await file.arrayBuffer())
        const media = await payload.create({
          collection: 'media',
          overrideAccess: true,
          data: { alt: `Trade License – ${name}` },
          file: { data: buffer, mimetype: file.type, name: file.name, size: file.size },
        })
        tradeLicenseId = media.id
      } catch (uploadErr) {
        console.error('[dealer-apply] file upload failed:', uploadErr)
      }
    }

    await payload.create({
      collection: 'dealers',
      overrideAccess: true,
      data: {
        name,
        org,
        phone,
        district,
        upazila,
        address,
        experience,
        status: 'pending',
        ...(tradeLicenseId !== undefined ? { tradeLicense: tradeLicenseId } : {}),
      },
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[dealer-apply]', err)
    const message = err instanceof Error ? err.message : String(err)
    const cause = (err as any)?.cause?.message ?? (err as any)?.cause ?? null
    const stack = err instanceof Error ? err.stack?.split('\n').slice(0, 5).join(' | ') : null
    return NextResponse.json({ error: 'সার্ভার ত্রুটি হয়েছে', detail: message, cause, stack }, { status: 500 })
  }
}
