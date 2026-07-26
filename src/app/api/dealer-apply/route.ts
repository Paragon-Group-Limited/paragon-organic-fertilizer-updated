import { getPayload } from 'payload'
import config from '@payload-config'
import { NextRequest, NextResponse } from 'next/server'
import { sendNotificationEmail } from '@/lib/sendEmail'

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
    let uploadError: string | null = null

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
        uploadError = uploadErr instanceof Error ? `${uploadErr.message} | cause: ${(uploadErr as any)?.cause?.message ?? ''}` : String(uploadErr)
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

    sendNotificationEmail({
      subject: `🤝 নতুন ডিলারশিপ আবেদন: ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
          <h2 style="color: #1B4D3E; border-bottom: 2px solid #1B4D3E; padding-bottom: 10px;">🤝 নতুন ডিলারশিপ আবেদন</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr><td style="padding: 8px; font-weight: bold; color: #374151; width: 140px;">নাম</td><td style="padding: 8px;">${name}</td></tr>
            <tr style="background:#f9fafb;"><td style="padding: 8px; font-weight: bold; color: #374151;">প্রতিষ্ঠান</td><td style="padding: 8px;">${org || '—'}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; color: #374151;">ফোন</td><td style="padding: 8px;">${phone}</td></tr>
            <tr style="background:#f9fafb;"><td style="padding: 8px; font-weight: bold; color: #374151;">জেলা</td><td style="padding: 8px;">${district}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; color: #374151;">উপজেলা</td><td style="padding: 8px;">${upazila || '—'}</td></tr>
            <tr style="background:#f9fafb;"><td style="padding: 8px; font-weight: bold; color: #374151; vertical-align: top;">অভিজ্ঞতা</td><td style="padding: 8px; white-space: pre-wrap;">${experience || '—'}</td></tr>
          </table>
          <p style="margin-top: 20px; font-size: 12px; color: #9ca3af;">Admin Dashboard: <a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin/collections/dealers">আবেদন দেখুন</a></p>
        </div>
      `,
    }).catch(err => console.error('[dealer-apply] email error:', err))

    return NextResponse.json({ success: true, tradeLicenseId: tradeLicenseId ?? null, uploadError })
  } catch (err) {
    console.error('[dealer-apply]', err)
    const message = err instanceof Error ? err.message : String(err)
    const cause = (err as any)?.cause?.message ?? (err as any)?.cause ?? null
    const stack = err instanceof Error ? err.stack?.split('\n').slice(0, 5).join(' | ') : null
    return NextResponse.json({ error: 'সার্ভার ত্রুটি হয়েছে', detail: message, cause, stack }, { status: 500 })
  }
}
