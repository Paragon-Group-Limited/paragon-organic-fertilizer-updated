'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { Leaf, Target, Eye, Heart, ArrowRight, CheckCircle2 } from 'lucide-react'

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-70px' })
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}>
      {children}
    </motion.div>
  )
}

function SlideIn({ children, from = 'left', delay = 0, className = '' }: { children: React.ReactNode; from?: 'left' | 'right'; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-70px' })
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, x: from === 'left' ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: 'easeOut' }}>
      {children}
    </motion.div>
  )
}

function TimelineItem({ item, i }: { item: { year: string; title: string; desc: string; color: string }; i: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 }}
      className={`flex flex-col md:flex-row items-center gap-6 ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
      <div className={`flex-1 ${i % 2 === 1 ? 'md:text-right' : ''}`}>
        <div className="bg-white rounded-2xl p-7 shadow-sm border" style={{ borderColor: 'rgba(27,77,62,0.08)' }}>
          <span className="text-2xl font-bold block mb-2" style={{ color: item.color, fontFamily: 'var(--font-inter)' }}>{item.year}</span>
          <h4 className="text-lg font-bold mb-2" style={{ color: '#1a2e1a', fontFamily: 'var(--font-hind)' }}>{item.title}</h4>
          <p className="text-sm leading-relaxed" style={{ color: '#6b7280', fontFamily: 'var(--font-hind)' }}>{item.desc}</p>
        </div>
      </div>
      <div className="hidden md:flex w-5 h-5 rounded-full flex-shrink-0 z-10 border-4 border-white shadow-md" style={{ background: item.color }} />
      <div className="flex-1 hidden md:block" />
    </motion.div>
  )
}

function ValueCard({ v, i }: { v: { icon: React.ReactNode; title: string; desc: string }; i: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: i * 0.1 }}
      className="rounded-2xl p-7 text-center border"
      style={{ background: '#F8F5EE', borderColor: 'rgba(27,77,62,0.06)' }}>
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
        style={{ background: 'linear-gradient(135deg, #1B4D3E, #2D7A3A)', color: '#F5C842' }}>
        {v.icon}
      </div>
      <h4 className="text-lg font-bold mb-3" style={{ color: '#1B4D3E', fontFamily: 'var(--font-hind)' }}>{v.title}</h4>
      <p className="text-sm leading-relaxed" style={{ color: '#6b7280', fontFamily: 'var(--font-hind)' }}>{v.desc}</p>
    </motion.div>
  )
}

const timeline = [
  { year: '২০১০', title: 'প্যারাগন গ্রুপের দৃষ্টিভঙ্গি', desc: 'বাংলাদেশের শীর্ষস্থানীয় শিল্প প্রতিষ্ঠান প্যারাগন গ্রুপ কৃষিখাতে টেকসই সমাধান নিয়ে আসার সিদ্ধান্ত নেয়।', color: '#1B4D3E' },
  { year: '২০১৫', title: 'গবেষণা শুরু', desc: 'বাংলাদেশের মাটির বৈশিষ্ট্য বিশ্লেষণ করে স্থানীয় কৃষকদের উপযোগী জৈব সার তৈরির গবেষণা শুরু হয়।', color: '#2D7A3A' },
  { year: '২০১৮', title: 'পণ্য পরীক্ষা-নিরীক্ষা', desc: 'দেশের বিভিন্ন জেলায় পাইলট প্রোগ্রামের মাধ্যমে পণ্যটি কৃষকদের মাঠে পরীক্ষা করা হয়। ফলাফল ছিল অত্যন্ত উৎসাহজনক।', color: '#D4A017' },
  { year: '২০২০', title: 'বাণিজ্যিক যাত্রা', desc: 'প্যারাগন জৈব সার আনুষ্ঠানিকভাবে বাজারে আসে এবং স্বল্প সময়ে হাজার হাজার কৃষকের বিশ্বাস অর্জন করে।', color: '#1B4D3E' },
  { year: '২০২৩', title: 'সারাদেশে বিস্তার', desc: 'সারাবাংলাদেশে ডিলার নেটওয়ার্ক প্রসারিত হয়। ৫০০০+ কৃষক নিয়মিত ব্যবহারকারী হিসেবে যুক্ত হন।', color: '#2D7A3A' },
]

const values = [
  { icon: <Leaf className="w-6 h-6" />, title: 'পরিবেশবান্ধবতা', desc: 'প্রতিটি পদক্ষেপে পরিবেশ ও মাটির স্বাস্থ্য রক্ষাকে সর্বোচ্চ অগ্রাধিকার দেওয়া হয়।' },
  { icon: <Target className="w-6 h-6" />, title: 'মানের প্রতি অঙ্গীকার', desc: 'সর্বোচ্চ মানের কাঁচামাল ও বৈজ্ঞানিক প্রক্রিয়ায় প্রতিটি পণ্য তৈরি করা হয়।' },
  { icon: <Heart className="w-6 h-6" />, title: 'কৃষকের প্রতি দায়বদ্ধতা', desc: 'আমাদের প্রতিটি সিদ্ধান্তের কেন্দ্রে থাকেন বাংলাদেশের কৃষক ও তার পরিবার।' },
  { icon: <Eye className="w-6 h-6" />, title: 'স্বচ্ছতা', desc: 'পণ্যের উপাদান, প্রক্রিয়া ও মূল্য নির্ধারণে সম্পূর্ণ স্বচ্ছতা বজায় রাখা হয়।' },
]

const missions = [
  'বাংলাদেশের কৃষিজমির মাটির উর্বরতা পুনরুদ্ধার করা',
  'রাসায়নিক সারের উপর নির্ভরশীলতা ক্রমশ কমিয়ে আনা',
  'কৃষকের উৎপাদন খরচ কমিয়ে আয় বৃদ্ধি করা',
  '১০০% প্রাকৃতিক ও নিরাপদ কৃষিপণ্য সরবরাহ করা',
  'আগামী প্রজন্মের জন্য উর্বর ও জীবন্ত মাটি রেখে যাওয়া',
]

export function OurStoryContent() {
  return (
    <div style={{ background: '#F8F5EE' }}>

      {/* Founding story */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <SlideIn from="left" delay={0.1}>
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-5"
                style={{ background: 'rgba(27,77,62,0.08)', color: '#1B4D3E', fontFamily: 'var(--font-inter)' }}>
                The Beginning
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6 leading-tight"
                style={{ color: '#1a2e1a', fontFamily: 'var(--font-hind)' }}>
                কীভাবে শুরু হয়েছিল{' '}
                <span style={{ color: '#D4A017' }}>আমাদের যাত্রা</span>
              </h2>
              <p className="text-base leading-relaxed mb-5" style={{ color: '#4a5568', fontFamily: 'var(--font-hind)' }}>
                বাংলাদেশের কৃষিজমির মাটি দিন দিন তার উর্বরতা হারাচ্ছিল। দশকের পর দশক ধরে রাসায়নিক সারের অতিরিক্ত ব্যবহার এবং একই জমিতে বারবার চাষের কারণে মাটির জৈব পদার্থ ক্রমশ কমে যাচ্ছিল।
              </p>
              <p className="text-base leading-relaxed mb-5" style={{ color: '#4a5568', fontFamily: 'var(--font-hind)' }}>
                এই সংকট উপলব্ধি করেই প্যারাগন গ্রুপের একদল বিজ্ঞানী ও কৃষি বিশেষজ্ঞ মাঠে নামলেন। দেশের বিভিন্ন প্রান্তের কৃষকদের সাথে কথা বলে, মাটি পরীক্ষা করে, তারা একটি সমাধানের পথ খুঁজলেন।
              </p>
              <p className="text-base leading-relaxed" style={{ color: '#4a5568', fontFamily: 'var(--font-hind)' }}>
                বছরের পর বছর গবেষণার পর জন্ম নিল <strong style={{ color: '#1B4D3E' }}>প্যারাগন জৈব সার</strong> — উপকারী অণুজীব সমৃদ্ধ বাংলাদেশের প্রথম সারির অর্গানিক কৃষি সমাধান।
              </p>
            </SlideIn>

            <SlideIn from="right" delay={0.2}>
              <div className="relative">
                <div className="w-full aspect-square max-w-md mx-auto rounded-3xl overflow-hidden flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #1B4D3E 0%, #0F2E24 100%)' }}>
                  <div className="text-center p-10">
                    <div className="text-8xl mb-6">🌿</div>
                    <p className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-hind)' }}>মাটির প্রাণ,</p>
                    <p className="text-xl font-bold" style={{ color: '#F5C842', fontFamily: 'var(--font-hind)' }}>কৃষকের আস্থা</p>
                    <div className="mt-8 grid grid-cols-2 gap-4">
                      {[['৫০০০+', 'কৃষক'], ['১০+', 'বছর'], ['৬৪', 'জেলা'], ['১০০%', 'অর্গানিক']].map(([v, l]) => (
                        <div key={l} className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.08)' }}>
                          <div className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-hind)' }}>{v}</div>
                          <div className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-hind)' }}>{l}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-5 -right-5 w-24 h-24 rounded-full flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #D4A017, #F5C842)', boxShadow: '0 8px 30px rgba(212,160,23,0.4)' }}>
                  <div className="text-center">
                    <div className="text-2xl font-bold" style={{ color: '#1B4D3E', fontFamily: 'var(--font-hind)' }}>১০০%</div>
                    <div className="text-[10px] font-semibold" style={{ color: '#1B4D3E', fontFamily: 'var(--font-inter)' }}>ORGANIC</div>
                  </div>
                </div>
              </div>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 lg:py-24" style={{ background: 'white' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ background: 'rgba(27,77,62,0.08)', color: '#1B4D3E', fontFamily: 'var(--font-inter)' }}>
              Mission &amp; Vision
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4"
              style={{ color: '#1a2e1a', fontFamily: 'var(--font-hind)' }}>
              আমাদের <span style={{ color: '#D4A017' }}>লক্ষ্য ও দৃষ্টিভঙ্গি</span>
            </h2>
          </FadeIn>

          <div className="grid lg:grid-cols-2 gap-8">
            <SlideIn from="left" delay={0.1}>
              <div className="rounded-3xl p-8 h-full" style={{ background: 'linear-gradient(135deg, #1B4D3E, #0F2E24)' }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                  style={{ background: 'rgba(212,160,23,0.2)' }}>
                  <Target className="w-6 h-6" style={{ color: '#F5C842' }} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-hind)' }}>আমাদের মিশন</h3>
                <ul className="space-y-3">
                  {missions.map((m, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#F5C842' }} />
                      <span className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.8)', fontFamily: 'var(--font-hind)' }}>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </SlideIn>

            <SlideIn from="right" delay={0.2}>
              <div className="rounded-3xl p-8 h-full border" style={{ background: '#F8F5EE', borderColor: 'rgba(27,77,62,0.1)' }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                  style={{ background: 'rgba(27,77,62,0.08)' }}>
                  <Eye className="w-6 h-6" style={{ color: '#1B4D3E' }} />
                </div>
                <h3 className="text-2xl font-bold mb-6" style={{ color: '#1B4D3E', fontFamily: 'var(--font-hind)' }}>আমাদের ভিশন</h3>
                <p className="text-base leading-relaxed mb-6" style={{ color: '#4a5568', fontFamily: 'var(--font-hind)' }}>
                  ২০৩০ সালের মধ্যে বাংলাদেশের প্রতিটি জেলায় কৃষকদের কাছে জৈব কৃষির সুবিধা পৌঁছে দেওয়া।
                </p>
                <p className="text-base leading-relaxed" style={{ color: '#4a5568', fontFamily: 'var(--font-hind)' }}>
                  আমরা বিশ্বাস করি, মাটির স্বাস্থ্যই কৃষকের সম্পদ। যদি মাটি সুস্থ থাকে, তাহলে কৃষক সমৃদ্ধ হবে এবং আগামী প্রজন্মের জন্য একটি সুন্দর পৃথিবী রেখে যাওয়া সম্ভব হবে।
                </p>
              </div>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 lg:py-28" style={{ background: '#F8F5EE' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ background: 'rgba(27,77,62,0.08)', color: '#1B4D3E', fontFamily: 'var(--font-inter)' }}>
              Journey
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold" style={{ color: '#1a2e1a', fontFamily: 'var(--font-hind)' }}>
              আমাদের <span style={{ color: '#D4A017' }}>যাত্রাপথ</span>
            </h2>
          </FadeIn>

          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px hidden md:block"
              style={{ background: 'linear-gradient(to bottom, #1B4D3E, rgba(27,77,62,0.1))' }} />
            <div className="space-y-10">
              {timeline.map((item, i) => <TimelineItem key={i} item={item} i={i} />)}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-28" style={{ background: 'white' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ background: 'rgba(27,77,62,0.08)', color: '#1B4D3E', fontFamily: 'var(--font-inter)' }}>
              Our Values
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold" style={{ color: '#1a2e1a', fontFamily: 'var(--font-hind)' }}>
              আমাদের <span style={{ color: '#D4A017' }}>মূল্যবোধ</span>
            </h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => <ValueCard key={i} v={v} i={i} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ background: 'linear-gradient(135deg, #0F2E24, #1B4D3E, #2D7A3A)' }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-8" style={{ fontFamily: 'var(--font-hind)' }}>
            আজই <span style={{ color: '#F5C842' }}>যোগাযোগ করুন</span>
          </h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold"
              style={{ background: 'linear-gradient(135deg, #D4A017, #F5C842)', color: '#1B4D3E', fontFamily: 'var(--font-hind)' }}>
              যোগাযোগ করুন <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/about/soil-benefit"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold border"
              style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'white', fontFamily: 'var(--font-hind)' }}>
              মাটির উপকার জানুন
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
