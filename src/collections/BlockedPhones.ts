import type { CollectionConfig } from 'payload'

export const BlockedPhones: CollectionConfig = {
  slug: 'blocked-phones',
  admin: {
    useAsTitle: 'phone',
    defaultColumns: ['phone', 'reason', 'blockedAt'],
    description: 'Phone numbers blocked from placing orders',
    components: {
      views: {
        list: {
          Component: '@/app/(payload)/admin/views/BlockedPhonesListView',
        },
      },
    },
  },
  access: {
    read:   ({ req }) => !!req.user,
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: [
    { name: 'phone',     type: 'text',     label: 'Phone Number', required: true, unique: true },
    { name: 'reason',    type: 'text',     label: 'Reason (optional)' },
    { name: 'blockedBy', type: 'text',     label: 'Blocked By (admin)' },
    { name: 'blockedAt', type: 'date',     label: 'Blocked At', defaultValue: () => new Date().toISOString() },
    { name: 'orderCount',type: 'number',   label: 'Orders at time of block', defaultValue: 0 },
  ],
}
