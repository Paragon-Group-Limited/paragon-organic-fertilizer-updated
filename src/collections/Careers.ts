import type { CollectionConfig } from 'payload'

export const Careers: CollectionConfig = {
  slug: 'careers',
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'department', 'type', 'status'] },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true, label: 'Position Title' },
    { name: 'department', type: 'text', label: 'Department' },
    {
      name: 'type',
      type: 'select',
      label: 'Job Type',
      options: [
        { label: 'Full-time', value: 'full-time' },
        { label: 'Part-time', value: 'part-time' },
        { label: 'Contract', value: 'contract' },
      ],
    },
    { name: 'location', type: 'text', label: 'Location' },
    { name: 'description', type: 'richText', label: 'Job Description' },
    { name: 'requirements', type: 'richText', label: 'Requirements & Skills' },
    { name: 'salary', type: 'text', label: 'Salary (Optional)', admin: { position: 'sidebar' } },
    { name: 'deadline', type: 'date', label: 'Application Deadline', admin: { position: 'sidebar' } },
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
