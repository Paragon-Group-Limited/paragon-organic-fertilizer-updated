import type { CollectionConfig } from 'payload'

export const ContactMessages: CollectionConfig = {
  slug: 'contact-messages',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'phone', 'subject', 'createdAt'],
    description: 'Website contact form submissions',
    group: 'যোগাযোগ',
  },
  access: {
    read: () => true,
    create: () => true,
  },
  fields: [
    { name: 'name', type: 'text', required: true, label: 'নাম' },
    { name: 'phone', type: 'text', required: true, label: 'ফোন' },
    { name: 'subject', type: 'text', label: 'বিষয়' },
    { name: 'message', type: 'textarea', required: true, label: 'বার্তা' },
  ],
}
