import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

const layout = {
  content: [
    {
      type: 'PageBannerBlock',
      props: {
        id: 'banner-paragon-group',
        tagText: 'PARENT COMPANY',
        tagTextEn: 'PARENT COMPANY',
        title: 'প্যারাগন',
        titleEn: 'Paragon',
        titleHighlight: 'গ্রুপ',
        titleHighlightEn: 'Group',
        subtitle: 'বাংলাদেশের শীর্ষস্থানীয় কৃষিভিত্তিক প্রতিষ্ঠান প্যারাগন গ্রুপের কৃষি খাতে অবদান এবং জৈব সার উৎপাদনে আমাদের যাত্রা।',
        subtitleEn: 'The journey of Paragon Group — one of Bangladesh\'s leading agro-based companies — in contributing to the agriculture sector and organic fertilizer production.',
        bgGradient: 'linear-gradient(135deg, #0a1428 0%, #0f2244 45%, #1a3a6b 100%)',
        bgImageUrl: '',
        align: 'left',
        breadcrumb1Label: 'সম্পর্কে',
        breadcrumb1LabelEn: 'About',
        breadcrumb1Href: '/about/our-story',
        breadcrumb2Label: 'প্যারাগন গ্রুপ',
        breadcrumb2LabelEn: 'Paragon Group',
      },
    },
    {
      type: 'ParagonAboutBlock',
      props: {
        id: 'paragon-about',
        tagText: 'About Paragon Group',
        heading: 'আমাদের',
        headingHighlight: 'সম্পর্কে',
        para1: 'প্যারাগন গ্রুপ বাংলাদেশের অন্যতম শীর্ষস্থানীয় কৃষিভিত্তিক প্রতিষ্ঠান, যার যাত্রা শুরু হয় ১৯৯৩ সালে। আমরা উৎপাদন ও সরবরাহ করছি — ব্রয়লার ও লেয়ার প্যারেন্ট চিকস, কমার্শিয়াল ব্রয়লার ও লেয়ার চিকস, প্রাণী ও মাছ-চিংড়ির খাদ্য, কনজ্যুমার ফুডস, জৈব সার, বায়ো-ইলেকট্রিসিটি, পিপি ওভেন ব্যাগ, সোলার প্যানেল এবং পোলট্রি কেয়ার সার্ভিসেস।',
        para2: 'বাংলাদেশের কৃষিখাতের উন্নয়নে অংশগ্রহণকে প্যারাগন গ্রুপ সবসময় একটি দায়িত্ব হিসেবে বিবেচনা করে। সেই দায়িত্ববোধ থেকেই আমরা কৃষি-সংশ্লিষ্ট বিভিন্ন পণ্যের চাহিদা ও সরবরাহের ঘাটতি পূরণে কার্যকর ভূমিকা রাখতে প্রতিশ্রুতিবদ্ধ।',
        para3: 'প্যারাগন গ্রুপের পোলট্রি বিভাগ থেকে প্রাপ্ত জৈব উপজাত এবং আধুনিক জৈবপ্রযুক্তি ব্যবহার করে তৈরি হয় প্যারাগন জৈব সার — বাংলাদেশের কৃষকদের জন্য একটি নির্ভরযোগ্য ও পরিবেশবান্ধব সমাধান।',
        stats: [
          { icon: '📅', value: '১৯৯৩', label: 'প্রতিষ্ঠাকাল', dark: true },
          { icon: '👥', value: '১০,০০০+', label: 'দক্ষ পেশাজীবী', dark: false },
          { icon: '🏭', value: '১৫+', label: 'ব্যবসায়িক শাখা', dark: true },
          { icon: '🌍', value: '৬৪', label: 'জেলায় উপস্থিতি', dark: false },
        ],
      },
    },
    {
      type: 'ParagonVisionBlock',
      props: {
        id: 'paragon-vision',
        tagText: 'Our Values',
        heading: 'Excellence Through Innovation &amp; Sustainability',
        bnSubtitle: 'ত্রিশ বছরেরও বেশি সময়ের অভিজ্ঞতায়, আমরা শ্রেষ্ঠত্ব, উদ্ভাবন এবং টেকসই চর্চার প্রতি আমাদের অঙ্গীকারের ভিত্তিতে গড়ে ওঠা এক বৈচিত্র্যপূর্ণ ব্যবসার ক্ষেত্র গড়ে তুলেছি।',
        enSubtitle: '" With over three decades of experience, we\'ve built a diverse portfolio of businesses united by our commitment to excellence, innovation, and sustainable practices. "',
        cards: [
          {
            icon: '🎯',
            title: 'Vision',
            bnText: 'বিভিন্ন শিল্পখাতে টেকসই ব্যবসায়িক চর্চার একটি অগ্রণী শক্তি হয়ে ওঠা।',
            enText: '" To be a leading force in sustainable business practices across multiple industries. "',
          },
          {
            icon: '👥',
            title: 'People',
            bnText: '১০,০০০-এর অধিক দক্ষ পেশাজীবীর কর্মের সক্ষমতা বৃদ্ধি করা।',
            enText: '" Empowering our workforce of over 10,000 skilled professionals. "',
          },
          {
            icon: '🌿',
            title: 'Sustainability',
            bnText: 'পরিবেশগত দায়িত্ববোধ ও সম্প্রদায়ের উন্নয়নে প্রতিশ্রুতিবদ্ধ থাকা।',
            enText: '" Committed to environmental stewardship and community development. "',
          },
        ],
      },
    },
    {
      type: 'ParagonBusinessesBlock',
      props: {
        id: 'paragon-businesses',
        tagText: 'Group Companies',
        heading: 'প্যারাগন গ্রুপের',
        headingHighlight: 'ব্যবসায়িক শাখা',
        businesses: [
          { emoji: '🐔', name: 'ব্রয়লার ও লেয়ার প্যারেন্ট চিকস', nameEn: 'Broiler & Layer Parent Chicks', desc: 'বাংলাদেশের অন্যতম বৃহত্তম পোলট্রি ফার্ম — উচ্চমানের ব্রয়লার ও লেয়ার চিকস উৎপাদনে শীর্ষস্থানীয়।', featured: false },
          { emoji: '🐟', name: 'প্রাণী ও মাছ-চিংড়ির খাদ্য', nameEn: 'Animal & Fish-Shrimp Feed', desc: 'গবাদিপশু, মাছ ও চিংড়ির জন্য পুষ্টিসমৃদ্ধ ও বৈজ্ঞানিকভাবে প্রস্তুত ফিড উৎপাদন।', featured: false },
          { emoji: '🛒', name: 'কনজ্যুমার ফুডস', nameEn: 'Consumer Foods', desc: 'প্রক্রিয়াজাত মাংস ও খাদ্যপণ্যের বাজারে নির্ভরযোগ্য ব্র্যান্ড — সারাদেশে সহজলভ্য।', featured: false },
          { emoji: '🌿', name: 'প্যারাগন জৈব সার', nameEn: 'Paragon Organic Fertilizer', desc: 'টেকসই কৃষির জন্য উপকারী অণুজীব সমৃদ্ধ ১০০% জৈব সার উৎপাদন ও বিপণন।', featured: true },
          { emoji: '⚡', name: 'বায়ো-ইলেকট্রিসিটি', nameEn: 'Bio-Electricity', desc: 'পোলট্রি উপজাত থেকে পরিবেশবান্ধব বিদ্যুৎ উৎপাদন — নবায়নযোগ্য শক্তিতে অবদান।', featured: false },
          { emoji: '🧴', name: 'পিপি ওভেন ব্যাগ ও সোলার প্যানেল', nameEn: 'PP Woven Bags & Solar Panels', desc: 'টেকসই প্যাকেজিং সমাধান এবং সোলার এনার্জি পণ্যে প্যারাগনের বিস্তৃত উপস্থিতি।', featured: false },
        ],
      },
    },
    {
      type: 'ParagonWhyOrganicBlock',
      props: {
        id: 'paragon-why-organic',
        tagText: 'Our Commitment',
        heading: 'কেন আমরা',
        headingHighlight: 'জৈব কৃষিতে বিনিয়োগ করলাম?',
        reasons: [
          { title: 'পোলট্রি শিল্পের দায়িত্ব', text: 'প্যারাগন গ্রুপের পোলট্রি বিভাগ থেকে প্রতিদিন বিপুল পরিমাণ জৈব উপজাত তৈরি হয়। এই উপজাতকে মাটির সুস্বাস্থ্যের জন্য ব্যবহার করাই আমাদের circular economy-র অংশ।' },
          { title: 'কৃষকের প্রয়োজনীয়তা', text: 'বাংলাদেশের কৃষকরা মাটির উর্বরতা হ্রাসের সমস্যায় ভুগছিলেন। তাদের একটি কার্যকর ও সাশ্রয়ী সমাধান দেওয়াই ছিল আমাদের লক্ষ্য।' },
          { title: 'পরিবেশগত দায়বদ্ধতা', text: 'রাসায়নিক সারের অতিরিক্ত ব্যবহার পরিবেশ দূষণ করছে। আমরা একটি পরিবেশবান্ধব বিকল্প তৈরি করতে চেয়েছিলাম যা একই সাথে কার্যকর এবং টেকসই।' },
          { title: 'জাতীয় খাদ্য নিরাপত্তা', text: 'বাংলাদেশের ক্রমবর্ধমান জনগোষ্ঠীর খাদ্য নিরাপত্তা নিশ্চিত করতে হলে মাটির উর্বরতা বজায় রাখা অপরিহার্য। এটি আমাদের জাতীয় দায়িত্ব।' },
        ],
        ctaTitle: 'প্যারাগন পরিবারের',
        ctaHighlight: 'অংশ হন',
        ctaBtn1Label: 'ডিলারশিপ সম্পর্কে জানুন',
        ctaBtn1Href: '/location',
        ctaBtn2Label: 'যোগাযোগ করুন',
        ctaBtn2Href: '/contact',
      },
    },
  ],
  root: { props: { title: 'প্যারাগন গ্রুপ' } },
}

export async function GET() {
  try {
    const payload = await getPayload({ config })
    const slug = 'about/paragon-group'

    const existing = await payload.find({
      collection: 'pages',
      where: { slug: { equals: slug } },
    })

    if (existing.docs.length > 0) {
      await payload.update({
        collection: 'pages',
        id: existing.docs[0].id,
        data: { layout, status: 'published' },
      })
    } else {
      await payload.create({
        collection: 'pages',
        data: { title: 'প্যারাগন গ্রুপ', slug, layout, status: 'published' },
      })
    }

    return NextResponse.json({ success: true, message: 'paragon-group page seeded successfully' })
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 })
  }
}
