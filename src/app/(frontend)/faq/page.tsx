import type { Metadata } from 'next'
import { PageBanner } from '@/components/layout/PageBanner'
import { FaqContent } from '@/components/faq/FaqContent'
import { faqs } from '@/components/faq/faqData'

export const metadata: Metadata = {
  title: 'সাধারণ প্রশ্নোত্তর (FAQ)',
  description: 'প্যারাগন জৈব সার সম্পর্কে সাধারণ প্রশ্নের উত্তর — পণ্য কেনা, ব্যবহার পদ্ধতি, ডিলারশিপ, সংরক্ষণ ও আরো অনেক বিষয়।',
  alternates: { canonical: '/faq' },
  openGraph: {
    url: '/faq',
    title: 'সাধারণ প্রশ্নোত্তর | প্যারাগন জৈব সার',
  },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <PageBanner
        tagText="FAQ"
        title="সাধারণ"
        titleHighlight="প্রশ্নোত্তর"
        subtitle="প্যারাগন জৈব সার সম্পর্কে যেকোনো প্রশ্নের উত্তর এখানে পাবেন। Find answers to all your questions about Paragon Organic Fertilizer."
        breadcrumbs={[{ label: 'FAQ' }]}
        bgGradient="linear-gradient(135deg, #0a1f14 0%, #1B4D3E 55%, #2D7A3A 100%)"
      />
      <FaqContent />
    </>
  )
}
