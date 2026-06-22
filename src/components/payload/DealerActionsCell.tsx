'use client'

import { useRouter } from 'next/navigation'

type Props = {
  rowData?: Record<string, unknown>
}

export default function DealerActionsCell({ rowData }: Props) {
  const router = useRouter()
  const id = rowData?.id as string | undefined
  if (!id) return null

  const handleDelete = async () => {
    if (!window.confirm('এই ডিলারের আবেদন মুছে ফেলবেন?')) return
    const res = await fetch(`/api/dealers/${id}`, { method: 'DELETE', credentials: 'include' })
    if (res.ok) router.refresh()
  }

  return (
    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }} onClick={e => e.stopPropagation()}>
      <a
        href={`/admin/collections/dealers/${id}`}
        style={{ fontSize: 11, padding: '4px 10px', borderRadius: 5, background: '#1B4D3E', color: 'white', fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap' }}
      >
        বিস্তারিত
      </a>
      <button
        onClick={handleDelete}
        style={{ fontSize: 11, padding: '4px 10px', borderRadius: 5, background: '#fef2f2', color: '#dc2626', fontWeight: 600, border: '1px solid #fecaca', cursor: 'pointer', whiteSpace: 'nowrap' }}
      >
        মুছুন
      </button>
    </div>
  )
}
