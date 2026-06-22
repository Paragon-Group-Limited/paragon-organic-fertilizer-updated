import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'category', 'price', 'status'] },
  access: { read: () => true },
  fields: [
    { name: 'name', type: 'text', required: true, label: 'Product Name (English)' },
    { name: 'nameBn', type: 'text', required: true, label: 'Product Name (Bengali)' },
    { name: 'slug', type: 'text', required: true, unique: true, admin: { position: 'sidebar' } },
    {
      name: 'category',
      type: 'select',
      label: 'Category',
      options: [
        { label: 'Organic Fertilizer', value: 'organic-fertilizer' },
        { label: 'Organic Pesticide', value: 'organic-pesticide' },
        { label: 'Soil Improver', value: 'soil-improver' },
      ],
    },
    { name: 'image', type: 'upload', relationTo: 'media', label: 'Product Image' },
    {
      name: 'gallery',
      type: 'array',
      label: 'Image Gallery',
      fields: [{ name: 'image', type: 'upload', relationTo: 'media' }],
    },
    { name: 'shortDescription', type: 'textarea', label: 'Short Description (Bengali)' },
    { name: 'description', type: 'richText', label: 'Full Description' },
    {
      name: 'benefits',
      type: 'array',
      label: 'Benefits',
      fields: [{ name: 'benefit', type: 'text', label: 'Benefit' }],
    },
    {
      name: 'usage',
      type: 'richText',
      label: 'Usage (How to Use)',
    },
    { name: 'price', type: 'number', label: 'Price (BDT)', admin: { position: 'sidebar' } },
    { name: 'weight', type: 'text', label: 'Weight/Size', admin: { position: 'sidebar' } },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Published', value: 'published' },
        { label: 'Draft', value: 'draft' },
      ],
      defaultValue: 'published',
      admin: { position: 'sidebar' },
    },
    { name: 'featured', type: 'checkbox', label: 'Featured Product', admin: { position: 'sidebar' } },
  ],
}
