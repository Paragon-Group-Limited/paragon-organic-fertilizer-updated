import HeroSlider from './HeroSlider'

const FALLBACK_SLIDES = [
  {
    id: 1,
    tagBn: 'মাটির প্রাণ, কৃষকের আস্থা',
    tagEn: "Soul of Soil, Farmer's Trust",
    headingBn: 'প্যারাগন জৈব সার',
    subtitleBn: 'উপকারী অণুজীব সমৃদ্ধ ১০০% অর্গানিক জৈব সার — মাটির গঠন উন্নত করতে, উর্বরতা বাড়াতে এবং ফসলের স্বাভাবিক বৃদ্ধিতে কার্যকর।',
    cta1Label: 'আমাদের পণ্য দেখুন',
    cta1Href: '/products',
    cta2Label: 'আরও জানুন',
    cta2Href: '/about/our-story',
    bgColor: 'linear-gradient(135deg, #0a1f14 0%, #1B4D3E 55%, #2D7A3A 100%)',
    accentColor: '#D4A017',
  },
  {
    id: 2,
    tagBn: 'মাটির স্বাস্থ্য রক্ষা করুন',
    tagEn: "Protect Your Soil's Health",
    headingBn: 'মাটি বাঁচান, ফসল বাড়ান',
    subtitleBn: 'বারবার চাষ এবং রাসায়নিক সারের অতিরিক্ত ব্যবহারে ক্ষতিগ্রস্ত মাটিকে প্যারাগন জৈব সার দিয়ে পুনরুজ্জীবিত করুন।',
    cta1Label: 'কীভাবে কাজ করে?',
    cta1Href: '/about/soil-benefit',
    cta2Label: 'ডিলার খুঁজুন',
    cta2Href: '/dealership',
    bgColor: 'linear-gradient(135deg, #0d2438 0%, #1a3d2b 45%, #0F5132 100%)',
    accentColor: '#4CAF50',
  },
  {
    id: 3,
    tagBn: 'বাংলাদেশের কৃষকদের পাশে',
    tagEn: 'Standing With Bangladeshi Farmers',
    headingBn: 'হাজার কৃষকের বিশ্বাস',
    subtitleBn: 'সারাদেশে হাজার হাজার কৃষক প্যারাগন জৈব সার ব্যবহার করে উৎপাদন বাড়াচ্ছেন এবং মাটির স্বাস্থ্য রক্ষা করছেন।',
    cta1Label: 'যোগাযোগ করুন',
    cta1Href: '/contact',
    cta2Label: 'ক্যারিয়ার',
    cta2Href: '/career',
    bgColor: 'linear-gradient(160deg, #1B4D3E 0%, #0F2E24 50%, #0a1a10 100%)',
    accentColor: '#D4A017',
  },
]

async function fetchSlides() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/hero-slides?where[active][equals]=true&sort=order&limit=10`, {
      next: { revalidate: 60 },
    })
    if (!res.ok) return FALLBACK_SLIDES
    const json = await res.json()
    if (!json.docs?.length) return FALLBACK_SLIDES
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return json.docs.map((doc: any, i: number) => ({
      ...doc,
      id: i + 1,
      image: doc.image ? { url: doc.image.url, alt: doc.image.alt || '' } : null,
    }))
  } catch {
    return FALLBACK_SLIDES
  }
}

export default async function HeroSliderServer() {
  const slides = await fetchSlides()
  return <HeroSlider slides={slides} />
}
