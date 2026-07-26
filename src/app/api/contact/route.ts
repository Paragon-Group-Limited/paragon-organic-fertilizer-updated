import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { sendNotificationEmail } from '@/lib/sendEmail'

export async function POST(req: NextRequest) {
  try {
    const payload = await getPayload({ config })
    const body = await req.json()

    const name = (body.name as string | undefined)?.trim() || ''
    const phone = (body.phone as string | undefined)?.trim() || ''
    const subject = (body.subject as string | undefined)?.trim() || ''
    const message = (body.message as string | undefined)?.trim() || ''

    if (!name || !phone || !message) {
      return NextResponse.json({ error: 'নাম, ফোন ও বার্তা আবশ্যক' }, { status: 400 })
    }

    await payload.create({
      collection: 'contact-messages',
      overrideAccess: true,
      data: { name, phone, subject, message },
    })

    sendNotificationEmail({
      subject: `📩 নতুন বার্তা: ${subject || 'যোগাযোগ ফর্ম'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
          <h2 style="color: #1B4D3E; border-bottom: 2px solid #1B4D3E; padding-bottom: 10px;">📩 নতুন যোগাযোগ বার্তা</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr><td style="padding: 8px; font-weight: bold; color: #374151; width: 120px;">নাম</td><td style="padding: 8px; color: #1a1a1a;">${name}</td></tr>
            <tr style="background:#f9fafb;"><td style="padding: 8px; font-weight: bold; color: #374151;">ফোন</td><td style="padding: 8px; color: #1a1a1a;">${phone}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; color: #374151;">বিষয়</td><td style="padding: 8px; color: #1a1a1a;">${subject || '—'}</td></tr>
            <tr style="background:#f9fafb;"><td style="padding: 8px; font-weight: bold; color: #374151; vertical-align: top;">বার্তা</td><td style="padding: 8px; color: #1a1a1a; white-space: pre-wrap;">${message}</td></tr>
          </table>
          <p style="margin-top: 20px; font-size: 12px; color: #9ca3af;">Paragon Organic Fertilizer Website — Admin Dashboard: <a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin/collections/contact-messages">বার্তা দেখুন</a></p>
        </div>
      `,
    }).catch(err => console.error('[contact] email error:', err))

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[contact]', err)
    return NextResponse.json({ error: 'সার্ভার ত্রুটি হয়েছে' }, { status: 500 })
  }
}
