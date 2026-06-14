'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, Star } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const products = [
  {
    id: 1,
    nameBn: 'প্যারাগন জৈব সার',
    nameEn: 'Paragon Organic Fertilizer',
    tagBn: 'সেরা বিক্রি',
    tagEn: 'Best Seller',
    descBn: 'উপকারী অণুজীব সমৃদ্ধ ১০০% অর্গানিক সার। মাটির উর্বরতা বৃদ্ধি ও ফসলের স্বাভাবিক বৃদ্ধির জন্য।',
    descEn: '100% organic fertilizer rich in beneficial microbes. For improving soil fertility and natural crop growth.',
    weight: '৫০ কেজি / 50 kg',
    icon: '🌿',
    gradient: 'linear-gradient(135deg, #1B4D3E 0%, #2D7A3A 100%)',
    featured: true,
  },
  {
    id: 2,
    nameBn: 'জৈব কীটনাশক',
    nameEn: 'Organic Pesticide',
    tagBn: 'নতুন',
    tagEn: 'New',
    descBn: 'প্রাকৃতিক উপাদান দিয়ে তৈরি পরিবেশবান্ধব কীটনাশক। ফসলের ক্ষতিকর পোকামাকড় দমনে কার্যকর।',
    descEn: 'Eco-friendly pesticide made from natural ingredients. Effective in controlling harmful crop pests.',
    weight: '১ লিটার / 1 Litre',
    icon: '🌾',
    gradient: 'linear-gradient(135deg, #D4A017 0%, #F5C842 100%)',
    featured: false,
  },
  {
    id: 3,
    nameBn: 'মাটি উন্নয়নকারী',
    nameEn: 'Soil Improver',
    tagBn: 'জনপ্রিয়',
    tagEn: 'Popular',
    descBn: 'মাটির পিএইচ ঠিক রাখে এবং মাটির গঠন উন্নত করে। ভারী মাটির জন্য বিশেষভাবে কার্যকর।',
    descEn: 'Maintains soil pH and improves soil structure. Especially effective for heavy or clay soils.',
    weight: '২৫ কেজি / 25 kg',
    icon: '🏔️',
    gradient: 'linear-gradient(135deg, #8B5E3C 0%, #C49A6C 100%)',
    featured: false,
  },
]

export default function ProductsPreview() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { lang } = useLanguage()

  return (
    <section ref={ref} className="py-24 lg:py-32" style={{ background: '#F8F5EE' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-14 gap-6">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ background: 'rgba(27,77,62,0.08)', color: '#1B4D3E', fontFamily: 'var(--font-inter)' }}>
              {lang === 'en' ? 'Our Products' : 'আমাদের পণ্যসমূহ'}
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold"
              style={{ color: '#1a2e1a', fontFamily: lang === 'en' ? 'var(--font-inter)' : 'var(--font-hind)' }}>
              {lang === 'en'
                ? <>Premium <span style={{ color: '#D4A017' }}>Agricultural Products</span></>
                : <>প্রিমিয়াম <span style={{ color: '#D4A017' }}>কৃষি পণ্য</span></>
              }
            </h2>
          </div>
          <Link href="/products"
            className="group inline-flex items-center gap-2 text-sm font-semibold transition-all duration-200"
            style={{ color: '#1B4D3E', fontFamily: lang === 'en' ? 'var(--font-inter)' : 'var(--font-hind)' }}>
            {lang === 'en' ? 'View All Products' : 'সব পণ্য দেখুন'}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.6, ease: 'easeOut' }}
              className="group">
              <div className="rounded-3xl overflow-hidden card-hover"
                style={{ background: 'white', border: '1px solid rgba(27,77,62,0.08)', boxShadow: '0 4px 24px rgba(27,77,62,0.06)' }}>

                <div className="relative h-52 flex items-center justify-center" style={{ background: product.gradient }}>
                  <div className="text-7xl">{product.icon}</div>

                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold"
                    style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)', color: 'white', fontFamily: lang === 'en' ? 'var(--font-inter)' : 'var(--font-hind)' }}>
                    {lang === 'en' ? product.tagEn : product.tagBn}
                  </div>

                  {product.featured && (
                    <div className="absolute top-4 right-4">
                      <Star className="w-5 h-5 fill-current" style={{ color: '#F5C842' }} />
                    </div>
                  )}
                </div>

                <div className="p-7">
                  <h3 className="text-xl font-bold mb-1"
                    style={{ color: '#1B4D3E', fontFamily: lang === 'en' ? 'var(--font-inter)' : 'var(--font-hind)' }}>
                    {lang === 'en' ? product.nameEn : product.nameBn}
                  </h3>
                  <p className="text-xs mb-3" style={{ color: '#9ca3af', fontFamily: 'var(--font-inter)' }}>
                    {product.weight}
                  </p>
                  <p className="text-sm leading-relaxed mb-6"
                    style={{ color: '#6b7280', fontFamily: lang === 'en' ? 'var(--font-inter)' : 'var(--font-hind)' }}>
                    {lang === 'en' ? product.descEn : product.descBn}
                  </p>
                  <Link href="/products"
                    className="group/btn w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-[1.02]"
                    style={{ background: 'rgba(27,77,62,0.06)', color: '#1B4D3E', fontFamily: lang === 'en' ? 'var(--font-inter)' : 'var(--font-hind)' }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, #1B4D3E, #2D7A3A)'
                      e.currentTarget.style.color = 'white'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'rgba(27,77,62,0.06)'
                      e.currentTarget.style.color = '#1B4D3E'
                    }}>
                    {lang === 'en' ? 'View Details' : 'বিস্তারিত দেখুন'}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
