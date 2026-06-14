import { PuckEditorWrapper } from '@/components/puck/PuckEditorWrapper'
import { getDefaultLayout } from '@/puck/defaultLayouts'

export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{ puckPath?: string[] }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function EditorPage({ params, searchParams }: Props) {
  const { puckPath } = await params
  const sp = await searchParams
  const slug = puckPath?.join('/') ?? 'home'
  const singlePage = sp?.from === 'admin'

  // try to load saved layout from database
  let initialData: object | undefined = undefined
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/pages/${slug}`, { cache: 'no-store' })
    if (res.ok) {
      const json = await res.json()
      if (json.layout && Array.isArray(json.layout.content) && json.layout.content.length > 0) {
        initialData = json.layout
      }
    }
  } catch {
    // no saved data
  }

  // if no saved layout → use the default layout for this page
  if (!initialData) {
    initialData = getDefaultLayout(slug)
  }

  return <PuckEditorWrapper slug={slug} initialData={initialData} singlePage={singlePage} />
}
