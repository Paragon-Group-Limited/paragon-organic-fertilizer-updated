import type { CollectionConfig } from 'payload'

export const AppliedCandidates: CollectionConfig = {
  slug: 'applied-candidates',
  labels: {
    singular: 'Applied Candidate',
    plural: '└ Applied Candidates',
  },
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'mobile', 'applyingFor', 'createdAt', 'status'],
    description: 'Career application submissions from the website',
    components: {
      views: {
        list: {
          Component: '@/app/(payload)/admin/views/AppliedCandidatesListView',
        },
      },
    },
  },
  access: {
    read: ({ req }) => !!req.user,
    create: () => true,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: [
    { name: 'fullName',    type: 'text',     required: true, label: 'Full Name' },
    { name: 'mobile',      type: 'text',     required: true, label: 'Mobile No' },
    { name: 'address',     type: 'textarea',                 label: 'Address' },
    { name: 'applyingFor', type: 'text',                    label: 'Applying For (Position)' },
    {
      name: 'cv',
      type: 'upload',
      relationTo: 'media',
      label: 'CV / Resume',
    },
    {
      name: 'status',
      type: 'select',
      label: 'Application Status',
      options: [
        { label: 'New',         value: 'new' },
        { label: 'Reviewed',    value: 'reviewed' },
        { label: 'Shortlisted', value: 'shortlisted' },
        { label: 'Rejected',    value: 'rejected' },
      ],
      defaultValue: 'new',
      admin: { position: 'sidebar' },
    },
  ],
}
