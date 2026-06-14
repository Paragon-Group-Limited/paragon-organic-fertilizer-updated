import type { Metadata } from 'next'
import { PageBanner } from '@/components/layout/PageBanner'
import { CareerContent } from '@/components/career/CareerContent'
import { PuckRenderer } from '@/components/puck/PuckRenderer'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'ক্যারিয়ার',
  description: 'প্যারাগন জৈব সারে ক্যারিয়ার গড়ুন। পরিবেশবান্ধব কৃষির উন্নয়নে অবদান রাখুন।',
}

async function getLayout() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/pages/career`, { cache: 'no-store' })
    if (!res.ok) return null
    const json = await res.json()
    return json.layout ?? null
  } catch {
    return null
  }
}

export default async function CareerPage() {
  const layout = await getLayout()

  if (layout) return <PuckRenderer data={layout} />

  return (
    <>
      <PageBanner
        tagText="Join Our Team"
        title="আমাদের সাথে"
        titleHighlight="ক্যারিয়ার গড়ুন"
        subtitle="মেধাবী, উদ্যমী এবং পরিবেশ সচেতন মানুষদের আমরা সর্বদা স্বাগত জানাই। আপনার দক্ষতা দিয়ে বাংলাদেশের কৃষিকে এগিয়ে নিয়ে যান।"
        breadcrumbs={[{ label: 'ক্যারিয়ার' }]}
        bgGradient="linear-gradient(135deg, #1a2e1a 0%, #1B4D3E 55%, #2D7A3A 100%)"
      />
      <CareerContent />
    </>
  )
}
