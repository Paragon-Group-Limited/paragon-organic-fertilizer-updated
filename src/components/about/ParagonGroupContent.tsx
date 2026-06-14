'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Building2, Globe, Users2, Award } from 'lucide-react'

function FadeIn({ children, delay = 0, from = 'bottom', className = '' }: { children: React.ReactNode; delay?: number; from?: 'bottom' | 'left' | 'right'; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-70px' })
  const x = from === 'left' ? -40 : from === 'right' ? 40 : 0
  const y = from === 'bottom' ? 35 : 0
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, x, y }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: 'easeOut' }}>
      {children}
    </motion.div>
  )
}

type Business = { emoji: string; name: string; nameEn: string; desc: string; featured?: boolean }
function BusinessCard({ b, i }: { b: Business; i: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: i * 0.1 }}
      className="rounded-2xl p-7 border relative overflow-hidden"
      style={{
        background: b.featured ? 'linear-gradient(135deg, #1B4D3E, #0F2E24)' : '#F8F5EE',
        borderColor: b.featured ? 'transparent' : 'rgba(27,77,62,0.08)',
      }}>
      {b.featured && (
        <div className="absolute top-4 right-4 px-2 py-0.5 rounded-full text-[10px] font-bold"
          style={{ background: 'rgba(212,160,23,0.2)', color: '#F5C842', fontFamily: 'var(--font-inter)' }}>
          This Product
        </div>
      )}
      <div className="text-4xl mb-4">{b.emoji}</div>
      <h4 className="font-bold text-base mb-1"
        style={{ color: b.featured ? 'white' : '#1a2e1a', fontFamily: 'var(--font-hind)' }}>
        {b.name}
      </h4>
      <p className="text-xs mb-3" style={{ color: b.featured ? 'rgba(255,255,255,0.5)' : '#9ca3af', fontFamily: 'var(--font-inter)' }}>
        {b.nameEn}
      </p>
      <p className="text-sm leading-relaxed"
        style={{ color: b.featured ? 'rgba(255,255,255,0.75)' : '#6b7280', fontFamily: 'var(--font-hind)' }}>
        {b.desc}
      </p>
    </motion.div>
  )
}

const businesses: Business[] = [
  { emoji: '🐔', name: 'প্যারাগন পোলট্রি', nameEn: 'Paragon Poultry', desc: 'বাংলাদেশের অন্যতম বৃহত্তম পোলট্রি ফার্ম। মুরগি, হ্যাচারি ও ফিড উৎপাদনে শীর্ষস্থানীয়।' },
  { emoji: '🌾', name: 'প্যারাগন জৈব সার', nameEn: 'Paragon Organic Fertilizer', desc: 'টেকসই কৃষির জন্য উপকারী অণুজীব সমৃদ্ধ জৈব সার উৎপাদন ও বিপণন।', featured: true },
  { emoji: '🏭', name: 'প্যারাগন ফিড মিল', nameEn: 'Paragon Feed Mill', desc: 'উচ্চমানের পোলট্রি ও মৎস্য খাদ্য উৎপাদনে অগ্রণী ভূমিকা রাখছে।' },
  { emoji: '🥩', name: 'প্যারাগন ফুডস', nameEn: 'Paragon Foods', desc: 'প্রক্রিয়াজাত মাংস ও খাদ্যপণ্যের বাজারে নির্ভরযোগ্য ব্র্যান্ড।' },
  { emoji: '🚚', name: 'প্যারাগন লজিস্টিক্স', nameEn: 'Paragon Logistics', desc: 'সারাদেশে পণ্য পরিবহন ও সরবরাহ শৃঙ্খল পরিচালনায় দক্ষ।' },
  { emoji: '🌐', name: 'প্যারাগন এক্সপোর্ট', nameEn: 'Paragon Export', desc: 'আন্তর্জাতিক বাজারে বাংলাদেশি কৃষিপণ্য রপ্তানিতে সক্রিয় ভূমিকা।' },
]

const stats = [
  { icon: <Building2 className="w-6 h-6" />, value: '৩০+', label: 'বছরের অভিজ্ঞতা' },
  { icon: <Users2 className="w-6 h-6" />, value: '৫০০০+', label: 'কর্মসংস্থান' },
  { icon: <Globe className="w-6 h-6" />, value: '১৫+', label: 'ব্যবসায়িক শাখা' },
  { icon: <Award className="w-6 h-6" />, value: '৬৪', label: 'জেলায় উপস্থিতি' },
]

export function ParagonGroupContent() {
  return (
    <div style={{ background: '#F8F5EE' }}>

      {/* About Paragon Group */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <FadeIn from="left" delay={0.1}>
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-5"
                style={{ background: 'rgba(27,77,62,0.08)', color: '#1B4D3E', fontFamily: 'var(--font-inter)' }}>
                About Paragon Group
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6 leading-tight" style={{ color: '#1a2e1a', fontFamily: 'var(--font-hind)' }}>
                বাংলাদেশের <span style={{ color: '#D4A017' }}>একটি বিশ্বস্ত নাম</span>
              </h2>
              <p className="text-base leading-relaxed mb-5" style={{ color: '#4a5568', fontFamily: 'var(--font-hind)' }}>
                প্যারাগন গ্রুপ বাংলাদেশের অন্যতম শীর্ষস্থানীয় শিল্প প্রতিষ্ঠান। তিন দশকেরও বেশি সময় ধরে পোলট্রি, খাদ্য প্রক্রিয়াজাতকরণ, কৃষি এবং লজিস্টিক্স খাতে সফলভাবে কাজ করে আসছে।
              </p>
              <p className="text-base leading-relaxed mb-5" style={{ color: '#4a5568', fontFamily: 'var(--font-hind)' }}>
                দেশের কৃষিখাতে টেকসই পরিবর্তন আনার লক্ষ্যে প্যারাগন গ্রুপ জৈব সার উৎপাদনে বিনিয়োগ করে। আমাদের বিশ্বাস, সুস্থ মাটিই বাংলাদেশের খাদ্য নিরাপত্তার মূল ভিত্তি।
              </p>
              <p className="text-base leading-relaxed" style={{ color: '#4a5568', fontFamily: 'var(--font-hind)' }}>
                প্যারাগন গ্রুপের পোলট্রি বিভাগ থেকে প্রাপ্ত জৈব উপজাত এবং আধুনিক জৈবপ্রযুক্তি ব্যবহার করে তৈরি হয়{' '}
                <strong style={{ color: '#1B4D3E' }}>প্যারাগন জৈব সার</strong>।
              </p>
            </FadeIn>

            <FadeIn from="right" delay={0.2}>
              <div className="grid grid-cols-2 gap-5">
                {stats.map((s, i) => (
                  <div key={i} className="rounded-2xl p-6 text-center"
                    style={{
                      background: i % 2 === 0 ? 'linear-gradient(135deg, #1B4D3E, #2D7A3A)' : 'white',
                      border: i % 2 !== 0 ? '1px solid rgba(27,77,62,0.1)' : 'none',
                    }}>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 ${i % 2 === 0 ? 'bg-white/10 text-yellow-300' : 'bg-green-50 text-green-700'}`}>
                      {s.icon}
                    </div>
                    <div className={`text-3xl font-bold mb-1 ${i % 2 === 0 ? 'text-white' : 'text-[#1B4D3E]'}`}
                      style={{ fontFamily: 'var(--font-hind)' }}>
                      {s.value}
                    </div>
                    <div className={`text-xs ${i % 2 === 0 ? 'text-white/70' : 'text-gray-500'}`}
                      style={{ fontFamily: 'var(--font-hind)' }}>
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Businesses */}
      <section className="py-20 lg:py-28" style={{ background: 'white' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ background: 'rgba(27,77,62,0.08)', color: '#1B4D3E', fontFamily: 'var(--font-inter)' }}>
              Group Companies
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold" style={{ color: '#1a2e1a', fontFamily: 'var(--font-hind)' }}>
              প্যারাগন গ্রুপের <span style={{ color: '#D4A017' }}>ব্যবসায়িক শাখা</span>
            </h2>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {businesses.map((b, i) => <BusinessCard key={i} b={b} i={i} />)}
          </div>
        </div>
      </section>

      {/* Why organic */}
      <section className="py-20 lg:py-28" style={{ background: '#F8F5EE' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ background: 'rgba(27,77,62,0.08)', color: '#1B4D3E', fontFamily: 'var(--font-inter)' }}>
              Our Commitment
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold" style={{ color: '#1a2e1a', fontFamily: 'var(--font-hind)' }}>
              কেন আমরা <span style={{ color: '#D4A017' }}>জৈব কৃষিতে বিনিয়োগ করলাম?</span>
            </h2>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="bg-white rounded-3xl p-8 lg:p-10 border" style={{ borderColor: 'rgba(27,77,62,0.08)' }}>
              <div className="space-y-5">
                {[
                  { title: 'পোলট্রি শিল্পের দায়িত্ব', text: 'প্যারাগন গ্রুপের পোলট্রি বিভাগ থেকে প্রতিদিন বিপুল পরিমাণ জৈব উপজাত তৈরি হয়। এই উপজাতকে মাটির সুস্বাস্থ্যের জন্য ব্যবহার করাই আমাদের circular economy-র অংশ।' },
                  { title: 'কৃষকের প্রয়োজনীয়তা', text: 'বাংলাদেশের কৃষকরা মাটির উর্বরতা হ্রাসের সমস্যায় ভুগছিলেন। তাদের একটি কার্যকর ও সাশ্রয়ী সমাধান দেওয়াই ছিল আমাদের লক্ষ্য।' },
                  { title: 'পরিবেশগত দায়বদ্ধতা', text: 'রাসায়নিক সারের অতিরিক্ত ব্যবহার পরিবেশ দূষণ করছে। আমরা একটি পরিবেশবান্ধব বিকল্প তৈরি করতে চেয়েছিলাম যা একই সাথে কার্যকর এবং টেকসই।' },
                  { title: 'জাতীয় খাদ্য নিরাপত্তা', text: 'বাংলাদেশের ক্রমবর্ধমান জনগোষ্ঠীর খাদ্য নিরাপত্তা নিশ্চিত করতে হলে মাটির উর্বরতা বজায় রাখা অপরিহার্য। এটি আমাদের জাতীয় দায়িত্ব।' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-5 pb-5 border-b last:border-0 last:pb-0"
                    style={{ borderColor: 'rgba(27,77,62,0.06)' }}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold"
                      style={{ background: 'rgba(27,77,62,0.08)', color: '#1B4D3E', fontFamily: 'var(--font-inter)' }}>
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-base mb-2" style={{ color: '#1B4D3E', fontFamily: 'var(--font-hind)' }}>{item.title}</h4>
                      <p className="text-sm leading-relaxed" style={{ color: '#6b7280', fontFamily: 'var(--font-hind)' }}>{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ background: 'linear-gradient(135deg, #0F2E24, #1B4D3E)' }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-hind)' }}>
            প্যারাগন পরিবারের <span style={{ color: '#F5C842' }}>অংশ হন</span>
          </h2>
          <p className="mb-8 text-lg" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-hind)' }}>
            ডিলারশিপ বা অন্য যেকোনো সুযোগের জন্য আজই যোগাযোগ করুন।
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/location"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold"
              style={{ background: 'linear-gradient(135deg, #D4A017, #F5C842)', color: '#1B4D3E', fontFamily: 'var(--font-hind)' }}>
              ডিলারশিপ সম্পর্কে জানুন <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold border"
              style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'white', fontFamily: 'var(--font-hind)' }}>
              যোগাযোগ করুন
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
