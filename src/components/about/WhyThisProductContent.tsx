'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { Star, ArrowRight, ShieldCheck, Award, TrendingUp, Users } from 'lucide-react'

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-70px' })
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 35 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}>
      {children}
    </motion.div>
  )
}

type Usp = { icon: React.ReactNode; title: string; titleEn: string; desc: string; color: string }
function UspCard({ u, i }: { u: Usp; i: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: i * 0.1 }}
      className="bg-white rounded-2xl p-7 border"
      style={{ borderColor: 'rgba(27,77,62,0.08)' }}>
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 text-white"
        style={{ background: `linear-gradient(135deg, ${u.color}, ${u.color}cc)` }}>
        {u.icon}
      </div>
      <h4 className="font-bold text-base mb-1" style={{ color: '#1a2e1a', fontFamily: 'var(--font-hind)' }}>{u.title}</h4>
      <p className="text-xs mb-4" style={{ color: '#9ca3af', fontFamily: 'var(--font-inter)' }}>{u.titleEn}</p>
      <p className="text-sm leading-relaxed" style={{ color: '#6b7280', fontFamily: 'var(--font-hind)' }}>{u.desc}</p>
    </motion.div>
  )
}

type Testimonial = { name: string; location: string; role: string; text: string; emoji: string; years: string }
function TestimonialCard({ t, i }: { t: Testimonial; i: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: i * 0.12 }}
      className="bg-white rounded-2xl p-7 border"
      style={{ borderColor: 'rgba(27,77,62,0.08)' }}>
      <div className="flex gap-1 mb-5">
        {[...Array(5)].map((_, j) => (
          <Star key={j} className="w-4 h-4 fill-current" style={{ color: '#F5C842' }} />
        ))}
      </div>
      <p className="text-sm leading-relaxed mb-6" style={{ color: '#4a5568', fontFamily: 'var(--font-hind)' }}>
        &ldquo;{t.text}&rdquo;
      </p>
      <div className="flex items-center gap-3 pt-5 border-t" style={{ borderColor: 'rgba(27,77,62,0.06)' }}>
        <div className="w-11 h-11 rounded-full flex items-center justify-center text-2xl flex-shrink-0"
          style={{ background: 'rgba(27,77,62,0.06)' }}>
          {t.emoji}
        </div>
        <div>
          <div className="font-bold text-sm" style={{ color: '#1a2e1a', fontFamily: 'var(--font-hind)' }}>{t.name}</div>
          <div className="text-xs" style={{ color: '#9ca3af', fontFamily: 'var(--font-hind)' }}>{t.role} · {t.location}</div>
        </div>
      </div>
      <div className="mt-3 text-xs font-semibold" style={{ color: '#1B4D3E', fontFamily: 'var(--font-hind)' }}>
        ✓ {t.years}
      </div>
    </motion.div>
  )
}

const usps: Usp[] = [
  { icon: <ShieldCheck className="w-7 h-7" />, title: '১০০% জৈব ও নিরাপদ', titleEn: 'Certified Organic', desc: 'কোনো ক্ষতিকর রাসায়নিক উপাদান নেই। সম্পূর্ণ প্রাকৃতিক কাঁচামাল থেকে তৈরি, মানুষ, প্রাণী ও পরিবেশের জন্য সম্পূর্ণ নিরাপদ।', color: '#1B4D3E' },
  { icon: <Award className="w-7 h-7" />, title: 'বিজ্ঞানসম্মত ফর্মুলা', titleEn: 'Scientific Formula', desc: 'বাংলাদেশের মাটির বিশেষ চাহিদা বিশ্লেষণ করে তৈরি। কৃষি গবেষণা প্রতিষ্ঠানের সাথে সহযোগিতায় উদ্ভাবিত ফর্মুলা।', color: '#2D7A3A' },
  { icon: <TrendingUp className="w-7 h-7" />, title: 'প্রমাণিত ফলাফল', titleEn: 'Proven Results', desc: 'হাজার হাজার কৃষকের মাঠে পরীক্ষিত ও প্রমাণিত। গড়ে ৩০-৫০% উৎপাদন বৃদ্ধির রেকর্ড।', color: '#D4A017' },
  { icon: <Users className="w-7 h-7" />, title: 'বিশেষজ্ঞ পরামর্শ সেবা', titleEn: 'Expert Support', desc: 'প্রশিক্ষিত কৃষি বিশেষজ্ঞদের দল সবসময় আপনার পাশে। বিনামূল্যে পরামর্শ সেবা পাওয়া যায়।', color: '#1B4D3E' },
]

const testimonials: Testimonial[] = [
  { name: 'মো. আব্দুর রহমান', location: 'ময়মনসিংহ', role: 'ধান চাষি', text: 'প্যারাগন জৈব সার ব্যবহারের পর আমার ধানের ফলন ৪০% বেড়ে গেছে। মাটিও অনেক ভালো হয়েছে। এখন রাসায়নিক সার কম লাগে।', emoji: '🌾', years: '৩ বছর ধরে ব্যবহার করছেন' },
  { name: 'কামরুন নাহার', location: 'রাজশাহী', role: 'সবজি চাষি', text: 'আমার সবজি বাগানে এখন কোনো রাসায়নিক সার দিই না। প্যারাগন জৈব সারেই মাটি সুস্থ থাকে। সবজিও তাজা থাকে বেশিদিন।', emoji: '🥬', years: '২ বছর ধরে ব্যবহার করছেন' },
  { name: 'মো. জামাল উদ্দিন', location: 'কুমিল্লা', role: 'আম চাষি', text: 'আমের বাগানে প্যারাগন জৈব সার দেওয়ার পর গাছগুলো অনেক সতেজ দেখাচ্ছে। ফলও বেশি হচ্ছে এবং মিষ্টি হচ্ছে।', emoji: '🥭', years: '৪ বছর ধরে ব্যবহার করছেন' },
]

const features = [
  { label: 'উপকারী ব্যাকটেরিয়া', value: '৫+ কোটি/গ্রাম' },
  { label: 'জৈব পদার্থ', value: '৪০%+' },
  { label: 'পিএইচ রেঞ্জ', value: '৬.৫ – ৭.৫' },
  { label: 'নাইট্রোজেন (N)', value: '১.৮%+' },
  { label: 'ফসফরাস (P)', value: '১.২%+' },
  { label: 'পটাশিয়াম (K)', value: '১.৫%+' },
]

export function WhyThisProductContent() {
  return (
    <div style={{ background: '#F8F5EE' }}>

      {/* USPs */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ background: 'rgba(27,77,62,0.08)', color: '#1B4D3E', fontFamily: 'var(--font-inter)' }}>
              Key Advantages
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ color: '#1a2e1a', fontFamily: 'var(--font-hind)' }}>
              আমাদের পণ্যের <span style={{ color: '#D4A017' }}>অনন্য বৈশিষ্ট্য</span>
            </h2>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {usps.map((u, i) => <UspCard key={i} u={u} i={i} />)}
          </div>
        </div>
      </section>

      {/* Technical specs */}
      <section className="py-20 lg:py-24" style={{ background: 'white' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <FadeIn delay={0.1}>
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-5"
                style={{ background: 'rgba(27,77,62,0.08)', color: '#1B4D3E', fontFamily: 'var(--font-inter)' }}>
                Specifications
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6" style={{ color: '#1a2e1a', fontFamily: 'var(--font-hind)' }}>
                পণ্যের <span style={{ color: '#D4A017' }}>গুণগত মান</span>
              </h2>
              <p className="text-base leading-relaxed mb-8" style={{ color: '#4a5568', fontFamily: 'var(--font-hind)' }}>
                প্রতিটি ব্যাচ কঠোর মান নিয়ন্ত্রণের মধ্য দিয়ে যায়। বাংলাদেশ কৃষি গবেষণা ইনস্টিটিউট (BARI) অনুমোদিত পদ্ধতিতে পরীক্ষিত।
              </p>
              <div className="grid grid-cols-2 gap-4">
                {features.map((f, i) => (
                  <div key={i} className="rounded-xl p-4 border"
                    style={{ background: '#F8F5EE', borderColor: 'rgba(27,77,62,0.08)' }}>
                    <div className="text-xs mb-1" style={{ color: '#9ca3af', fontFamily: 'var(--font-inter)' }}>{f.label}</div>
                    <div className="text-lg font-bold" style={{ color: '#1B4D3E', fontFamily: 'var(--font-hind)' }}>{f.value}</div>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="rounded-3xl p-8 lg:p-10" style={{ background: 'linear-gradient(135deg, #1B4D3E, #0F2E24)' }}>
                <div className="flex items-center gap-3 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-current" style={{ color: '#F5C842' }} />
                  ))}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-hind)' }}>
                  কেন কৃষকরা বিশ্বাস করেন?
                </h3>
                <div className="space-y-4">
                  {[
                    'বাস্তব মাঠ পরীক্ষায় ফলাফল প্রমাণিত',
                    'প্যারাগন গ্রুপের বিশ্বস্ত ব্র্যান্ড',
                    'দেশীয় কৃষি বিশেষজ্ঞদের তত্ত্বাবধানে তৈরি',
                    'সারাদেশে সহজলভ্য ডিলার নেটওয়ার্ক',
                    'বিক্রয়োত্তর সেবা ও পরামর্শ',
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: 'rgba(212,160,23,0.2)' }}>
                        <div className="w-2 h-2 rounded-full" style={{ background: '#F5C842' }} />
                      </div>
                      <span className="text-sm" style={{ color: 'rgba(255,255,255,0.8)', fontFamily: 'var(--font-hind)' }}>{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-3 gap-4">
                  {[['৫০০০+', 'কৃষক'], ['৩০-৫০%', 'ফলন বৃদ্ধি'], ['১০+', 'বছরের গবেষণা']].map(([v, l]) => (
                    <div key={l} className="text-center">
                      <div className="text-xl font-bold" style={{ color: '#F5C842', fontFamily: 'var(--font-hind)' }}>{v}</div>
                      <div className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-hind)' }}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 lg:py-28" style={{ background: '#F8F5EE' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ background: 'rgba(27,77,62,0.08)', color: '#1B4D3E', fontFamily: 'var(--font-inter)' }}>
              Testimonials
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold" style={{ color: '#1a2e1a', fontFamily: 'var(--font-hind)' }}>
              কৃষকদের <span style={{ color: '#D4A017' }}>অভিজ্ঞতা</span>
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-7">
            {testimonials.map((t, i) => <TestimonialCard key={i} t={t} i={i} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ background: 'linear-gradient(135deg, #0F2E24, #1B4D3E)' }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-hind)' }}>
            আজই শুরু করুন <span style={{ color: '#F5C842' }}>জৈব কৃষির যাত্রা</span>
          </h2>
          <p className="mb-8 text-lg" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-hind)' }}>
            আপনার কাছের ডিলার থেকে সংগ্রহ করুন অথবা সরাসরি যোগাযোগ করুন।
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/dealership"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold"
              style={{ background: 'linear-gradient(135deg, #D4A017, #F5C842)', color: '#1B4D3E', fontFamily: 'var(--font-hind)' }}>
              ডিলার খুঁজুন <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold border"
              style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'white', fontFamily: 'var(--font-hind)' }}>
              সরাসরি যোগাযোগ করুন
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
