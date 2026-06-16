import { PuckEditorWrapper } from '@/components/puck/PuckEditorWrapper'
import { getDefaultLayout } from '@/puck/defaultLayouts'
import { getPageLayout } from '@/lib/getPageLayout'

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
  const layout = await getPageLayout(slug)
  if (layout && Array.isArray((layout as {content?: unknown[]}).content) && (layout as {content?: unknown[]}).content!.length > 0) {
    initialData = layout
  }

  // if no saved layout → use the default layout for this page
  if (!initialData) {
    initialData = getDefaultLayout(slug)
  }

  return <PuckEditorWrapper slug={slug} initialData={initialData} singlePage={singlePage} />
}
