'use client'

import { RichTextEditor } from '@/components/puck/RichTextEditor'

/**
 * Returns a Puck `type: 'custom'` field config that renders a rich-text editor.
 * Stores the field value as an HTML string.
 *
 * Usage in block fields:
 *   body: richTextField('Body text'),
 */
export function richTextField(label: string, minHeight = 80) {
  return {
    type: 'custom' as const,
    label,
    render: ({
      value,
      onChange,
    }: {
      value: string
      onChange: (v: string) => void
    }) => (
      <>
        {label && (
          <div style={{ fontSize: 11, fontWeight: 600, color: '#374151', marginBottom: 4, padding: '0 2px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            {label}
          </div>
        )}
        <RichTextEditor value={value || ''} onChange={onChange} minHeight={minHeight} />
      </>
    ),
  }
}
