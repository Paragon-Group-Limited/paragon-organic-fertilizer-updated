import type { Metadata } from 'next'
import { PageBanner } from '@/components/layout/PageBanner'
import { SoilBenefitContent } from '@/components/about/SoilBenefitContent'
import { PuckRenderer } from '@/components/puck/PuckRenderer'
import { getPageLayout } from '@/lib/getPageLayout'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'মাটির উপকার',
  description: 'জৈব সার মাটির উর্বরতা কীভাবে বৃদ্ধি করে এবং বাংলাদেশের কৃষিজমির সংকট সমাধানে কী ভূমিকা রাখে।',
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
