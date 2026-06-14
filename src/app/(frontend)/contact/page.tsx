import type { Metadata } from 'next'
import { PageBanner } from '@/components/layout/PageBanner'
import { ContactContent } from '@/components/contact/ContactContent'
import { PuckRenderer } from '@/components/puck/PuckRenderer'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'যোগাযোগ',
  description: 'প্যারাগন জৈব সারের সাথে যোগাযোগ করুন। ঠিকানা, ফোন, ইমেইল ও অনলাইন ফর্ম।',
}

async function getLayout() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/pages/contact`, { cache: 'no-store' })
    if (!res.ok) return null
    const json = await res.json()
    return json.layout ?? null
  } catch {
    return null
  }
}

export default async function ContactPage() {
  const layout = await getLayout()

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
