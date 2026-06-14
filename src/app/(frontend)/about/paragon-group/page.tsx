import type { Metadata } from 'next'
import { PageBanner } from '@/components/layout/PageBanner'
import { ParagonGroupContent } from '@/components/about/ParagonGroupContent'
import { PuckRenderer } from '@/components/puck/PuckRenderer'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'প্যারাগন গ্রুপ',
  description: 'প্যারাগন গ্রুপ — বাংলাদেশের অন্যতম শীর্ষস্থানীয় শিল্প প্রতিষ্ঠান এবং কৃষি উন্নয়নে অবদান।',
}

async function getLayout() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/pages/about/paragon-group`, { cache: 'no-store' })
    if (!res.ok) return null
    const json = await res.json()
    return json.layout ?? null
  } catch {
    return null
  }
}

export default async function ParagonGroupPage() {
  const layout = await getLayout()

  if (layout) return <PuckRenderer data={layout} />

  return (
    <>
      <PageBanner
        tagText="Parent Company"
        title="প্যারাগন"
        titleHighlight="গ্রুপ"
        subtitle="বাংলাদেশের শীর্ষস্থানীয় শিল্প প্রতিষ্ঠান প্যারাগন গ্রুপের কৃষি খাতে অবদান এবং জৈব সার উৎপাদনে আমাদের যাত্রা।"
        breadcrumbs={[{ label: 'সম্পর্কে' }, { label: 'প্যারাগন গ্রুপ' }]}
        bgGradient="linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)"
      />
      <ParagonGroupContent />
    </>
  )
}
