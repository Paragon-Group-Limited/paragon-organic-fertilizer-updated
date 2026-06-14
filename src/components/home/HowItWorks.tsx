'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const steps = [
  {
    step: '০১',
    icon: '🌿',
    titleBn: 'প্রয়োগ করুন',
    titleEn: 'Apply',
    descBn: 'জমি প্রস্তুতির সময় বা ফসল লাগানোর আগে প্যারাগন জৈব সার মাটিতে মিশিয়ে দিন।',
  },
  {
    step: '০২',
    icon: '🔬',
    titleBn: 'অণুজীব সক্রিয় হয়',
    titleEn: 'Microbes Activate',
    descBn: 'উপকারী অণুজীব মাটিতে সক্রিয় হয়ে জৈব পদার্থ বিশ্লেষণ শুরু করে এবং পুষ্টি সরবরাহ করে।',
  },
  {
    step: '০৩',
    icon: '🌱',
    titleBn: 'মাটি সুস্থ হয়',
    titleEn: 'Soil Recovers',
    descBn: 'মাটির গঠন, পানি ধারণ ক্ষমতা এবং জৈব পদার্থের পরিমাণ উল্লেখযোগ্যভাবে বৃদ্ধি পায়।',
  },
  {
    step: '০৪',
    icon: '🌾',
    titleBn: 'ফলন বাড়ে',
    titleEn: 'Yield Increases',
    descBn: 'সুস্থ মাটিতে ফসল দ্রুত ও শক্তিশালীভাবে বৃদ্ধি পায়, উৎপাদন ৩০-৫০% পর্যন্ত বৃদ্ধি পেতে পারে।',
  },
]

export default function HowItWorks() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-24 lg:py-32 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #F8F5EE 0%, #ffffff 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ background: 'rgba(27,77,62,0.08)', color: '#1B4D3E', fontFamily: 'var(--font-inter)' }}>
            ব্যবহারের পদ্ধতি
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold"
            style={{ color: '#1a2e1a', fontFamily: 'var(--font-hind)' }}>
            মাত্র <span style={{ color: '#D4A017' }}>৪টি ধাপে</span> ফলন বাড়ান
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connecting line */}
          <div className="absolute top-16 left-1/4 right-1/4 h-0.5 hidden lg:block"
            style={{ background: 'linear-gradient(to right, #1B4D3E, #D4A017, #1B4D3E)', opacity: 0.3 }} />

          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.6, ease: 'easeOut' }}
              className="relative group">
              <div className="rounded-2xl p-7 text-center transition-all duration-300 card-hover"
                style={{ background: 'white', border: '1px solid rgba(27,77,62,0.08)', boxShadow: '0 4px 24px rgba(27,77,62,0.06)' }}>

                {/* Step number */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold"
                  style={{ background: 'linear-gradient(135deg, #1B4D3E, #2D7A3A)', color: 'white', fontFamily: 'var(--font-inter)' }}>
                  ধাপ {step.step}
                </div>

                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl mt-2"
                  style={{ background: 'linear-gradient(135deg, rgba(27,77,62,0.06), rgba(45,122,58,0.1))' }}>
                  {step.icon}
                </div>

                <h3 className="text-lg font-bold mb-1" style={{ color: '#1B4D3E', fontFamily: 'var(--font-hind)' }}>
                  {step.titleBn}
                </h3>
                <p className="text-xs mb-3" style={{ color: '#9ca3af', fontFamily: 'var(--font-inter)' }}>
                  {step.titleEn}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: '#6b7280', fontFamily: 'var(--font-hind)' }}>
                  {step.descBn}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
