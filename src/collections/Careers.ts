import type { CollectionConfig } from 'payload'

export const Careers: CollectionConfig = {
  slug: 'careers',
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'department', 'type', 'status'] },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true, label: 'পদের নাম' },
    { name: 'department', type: 'text', label: 'বিভাগ' },
    {
      name: 'type',
      type: 'select',
      label: 'কর্মের ধরন',
      options: [
        { label: 'পূর্ণকালীন', value: 'full-time' },
        { label: 'খণ্ডকালীন', value: 'part-time' },
        { label: 'চুক্তিভিত্তিক', value: 'contract' },
      ],
    },
    { name: 'location', type: 'text', label: 'কর্মস্থল' },
    { name: 'description', type: 'richText', label: 'কাজের বিবরণ' },
    { name: 'requirements', type: 'richText', label: 'যোগ্যতা ও দক্ষতা' },
    { name: 'salary', type: 'text', label: 'বেতন (Optional)', admin: { position: 'sidebar' } },
    { name: 'deadline', type: 'date', label: 'আবেদনের শেষ তারিখ', admin: { position: 'sidebar' } },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Open', value: 'open' },
        { label: 'Closed', value: 'closed' },
      ],
      defaultValue: 'open',
      admin: { position: 'sidebar' },
    },
  ],
}
