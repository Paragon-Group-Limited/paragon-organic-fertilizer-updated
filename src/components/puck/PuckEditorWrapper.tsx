'use client'

import dynamic from 'next/dynamic'

const PuckEditor = dynamic(
  () => import('./PuckEditor').then(mod => ({ default: mod.PuckEditor })),
  { ssr: false, loading: () => <div style={{ padding: '2rem', textAlign: 'center', fontFamily: 'sans-serif' }}>Loading editor...</div> }
)

type Props = {
  slug: string
  initialData?: object
  singlePage?: boolean
}

export function PuckEditorWrapper({ slug, initialData, singlePage }: Props) {
  return <PuckEditor slug={slug} initialData={initialData} singlePage={singlePage} />
}
