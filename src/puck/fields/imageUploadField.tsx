'use client'

import { ImageUploader } from '@/components/puck/ImageUploader'

export function imageUploadField(label: string) {
  return {
    type: 'custom' as const,
    label,
    render: ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
      <ImageUploader value={value || ''} onChange={onChange} />
    ),
  }
}
