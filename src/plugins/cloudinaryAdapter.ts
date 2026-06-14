import type {
  Adapter,
  GenerateURL,
  HandleDelete,
  HandleUpload,
  StaticHandler,
} from '@payloadcms/plugin-cloud-storage/types'

const FOLDER = 'paragon-organic'

const getResourceType = (filename: string): 'image' | 'video' | 'raw' => {
  const ext = filename.split('.').pop()?.toLowerCase() || ''
  if (['mp4', 'webm', 'mov', 'avi'].includes(ext)) return 'video'
  if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'avif', 'bmp'].includes(ext)) return 'image'
  return 'raw'
}

const getPublicId = (filename: string, prefix?: string): string => {
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, '')
  return prefix ? `${FOLDER}/${prefix}/${nameWithoutExt}` : `${FOLDER}/${nameWithoutExt}`
}

const getCloudinary = async () => {
  const { v2: cloudinary } = await import('cloudinary')
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  })
  return cloudinary
}

export const cloudinaryAdapter = (): Adapter =>
  ({ prefix }) => {
    const handleUpload: HandleUpload = ({ file }): Promise<void> => {
      return new Promise<void>(async (resolve, reject) => {
        const cloudinary = await getCloudinary()
        const stream = cloudinary.uploader.upload_stream(
          {
            public_id: getPublicId(file.filename, prefix),
            resource_type: 'auto',
            overwrite: true,
          },
          (error) => {
            if (error) return reject(error)
            resolve()
          },
        )
        stream.end(file.buffer)
      })
    }

    const handleDelete: HandleDelete = async ({ filename }) => {
      const cloudinary = await getCloudinary()
      const publicId = getPublicId(filename, prefix)
      const resourceType = getResourceType(filename)
      await cloudinary.uploader.destroy(publicId, { resource_type: resourceType })
    }

    const generateURL: GenerateURL = ({ filename }) => {
      const publicId = getPublicId(filename, prefix)
      const resourceType = getResourceType(filename)
      const cloudName = process.env.CLOUDINARY_CLOUD_NAME
      const ext = filename.split('.').pop()?.toLowerCase() || ''
      return `https://res.cloudinary.com/${cloudName}/${resourceType}/upload/${publicId}.${ext}`
    }

    const staticHandler: StaticHandler = (_req, { params }) => {
      const publicId = getPublicId(params.filename, prefix)
      const resourceType = getResourceType(params.filename)
      const ext = params.filename.split('.').pop()?.toLowerCase() || ''
      const url = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/${resourceType}/upload/${publicId}.${ext}`
      return Response.redirect(url, 302)
    }

    return {
      name: 'cloudinary',
      handleUpload,
      handleDelete,
      generateURL,
      staticHandler,
    }
  }
