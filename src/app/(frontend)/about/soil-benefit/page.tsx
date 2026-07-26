import type { Metadata } from 'next'
import { PageBanner } from '@/components/layout/PageBanner'
import { SoilBenefitContent } from '@/components/about/SoilBenefitContent'
import { PuckRenderer } from '@/components/puck/PuckRenderer'
import { getPageLayout } from '@/lib/getPageLayout'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'মাটির উপকারিতা',
  description: 'জৈব সার মাটিকে কীভাবে সমৃদ্ধ করে জানুন। অণুজীব সমৃদ্ধ সার মাটির গঠন, পানি ধারণক্ষমতা ও ফসলের উৎপাদন বৃদ্ধি করে।',
  alternates: { canonical: '/about/soil-benefit' },
  openGraph: { url: '/about/soil-benefit' },
}

export default async function SoilBenefitPage() {
  const layout = await getPageLayout('about/soil-benefit')

  if (layout) return <PuckRenderer data={layout} />

  return (
    <>
      <PageBanner
        tagText="Soil Science"
        title="মাটির"
        titleHighlight="উপকার"
        subtitle="জৈব সার কীভাবে মাটির জীবন ফিরিয়ে আনে এবং ফসলের উৎপাদন বাড়িয়ে দেয় — বিজ্ঞানসম্মত ব্যাখ্যা।"
        breadcrumbs={[{ label: 'সম্পর্কে' }, { label: 'মাটির উপকার' }]}
        bgGradient="linear-gradient(135deg, #0d2438 0%, #1a3d2b 45%, #0F5132 100%)"
      />
      <SoilBenefitContent />
    </>
  )
}
