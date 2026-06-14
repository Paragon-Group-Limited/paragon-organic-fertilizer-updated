import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

const PRODUCT1_IMAGE = 'https://lh3.googleusercontent.com/sitesv/AA5AbUBaVvArUxjluSHlvmzksdt5vUn4zoc-RljtCH-TqucRaq_Q_bDpM9gfJO3eMifkq5N8MHAe1D7cT9GrcUsCUkp0Tt6kJrdpIdIk69ENp1iFWsiNoKgqsDAzS7Lq985UjMVpm4HvENdb2fLjRE8qcAZVMtxiooM-6r_RcvuGQNq_rNHTGWEKqMIRvPBB=w1280'
const PRODUCT2_IMAGE = 'https://lh3.googleusercontent.com/sitesv/AA5AbUCcJezAv_Fj99-w_UvKUrOpkr6vsqezcBs1ePqo8OpnQu8XbF3JA_zJe35n7KTLGZzkbi7_D7u4gTqxgiPQxuzPILsvPn4PG7K-N1zMvzoKapAlZtx_NkbhiwAvxt_0PQbbevaY4NJ0otYe2q9onAAA7Q_fP8SGCbQgKBOlIBSOW1fzkMwGvcp9U4VBAOU=w1280'
const PRODUCT3_IMAGE = 'https://lh3.googleusercontent.com/sitesv/AA5AbUDKjvfSW9LKYzHz4hhPp0f_xn_SWJU_-A2NU4FJIzVXiDUO5IaLUTN3IWzIGm36Col5tE1ibukrp4VQGHQ5742j61Rpe8QMK6jfYhQcK8CzYhexdURjvSgzQN0o7BL9JXoVEVt05mIRfPufb98x1tJHfKHralvSOTMk3ddm2dvjVmQIz4JlQZvAMx2t1Co=w1280'
const BANNER_IMAGE = 'https://lh3.googleusercontent.com/sitesv/AA5AbUBWNfpA0lVBkPTCLy2sT0rc9q1zn4Ju_uVroO_-eNY_y1kbWB1B81Tp4Ag_JxM9i6pkY3lzclGSQipHgozKqFIjHm99_eZMORuW2arDimfxu-RYZZ3jtMHOeuv5d9OViSLw4I6flOKAV24_sHoLwXH3XfN08uFj5v68dKwE_AjVfqVSXUrRQ5tmorGVbfZVgzuZZ-3eDp1aVPMwCaY7a8iGa4ZmETiGPdJ7FTsiAA4=w1280'

const layout = {
  content: [
    {
      type: 'PageBannerBlock',
      props: {
        id: 'banner-products',
        tagText: 'পণ্যসমূহ',
        tagTextEn: 'Products',
        title: 'পণ্য ও',
        titleEn: 'Products &',
        titleHighlight: 'ক্রয়',
        titleHighlightEn: 'Purchase',
        subtitle: 'প্যারাগন জৈব সার — ১ কেজি, ৫ কেজি ও ৪০ কেজি প্যাকেজে পাওয়া যায়। আজই অর্ডার করুন।',
        subtitleEn: 'Paragon Organic Fertilizer — available in 1 kg, 5 kg and 40 kg packs. Order today.',
        bgGradient: 'linear-gradient(135deg, #0a1f14 0%, #1B4D3E 55%, #2D7A3A 100%)',
        align: 'left',
        breadcrumb1Label: 'পণ্য ও ক্রয়',
        breadcrumb1LabelEn: 'Products & Purchase',
        breadcrumb1Href: '/products',
        breadcrumb2Label: '',
        breadcrumb2LabelEn: '',
      },
    },
    {
      type: 'ProductsGridBlock',
      props: {
        id: 'products-grid',
        sectionTag: 'আমাদের পণ্যসমূহ',
        sectionTagEn: 'Our Products',
        sectionHeading: 'প্যারাগন জৈব সার —',
        sectionHeadingEn: 'Paragon Organic Fertilizer —',
        sectionHighlight: 'তিনটি সাইজে',
        sectionHighlightEn: 'Three Sizes',
        sectionSubtitle: 'আপনার জমির প্রয়োজন অনুযায়ী সঠিক সাইজের প্যারাগন জৈব সার বেছে নিন। সকল সাইজ ১০০% অর্গানিক ও উপকারী অণুজীব সমৃদ্ধ।',
        sectionSubtitleEn: 'Choose the right size of Paragon Organic Fertilizer for your farm needs. All sizes are 100% organic and enriched with beneficial microorganisms.',

        products: [
          {
            imageUrl: PRODUCT1_IMAGE,
            name: 'প্যারাগন জৈব সার — ১ কেজি',
            nameEn: 'Paragon Organic Fertilizer — 1 kg',
            weight: '১ কেজি',
            desc: 'ছোট বাগান ও পরীক্ষামূলক চাষের জন্য আদর্শ। উপকারী অণুজীব সমৃদ্ধ ১০০% অর্গানিক জৈব সার যা মাটির উর্বরতা বাড়ায় ও ফসলের স্বাভাবিক বৃদ্ধি নিশ্চিত করে।',
            descEn: 'Ideal for small gardens and trial cultivation. 100% organic fertilizer enriched with beneficial microorganisms that boosts soil fertility and ensures natural crop growth.',
            badge: 'পরিচিতি সাইজ',
            badgeEn: 'Starter Size',
            featured: false,
            gradient: 'linear-gradient(135deg, #2D6A2A 0%, #1B4D3E 100%)',
          },
          {
            imageUrl: PRODUCT2_IMAGE,
            name: 'প্যারাগন জৈব সার — ৫ কেজি',
            nameEn: 'Paragon Organic Fertilizer — 5 kg',
            weight: '৫ কেজি',
            desc: 'মাঝারি জমির জন্য সবচেয়ে জনপ্রিয় ও সাশ্রয়ী সাইজ। মাটির গঠন উন্নত করে, পানি ধরে রাখার ক্ষমতা বাড়ায় এবং ফলন উল্লেখযোগ্যভাবে বৃদ্ধি করে।',
            descEn: 'The most popular and cost-effective size for medium-sized plots. Improves soil structure, increases water retention and significantly boosts yield.',
            badge: 'সেরা মূল্য',
            badgeEn: 'Best Value',
            featured: true,
            gradient: 'linear-gradient(135deg, #D4A017 0%, #B8860B 100%)',
          },
          {
            imageUrl: PRODUCT3_IMAGE,
            name: 'প্যারাগন জৈব সার — ৪০ কেজি',
            nameEn: 'Paragon Organic Fertilizer — 40 kg',
            weight: '৪০ কেজি',
            desc: 'বড় ক্ষেত ও বাণিজ্যিক চাষের জন্য উপযুক্ত। পাইকারি মূল্যে সর্বোচ্চ সাশ্রয়। একটি প্যাকেজেই বড় জমির চাষ সহজ হয়ে যায়।',
            descEn: 'Perfect for large fields and commercial farming. Maximum savings at wholesale rates. One pack covers a large area easily.',
            badge: 'বাণিজ্যিক',
            badgeEn: 'Commercial',
            featured: false,
            gradient: 'linear-gradient(135deg, #4A7C59 0%, #1B4D3E 100%)',
          },
        ],

        orderHref: 'mailto:info.fertilizer@paragon.com.bd',
        orderLabel: 'এখনই অর্ডার করুন',
        orderLabelEn: 'Order Now',
        orderNote: 'ইমেইল: info.fertilizer@paragon.com.bd',
        orderNoteEn: 'Email: info.fertilizer@paragon.com.bd',
      },
    },
    {
      type: 'ProductsCtaBannerBlock',
      props: {
        id: 'products-cta-banner',
        bannerImageUrl: BANNER_IMAGE,
        bannerGradient: 'linear-gradient(135deg, #0a1f14 0%, #1B4D3E 55%, #2D7A3A 100%)',
        bannerTitle: 'প্যারাগন জৈব সার, মাটির প্রাণ, কৃষকের আস্থা',
        bannerTitleEn: "Paragon Organic Fertilizer — Soul of Soil, Farmer's Trust",
        bannerSubtitle: 'আজই অর্ডার করুন এবং আপনার জমির মাটিকে সুস্থ রাখুন।',
        bannerSubtitleEn: 'Order today and keep your soil healthy for a better harvest.',
        bannerCtaLabel: 'এখনই অর্ডার করুন',
        bannerCtaLabelEn: 'Order Now',
        bannerCtaHref: 'mailto:info.fertilizer@paragon.com.bd',
      },
    },
  ],
  root: { props: { title: 'পণ্য ও ক্রয়' } },
}

export async function GET() {
  try {
    const payload = await getPayload({ config })
    const slug = 'products'

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
        data: { title: 'পণ্য ও ক্রয়', slug, layout, status: 'published' },
      })
    }

    return NextResponse.json({ success: true, message: 'products page seeded successfully' })
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 })
  }
}
