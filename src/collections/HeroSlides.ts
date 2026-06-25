import type { CollectionConfig } from 'payload'

export const HeroSlides: CollectionConfig = {
  slug: 'hero-slides',
  labels: { singular: 'Hero Slide', plural: 'Hero Slides' },
  admin: {
    useAsTitle: 'headingBn',
    defaultColumns: ['headingBn', 'order', 'active'],
    description: 'Home page banner slides. Add, edit, reorder or disable slides here.',
    components: {
      views: {
        list: {
          Component: '@/app/(payload)/admin/views/HeroSlidesListView',
        },
      },
    },
  },
  access: { read: () => true },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Image (optional — overrides color if set)',
    },
    { name: 'headingBn', type: 'text', required: true, label: 'Heading (Bengali) *' },
    {
      type: 'row',
      fields: [
        { name: 'tagBn', type: 'text', label: 'Tag (Bengali)' },
        { name: 'tagEn', type: 'text', label: 'Tag (English)' },
      ],
    },
    { name: 'subtitleBn', type: 'textarea', label: 'Subtitle / Description (Bengali)' },
    {
      type: 'row',
      fields: [
        { name: 'cta1Label', type: 'text', label: 'Button 1 Label' },
        { name: 'cta1Href', type: 'text', label: 'Button 1 Link' },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'cta2Label', type: 'text', label: 'Button 2 Label (optional)' },
        { name: 'cta2Href', type: 'text', label: 'Button 2 Link' },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'bgColor',
          type: 'text',
          label: 'Background Color / Gradient (used if no image)',
          defaultValue: 'linear-gradient(135deg, #0a1f14 0%, #1B4D3E 55%, #2D7A3A 100%)',
        },
        {
          name: 'accentColor',
          type: 'text',
          label: 'Accent Color',
          defaultValue: '#D4A017',
        },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'order', type: 'number', label: 'Order (1 = first)', defaultValue: 1 },
        { name: 'active', type: 'checkbox', label: 'Active', defaultValue: true },
      ],
    },
  ],
}
