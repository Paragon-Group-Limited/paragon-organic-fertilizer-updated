import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'price', 'status', 'featured'],
    description: 'Product catalog — manage all products here',
    components: {
      views: {
        list: {
          Component: '@/app/(payload)/admin/views/ProductsListView',
        },
      },
    },
  },
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
        { label: 'Vermicompost', value: 'vermicompost' },
        { label: 'Organic Pesticide', value: 'organic-pesticide' },
        { label: 'Soil Improver', value: 'soil-improver' },
      ],
    },
    { name: 'image', type: 'upload', relationTo: 'media', label: 'Main Product Image' },
    {
      name: 'gallery',
      type: 'array',
      label: 'Additional Images',
      fields: [{ name: 'image', type: 'upload', relationTo: 'media' }],
    },
    { name: 'shortDescription', type: 'textarea', label: 'Short Description' },
    { name: 'description', type: 'richText', label: 'Full Description' },
    {
      name: 'benefits',
      type: 'array',
      label: 'Benefits',
      fields: [{ name: 'benefit', type: 'text', label: 'Benefit' }],
    },
    { name: 'usage', type: 'richText', label: 'Usage Instructions' },
    { name: 'price', type: 'number', label: 'Price (BDT)', admin: { position: 'sidebar' } },
    { name: 'comparePrice', type: 'number', label: 'Compare-at Price (BDT) — for discount display', admin: { position: 'sidebar' } },
    { name: 'weight', type: 'text', label: 'Weight / Size', admin: { position: 'sidebar' } },
    { name: 'rating', type: 'number', label: 'Rating (0–5)', admin: { position: 'sidebar' } },
    { name: 'reviewCount', type: 'number', label: 'Review Count', admin: { position: 'sidebar' } },
    {
      name: 'status',
      type: 'select',
      label: 'Status',
      options: [
        { label: 'Published', value: 'published' },
        { label: 'Upcoming (Coming Soon)', value: 'upcoming' },
        { label: 'Draft', value: 'draft' },
      ],
      defaultValue: 'published',
      admin: { position: 'sidebar' },
    },
    { name: 'featured', type: 'checkbox', label: 'Featured Product', admin: { position: 'sidebar' } },
  ],
}
