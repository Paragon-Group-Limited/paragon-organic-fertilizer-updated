import type { CollectionConfig } from 'payload'

export const Dealers: CollectionConfig = {
  slug: 'dealers',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'org', 'district', 'phone', 'status', 'createdAt'],
    description: 'ডিলার আবেদনকারী ও বর্তমান ডিলারদের তথ্য',
  },
  access: {
    read: () => true,
    create: () => true,
  },
  fields: [
    { name: 'name', type: 'text', required: true, label: 'ডিলারের নাম' },
    { name: 'org', type: 'text', label: 'প্রতিষ্ঠানের নাম' },
    { name: 'district', type: 'text', required: true, label: 'জেলা' },
    { name: 'upazila', type: 'text', label: 'উপজেলা' },
    { name: 'address', type: 'textarea', label: 'সম্পূর্ণ ঠিকানা' },
    { name: 'phone', type: 'text', label: 'ফোন নম্বর' },
    { name: 'alternatePhone', type: 'text', label: 'বিকল্প ফোন' },
    { name: 'experience', type: 'textarea', label: 'ব্যবসায়িক অভিজ্ঞতা' },
    {
      name: 'tradeLicense',
      type: 'upload',
      relationTo: 'media',
      label: 'ট্রেড লাইসেন্স (ছবি বা PDF)',
    },
    {
      name: 'status',
      type: 'select',
      label: 'আবেদনের অবস্থা',
      options: [
        { label: 'নতুন আবেদন', value: 'pending' },
        { label: 'অনুমোদিত', value: 'approved' },
        { label: 'প্রত্যাখ্যাত', value: 'rejected' },
      ],
      defaultValue: 'pending',
      admin: { position: 'sidebar' },
    },
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
