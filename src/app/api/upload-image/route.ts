import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData()
    const file = form.get('image') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No image file provided' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const result = await new Promise<{ secure_url: string; public_id: string }>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { folder: 'paragon/puck', resource_type: 'image', use_filename: true, unique_filename: true },
            (err, res) => {
              if (err || !res) reject(err ?? new Error('Upload failed'))
              else resolve(res as { secure_url: string; public_id: string })
            },
          )
          .end(buffer)
      },
    )

    return NextResponse.json({ url: result.secure_url, publicId: result.public_id })
  } catch (err) {
    console.error('[upload-image]', err)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
