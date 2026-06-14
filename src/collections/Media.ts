import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: { read: () => true },
  upload: {
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 300, position: 'centre' },
      { name: 'card', width: 768, height: 512, position: 'centre' },
      { name: 'hero', width: 1920, height: 1080, position: 'centre' },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*', 'video/mp4', 'video/webm'],
  },
  fields: [
    { name: 'alt', type: 'text', label: 'Alt Text' },
    { name: 'caption', type: 'text', label: 'Caption' },
  ],
}
