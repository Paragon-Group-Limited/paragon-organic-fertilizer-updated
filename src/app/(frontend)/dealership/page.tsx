import type { Metadata } from 'next'
import { PageBanner } from '@/components/layout/PageBanner'
import { LocationContent } from '@/components/location/LocationContent'
import { PuckRenderer } from '@/components/puck/PuckRenderer'
import { getPageLayout } from '@/lib/getPageLayout'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'ডিলারশিপ',
  description: 'সারাবাংলাদেশে প্যারাগন জৈব সারের ডিলার নেটওয়ার্ক। ডিলারশিপ সুযোগ ও আবেদন প্রক্রিয়া।',
}

export default async function DealershipPage() {
  const layout = await getPageLayout('dealership')

  if (layout) return <PuckRenderer data={layout} />

  return (
    <>
      <PageBanner
        tagText="Dealership"
        title="ডিলারশিপ ও"
        titleHighlight="আবেদন"
        subtitle="সারাবাংলাদেশে আমাদের ডিলার নেটওয়ার্ক বিস্তার লাভ করছে। আপনিও হতে পারেন আমাদের অংশীদার।"
        breadcrumbs={[{ label: 'ডিলারশিপ' }]}
        bgGradient="linear-gradient(135deg, #0F2E24 0%, #1B4D3E 55%, #1a4a35 100%)"
      />
      <LocationContent />
    </>
  )
}
