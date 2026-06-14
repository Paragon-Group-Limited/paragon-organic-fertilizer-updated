import { notFound } from 'next/navigation'
import { PuckRenderer } from '@/components/puck/PuckRenderer'

export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{ slug: string }>
}

async function getPageLayout(slug: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/pages/${slug}`, { cache: 'no-store' })
    if (!res.ok) return null
    const json = await res.json()
    return json.layout ?? null
  } catch {
    return null
  }
}

export default async function DynamicPage({ params }: Props) {
  const { slug } = await params
  const layout = await getPageLayout(slug)

  // page has never been published yet
  if (!layout) return notFound()

  return <PuckRenderer data={layout} />
}
