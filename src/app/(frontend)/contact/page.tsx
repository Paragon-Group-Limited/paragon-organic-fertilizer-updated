import type { Metadata } from 'next'
import { PageBanner } from '@/components/layout/PageBanner'
import { ContactContent } from '@/components/contact/ContactContent'
import { PuckRenderer } from '@/components/puck/PuckRenderer'
import { getPageLayout } from '@/lib/getPageLayout'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'যোগাযোগ করুন',
  description: 'প্যারাগন জৈব সার সম্পর্কে যেকোনো প্রশ্ন বা ডিলারশিপের জন্য আমাদের সাথে যোগাযোগ করুন। ফোন, ইমেইল বা ফর্মের মাধ্যমে।',
  alternates: { canonical: '/contact' },
  openGraph: { url: '/contact' },
}

export default async function ContactPage() {
  const layout = await getPageLayout('contact')

  if (layout) return <PuckRenderer data={layout} />

  return (
    <>
      <PageBanner
        tagText="Get In Touch"
        title="আমাদের সাথে"
        titleHighlight="যোগাযোগ করুন"
        subtitle="যেকোনো প্রশ্ন, পরামর্শ বা পণ্য অর্ডারের জন্য আমাদের সাথে যোগাযোগ করুন। আমরা সবসময় আপনার পাশে আছি।"
        breadcrumbs={[{ label: 'যোগাযোগ' }]}
        bgGradient="linear-gradient(135deg, #0a1f14 0%, #1B4D3E 55%, #2D7A3A 100%)"
      />
      <ContactContent />
    </>
  )
}
