'use client'

import { VideoUploader } from '@/components/puck/VideoUploader'

export function videoUploadField(label: string) {
  return {
    type: 'custom' as const,
    label,
    render: ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
      <VideoUploader value={value || ''} onChange={onChange} />
    ),
  }
}
