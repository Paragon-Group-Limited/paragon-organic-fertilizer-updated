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
    }) => <RichTextEditor value={value || ''} onChange={onChange} minHeight={minHeight} />,
  }
}
