'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Star } from 'lucide-react'
import { RichText } from '@/components/puck/RichText'
import { useT } from '@/hooks/useT'
import { useLanguage } from '@/contexts/LanguageContext'

type Props = {
  tagText: string; tagTextEn?: string
  headingBn: string; headingEn?: string
  highlightText: string; highlightTextEn?: string
  allProductsHref: string
  p1Name: string; p1NameEn: string; p1Desc: string; p1DescEn?: string; p1Weight: string; p1Icon: string; p1Tag: string; p1Gradient: string; p1Featured: boolean
  p2Name: string; p2NameEn: string; p2Desc: string; p2DescEn?: string; p2Weight: string; p2Icon: string; p2Tag: string; p2Gradient: string
  p3Name: string; p3NameEn: string; p3Desc: string; p3DescEn?: string; p3Weight: string; p3Icon: string; p3Tag: string; p3Gradient: string
}

export function ProductsPreviewBlock(props: Props) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const t = useT()
  const { lang } = useLanguage()

  const products = [
    { name: props.p1Name, nameEn: props.p1NameEn, desc: props.p1Desc, descEn: props.p1DescEn, weight: props.p1Weight, icon: props.p1Icon, tag: props.p1Tag, gradient: props.p1Gradient, featured: props.p1Featured },
    { name: props.p2Name, nameEn: props.p2NameEn, desc: props.p2Desc, descEn: props.p2DescEn, weight: props.p2Weight, icon: props.p2Icon, tag: props.p2Tag, gradient: props.p2Gradient, featured: false },
    { name: props.p3Name, nameEn: props.p3NameEn, desc: props.p3Desc, descEn: props.p3DescEn, weight: props.p3Weight, icon: props.p3Icon, tag: props.p3Tag, gradient: props.p3Gradient, featured: false },
  ]

  return (
    <section ref={ref} className="py-24 lg:py-32" style={{ background: '#F8F5EE' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-14 gap-6">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ background: 'rgba(27,77,62,0.08)', color: '#1B4D3E', fontFamily: 'var(--font-inter)' }}>
              <RichText html={t(props.tagText, props.tagTextEn)} inline />
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold" style={{ color: '#1a2e1a', fontFamily: 'var(--font-hind)' }}>
              <RichText html={t(props.headingBn, props.headingEn)} inline />{' '}
              <span style={{ color: '#D4A017' }}><RichText html={t(props.highlightText, props.highlightTextEn)} inline /></span>
            </h2>
          </div>
          <Link href={props.allProductsHref || '/products'}
            className="group inline-flex items-center gap-2 text-sm font-semibold"
            style={{ color: '#1B4D3E', fontFamily: 'var(--font-hind)' }}>
            {lang === 'en' ? 'View All Products' : 'সব পণ্য দেখুন'} <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {products.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 50 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.6 }}>
              <div className="rounded-3xl overflow-hidden"
                style={{ background: 'white', border: '1px solid rgba(27,77,62,0.08)', boxShadow: '0 4px 24px rgba(27,77,62,0.06)' }}>
                <div className="relative h-52 flex items-center justify-center"
                  style={{ background: p.gradient || 'linear-gradient(135deg, #1B4D3E, #2D7A3A)' }}>
                  <div className="text-7xl">{p.icon}</div>
                  {p.tag && (
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold"
                      style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)', color: 'white', fontFamily: 'var(--font-hind)' }}>
                      <RichText html={p.tag} inline />
                    </div>
                  )}
                  {p.featured && (
                    <div className="absolute top-4 right-4">
                      <Star className="w-5 h-5 fill-current" style={{ color: '#F5C842' }} />
                    </div>
                  )}
                </div>
                <div className="p-7">
                  <h3 className="text-xl font-bold mb-1" style={{ color: '#1B4D3E', fontFamily: 'var(--font-hind)' }}>
                    <RichText html={lang === 'en' ? (p.nameEn || p.name) : p.name} inline />
                  </h3>
                  {lang === 'bn' && p.nameEn && (
                    <p className="text-xs mb-3" style={{ color: '#9ca3af', fontFamily: 'var(--font-inter)' }}>
                      <RichText html={p.nameEn} inline /> · <RichText html={p.weight} inline />
                    </p>
                  )}
                  {lang === 'en' && (
                    <p className="text-xs mb-3" style={{ color: '#9ca3af', fontFamily: 'var(--font-inter)' }}>
                      <RichText html={p.weight} inline />
                    </p>
                  )}
                  <RichText html={t(p.desc, p.descEn)}
                    className="text-sm leading-relaxed mb-6"
                    style={{ color: '#6b7280', fontFamily: 'var(--font-hind)' }}
                  />
                  <Link href="/products"
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm"
                    style={{ background: 'rgba(27,77,62,0.06)', color: '#1B4D3E', fontFamily: 'var(--font-hind)' }}>
                    {lang === 'en' ? 'View Details' : 'বিস্তারিত দেখুন'} <ArrowRight className="w-4 h-4" />
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
