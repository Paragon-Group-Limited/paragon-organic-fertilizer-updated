'use client'

import { useT } from '@/hooks/useT'
import { PageBanner } from '@/components/layout/PageBanner'
import { OurStoryContent } from '@/components/about/OurStoryContent'
import { SoilBenefitContent } from '@/components/about/SoilBenefitContent'
import { WhyThisProductContent } from '@/components/about/WhyThisProductContent'
import { ParagonGroupContent } from '@/components/about/ParagonGroupContent'
import { LocationContent } from '@/components/location/LocationContent'
import { CareerContent } from '@/components/career/CareerContent'
import { ContactContent } from '@/components/contact/ContactContent'

type BannerProps = Parameters<typeof PageBanner>[0]
type PageConfig = { banner: BannerProps; Content: React.ComponentType }

export function StaticPageBlock({ pageSlug }: { pageSlug: string }) {
  const t = useT()

  const PAGE_CONFIGS: Record<string, PageConfig> = {
    'about/our-story': {
      banner: {
        tagText: t('Our Story'),
        title: t('আমাদের'),
        titleHighlight: t('গল্প'),
        subtitle: t('বাংলাদেশের কৃষিজমির মাটি বাঁচাতে এবং কৃষকদের জীবনমান উন্নত করতে প্যারাগন জৈব সারের যাত্রা শুরু হয়েছিল একটি স্বপ্ন থেকে।'),
        breadcrumbs: [{ label: t('সম্পর্কে'), href: '/about/our-story' }, { label: t('আমাদের গল্প') }],
      },
      Content: OurStoryContent,
    },
    'about/soil-benefit': {
      banner: {
        tagText: t('Soil Science'),
        title: t('মাটির'),
        titleHighlight: t('উপকার'),
        subtitle: t('জৈব সার কীভাবে মাটির জীবন ফিরিয়ে আনে এবং ফসলের উৎপাদন বাড়িয়ে দেয় — বিজ্ঞানসম্মত ব্যাখ্যা।'),
        breadcrumbs: [{ label: t('সম্পর্কে') }, { label: t('মাটির উপকার') }],
        bgGradient: 'linear-gradient(135deg, #0d2438 0%, #1a3d2b 45%, #0F5132 100%)',
      },
      Content: SoilBenefitContent,
    },
    'about/why-this-product': {
      banner: {
        tagText: t('Why Choose Us'),
        title: t('কেন এই'),
        titleHighlight: t('পণ্য?'),
        subtitle: t('হাজার হাজার কৃষক কেন প্যারাগন জৈব সারকে বেছে নিচ্ছেন — জানুন এর অনন্য বৈশিষ্ট্য ও সুবিধাগুলো।'),
        breadcrumbs: [{ label: t('সম্পর্কে') }, { label: t('কেন এই পণ্য?') }],
        bgGradient: 'linear-gradient(135deg, #1B4D3E 0%, #2D7A3A 60%, #3d8b40 100%)',
      },
      Content: WhyThisProductContent,
    },
    'about/paragon-group': {
      banner: {
        tagText: t('Parent Company'),
        title: t('প্যারাগন'),
        titleHighlight: t('গ্রুপ'),
        subtitle: t('বাংলাদেশের শীর্ষস্থানীয় শিল্প প্রতিষ্ঠান প্যারাগন গ্রুপের কৃষি খাতে অবদান এবং জৈব সার উৎপাদনে আমাদের যাত্রা।'),
        breadcrumbs: [{ label: t('সম্পর্কে') }, { label: t('প্যারাগন গ্রুপ') }],
        bgGradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      },
      Content: ParagonGroupContent,
    },
    location: {
      banner: {
        tagText: t('Dealership'),
        title: t('ডিলারশিপ ও'),
        titleHighlight: t('অবস্থান'),
        subtitle: t('সারাবাংলাদেশে আমাদের ডিলার নেটওয়ার্ক বিস্তার লাভ করছে। আপনিও হতে পারেন আমাদের অংশীদার।'),
        breadcrumbs: [{ label: t('ডিলারশিপ') }],
        bgGradient: 'linear-gradient(135deg, #0F2E24 0%, #1B4D3E 55%, #1a4a35 100%)',
      },
      Content: LocationContent,
    },
    career: {
      banner: {
        tagText: t('Join Our Team'),
        title: t('আমাদের সাথে'),
        titleHighlight: t('ক্যারিয়ার গড়ুন'),
        subtitle: t('মেধাবী, উদ্যমী এবং পরিবেশ সচেতন মানুষদের আমরা সর্বদা স্বাগত জানাই। আপনার দক্ষতা দিয়ে বাংলাদেশের কৃষিকে এগিয়ে নিয়ে যান।'),
        breadcrumbs: [{ label: t('ক্যারিয়ার') }],
        bgGradient: 'linear-gradient(135deg, #1a2e1a 0%, #1B4D3E 55%, #2D7A3A 100%)',
      },
      Content: CareerContent,
    },
    contact: {
      banner: {
        tagText: t('Get In Touch'),
        title: t('আমাদের সাথে'),
        titleHighlight: t('যোগাযোগ করুন'),
        subtitle: t('যেকোনো প্রশ্ন, পরামর্শ বা পণ্য অর্ডারের জন্য আমাদের সাথে যোগাযোগ করুন। আমরা সবসময় আপনার পাশে আছি।'),
        breadcrumbs: [{ label: t('যোগাযোগ') }],
        bgGradient: 'linear-gradient(135deg, #0a1f14 0%, #1B4D3E 55%, #2D7A3A 100%)',
      },
      Content: ContactContent,
    },
  }

  const config = PAGE_CONFIGS[pageSlug]

  if (!config) {
    return (
      <div style={{ padding: '80px 40px', textAlign: 'center', color: '#9ca3af', fontFamily: 'var(--font-inter)' }}>
        <p style={{ fontSize: 14 }}>Page &ldquo;{pageSlug}&rdquo; configuration not found</p>
      </div>
    )
  }

  const { banner, Content } = config
  return (
    <div>
      <PageBanner {...banner} />
      <Content />
    </div>
  )
}
