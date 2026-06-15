'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const features = {
  bn: [
    'উপকারী অণুজীব সমৃদ্ধ প্রাকৃতিক উপাদান',
    'মাটির জৈব পদার্থ বৃদ্ধি করে',
    'ফসলের রোগ প্রতিরোধ ক্ষমতা বাড়ায়',
    'রাসায়নিক সারের নির্ভরতা কমায়',
  ],
  en: [
    'Natural ingredients rich in beneficial microbes',
    'Increases organic matter in the soil',
    'Boosts crop disease resistance',
    'Reduces dependence on chemical fertilizers',
  ],
}

export default function AboutSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const { lang } = useLanguage()

  return (
    <section ref={ref} className="py-24 lg:py-32" style={{ background: '#F8F5EE' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative">

            <div className="relative rounded-3xl overflow-hidden aspect-[4/3]"
              style={{ background: 'linear-gradient(135deg, #1B4D3E 0%, #2D7A3A 100%)' }}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white px-8">
                  <div className="text-8xl mb-4">🌱</div>
                  <p className="text-xl font-semibold" style={{ fontFamily: 'var(--font-hind)' }}>
                    প্রকৃতির শক্তি
                  </p>
                  <p className="text-sm opacity-70 mt-1" style={{ fontFamily: 'var(--font-inter)' }}>
                    Power of Nature
                  </p>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-32"
                style={{ background: 'linear-gradient(to top, rgba(15,46,36,0.6), transparent)' }} />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="absolute -bottom-6 -right-6 rounded-2xl p-5 shadow-2xl"
              style={{ background: 'white', border: '2px solid rgba(27,77,62,0.1)' }}>
              <div className="text-3xl font-bold text-center" style={{ color: '#1B4D3E', fontFamily: 'var(--font-hind)' }}>
                ১০০%
              </div>
              <div className="text-xs text-center mt-0.5"
                style={{ color: '#2D7A3A', fontFamily: lang === 'en' ? 'var(--font-inter)' : 'var(--font-hind)' }}>
                {lang === 'en' ? 'Natural Ingredients' : 'প্রাকৃতিক উপাদান'}
              </div>
            </motion.div>
          </motion.div>

          {/* Content side */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6"
              style={{ background: 'rgba(27,77,62,0.08)', color: '#1B4D3E', border: '1px solid rgba(27,77,62,0.15)', fontFamily: 'var(--font-inter)' }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#1B4D3E' }} />
              {lang === 'en' ? 'About Us' : 'আমাদের সম্পর্কে'}
            </motion.div>

            <h2 className="text-4xl lg:text-5xl font-bold leading-tight mb-6"
              style={{ color: '#1B4D3E', fontFamily: lang === 'en' ? 'var(--font-inter)' : 'var(--font-hind)' }}>
              {lang === 'en'
                ? <>Keep Soil Healthy,<br /><span style={{ color: '#D4A017' }}>Grow More Crops</span></>
                : <>মাটিকে সুস্থ রাখুন,,<br /><span style={{ color: '#D4A017' }}>ফসল বাড়ান</span></>
              }
            </h2>

            <p className="text-lg leading-relaxed mb-8"
              style={{ color: '#4a5568', fontFamily: lang === 'en' ? 'var(--font-inter)' : 'var(--font-hind)' }}>
              {lang === 'en'
                ? 'Paragon Organic Fertilizer is a 100% natural fertilizer rich in beneficial microbes, specially formulated to restore the fertility of agricultural soils in Bangladesh and ensure the natural growth of crops.'
                : 'প্যারাগন জৈব সার উপকারী অণুজীব সমৃদ্ধ একটি ১০০% প্রাকৃতিক সার, যা বাংলাদেশের কৃষিজমির মাটির উর্বরতা পুনরুদ্ধার করতে এবং ফসলের স্বাভাবিক বৃদ্ধি নিশ্চিত করতে বিশেষভাবে তৈরি।'
              }
            </p>

            <ul className="space-y-3 mb-10">
              {features[lang].map((f, i) => (
                <motion.li
                  key={f}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                  className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" style={{ color: '#2D7A3A' }} />
                  <span className="text-base"
                    style={{ color: '#374151', fontFamily: lang === 'en' ? 'var(--font-inter)' : 'var(--font-hind)' }}>{f}</span>
                </motion.li>
              ))}
            </ul>

            <Link href="/about/our-story"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-green-900/20"
              style={{ background: 'linear-gradient(135deg, #1B4D3E, #2D7A3A)', color: 'white', fontFamily: lang === 'en' ? 'var(--font-inter)' : 'var(--font-hind)' }}>
              {lang === 'en' ? 'Learn Our Story' : 'আমাদের গল্প জানুন'}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
