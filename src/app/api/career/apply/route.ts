import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { sendNotificationEmail } from '@/lib/sendEmail'

export async function POST(req: NextRequest) {
  try {
    const payload = await getPayload({ config })
    const form = await req.formData()

    const fullName    = form.get('fullName') as string
    const mobile      = form.get('mobile') as string
    const address     = form.get('address') as string
    const applyingFor = form.get('applyingFor') as string
    const cvFile      = form.get('cv') as File | null

    if (!fullName || !mobile) {
      return NextResponse.json({ error: 'Full name and mobile are required' }, { status: 400 })
    }

    let cvId: number | string | undefined

    // Upload CV if provided — keep original ID type (number) as Payload expects
    if (cvFile && cvFile.size > 0) {
      try {
        const buffer = Buffer.from(await cvFile.arrayBuffer())
        const media = await payload.create({
          collection: 'media',
          data: { alt: `CV - ${fullName}` },
          file: { data: buffer, mimetype: cvFile.type, name: cvFile.name, size: cvFile.size },
          overrideAccess: true,
        })
        cvId = media.id as number | string
      } catch (uploadErr) {
        // CV upload failed — proceed without CV rather than blocking the application
        console.error('[career/apply] CV upload failed (proceeding without CV):', uploadErr)
      }
    }

    const candidateData: Record<string, unknown> = {
      fullName,
      mobile,
      status: 'new',
    }
    if (address)     candidateData.address     = address
    if (applyingFor) candidateData.applyingFor = applyingFor
    if (cvId != null) candidateData.cv = cvId

    await payload.create({
      collection: 'applied-candidates',
      data: candidateData as Parameters<typeof payload.create>[0]['data'],
      overrideAccess: true,
    })

    sendNotificationEmail({
      subject: `👤 নতুন চাকরির আবেদন: ${fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
          <h2 style="color: #1B4D3E; border-bottom: 2px solid #1B4D3E; padding-bottom: 10px;">👤 নতুন চাকরির আবেদন</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr><td style="padding: 8px; font-weight: bold; color: #374151; width: 140px;">নাম</td><td style="padding: 8px;">${fullName}</td></tr>
            <tr style="background:#f9fafb;"><td style="padding: 8px; font-weight: bold; color: #374151;">মোবাইল</td><td style="padding: 8px;">${mobile}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; color: #374151;">পদ</td><td style="padding: 8px;">${applyingFor || '—'}</td></tr>
            <tr style="background:#f9fafb;"><td style="padding: 8px; font-weight: bold; color: #374151;">ঠিকানা</td><td style="padding: 8px;">${address || '—'}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; color: #374151;">CV</td><td style="padding: 8px;">${cvId ? 'সংযুক্ত আছে ✅' : 'নেই'}</td></tr>
          </table>
          <p style="margin-top: 20px; font-size: 12px; color: #9ca3af;">Admin Dashboard: <a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin/collections/applied-candidates">আবেদন দেখুন</a></p>
        </div>
      `,
    }).catch(err => console.error('[career/apply] email error:', err))

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[career/apply]', err)
    const msg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: 'Failed to submit application', detail: msg }, { status: 500 })
  }
}
