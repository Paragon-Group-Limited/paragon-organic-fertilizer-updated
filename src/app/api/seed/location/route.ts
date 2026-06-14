import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

const layout = {
  content: [
    {
      type: 'PageBannerBlock',
      props: {
        id: 'banner-location',
        tagText: 'ডিলার নেটওয়ার্ক',
        tagTextEn: 'Dealer Network',
        title: 'ডিলারশিপ ও',
        titleEn: 'Dealership &',
        titleHighlight: 'আমাদের উপস্থিতি',
        titleHighlightEn: 'Our Presence',
        subtitle: 'আজই যুক্ত হোন প্যারাগন জৈব সারের ডিলার নেটওয়ার্কে এবং সবুজ কৃষির সাথে আপনার ব্যবসাকে এগিয়ে নিন।',
        subtitleEn: 'Join Paragon Organic Fertilizer\'s dealer network today and grow your business with green agriculture.',
        bgGradient: 'linear-gradient(135deg, #0a1f14 0%, #1B4D3E 55%, #2D7A3A 100%)',
        bgImageUrl: '',
        align: 'left',
        breadcrumb1Label: 'ডিলারশিপ',
        breadcrumb1LabelEn: 'Dealership',
        breadcrumb2Label: '',
      },
    },
    {
      type: 'LocationMapContactBlock',
      props: {
        id: 'location-map-contact',
        tagText: 'Coverage',
        heading: 'বাংলাদেশ জুড়ে',
        headingHighlight: 'আমাদের উপস্থিতি',
        mapImageUrl: '/bangladesh-map.png',
        coverageTitle: 'বাংলাদেশ জুড়ে আমাদের উপস্থিতি',
        coveragePara1: 'প্যারাগন জৈব সার বাংলাদেশের বিভিন্ন জেলার কৃষকদের কাছে পৌঁছে যাচ্ছে একটি নির্ভরযোগ্য ও পরিবেশবান্ধব কৃষি সমাধান হিসেবে। আমাদের লক্ষ্য হলো মাটির স্বাস্থ্য উন্নয়ন, ফসলের উৎপাদনশীলতা বৃদ্ধি এবং টেকসই কৃষি ব্যবস্থাকে আরও শক্তিশালী করা।',
        coveragePara2: 'মানচিত্রে চিহ্নিত এলাকাগুলোতে আমাদের সেবা ও পণ্য বিতরণ নিশ্চিত। আমরা দেশের আনাচে-কানাচে আরও মানুষের কাছে জৈব সারের সঠিক দিকনির্দেশনা পৌঁছে দিয়ে যাচ্ছি।',
        welcomeText: 'বাংলাদেশের কৃষি উন্নয়ন ও পরিবেশবান্ধব চাষাবাদ উৎসাহিত রাখতে প্যারাগন জৈব সার দেশের বিভিন্ন অঞ্চলে ডিলার ও ব্যবসায়িক অংশীদার নিয়োগ করছে। আপনি যদি উদ্যোক্তা, কৃষি উপকরণ ব্যবসায়ী, ডিলার বা পরিবেশক হন — তাহলে এখনই আপনার সুযোগ। আপনার এলাকায় আমাদের ব্র্যান্ডের সাথে ব্যবসা সম্প্রসারণ করতে চান? তাহলে প্যারাগন জৈব সার হতে পারে আপনার জন্য একটি লাভজনক সুযোগ।',
        tableTitle: 'বিক্রয় প্রতিনিধি যোগাযোগ',
        contacts: [
          { area1: 'মহাখালী ঢাকা (হেড অফিস)', phone1: '০১৭৯২৬৩০৫২৩', area2: 'গাজীপুর অফিস', phone2: '০১৩২৫৮১৩২২৯' },
          { area1: 'দিনাজপুর টেরিটরি', phone1: '০১৫৩২৪১২৩০৫২', area2: 'সিলেট টেরিটরি', phone2: '০১৫৩০০৩৩৪৫২' },
          { area1: 'রংপুর টেরিটরি', phone1: '০১৫২৫৫৭৩০৫২', area2: 'ময়মনসিংহ টেরিটরি', phone2: '০১৫৩২৬১৩০৮৬' },
          { area1: 'বগুড়া টেরিটরি', phone1: '০১৫৩২৬২৬৩০৫২', area2: 'মানিকগঞ্জ টেরিটরি', phone2: '০১৭৮৬৪৩৩৮৬৩' },
          { area1: 'রাজশাহী টেরিটরি', phone1: '০১৭৯২৬৩০৫২৩', area2: 'মুন্সিগঞ্জ টেরিটরি', phone2: '০১৫৩২৮১৩০৫৪' },
        ],
      },
    },
    {
      type: 'LocationDealerBenefitsBlock',
      props: {
        id: 'location-dealer-benefits',
        tagText: 'Why Become A Dealer',
        heading: 'কেন প্যারাগন জৈব সারের',
        headingHighlight: 'ডিলার হবেন?',
        subtitle: 'কৃষকদের কাছে ক্রমবর্ধমান জৈব সারের চাহিদা কাজে লাগিয়ে আপনার ব্যবসা গড়ে তুলুন।',
        benefits: [
          {
            icon: '🏢',
            title: 'বিশ্বস্ত ব্র্যান্ড সাপোর্ট',
            desc: 'দেশের অন্যতম বিশ্বস্ত কৃষিভিত্তিক প্রতিষ্ঠানের ব্র্যান্ড পরিচিতি আপনার ব্যবসাকে এগিয়ে নিয়ে যাবে।',
          },
          {
            icon: '📈',
            title: 'ক্রমবর্ধমান বাজার চাহিদা',
            desc: 'কৃষকদের মধ্যে জৈব সারের চাহিদা প্রতিনিয়ত বাড়ছে। এই বাড়ন্ত বাজারে প্রবেশের সেরা সুযোগ এখনই।',
          },
          {
            icon: '📣',
            title: 'নিয়মিত মার্কেটিং সহায়তা',
            desc: 'নিয়মিত মার্কেটিং ও প্রচার সহায়তা, প্রশিক্ষণ এবং কৃষক সমাবেশে সরাসরি সহযোগিতা পাবেন।',
          },
          {
            icon: '💰',
            title: 'প্রতিযোগিতামূলক লাভ',
            desc: 'আকর্ষণীয় কমিশন ও প্রতিযোগিতামূলক ব্যবসায়িক সুবিধায় দীর্ঘমেয়াদী লাভজনক অংশীদারিত্ব।',
          },
          {
            icon: '🤝',
            title: 'কৃষক-অনুকূল পণ্য',
            desc: 'মানসম্পন্ন ও কৃষক-অনুকূলতার পণ্য নিয়ে কাজ করুন। প্রতিটি বিক্রয়ে কৃষকের সন্তুষ্টি নিশ্চিত।',
          },
          {
            icon: '🌱',
            title: 'দীর্ঘমেয়াদী অংশীদারিত্ব',
            desc: 'সারা বাংলাদেশজুড়ে আমাদের ডিলার নেটওয়ার্কের অংশ হন। এলাকা: সারা বাংলাদেশ।',
          },
        ],
      },
    },
    {
      type: 'LocationApplicationBlock',
      props: {
        id: 'location-apply',
        tagText: 'Apply Now',
        heading: 'ডিলারশিপের জন্য',
        headingHighlight: 'আবেদন করুন',
        requirements: [
          { text: 'আপনার নাম ও প্রতিষ্ঠানের নাম' },
          { text: 'যোগাযোগের মোবাইল নম্বর' },
          { text: 'ব্যবসার ঠিকানা (জেলা, উপজেলা)' },
          { text: 'সংক্ষিপ্ত ব্যবসায়িক অভিজ্ঞতার বিবরণ' },
          { text: 'কৃষি পণ্য বা সার ব্যবসার পূর্ব অভিজ্ঞতা (থাকলে)' },
        ],
        phone: '+880 1324-413282',
        email: 'info.fertilizer@paragon.com.bd',
        formTitle: 'আবেদন ফর্ম পূরণ করুন',
        formSuccessTitle: 'আবেদন সফলভাবে জমা হয়েছে!',
        formSuccessText: 'আমাদের টিম শীঘ্রই আপনার সাথে যোগাযোগ করবে। ধন্যবাদ আপনার আগ্রহের জন্য।',
        submitLabel: 'আবেদন জমা দিন',
      },
    },
  ],
  root: { props: { title: 'ডিলারশিপ ও আমাদের উপস্থিতি' } },
}

export async function GET() {
  try {
    const payload = await getPayload({ config })
    const slug = 'location'

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
        data: { title: 'ডিলারশিপ ও আমাদের উপস্থিতি', slug, layout, status: 'published' },
      })
    }

    return NextResponse.json({ success: true, message: 'location page seeded successfully' })
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 })
  }
}
