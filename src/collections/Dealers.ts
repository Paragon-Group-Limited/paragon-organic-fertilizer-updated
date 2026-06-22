import type { CollectionConfig } from 'payload'

export const Dealers: CollectionConfig = {
  slug: 'dealers',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'phone', 'district', 'tradeLicense', 'actions'],
    description: 'Dealer applicants and current dealers',
  },
  access: {
    read: () => true,
    create: () => true,
  },
  fields: [
    { name: 'name', type: 'text', required: true, label: 'Name' },
    { name: 'org', type: 'text', label: 'Organization' },
    { name: 'district', type: 'text', required: true, label: 'District' },
    { name: 'upazila', type: 'text', label: 'Upazila' },
    { name: 'address', type: 'textarea', label: 'Full Address' },
    { name: 'phone', type: 'text', label: 'Phone' },
    { name: 'alternatePhone', type: 'text', label: 'Alt Phone' },
    { name: 'experience', type: 'textarea', label: 'Business Experience' },
    {
      name: 'tradeLicense',
      type: 'upload',
      relationTo: 'media',
      label: 'Trade License',
      admin: {
        components: {
          Cell: '@/components/payload/DealerLicenseCell',
        },
      },
    },
    {
      name: 'status',
      type: 'select',
      label: 'Status',
      options: [
        { label: 'New Application', value: 'pending' },
        { label: 'Approved', value: 'approved' },
        { label: 'Rejected', value: 'rejected' },
      ],
      defaultValue: 'pending',
      admin: { position: 'sidebar' },
    },
    {
      name: 'type',
      type: 'select',
      label: 'Dealer Type',
      options: [
        { label: 'Main Dealer', value: 'main' },
        { label: 'Sub Dealer', value: 'sub' },
      ],
      defaultValue: 'sub',
      admin: { position: 'sidebar' },
    },
    {
      name: 'coordinates',
      type: 'group',
      label: 'Map Location',
      fields: [
        { name: 'lat', type: 'number', label: 'Latitude' },
        { name: 'lng', type: 'number', label: 'Longitude' },
      ],
    },
    {
      name: 'actions',
      type: 'ui',
      admin: {
        components: {
          Cell: '@/components/payload/DealerActionsCell',
        },
      },
    },
  ],
}
