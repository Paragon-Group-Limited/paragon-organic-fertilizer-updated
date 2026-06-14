'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { AlertTriangle, CheckCircle2 } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const problems = {
  bn: [
    { icon: '🌾', text: 'বারবার চাষের ফলে মাটির জৈব পদার্থ হ্রাস পাচ্ছে' },
    { icon: '⚗️', text: 'অতিরিক্ত রাসায়নিক সার ব্যবহারে মাটি অম্লীয় হয়ে পড়ছে' },
    { icon: '💧', text: 'মাটির পানি ধারণ ক্ষমতা কমে যাচ্ছে' },
    { icon: '🦠', text: 'উপকারী অণুজীবের সংখ্যা উল্লেখযোগ্যভাবে কমছে' },
  ],
  en: [
    { icon: '🌾', text: 'Repeated cultivation is reducing organic matter in the soil' },
    { icon: '⚗️', text: 'Overuse of chemical fertilizers is making soil acidic' },
    { icon: '💧', text: 'Soil water retention capacity is declining' },
    { icon: '🦠', text: 'The number of beneficial microbes is decreasing significantly' },
  ],
}

const solutions = {
  bn: [
    { icon: '🌱', text: 'মাটিতে জৈব পদার্থ ও পুষ্টি উপাদান পুনরায় যোগ করে' },
    { icon: '🔬', text: 'উপকারী অণুজীব সরবরাহ করে মাটির জীবন ফিরিয়ে আনে' },
    { icon: '💪', text: 'মাটির পানি ধারণ ও বায়ু চলাচল উন্নত করে' },
    { icon: '📈', text: 'ফসলের উৎপাদন ৩০-৫০% পর্যন্ত বৃদ্ধি করতে সক্ষম' },
  ],
  en: [
    { icon: '🌱', text: 'Restores organic matter and nutrients back into the soil' },
    { icon: '🔬', text: 'Supplies beneficial microbes to revive soil life' },
    { icon: '💪', text: 'Improves soil water retention and air circulation' },
    { icon: '📈', text: 'Can increase crop yield by up to 30–50%' },
  ],
}

export default function ProblemSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { lang } = useLanguage()

  return (
    <section ref={ref} className="py-24 lg:py-32 relative overflow-hidden" style={{ background: 'white' }}>
      <div className="absolute top-0 left-0 right-0" style={{ lineHeight: 0 }}>
        <svg viewBox="0 0 1440 60" className="w-full" style={{ fill: '#F8F5EE' }}>
          <path d="M0,0 C360,60 1080,60 1440,0 L1440,0 L0,0 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ background: 'rgba(27,77,62,0.08)', color: '#1B4D3E', fontFamily: 'var(--font-inter)' }}>
            {lang === 'en' ? 'Problem & Solution' : 'সমস্যা ও সমাধান'}
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4"
            style={{ color: '#1a2e1a', fontFamily: lang === 'en' ? 'var(--font-inter)' : 'var(--font-hind)' }}>
            {lang === 'en'
              ? <>Bangladesh's Soil Crisis &<br /><span style={{ color: '#D4A017' }}>Our Solution</span></>
              : <>বাংলাদেশের মাটির সংকট ও<br /><span style={{ color: '#D4A017' }}>আমাদের সমাধান</span></>
            }
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Problem card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="rounded-3xl p-8 relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #fff5f5, #ffe8e8)', border: '1px solid rgba(239,68,68,0.15)' }}>

            <div className="flex items-center gap-3 mb-7">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(239,68,68,0.1)' }}>
                <AlertTriangle className="w-5 h-5" style={{ color: '#dc2626' }} />
              </div>
              <h3 className="text-xl font-bold"
                style={{ color: '#dc2626', fontFamily: lang === 'en' ? 'var(--font-inter)' : 'var(--font-hind)' }}>
                {lang === 'en' ? 'Why is Bangladesh\'s Soil Fertility Declining?' : 'বাংলাদেশের মাটির উর্বরতা কেন কমছে?'}
              </h3>
            </div>

            <ul className="space-y-4">
              {problems[lang].map((p, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-start gap-3">
                  <span className="text-xl flex-shrink-0 mt-0.5">{p.icon}</span>
                  <span className="text-base leading-relaxed"
                    style={{ color: '#374151', fontFamily: lang === 'en' ? 'var(--font-inter)' : 'var(--font-hind)' }}>{p.text}</span>
                </motion.li>
              ))}
            </ul>

            <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full opacity-10"
              style={{ background: 'radial-gradient(circle, #dc2626, transparent)' }} />
          </motion.div>

          {/* Solution card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="rounded-3xl p-8 relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)', border: '1px solid rgba(27,77,62,0.15)' }}>

            <div className="flex items-center gap-3 mb-7">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(27,77,62,0.1)' }}>
                <CheckCircle2 className="w-5 h-5" style={{ color: '#1B4D3E' }} />
              </div>
              <h3 className="text-xl font-bold"
                style={{ color: '#1B4D3E', fontFamily: lang === 'en' ? 'var(--font-inter)' : 'var(--font-hind)' }}>
                {lang === 'en' ? 'How Does Paragon Organic Fertilizer Work?' : 'প্যারাগন জৈব সার কীভাবে কাজ করে?'}
              </h3>
            </div>

            <ul className="space-y-4">
              {solutions[lang].map((s, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-start gap-3">
                  <span className="text-xl flex-shrink-0 mt-0.5">{s.icon}</span>
                  <span className="text-base leading-relaxed"
                    style={{ color: '#374151', fontFamily: lang === 'en' ? 'var(--font-inter)' : 'var(--font-hind)' }}>{s.text}</span>
                </motion.li>
              ))}
            </ul>

            <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full opacity-10"
              style={{ background: 'radial-gradient(circle, #1B4D3E, transparent)' }} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
