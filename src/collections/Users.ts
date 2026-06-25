import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    components: {
      views: {
        list: {
          Component: '@/app/(payload)/admin/views/UsersListView',
        },
      },
    },
  },
  auth: true,
  fields: [
    { name: 'name', type: 'text', required: true, label: 'Name' },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      label: 'Profile Photo',
    },
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
      defaultValue: 'editor',
      admin: { position: 'sidebar' },
    },
  ],
}
