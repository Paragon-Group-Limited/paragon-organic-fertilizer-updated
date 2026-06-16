import { notFound } from 'next/navigation'
import { PuckRenderer } from '@/components/puck/PuckRenderer'
import { getPageLayout } from '@/lib/getPageLayout'

export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{ slug: string }>
}

export default async function DynamicPage({ params }: Props) {
  const { slug } = await params
  const layout = await getPageLayout(slug)

  // page has never been published yet
  if (!layout) return notFound()

  return <PuckRenderer data={layout} />
}
