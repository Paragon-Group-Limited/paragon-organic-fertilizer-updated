'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, Phone } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function CTASection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { lang } = useLanguage()

  return (
    <section ref={ref} className="relative overflow-hidden py-24"
      style={{ background: 'linear-gradient(135deg, #0F2E24 0%, #1B4D3E 50%, #2D7A3A 100%)' }}>

      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #D4A017 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #4CAF50 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }} />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6"
            style={{ background: 'rgba(212,160,23,0.2)', border: '1px solid rgba(212,160,23,0.4)', color: '#F5C842', fontFamily: 'var(--font-inter)' }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#F5C842' }} />
            {lang === 'en' ? 'Get Started Today' : 'আজই শুরু করুন'}
          </div>

          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-6"
            style={{ fontFamily: lang === 'en' ? 'var(--font-inter)' : 'var(--font-hind)' }}>
            {lang === 'en'
              ? <>Restore Your Land's<br /><span style={{ color: '#F5C842' }}>Soil Health Today</span></>
              : <>আপনার জমির মাটি<br /><span style={{ color: '#F5C842' }}>সুস্থ করুন আজই</span></>
            }
          </h2>

          <p className="text-lg leading-relaxed mb-10 max-w-2xl mx-auto"
            style={{ color: 'rgba(255,255,255,0.72)', fontFamily: lang === 'en' ? 'var(--font-inter)' : 'var(--font-hind)' }}>
            {lang === 'en'
              ? 'Use Paragon Organic Fertilizer to increase your crop yield and ensure the long-term health of your soil. Our expert team is always ready to assist you.'
              : 'প্যারাগন জৈব সার ব্যবহার করে আপনার ফসলের উৎপাদন বাড়ান এবং মাটির দীর্ঘমেয়াদী স্বাস্থ্য নিশ্চিত করুন। আমাদের বিশেষজ্ঞ দল আপনাকে সহায়তা করতে সদা প্রস্তুত।'
            }
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-base transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl"
              style={{ background: 'linear-gradient(135deg, #D4A017, #F5C842)', color: '#1B4D3E', fontFamily: lang === 'en' ? 'var(--font-inter)' : 'var(--font-hind)', boxShadow: '0 8px 30px rgba(212,160,23,0.4)' }}>
              {lang === 'en' ? 'Contact Us Now' : 'এখনই যোগাযোগ করুন'}
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <a href="tel:+8801XXXXXXXXX"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-base transition-all duration-300 hover:bg-white/20"
              style={{ border: '1.5px solid rgba(255,255,255,0.4)', color: 'white', fontFamily: lang === 'en' ? 'var(--font-inter)' : 'var(--font-hind)' }}>
              <Phone className="w-5 h-5" />
              {lang === 'en' ? 'Call Now' : 'কল করুন'}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
