import type { Metadata } from 'next'
import { PageBanner } from '@/components/layout/PageBanner'
import { WhyThisProductContent } from '@/components/about/WhyThisProductContent'
import { PuckRenderer } from '@/components/puck/PuckRenderer'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'কেন এই পণ্য?',
  description: 'প্যারাগন জৈব সার কেন বাংলাদেশের কৃষকদের প্রথম পছন্দ — কারণ, সুবিধা ও পার্থক্য।',
}

async function getLayout() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/pages/about/why-this-product`, { cache: 'no-store' })
    if (!res.ok) return null
    const json = await res.json()
    return json.layout ?? null
  } catch {
    return null
  }
}

export default async function WhyThisProductPage() {
  const layout = await getLayout()

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
