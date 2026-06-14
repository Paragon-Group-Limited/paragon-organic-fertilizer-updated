import type { CollectionConfig } from 'payload'

export const Dealers: CollectionConfig = {
  slug: 'dealers',
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'district', 'phone', 'type'] },
  access: { read: () => true },
  fields: [
    { name: 'name', type: 'text', required: true, label: 'ডিলারের নাম' },
    { name: 'district', type: 'text', required: true, label: 'জেলা' },
    { name: 'upazila', type: 'text', label: 'উপজেলা' },
    { name: 'address', type: 'textarea', label: 'সম্পূর্ণ ঠিকানা' },
    { name: 'phone', type: 'text', label: 'ফোন নম্বর' },
    { name: 'alternatePhone', type: 'text', label: 'বিকল্প ফোন' },
    {
      name: 'type',
      type: 'select',
      label: 'ডিলার ধরন',
      options: [
        { label: 'প্রধান ডিলার', value: 'main' },
        { label: 'উপ-ডিলার', value: 'sub' },
      ],
      defaultValue: 'sub',
      admin: { position: 'sidebar' },
    },
    {
      name: 'coordinates',
      type: 'group',
      label: 'Map Location (Optional)',
      fields: [
        { name: 'lat', type: 'number', label: 'Latitude' },
        { name: 'lng', type: 'number', label: 'Longitude' },
      ],
    },
  ],
}
