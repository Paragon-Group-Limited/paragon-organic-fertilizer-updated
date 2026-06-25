import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

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

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[career/apply]', err)
    const msg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: 'Failed to submit application', detail: msg }, { status: 500 })
  }
}
