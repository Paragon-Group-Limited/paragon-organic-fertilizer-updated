import type { Metadata } from 'next'
import { PageBanner } from '@/components/layout/PageBanner'
import { PuckRenderer } from '@/components/puck/PuckRenderer'
import { getPageLayout } from '@/lib/getPageLayout'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'পণ্য ও ক্রয় — প্যারাগন জৈব সার',
  description: 'প্যারাগন জৈব সার — ১ কেজি, ৫ কেজি ও ৪০ কেজি প্যাকেজে পাওয়া যায়। অর্ডার করুন এখনই।',
}

export default async function ProductsPage() {
  const layout = await getPageLayout('products')

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
