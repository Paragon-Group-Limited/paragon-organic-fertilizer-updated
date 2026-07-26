import type { Metadata } from 'next'
import { PageBanner } from '@/components/layout/PageBanner'
import { CareerContent } from '@/components/career/CareerContent'

export const metadata: Metadata = {
  title: 'ক্যারিয়ার সুযোগ',
  description: 'প্যারাগন গ্রুপে ক্যারিয়ার গড়ুন। আমাদের দলে যোগ দিন এবং বাংলাদেশের কৃষি উন্নয়নে অবদান রাখুন।',
  alternates: { canonical: '/career' },
  openGraph: { url: '/career' },
}

export default async function CareerPage() {
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
