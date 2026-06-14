'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

const steps = [
  {
    stepBn: '০১', stepEn: '01',
    icon: '🌿',
    titleBn: 'প্রয়োগ করুন',
    titleEn: 'Apply',
    descBn: 'জমি প্রস্তুতির সময় বা ফসল লাগানোর আগে প্যারাগন জৈব সার মাটিতে মিশিয়ে দিন।',
    descEn: 'Mix Paragon Organic Fertilizer into the soil during land preparation or before planting.',
  },
  {
    stepBn: '০২', stepEn: '02',
    icon: '🔬',
    titleBn: 'অণুজীব সক্রিয় হয়',
    titleEn: 'Microbes Activate',
    descBn: 'উপকারী অণুজীব মাটিতে সক্রিয় হয়ে জৈব পদার্থ বিশ্লেষণ শুরু করে এবং পুষ্টি সরবরাহ করে।',
    descEn: 'Beneficial microbes become active in the soil, breaking down organic matter and supplying nutrients.',
  },
  {
    stepBn: '০৩', stepEn: '03',
    icon: '🌱',
    titleBn: 'মাটি সুস্থ হয়',
    titleEn: 'Soil Recovers',
    descBn: 'মাটির গঠন, পানি ধারণ ক্ষমতা এবং জৈব পদার্থের পরিমাণ উল্লেখযোগ্যভাবে বৃদ্ধি পায়।',
    descEn: 'Soil structure, water retention capacity, and organic matter content increase significantly.',
  },
  {
    stepBn: '০৪', stepEn: '04',
    icon: '🌾',
    titleBn: 'ফলন বাড়ে',
    titleEn: 'Yield Increases',
    descBn: 'সুস্থ মাটিতে ফসল দ্রুত ও শক্তিশালীভাবে বৃদ্ধি পায়, উৎপাদন ৩০-৫০% পর্যন্ত বৃদ্ধি পেতে পারে।',
    descEn: 'Crops grow faster and stronger in healthy soil — yield can increase by 30–50%.',
  },
]

export default function HowItWorks() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { lang } = useLanguage()

  return (
    <section ref={ref} className="py-24 lg:py-32 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #F8F5EE 0%, #ffffff 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ background: 'rgba(27,77,62,0.08)', color: '#1B4D3E', fontFamily: 'var(--font-inter)' }}>
            {lang === 'en' ? 'How To Use' : 'ব্যবহারের পদ্ধতি'}
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold"
            style={{ color: '#1a2e1a', fontFamily: lang === 'en' ? 'var(--font-inter)' : 'var(--font-hind)' }}>
            {lang === 'en'
              ? <>Increase Yield in Just <span style={{ color: '#D4A017' }}>4 Steps</span></>
              : <>মাত্র <span style={{ color: '#D4A017' }}>৪টি ধাপে</span> ফলন বাড়ান</>
            }
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          <div className="absolute top-16 left-1/4 right-1/4 h-0.5 hidden lg:block"
            style={{ background: 'linear-gradient(to right, #1B4D3E, #D4A017, #1B4D3E)', opacity: 0.3 }} />

          {steps.map((step, i) => (
            <motion.div
              key={step.stepEn}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.6, ease: 'easeOut' }}
              className="relative group">
              <div className="rounded-2xl p-7 text-center transition-all duration-300 card-hover"
                style={{ background: 'white', border: '1px solid rgba(27,77,62,0.08)', boxShadow: '0 4px 24px rgba(27,77,62,0.06)' }}>

                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold"
                  style={{ background: 'linear-gradient(135deg, #1B4D3E, #2D7A3A)', color: 'white', fontFamily: 'var(--font-inter)' }}>
                  {lang === 'en' ? `STEP ${step.stepEn}` : `ধাপ ${step.stepBn}`}
                </div>

                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl mt-2"
                  style={{ background: 'linear-gradient(135deg, rgba(27,77,62,0.06), rgba(45,122,58,0.1))' }}>
                  {step.icon}
                </div>

                <h3 className="text-lg font-bold mb-3"
                  style={{ color: '#1B4D3E', fontFamily: lang === 'en' ? 'var(--font-inter)' : 'var(--font-hind)' }}>
                  {lang === 'en' ? step.titleEn : step.titleBn}
                </h3>
                <p className="text-sm leading-relaxed"
                  style={{ color: '#6b7280', fontFamily: lang === 'en' ? 'var(--font-inter)' : 'var(--font-hind)' }}>
                  {lang === 'en' ? step.descEn : step.descBn}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
