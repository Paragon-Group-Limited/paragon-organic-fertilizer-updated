import type { Metadata } from 'next'
import { PageBanner } from '@/components/layout/PageBanner'
import { LocationContent } from '@/components/location/LocationContent'
import { PuckRenderer } from '@/components/puck/PuckRenderer'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'ডিলারশিপ ও অবস্থান',
  description: 'সারাবাংলাদেশে প্যারাগন জৈব সারের ডিলার নেটওয়ার্ক। ডিলারশিপ সুযোগ ও আবেদন প্রক্রিয়া।',
}

async function getLayout() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/pages/location`, { cache: 'no-store' })
    if (!res.ok) return null
    const json = await res.json()
    return json.layout ?? null
  } catch {
    return null
  }
}

export default async function LocationPage() {
  const layout = await getLayout()

  if (layout) return <PuckRenderer data={layout} />

  return (
    <>
      <PageBanner
        tagText="Dealership"
        title="ডিলারশিপ ও"
        titleHighlight="অবস্থান"
        subtitle="সারাবাংলাদেশে আমাদের ডিলার নেটওয়ার্ক বিস্তার লাভ করছে। আপনিও হতে পারেন আমাদের অংশীদার।"
        breadcrumbs={[{ label: 'ডিলারশিপ' }]}
        bgGradient="linear-gradient(135deg, #0F2E24 0%, #1B4D3E 55%, #1a4a35 100%)"
      />
      <LocationContent />
    </>
  )
}
