import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

const layout = {
  content: [
    {
      type: 'PageBannerBlock',
      props: {
        id: 'banner-why-this-product',
        tagText: 'কেন আমাদের পণ্য?',
        tagTextEn: 'Why Our Product?',
        title: 'কেন বেছে নেবেন',
        titleEn: 'Why Choose',
        titleHighlight: 'প্যারাগন জৈব সার?',
        titleHighlightEn: 'Paragon Organic Fertilizer?',
        subtitle: 'ফসলের সমৃদ্ধিতে নির্ভরযোগ্য সঙ্গী — প্রাকৃতিক উপাদানে তৈরি, বিজ্ঞানসম্মত ফর্মুলায় প্রমাণিত।',
        subtitleEn: 'A trusted partner for crop prosperity — made from natural ingredients, proven with scientific formula.',
        bgGradient: 'linear-gradient(135deg, #0a1f14 0%, #1B4D3E 55%, #2D7A3A 100%)',
        bgImageUrl: '',
        align: 'left',
        breadcrumb1Label: 'সম্পর্কে',
        breadcrumb1LabelEn: 'About',
        breadcrumb1Href: '/about/our-story',
        breadcrumb2Label: 'কেন এই পণ্য',
        breadcrumb2LabelEn: 'Why This Product',
      },
    },
    {
      type: 'WhyProductContentBlock',
      props: {
        id: 'why-product-content',
        subheading: 'ফসলের সমৃদ্ধিতে নির্ভরযোগ্য সঙ্গী: প্যারাগন জৈব সার',
        para1: 'দেশের পরিশ্রমী কৃষক ভাইদের অন্যতম প্রধান দুশ্চিন্তা হলো ফসলের কাঙ্ক্ষিত ফলন। মাটির প্রাণশক্তি হ্রাস পাওয়া এবং রাসায়নিকের অতিরিক্ত ব্যবহারে জমি যখন উর্বরতা হারায়, তখনই প্রয়োজন একটি সঠিক ও কার্যকরী সমাধান। আপনার এই ভাবনার স্থায়ী সমাধান নিয়ে এসেছে প্যারাগন জৈব সার।',
        para2: 'আমাদের নিজস্ব প্ল্যান্টে উৎপাদিত এই সার মাটির স্বাস্থ্য পুনরুদ্ধার করে এবং গাছের জন্য প্রয়োজনীয় অত্যাবশ্যকীয় জৈব উপাদান ও পুষ্টির যোগান নিশ্চিত করে। উন্নত মানের এই সার ব্যবহারে মাটির গঠনশৈলী উন্নত হয়, যা সরাসরি ফসলের উৎপাদন বৃদ্ধিতে সহায়তা করে।',
        chooseTitle: 'কেন বেছে নেবেন প্যারাগন জৈব সার?',
        bullets: [
          { bold: 'উর্বরতা বৃদ্ধি', text: 'মাটির প্রাকৃতিক গুণাগুণ ফিরিয়ে এনে দীর্ঘমেয়াদী উর্বরতা নিশ্চিত করে।' },
          { bold: 'রোগ প্রতিরোধ ক্ষমতা', text: 'গাছের রোগ বালাই দমনের সক্ষমতা বাড়িয়ে তুলে চারাকে করে মজবুত ও সতেজ।' },
          { bold: 'আর্দ্রতা সংরক্ষণ', text: 'মাটির পানি ধারণ ক্ষমতা বৃদ্ধি করে, যা সেচ ব্যবস্থাপনায় সহায়ক।' },
          { bold: 'পিএইচ (pH) নিয়ন্ত্রণ', text: 'মাটির বিষক্রিয়া ও অতিরিক্ত অম্লতা কমিয়ে আবাদযোগ্য পরিবেশ তৈরি করে।' },
        ],
        availability: 'আপনাদের সুবিধার্থে প্যারাগন জৈব সার এখন ১ কেজি, ৫ কেজি এবং ৪০ কেজির আকর্ষণীয় ও টেকসই প্যাকেজিংয়ে নিকটস্থ ডিলার পয়েন্টে পাওয়া যাচ্ছে।',
        specsText: 'উপস্থিত উপাদানসমূহ অনুযায়ী পণ্যের রং কালচে ধুসর এবং গুঁড়াদার। এতে কোন দুর্গন্ধ নেই এবং আর্দ্রতার পরিমাণ ১৫-২০%। পিএইচ মান ৬.০-৮.৫, জৈব কার্বন ১০-২৫%, টোটাল নাইট্রোজেন (N) ০.৫-৪.০%, কার্বন নাইট্রোজেন অনুপাত (C:N) সর্বোচ্চ ২০:১, ফসফরাস (P) ০.৫-৩.০%, পটাশিয়াম (K) ০.৫-৩.০% এবং সালফার (S) ০.১-০.৪%। এছাড়া জিংক (Zn) সর্বোচ্চ ০.১%, কপার (Cu) সর্বোচ্চ ০.০৫%, আর্সেনিক (As) সর্বোচ্চ ১০ পিপিএম, ক্রোমিয়াম (Cr) সর্বোচ্চ ৫০ পিপিএম, ক্যাডমিয়াম (Cd) সর্বোচ্চ ৫ পিপিএম, লেড (Pb) সর্বোচ্চ ৩০ পিপিএম, মার্কারি (Hg) সর্বোচ্চ ০.১ পিপিএম, নিকেল (Ni) সর্বোচ্চ ১০ পিপিএম এবং ইনাট ম্যাটেরিয়াল সর্বোচ্চ ১.০% থাকতে পারে।',
        imageUrl: '',
      },
    },
    {
      type: 'WhyUSPBlock',
      props: {
        id: 'why-usp',
        tagText: 'Key Advantages',
        heading: 'আমাদের পণ্যের',
        headingHighlight: 'অনন্য বৈশিষ্ট্য',
        usps: [
          {
            icon: '🛡️',
            title: '১০০% জৈব ও নিরাপদ',
            titleEn: 'Certified Organic',
            desc: 'কোনো ক্ষতিকর রাসায়নিক উপাদান নেই। সম্পূর্ণ প্রাকৃতিক কাঁচামাল থেকে তৈরি, মানুষ, প্রাণী ও পরিবেশের জন্য সম্পূর্ণ নিরাপদ।',
            color: '#1B4D3E',
          },
          {
            icon: '🏆',
            title: 'বিজ্ঞানসম্মত ফর্মুলা',
            titleEn: 'Scientific Formula',
            desc: 'বাংলাদেশের মাটির বিশেষ চাহিদা বিশ্লেষণ করে তৈরি। কৃষি গবেষণা প্রতিষ্ঠানের সাথে সহযোগিতায় উদ্ভাবিত ফর্মুলা।',
            color: '#2D7A3A',
          },
          {
            icon: '📈',
            title: 'প্রমাণিত ফলাফল',
            titleEn: 'Proven Results',
            desc: 'হাজার হাজার কৃষকের মাঠে পরীক্ষিত ও প্রমাণিত। গড়ে ৩০-৫০% উৎপাদন বৃদ্ধির রেকর্ড।',
            color: '#D4A017',
          },
          {
            icon: '👥',
            title: 'বিশেষজ্ঞ পরামর্শ সেবা',
            titleEn: 'Expert Support',
            desc: 'প্রশিক্ষিত কৃষি বিশেষজ্ঞদের দল সবসময় আপনার পাশে। বিনামূল্যে পরামর্শ সেবা পাওয়া যায়।',
            color: '#1B4D3E',
          },
        ],
        specTitle: 'পণ্যের',
        specHighlight: 'গুণগত মান',
        specBody: 'প্রতিটি ব্যাচ কঠোর মান নিয়ন্ত্রণের মধ্য দিয়ে যায়। বাংলাদেশ কৃষি গবেষণা ইনস্টিটিউট (BARI) অনুমোদিত পদ্ধতিতে পরীক্ষিত।',
        specs: [
          { label: 'পিএইচ মান', value: '৬.০ – ৮.৫' },
          { label: 'জৈব কার্বন', value: '১০-২৫%' },
          { label: 'নাইট্রোজেন (N)', value: '০.৫-৪.০%' },
          { label: 'ফসফরাস (P)', value: '০.৫-৩.০%' },
          { label: 'পটাশিয়াম (K)', value: '০.৫-৩.০%' },
          { label: 'আর্দ্রতা', value: '১৫-২০%' },
        ],
        trustPoints: [
          { text: 'বাস্তব মাঠ পরীক্ষায় ফলাফল প্রমাণিত' },
          { text: 'প্যারাগন গ্রুপের বিশ্বস্ত ব্র্যান্ড' },
          { text: 'দেশীয় কৃষি বিশেষজ্ঞদের তত্ত্বাবধানে তৈরি' },
          { text: 'সারাদেশে সহজলভ্য ডিলার নেটওয়ার্ক' },
          { text: 'বিক্রয়োত্তর সেবা ও পরামর্শ' },
        ],
        trustStats: [
          { value: '৫০০০+', label: 'কৃষক' },
          { value: '৩০-৫০%', label: 'ফলন বৃদ্ধি' },
          { value: '১০+', label: 'বছরের গবেষণা' },
        ],
      },
    },
    {
      type: 'WhyTestimonialsBlock',
      props: {
        id: 'why-testimonials',
        tagText: 'Testimonials',
        heading: 'কৃষকদের',
        headingHighlight: 'অভিজ্ঞতা',
        testimonials: [
          {
            name: 'মো. আব্দুর রহমান',
            location: 'ময়মনসিংহ',
            role: 'ধান চাষি',
            text: 'প্যারাগন জৈব সার ব্যবহারের পর আমার ধানের ফলন ৪০% বেড়ে গেছে। মাটিও অনেক ভালো হয়েছে। এখন রাসায়নিক সার কম লাগে।',
            emoji: '🌾',
            years: '৩ বছর ধরে ব্যবহার করছেন',
          },
          {
            name: 'কামরুন নাহার',
            location: 'রাজশাহী',
            role: 'সবজি চাষি',
            text: 'আমার সবজি বাগানে এখন কোনো রাসায়নিক সার দিই না। প্যারাগন জৈব সারেই মাটি সুস্থ থাকে। সবজিও তাজা থাকে বেশিদিন।',
            emoji: '🥬',
            years: '২ বছর ধরে ব্যবহার করছেন',
          },
          {
            name: 'মো. জামাল উদ্দিন',
            location: 'কুমিল্লা',
            role: 'আম চাষি',
            text: 'আমের বাগানে প্যারাগন জৈব সার দেওয়ার পর গাছগুলো অনেক সতেজ দেখাচ্ছে। ফলও বেশি হচ্ছে এবং মিষ্টি হচ্ছে।',
            emoji: '🥭',
            years: '৪ বছর ধরে ব্যবহার করছেন',
          },
        ],
        ctaTitle: 'আজই শুরু করুন',
        ctaHighlight: 'জৈব কৃষির যাত্রা',
        ctaBtn1Label: 'ডিলার খুঁজুন',
        ctaBtn1Href: '/dealership',
        ctaBtn2Label: 'সরাসরি যোগাযোগ করুন',
        ctaBtn2Href: '/contact',
      },
    },
  ],
  root: { props: { title: 'কেন এই পণ্য' } },
}

export async function GET() {
  try {
    const payload = await getPayload({ config })
    const slug = 'about/why-this-product'

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
        data: { title: 'কেন এই পণ্য', slug, layout, status: 'published' },
      })
    }

    return NextResponse.json({ success: true, message: 'why-this-product page seeded successfully' })
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 })
  }
}
