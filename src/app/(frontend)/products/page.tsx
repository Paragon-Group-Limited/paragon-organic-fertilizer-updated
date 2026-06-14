import type { Metadata } from 'next'
import { PageBanner } from '@/components/layout/PageBanner'
import { PuckRenderer } from '@/components/puck/PuckRenderer'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'পণ্য ও ক্রয় — প্যারাগন জৈব সার',
  description: 'প্যারাগন জৈব সার — ১ কেজি, ৫ কেজি ও ৪০ কেজি প্যাকেজে পাওয়া যায়। অর্ডার করুন এখনই।',
}

async function getLayout() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/pages/products`, { cache: 'no-store' })
    if (!res.ok) return null
    const json = await res.json()
    return json.layout ?? null
  } catch {
    return null
  }
}

export default async function ProductsPage() {
  const layout = await getLayout()

  if (layout) return <PuckRenderer data={layout} />

  return (
    <PageBanner
      tagText="পণ্যসমূহ"
      title="পণ্য ও"
      titleHighlight="ক্রয়"
      subtitle="প্যারাগন জৈব সার — ১ কেজি, ৫ কেজি ও ৪০ কেজি প্যাকেজে পাওয়া যায়। আজই অর্ডার করুন।"
      breadcrumbs={[{ label: 'পণ্য ও ক্রয়' }]}
    />
  )
}
