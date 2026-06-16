import type { Metadata } from 'next'
import { PageBanner } from '@/components/layout/PageBanner'
import { WhyThisProductContent } from '@/components/about/WhyThisProductContent'
import { PuckRenderer } from '@/components/puck/PuckRenderer'
import { getPageLayout } from '@/lib/getPageLayout'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'কেন এই পণ্য?',
  description: 'প্যারাগন জৈব সার কেন বাংলাদেশের কৃষকদের প্রথম পছন্দ — কারণ, সুবিধা ও পার্থক্য।',
}

export default async function WhyThisProductPage() {
  const layout = await getPageLayout('about/why-this-product')

  if (layout) return <PuckRenderer data={layout} />

  return (
    <>
      <PageBanner
        tagText="Why Choose Us"
        title="কেন এই"
        titleHighlight="পণ্য?"
        subtitle="হাজার হাজার কৃষক কেন প্যারাগন জৈব সারকে বেছে নিচ্ছেন — জানুন এর অনন্য বৈশিষ্ট্য ও সুবিধাগুলো।"
        breadcrumbs={[{ label: 'সম্পর্কে' }, { label: 'কেন এই পণ্য?' }]}
        bgGradient="linear-gradient(135deg, #1B4D3E 0%, #2D7A3A 60%, #3d8b40 100%)"
      />
      <WhyThisProductContent />
    </>
  )
}
