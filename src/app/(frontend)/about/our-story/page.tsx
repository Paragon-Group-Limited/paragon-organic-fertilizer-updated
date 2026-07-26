import type { Metadata } from 'next'
import { PageBanner } from '@/components/layout/PageBanner'
import { OurStoryContent } from '@/components/about/OurStoryContent'
import { PuckRenderer } from '@/components/puck/PuckRenderer'
import { getPageLayout } from '@/lib/getPageLayout'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'আমাদের গল্প',
  description: '১৯৮৫ সাল থেকে প্যারাগন গ্রুপের যাত্রা। বাংলাদেশের কৃষিকে টেকসই করতে আমাদের প্রতিশ্রুতি ও উদ্যোগ জানুন।',
  alternates: { canonical: '/about/our-story' },
  openGraph: { url: '/about/our-story' },
}

export default async function OurStoryPage() {
  const layout = await getPageLayout('about/our-story')

  if (layout) return <PuckRenderer data={layout} />

  return (
    <>
      <PageBanner
        tagText="Our Story"
        title="আমাদের"
        titleHighlight="গল্প"
        subtitle="বাংলাদেশের কৃষিজমির মাটি বাঁচাতে এবং কৃষকদের জীবনমান উন্নত করতে প্যারাগন জৈব সারের যাত্রা শুরু হয়েছিল একটি স্বপ্ন থেকে।"
        breadcrumbs={[{ label: 'সম্পর্কে', href: '/about/our-story' }, { label: 'আমাদের গল্প' }]}
      />
      <OurStoryContent />
    </>
  )
}
