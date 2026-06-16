import type { Metadata } from 'next'
import { PageBanner } from '@/components/layout/PageBanner'
import { ParagonGroupContent } from '@/components/about/ParagonGroupContent'
import { PuckRenderer } from '@/components/puck/PuckRenderer'
import { getPageLayout } from '@/lib/getPageLayout'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'প্যারাগন গ্রুপ',
  description: 'প্যারাগন গ্রুপ — বাংলাদেশের অন্যতম শীর্ষস্থানীয় শিল্প প্রতিষ্ঠান এবং কৃষি উন্নয়নে অবদান।',
}

export default async function ParagonGroupPage() {
  const layout = await getPageLayout('about/paragon-group')

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
