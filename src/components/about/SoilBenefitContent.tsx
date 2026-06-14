'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { AlertTriangle, CheckCircle2, ArrowRight, Droplets, Wind, Bug, Zap } from 'lucide-react'

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

function AnimCard({ children, i = 0, from = 'bottom', className = '' }: { children: React.ReactNode; i?: number; from?: 'bottom' | 'left' | 'right'; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const x = from === 'left' ? -30 : from === 'right' ? 30 : 0
  const y = from === 'bottom' ? 30 : 0
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, x, y }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.5, delay: i * 0.1 }}>
      {children}
    </motion.div>
  )
}

const problems = [
  { icon: '🌾', title: 'জৈব পদার্থ হ্রাস', desc: 'বারবার চাষের ফলে মাটির জৈব পদার্থ দ্রুত কমে যাচ্ছে, যা মাটির উর্বরতার মূল ভিত্তি।' },
  { icon: '⚗️', title: 'অম্লীয় মাটি', desc: 'অতিরিক্ত রাসায়নিক সার ব্যবহারে মাটির pH কমে গিয়ে অম্লীয় হয়ে পড়ছে।' },
  { icon: '💧', title: 'পানি ধারণ ক্ষমতা হ্রাস', desc: 'মাটির গঠন ক্ষতিগ্রস্ত হওয়ায় পানি ধারণ ও বায়ু চলাচল উভয়ই কমে যাচ্ছে।' },
  { icon: '🦠', title: 'অণুজীব ধ্বংস', desc: 'উপকারী ব্যাকটেরিয়া ও ছত্রাক বিনাশ পেয়ে মাটি "মৃত" হয়ে পড়ছে।' },
]

const benefits = [
  { icon: <Droplets className="w-6 h-6" />, title: 'পানি ধারণ বৃদ্ধি', titleEn: 'Water Retention', desc: 'জৈব পদার্থ মাটির পানি ধারণ ক্ষমতা ৩০-৫০% বৃদ্ধি করে, ফলে সেচের পরিমাণ কমে।', stat: '৪০%+', statLabel: 'পানি ধারণ বৃদ্ধি' },
  { icon: <Wind className="w-6 h-6" />, title: 'মাটির গঠন উন্নতি', titleEn: 'Soil Structure', desc: 'মাটির কণাগুলো একত্রিত হয়ে ভালো গঠন তৈরি হয়, শিকড় সহজে মাটির গভীরে যেতে পারে।', stat: '৬০%+', statLabel: 'গঠন উন্নতি' },
  { icon: <Bug className="w-6 h-6" />, title: 'উপকারী অণুজীব', titleEn: 'Beneficial Microbes', desc: 'লক্ষ লক্ষ উপকারী ব্যাকটেরিয়া ও ছত্রাক মাটিতে যুক্ত হয়ে পুষ্টি সরবরাহ করে।', stat: '১০x', statLabel: 'অণুজীব বৃদ্ধি' },
  { icon: <Zap className="w-6 h-6" />, title: 'পুষ্টি সরবরাহ', titleEn: 'Nutrient Supply', desc: 'নাইট্রোজেন, ফসফরাস, পটাশিয়ামসহ ১৬টি প্রয়োজনীয় পুষ্টি উপাদান ধীরে ধীরে সরবরাহ করে।', stat: '১৬টি', statLabel: 'পুষ্টি উপাদান' },
]

const comparisonData = [
  { label: 'পুষ্টি সরবরাহ', organic: 'ধীরে ধীরে, দীর্ঘস্থায়ী', chemical: 'দ্রুত কিন্তু স্বল্পস্থায়ী' },
  { label: 'মাটির স্বাস্থ্য', organic: 'উন্নত করে', chemical: 'ক্রমশ ক্ষতি করে' },
  { label: 'উপকারী অণুজীব', organic: 'বৃদ্ধি পায়', chemical: 'ধ্বংস হয়' },
  { label: 'পরিবেশ প্রভাব', organic: 'পরিবেশবান্ধব', chemical: 'পানি ও মাটি দূষণ' },
  { label: 'দীর্ঘমেয়াদী ফলন', organic: 'ক্রমাগত বাড়ে', chemical: 'ক্রমশ কমে' },
  { label: 'উৎপাদন খরচ', organic: 'দীর্ঘমেয়াদে কম', chemical: 'বাড়তে থাকে' },
]

const steps = [
  { no: '০১', title: 'মাটিতে মিশানো', desc: 'জমি তৈরির সময় বা বীজ বপনের আগে প্যারাগন জৈব সার মাটিতে মিশিয়ে দিন। প্রতি বিঘায় ১৫-২০ কেজি ব্যবহার করুন।' },
  { no: '০২', title: 'অণুজীব সক্রিয়', desc: 'পানির সংস্পর্শে এলে উপকারী অণুজীব সক্রিয় হয় এবং জৈব পদার্থ ভাঙ্গতে শুরু করে।' },
  { no: '০৩', title: 'পুষ্টি নিঃসরণ', desc: 'ধীরে ধীরে পুষ্টি উপাদান নিঃসরণ হয়, গাছের শিকড় সহজে শোষণ করতে পারে।' },
  { no: '০৪', title: 'মাটি পুনরুজ্জীবিত', desc: 'নিয়মিত ব্যবহারে মাটির জৈব পদার্থ বৃদ্ধি পায় এবং মাটির সামগ্রিক স্বাস্থ্য উন্নত হয়।' },
]

export function SoilBenefitContent() {
  return (
    <div style={{ background: '#F8F5EE' }}>

      {/* Problem section */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ background: 'rgba(220,38,38,0.08)', color: '#dc2626', fontFamily: 'var(--font-inter)' }}>
              The Crisis
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4"
              style={{ color: '#1a2e1a', fontFamily: 'var(--font-hind)' }}>
              বাংলাদেশের মাটির <span style={{ color: '#dc2626' }}>ক্রমবর্ধমান সংকট</span>
            </h2>
            <p className="text-base leading-relaxed" style={{ color: '#6b7280', fontFamily: 'var(--font-hind)' }}>
              বছরের পর বছর রাসায়নিক সার ও কীটনাশকের অতিরিক্ত ব্যবহারে বাংলাদেশের কৃষিজমির মাটি তার প্রাকৃতিক উর্বরতা হারাচ্ছে।
            </p>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {problems.map((p, i) => (
              <AnimCard key={i} i={i}>
                <div className="rounded-2xl p-6 border h-full" style={{ background: 'white', borderColor: 'rgba(220,38,38,0.1)' }}>
                  <div className="text-4xl mb-4">{p.icon}</div>
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="w-4 h-4" style={{ color: '#dc2626' }} />
                    <h4 className="font-bold text-sm" style={{ color: '#1a2e1a', fontFamily: 'var(--font-hind)' }}>{p.title}</h4>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: '#6b7280', fontFamily: 'var(--font-hind)' }}>{p.desc}</p>
                </div>
              </AnimCard>
            ))}
          </div>

          <FadeIn>
            <div className="rounded-3xl p-8 lg:p-12 text-center" style={{ background: 'linear-gradient(135deg, #dc2626, #b91c1c)' }}>
              <p className="text-lg mb-2 font-semibold text-white" style={{ fontFamily: 'var(--font-hind)' }}>বাংলাদেশের কৃষিজমির</p>
              <p className="text-5xl lg:text-6xl font-bold mb-2" style={{ color: '#fca5a5', fontFamily: 'var(--font-hind)' }}>৬০%+ জমিতে</p>
              <p className="text-xl font-bold text-white" style={{ fontFamily: 'var(--font-hind)' }}>জৈব পদার্থের পরিমাণ বিপদজনকভাবে কম</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 lg:py-28" style={{ background: 'white' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ background: 'rgba(27,77,62,0.08)', color: '#1B4D3E', fontFamily: 'var(--font-inter)' }}>
              Solution
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ color: '#1a2e1a', fontFamily: 'var(--font-hind)' }}>
              জৈব সার কীভাবে <span style={{ color: '#D4A017' }}>মাটি সুস্থ রাখে</span>
            </h2>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b, i) => (
              <AnimCard key={i} i={i}>
                <div className="rounded-2xl overflow-hidden border h-full" style={{ background: '#F8F5EE', borderColor: 'rgba(27,77,62,0.06)' }}>
                  <div className="p-6">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                      style={{ background: 'linear-gradient(135deg, #1B4D3E, #2D7A3A)', color: '#F5C842' }}>
                      {b.icon}
                    </div>
                    <h4 className="font-bold text-base mb-1" style={{ color: '#1B4D3E', fontFamily: 'var(--font-hind)' }}>{b.title}</h4>
                    <p className="text-xs mb-4" style={{ color: '#9ca3af', fontFamily: 'var(--font-inter)' }}>{b.titleEn}</p>
                    <p className="text-sm leading-relaxed" style={{ color: '#6b7280', fontFamily: 'var(--font-hind)' }}>{b.desc}</p>
                  </div>
                  <div className="px-6 py-4 border-t" style={{ borderColor: 'rgba(27,77,62,0.06)', background: 'rgba(27,77,62,0.03)' }}>
                    <span className="text-2xl font-bold" style={{ color: '#1B4D3E', fontFamily: 'var(--font-hind)' }}>{b.stat}</span>
                    <span className="text-xs ml-2" style={{ color: '#6b7280', fontFamily: 'var(--font-hind)' }}>{b.statLabel}</span>
                  </div>
                </div>
              </AnimCard>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 lg:py-28" style={{ background: '#F8F5EE' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ background: 'rgba(27,77,62,0.08)', color: '#1B4D3E', fontFamily: 'var(--font-inter)' }}>
              How It Works
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold" style={{ color: '#1a2e1a', fontFamily: 'var(--font-hind)' }}>
              কীভাবে কাজ করে <span style={{ color: '#D4A017' }}>প্যারাগন জৈব সার?</span>
            </h2>
          </FadeIn>

          <div className="grid sm:grid-cols-2 gap-6">
            {steps.map((s, i) => (
              <AnimCard key={i} i={i} from={i % 2 === 0 ? 'left' : 'right'}>
                <div className="flex gap-5 bg-white rounded-2xl p-7 border h-full" style={{ borderColor: 'rgba(27,77,62,0.08)' }}>
                  <div className="text-4xl font-bold flex-shrink-0 leading-none"
                    style={{ color: 'rgba(27,77,62,0.12)', fontFamily: 'var(--font-inter)' }}>
                    {s.no}
                  </div>
                  <div>
                    <h4 className="font-bold text-base mb-2" style={{ color: '#1B4D3E', fontFamily: 'var(--font-hind)' }}>{s.title}</h4>
                    <p className="text-sm leading-relaxed" style={{ color: '#6b7280', fontFamily: 'var(--font-hind)' }}>{s.desc}</p>
                  </div>
                </div>
              </AnimCard>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-20 lg:py-28" style={{ background: 'white' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ background: 'rgba(27,77,62,0.08)', color: '#1B4D3E', fontFamily: 'var(--font-inter)' }}>
              Comparison
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold" style={{ color: '#1a2e1a', fontFamily: 'var(--font-hind)' }}>
              জৈব বনাম <span style={{ color: '#D4A017' }}>রাসায়নিক সার</span>
            </h2>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="rounded-3xl overflow-hidden border" style={{ borderColor: 'rgba(27,77,62,0.1)' }}>
              <div className="grid grid-cols-3 text-center" style={{ background: '#1B4D3E' }}>
                <div className="p-4 text-sm font-bold text-white" style={{ fontFamily: 'var(--font-hind)' }}>বিষয়</div>
                <div className="p-4 text-sm font-bold border-l border-white/10" style={{ color: '#F5C842', fontFamily: 'var(--font-hind)' }}>🌿 প্যারাগন জৈব সার</div>
                <div className="p-4 text-sm font-bold border-l border-white/10 text-white/60" style={{ fontFamily: 'var(--font-hind)' }}>⚗️ রাসায়নিক সার</div>
              </div>
              {comparisonData.map((row, i) => (
                <div key={i} className="grid grid-cols-3 text-center border-t"
                  style={{ borderColor: 'rgba(27,77,62,0.06)', background: i % 2 === 0 ? '#F8F5EE' : 'white' }}>
                  <div className="p-4 text-sm font-semibold" style={{ color: '#1a2e1a', fontFamily: 'var(--font-hind)' }}>{row.label}</div>
                  <div className="p-4 border-l flex items-center justify-center gap-2" style={{ borderColor: 'rgba(27,77,62,0.06)' }}>
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: '#1B4D3E' }} />
                    <span className="text-sm font-semibold" style={{ color: '#1B4D3E', fontFamily: 'var(--font-hind)' }}>{row.organic}</span>
                  </div>
                  <div className="p-4 border-l flex items-center justify-center gap-2" style={{ borderColor: 'rgba(27,77,62,0.06)' }}>
                    <AlertTriangle className="w-4 h-4 flex-shrink-0" style={{ color: '#dc2626' }} />
                    <span className="text-sm" style={{ color: '#9ca3af', fontFamily: 'var(--font-hind)' }}>{row.chemical}</span>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ background: 'linear-gradient(135deg, #0F2E24, #1B4D3E)' }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-hind)' }}>
            আপনার জমির মাটি <span style={{ color: '#F5C842' }}>পরীক্ষা করুন</span>
          </h2>
          <p className="mb-8 text-lg" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-hind)' }}>
            আজই আমাদের সাথে যোগাযোগ করুন এবং আপনার জমির জন্য সঠিক পরামর্শ নিন।
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold"
              style={{ background: 'linear-gradient(135deg, #D4A017, #F5C842)', color: '#1B4D3E', fontFamily: 'var(--font-hind)' }}>
              বিনামূল্যে পরামর্শ নিন <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/about/why-this-product"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold border"
              style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'white', fontFamily: 'var(--font-hind)' }}>
              কেন এই পণ্য বেছে নেবেন?
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
