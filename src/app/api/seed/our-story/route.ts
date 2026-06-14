import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

const STORY1_IMAGE = 'https://lh3.googleusercontent.com/sitesv/AA5AbUA8nxMbylfo5XAt8aEyyAGpJFdqvRKiJ9xI-uUe_CeUu4bwFSGrOpki1nwdGmYlOJPRIm03368nFsD7APQWeYSqk5s8qamjpvOc2TY2RrsK5APRtq6eNaCGYSkS5x4C43_XRwgv3wFmMOh4GTPXgp76jk1uISPNf_kJ71lhFA9LkxdL08JBNz1yLqaIm-Vw-nJJr4H2TEpwVlYyfPxLbtLbBlit3Q6hlhfvnjNHJs0=w1280'
const STORY2_IMAGE = 'https://lh3.googleusercontent.com/sitesv/AA5AbUBE3LfYxLm3YrIqgOAtbeFAmvtp3pdaIXI_3JcEgOBvvifp3ec-QMi9x3k91zqcUIVGgs5YKw_4WlNLUYKSCawJIiYF2ahTs4rTyoXmZKk216Bzrr-cJZoyvAo_i_8B4S98WyOX8uaUPhBdyqIto_vUze72vWO2JdMRa6C97_7HkhirJVvwPkkppZsstVo=w1280'

const BENEFITS_LIST = '<ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:8px"><li style="display:flex;align-items:flex-start;gap:8px"><span style="color:#1B4D3E;font-weight:700;flex-shrink:0">✓</span> মাটির গঠন উন্নত করে</li><li style="display:flex;align-items:flex-start;gap:8px"><span style="color:#1B4D3E;font-weight:700;flex-shrink:0">✓</span> মাটিতে পানি ধরে রাখার ক্ষমতা বাড়ায়</li><li style="display:flex;align-items:flex-start;gap:8px"><span style="color:#1B4D3E;font-weight:700;flex-shrink:0">✓</span> মাটির ভেতরে উপকারী ব্যাকটেরিয়া ও ছত্রাকের কার্যক্রম বৃদ্ধি করে</li><li style="display:flex;align-items:flex-start;gap:8px"><span style="color:#1B4D3E;font-weight:700;flex-shrink:0">✓</span> পুষ্টি উপাদানের কার্যকারিতা উন্নত করে আরও সবল ও স্বাস্থ্যবান ফসল উৎপাদনে সহায়তা করে</li><li style="display:flex;align-items:flex-start;gap:8px"><span style="color:#1B4D3E;font-weight:700;flex-shrink:0">✓</span> গাছের প্রয়োজন অনুযায়ী ধীরে ধীরে পুষ্টি সরবরাহ করে</li><li style="display:flex;align-items:flex-start;gap:8px"><span style="color:#1B4D3E;font-weight:700;flex-shrink:0">✓</span> ফসলের পানি ব্যবহারের দক্ষতা বাড়ায়</li><li style="display:flex;align-items:flex-start;gap:8px"><span style="color:#1B4D3E;font-weight:700;flex-shrink:0">✓</span> পুষ্টি উপাদান মাটি থেকে ধুয়ে চলে যাওয়া কমিয়ে পরিবেশ ও বাস্তুতন্ত্রকে সুরক্ষা দেয়</li><li style="display:flex;align-items:flex-start;gap:8px"><span style="color:#1B4D3E;font-weight:700;flex-shrink:0">✓</span> ভবিষ্যতের ফসলের জন্য মাটিকে আরও উর্বর করে তোলে</li></ul>'

const layout = {
  content: [
    {
      type: 'PageBannerBlock',
      props: {
        id: 'banner-our-story',
        tagText: 'সম্পর্কে',
        tagTextEn: 'About',
        title: 'আমাদের',
        titleEn: 'Our',
        titleHighlight: 'গল্প',
        titleHighlightEn: 'Story',
        subtitle: 'প্যারাগন জৈব সার — মাটির প্রাণ, কৃষকের আস্থা। জানুন কীভাবে একটি স্বপ্ন হয়ে উঠল বাংলাদেশের কৃষিবিপ্লবের পথিকৃৎ।',
        subtitleEn: 'Paragon Organic Fertilizer — Soul of Soil, Farmer\'s Trust. Discover how a vision became the pioneer of Bangladesh\'s agricultural revolution.',
        bgGradient: 'linear-gradient(135deg, #0a1f14 0%, #1B4D3E 55%, #2D7A3A 100%)',
        align: 'left',
        breadcrumb1Label: 'সম্পর্কে',
        breadcrumb1LabelEn: 'About',
        breadcrumb1Href: '/about/our-story',
        breadcrumb2Label: 'আমাদের গল্প',
        breadcrumb2LabelEn: 'Our Story',
      },
    },
    {
      type: 'OurStoryFoundingBlock',
      props: {
        id: 'founding',
        tagText: 'প্রসারে দায়িত্ব বাড়ে',
        heading: 'আমাদের',
        headingHighlight: 'গল্প',
        para1: '২০২০ সালে প্যারাগন তার প্রথম জৈব সার প্রকল্প চালু করে। সকল জৈব বর্জ্য এই প্রকল্পে ব্যবহার করার মাধ্যমে প্যারাগন তার পরিবেশগত প্রভাব কমানো এবং পরিবেশবান্ধব উদ্যোগকে আরও এগিয়ে নেওয়ার পথে আরেকটি গুরুত্বপূর্ণ পদক্ষেপ গ্রহণ করে।',
        para2: 'প্রযুক্তির সহায়তায় প্যারাগন এমন একটি জৈব সার তৈরি করেছে যা:',
        benefitsList: BENEFITS_LIST,
        missionTitle: 'আমাদের মিশন',
        missionText: 'মাটির স্বাস্থ্য রক্ষা করা ও কৃষকের জীবনমান উন্নয়ন — বাংলাদেশের কৃষিজমির উর্বরতা পুনরুদ্ধার করা এবং রাসায়নিক সারের উপর নির্ভরশীলতা ক্রমশ কমিয়ে আনা।',
        visionTitle: 'আমাদের ভিশন',
        visionText: 'রাসায়নিকমুক্ত বাংলাদেশ গড়া — ২০৩০ সালের মধ্যে বাংলাদেশের প্রতিটি জেলায় কৃষকদের কাছে জৈব কৃষির সুবিধা পৌঁছে দেওয়া।',
      },
    },
    {
      type: 'OurStorySuccessStoriesBlock',
      props: {
        id: 'success-stories',
        tagText: 'কৃষকের সাফল্য',
        heading: 'সফলতার',
        headingHighlight: 'গল্প',
        subheading: 'প্যারাগন জৈব সার ব্যবহার করে বাংলাদেশের কৃষকরা যেভাবে তাদের জীবন বদলে নিচ্ছেন।',

        story1ImageUrl: STORY1_IMAGE,
        story1CropEmoji: '🥔',
        story1CropName: 'মুখি কচু',
        story1Location: 'শেরপুর, বগুড়া',
        story1FarmerName: 'রফিকুল ইসলাম',
        story1Heading: 'বগুড়ার শেরপুরে মুখি কচু: রফিকুল ইসলাম ভাইয়ের অভাবনীয় সাফল্য!',
        story1Body: 'বগুড়ার শেরপুরের সফল চাষি রফিকুল ইসলাম ভাই মুখি কচুর জমিতে প্যারাগন জৈব সার ব্যবহার করে পেয়েছেন ভালো ফলন ও বেশি লাভ। আগে কচু চাষে খরচ বেশি হতো এবং ফলন নিয়ে চিন্তা থাকত। কিন্তু প্যারাগন জৈব সার ব্যবহারের পর তার জমির মাটি হয়েছে আরও উর্বর, গাছ হয়েছে সতেজ ও সবল, আর কচুর আকার ও মান হয়েছে উন্নত।\n\nরাসায়নিক সারের ওপর নির্ভরতা কমে যাওয়ায় উৎপাদন খরচও কমেছে। ভালো মানের কচু বাজারে ভালো দামে বিক্রি করে রফিকুল ইসলাম ভাই এখন অনেক সন্তুষ্ট। তার এই সফলতা প্রমাণ করে—মাটির যত্ন নিলে ফসল ভালো হয়, আর ভালো ফসল কৃষকের মুখে হাসি ফোটায়।',
        story1Tagline: 'প্যারাগন জৈব সার—মাটির শক্তি বাড়ায়, ফসলের ফলন উন্নত করে।',
        story1BgGradient: 'linear-gradient(135deg, #2D6A2A 0%, #1B4D3E 100%)',

        story2ImageUrl: STORY2_IMAGE,
        story2CropEmoji: '🌾',
        story2CropName: 'ধান',
        story2Location: 'শেরপুর, বগুড়া',
        story2FarmerName: 'সাইফুল ইসলাম ও তুষার সরকার',
        story2Heading: 'ধানের বাম্পার ফলন: বগুড়ার শেরপুরের সাইফুল ইসলাম ও তুষার সরকারের অবিশ্বাস্য সাফল্য!',
        story2Body: 'বগুড়ার শেরপুরের কৃষক সাইফুল ইসলাম ও তুষার সরকার ধানের জমিতে প্যারাগন জৈব সার ব্যবহার করে পেয়েছেন আশানুরূপ বাম্পার ফলন। আগে ধান চাষে শুধু রাসায়নিক সারের ওপর নির্ভর করতে হতো, কিন্তু এবার প্যারাগন জৈব সার ব্যবহারের পর জমির মাটি হয়েছে আরও উর্বর এবং ধান গাছ হয়েছে সতেজ ও মজবুত।\n\nধানের শীষ হয়েছে লম্বা, দানা হয়েছে পুষ্ট ও ভারী। গাছের শিকড় ভালোভাবে মাটিতে ছড়ানোর কারণে গাছ সহজে হেলে পড়েনি। একই সঙ্গে রাসায়নিক সারের ব্যবহার কিছুটা কমায় চাষের খরচও সাশ্রয় হয়েছে।\n\nতাদের এই সফলতা প্রমাণ করে—মাটির যত্ন নিলে ধানের ফলন বাড়ে, কৃষকের লাভ বাড়ে এবং জমি ভবিষ্যতের জন্যও ভালো থাকে।',
        story2Tagline: 'প্যারাগন জৈব সার—মাটির শক্তি বাড়ায়, ধানের ফলন উন্নত করে।',
        story2BgGradient: 'linear-gradient(135deg, #D4A017 0%, #B8860B 100%)',

        videoSectionTitle: 'Video Links:',
        videoLinks: [
          { label: 'Video 1', url: 'https://www.facebook.com/share/v/1D7iRL2PGR/?mibextid=wwXIfr' },
          { label: 'Video 2', url: 'https://www.facebook.com/share/v/1C5Q2jFipG/?mibextid=wwXIfr' },
        ],
      },
    },
    {
      type: 'OurStoryTimelineBlock',
      props: {
        id: 'timeline',
        tagText: 'আমাদের যাত্রা',
        heading: 'একটি',
        headingHighlight: 'গৌরবময় পথচলা',
        items: [
          { year: '২০১০', title: 'প্যারাগন গ্রুপের দৃষ্টিভঙ্গি', desc: 'বাংলাদেশের শীর্ষস্থানীয় শিল্প প্রতিষ্ঠান প্যারাগন গ্রুপ কৃষিখাতে টেকসই সমাধান নিয়ে আসার সিদ্ধান্ত নেয়।' },
          { year: '২০২০', title: 'প্রথম জৈব সার প্রকল্প', desc: 'প্যারাগন তার প্রথম জৈব সার প্রকল্প চালু করে। সকল জৈব বর্জ্য এই প্রকল্পে ব্যবহার করার মাধ্যমে পরিবেশবান্ধব উদ্যোগের এক নতুন অধ্যায় শুরু হয়।' },
          { year: '২০২১', title: 'কৃষকদের মাঝে বিস্তার', desc: 'পণ্যের গুণমান ও কার্যকারিতা দ্রুত কৃষকদের মধ্যে ছড়িয়ে পড়ে। বগুড়া, শেরপুরসহ বিভিন্ন অঞ্চলে সফলতার গল্প রচিত হয়।' },
          { year: '২০২২', title: 'ডিলার নেটওয়ার্ক গঠন', desc: 'সারাদেশে ডিলার নেটওয়ার্ক প্রসারিত হয় এবং কৃষকদের দোরগোড়ায় পণ্য পৌঁছে দেওয়ার ব্যবস্থা নিশ্চিত করা হয়।' },
          { year: '২০২৩', title: 'নতুন গবেষণা ও উন্নয়ন', desc: 'অত্যাধুনিক গবেষণার মাধ্যমে পণ্যের মান আরও উন্নত করা হয় এবং নতুন ফর্মুলেশন বাজারে আনা হয়।' },
        ],
      },
    },
    {
      type: 'OurStoryValuesBlock',
      props: {
        id: 'values',
        tagText: 'আমাদের মূল্যবোধ',
        heading: 'আমাদের',
        headingHighlight: 'মূল্যবোধ',
        values: [
          { icon: '🌿', title: 'পরিবেশবান্ধবতা', desc: 'প্রতিটি পদক্ষেপে পরিবেশ ও মাটির স্বাস্থ্য রক্ষাকে সর্বোচ্চ অগ্রাধিকার দেওয়া হয়।' },
          { icon: '🎯', title: 'মানের প্রতি অঙ্গীকার', desc: 'সর্বোচ্চ মানের কাঁচামাল ও বৈজ্ঞানিক প্রক্রিয়ায় প্রতিটি পণ্য তৈরি করা হয়।' },
          { icon: '❤️', title: 'কৃষকের প্রতি দায়বদ্ধতা', desc: 'আমাদের প্রতিটি সিদ্ধান্তের কেন্দ্রে থাকেন বাংলাদেশের কৃষক ও তার পরিবার।' },
          { icon: '👁️', title: 'স্বচ্ছতা', desc: 'পণ্যের উপাদান, প্রক্রিয়া ও মূল্য নির্ধারণে সম্পূর্ণ স্বচ্ছতা বজায় রাখা হয়।' },
        ],
        ctaTitle: 'আজই',
        ctaHighlight: 'যোগাযোগ করুন',
        ctaText: 'আমাদের সাথে যোগাযোগ করুন এবং জৈব কৃষির যাত্রায় যোগ দিন।',
        ctaBtn1Label: 'যোগাযোগ করুন',
        ctaBtn1Href: '/contact',
        ctaBtn2Label: 'মাটির উপকার জানুন',
        ctaBtn2Href: '/about/soil-benefit',
      },
    },
  ],
  root: { props: { title: 'আমাদের গল্প' } },
}

export async function GET() {
  try {
    const payload = await getPayload({ config })
    const slug = 'about/our-story'

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
        data: { title: 'আমাদের গল্প', slug, layout, status: 'published' },
      })
    }

    return NextResponse.json({ success: true, message: 'about/our-story page seeded successfully' })
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 })
  }
}
