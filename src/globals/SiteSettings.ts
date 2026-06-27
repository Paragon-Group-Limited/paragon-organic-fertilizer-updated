import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  access: { read: () => true },
  fields: [
    // ── Layout Editor section (shows Navbar / Footer edit cards) ──────────────
    {
      name: 'layoutEditorSection',
      type: 'ui',
      admin: {
        components: {
          Field: '@/app/(payload)/admin/components/LayoutEditorSection',
        },
      },
    },
    // ── Basic branding ────────────────────────────────────────────────────────
    {
      type: 'row',
      fields: [
        { name: 'siteName', type: 'text', label: 'Site Name (Bengali)', defaultValue: 'প্যারাগন' },
        { name: 'siteSubtitle', type: 'text', label: 'Site Subtitle (English)', defaultValue: 'Organic Fertilizer' },
      ],
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo Image (optional — replaces the leaf icon)',
    },
    {
      type: 'row',
      fields: [
        { name: 'ctaLabel', type: 'text', label: 'CTA Button Label', defaultValue: 'এখনই কিনুন' },
        { name: 'ctaHref', type: 'text', label: 'CTA Button Link', defaultValue: '/contact' },
      ],
    },
    // ── Social links ──────────────────────────────────────────────────────────
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Social & Website Links (Footer Icons)',
      fields: [
        {
          name: 'icon',
          type: 'select',
          label: 'Icon Type',
          options: [
            { label: '🔗 Website / Link', value: 'link' },
            { label: '📘 Facebook', value: 'facebook' },
            { label: '🔵 LinkedIn', value: 'linkedin' },
            { label: '▶️ YouTube', value: 'youtube' },
            { label: '📸 Instagram', value: 'instagram' },
          ],
        },
        { name: 'url', type: 'text', label: 'URL' },
        { name: 'label', type: 'text', label: 'Aria Label (for accessibility)' },
      ],
    },
    // ── Puck layout data (hidden — managed via Puck editor) ───────────────────
    {
      name: 'navbarData',
      type: 'json',
      label: 'Navbar Layout Data (Puck)',
      admin: { hidden: true },
    },
    {
      name: 'footerData',
      type: 'json',
      label: 'Footer Layout Data (Puck)',
      admin: { hidden: true },
    },
  ],
}
