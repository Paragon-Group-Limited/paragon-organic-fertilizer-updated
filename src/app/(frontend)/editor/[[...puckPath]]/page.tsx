import { PuckEditorWrapper } from '@/components/puck/PuckEditorWrapper'
import { getDefaultLayout } from '@/puck/defaultLayouts'
import { getPageLayout } from '@/lib/getPageLayout'
import { getPayload } from 'payload'
import config from '@payload-config'
export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{ puckPath?: string[] }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

async function getSiteLayoutData(field: 'navbarData' | 'footerData'): Promise<object | null> {
  try {
    const payload = await getPayload({ config })
    const settings = await payload.findGlobal({ slug: 'site-settings', depth: 0 })
    const data = (settings as Record<string, unknown>)[field]
    if (data && typeof data === 'object' && Array.isArray((data as { content?: unknown[] }).content)) {
      return data as object
    }
    return null
  } catch {
    return null
  }
}

export default async function EditorPage({ params, searchParams }: Props) {
  const { puckPath } = await params
  const sp = await searchParams
  const slug = puckPath?.join('/') ?? 'home'
  const singlePage = sp?.from === 'admin'

  let initialData: object = getDefaultLayout(slug)

  if (slug === 'navbar') {
    const saved = await getSiteLayoutData('navbarData')
    if (saved) initialData = saved
  } else if (slug === 'footer') {
    const saved = await getSiteLayoutData('footerData')
    if (saved) initialData = saved
  } else if (slug !== 'products') {
    const layout = await getPageLayout(slug)
    if (layout && Array.isArray((layout as { content?: unknown[] }).content) && (layout as { content?: unknown[] }).content!.length > 0) {
      initialData = layout
    }
  }

  return <PuckEditorWrapper slug={slug} initialData={initialData} singlePage={singlePage} />
}
