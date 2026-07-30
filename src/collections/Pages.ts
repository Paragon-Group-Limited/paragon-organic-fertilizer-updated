import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'status'],
    components: {
      views: {
        list: {
          Component: '@/app/(payload)/admin/views/PagesListView',
        },
      },
    },
  },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true, label: 'Page Title' },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'Leading slash ছাড়া লিখুন। যেমন: "about/my-page" বা "faq"',
      },
      hooks: {
        beforeValidate: [
          ({ value }: { value?: string }) =>
            typeof value === 'string' ? value.replace(/^\/+/, '').replace(/\/+$/, '') : value,
        ],
      },
    },
    {
      name: 'layout',
      type: 'json',
      label: 'Page Layout (Puck Editor Data)',
      admin: { hidden: true },
    },
    // ── Sidebar: Status & Navbar (above SEO Meta) ─────────────────────────────
    {
      name: 'status',
      type: 'select',
      label: 'Page Status',
      options: [
        { label: '✅ Published', value: 'published' },
        { label: '📝 Draft', value: 'draft' },
      ],
      defaultValue: 'draft',
      required: true,
      admin: { position: 'sidebar', description: 'Draft = শুধু admin এ দেখা যাবে। Published = সবার জন্য visible।' },
    },
    {
      name: 'showInNavbar',
      type: 'checkbox',
      label: '+ Navbar (Show in Navbar)',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
    {
      name: 'navLabelBn',
      type: 'text',
      label: 'Navbar Label (বাংলা)',
      admin: {
        position: 'sidebar',
        condition: (data: Record<string, unknown>) => Boolean(data.showInNavbar),
      },
    },
    {
      name: 'navLabelEn',
      type: 'text',
      label: 'Navbar Label (English)',
      admin: {
        position: 'sidebar',
        condition: (data: Record<string, unknown>) => Boolean(data.showInNavbar),
      },
    },
    {
      name: 'navOrder',
      type: 'number',
      label: 'Navbar Order (1 = first)',
      defaultValue: 99,
      admin: {
        position: 'sidebar',
        condition: (data: Record<string, unknown>) => Boolean(data.showInNavbar),
      },
    },
    // ── Sidebar: SEO Meta (below Status & Navbar) ─────────────────────────────
    {
      name: 'meta',
      type: 'group',
      label: 'SEO Meta',
      admin: { position: 'sidebar' },
      fields: [
        { name: 'title', type: 'text', label: 'Meta Title' },
        { name: 'description', type: 'textarea', label: 'Meta Description' },
        { name: 'ogImage', type: 'upload', relationTo: 'media', label: 'OG Image' },
      ],
    },
  ],
}
