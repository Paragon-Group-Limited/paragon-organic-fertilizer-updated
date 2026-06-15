import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

const layout = {"root":{"props":{"title":"যোগাযোগ"}},"zones":{},"content":[{"type":"PageBannerBlock","props":{"id":"contact-banner","align":"left","title":"আমাদের সাথে","tagText":"Contact Us","subtitle":"আমরা সর্বদা আপনার সেবায় প্রস্তুত। পণ্য, ডিলারশিপ বা যেকোনো বিষয়ে কথা বলুন।","bgGradient":"linear-gradient(135deg, #0a1f14 0%, #1B4D3E 55%, #2D7A3A 100%)","titleHighlight":"যোগাযোগ করুন","breadcrumb1Href":"","breadcrumb1Label":"যোগাযোগ","breadcrumb2Label":""}},{"type":"ContactInfoBlock","props":{"id":"contact-info","cards":[{"href":"tel:+8801711630515","icon":"📞","color":"#1B4D3E","lines":[{"text":"+880 1711-630515"},{"text":"+880 9678-882102"}],"title":"ফোন"},{"href":"mailto:info@paragongroup-bd.com","icon":"✉️","color":"#2D7A3A","lines":[{"text":"info@paragongroup-bd.com"},{"text":"info.fertilizer@paragon.com.bd"}],"title":"ইমেইল"},{"href":"https://maps.google.com/?q=Mohakhali+CA+Dhaka","icon":"📍","color":"#D4A017","lines":[{"text":"প্যারাগন হাউস"},{"text":"৫ মহাখালি সি/এ, ঢাকা ১২১২"},{"text":"বাংলাদেশ"}],"title":"ঠিকানা"},{"href":"","icon":"🕐","color":"#1B4D3E","lines":[{"text":"রবি – বৃহঃ: সকাল ৯টা – বিকাল ৫টা"},{"text":"শুক্র: সকাল ৯টা – দুপুর ১টা"},{"text":"শনি: বন্ধ"}],"title":"অফিস সময়"}],"heading":"আমাদের","tagText":"Contact Details","headingHighlight":"সাথে কথা বলুন"}},{"type":"ContactFormMapBlock","props":{"id":"contact-form-map","mapSrc":"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.424!2d90.40315!3d23.77932!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c70000000001%3A0x0!2sMohakhali+CA%2C+Dhaka!5e0!3m2!1sen!2sbd!4v1699000000000","mapHeading":"আমাদের","officeName":"প্রধান কার্যালয়","orderEmail":"info.fertilizer@paragon.com.bd","formHeading":"বার্তা পাঠান","mapHighlight":"কার্যালয়","formHighlight":"আমাদের কাছে","officeAddress":"প্যারাগন হাউস, ৫ মহাখালি সি/এ, ঢাকা ১২১২, বাংলাদেশ"}},{"type":"ContactFAQBlock","props":{"id":"contact-faq","faqs":[{"a":"সারাদেশে আমাদের অনুমোদিত ডিলারদের মাধ্যমে পণ্য পাওয়া যায়। নিকটতম ডিলারের তথ্য জানতে আমাদের ফোন করুন বা ডিলারশিপ পেজ দেখুন।","q":"পণ্য কোথা থেকে কিনব?"},{"a":"ধান, সবজি, ফল, গম, পাট সহ সকল ধরনের ফসলে প্যারাগন জৈব সার ব্যবহার করা যায়।","q":"কোন ফসলে ব্যবহার করা যায়?"},{"a":"সাধারণত প্রতি বিঘায় ১৫-২০ কেজি ব্যবহার করা হয়। তবে মাটির অবস্থা অনুযায়ী পরিমাণ কম-বেশি হতে পারে।","q":"প্রতি বিঘায় কতটুকু দিতে হবে?"},{"a":"হ্যাঁ, প্রাথমিকভাবে রাসায়নিক ও জৈব সার একসাথে ব্যবহার করা যায়। ধীরে ধীরে রাসায়নিক সারের পরিমাণ কমিয়ে সম্পূর্ণ জৈব পদ্ধতিতে চলে আসা ভালো।","q":"রাসায়নিক সারের সাথে কি মেশানো যায়?"}],"heading":"সাধারণ","tagText":"FAQ","headingHighlight":"প্রশ্নোত্তর"}}]}

export async function GET() {
  try {
    const payload = await getPayload({ config })
    const slug = 'contact'

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
        data: { title: 'contact', slug, layout, status: 'published' },
      })
    }

    return NextResponse.json({ success: true, message: 'contact page seeded successfully' })
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 })
  }
}
