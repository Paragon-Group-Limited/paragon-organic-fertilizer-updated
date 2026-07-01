'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Star } from 'lucide-react'
import { RichText } from '@/components/puck/RichText'
import { useT } from '@/hooks/useT'
import { useLanguage } from '@/contexts/LanguageContext'

type ProductItem = {
  nameBn: string
  nameEn?: string
  descBn?: string
  descEn?: string
  weight?: string
  icon?: string
  imageUrl?: string
  tag?: string
  gradient?: string
  featured?: 'yes' | 'no'
}

type Props = {
  tagText: string; tagTextEn?: string
  headingBn: string; headingEn?: string
  highlightText: string; highlightTextEn?: string
  allProductsHref: string
  products?: ProductItem[]
}

export function ProductsPreviewBlock(props: Props) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const t = useT()
  const { lang } = useLanguage()

  const products: ProductItem[] = props.products || []

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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7 items-stretch">
          {products.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 50 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.6 }} className="flex">
              <div className="rounded-3xl overflow-hidden flex flex-col w-full"
                style={{ background: 'white', border: '1px solid rgba(27,77,62,0.08)', boxShadow: '0 4px 24px rgba(27,77,62,0.06)' }}>

                {/* Image / icon area */}
                <div className="relative overflow-hidden flex items-center justify-center"
                  style={{
                    aspectRatio: p.imageUrl ? '4/3' : undefined,
                    height: p.imageUrl ? undefined : '13rem',
                    background: p.imageUrl ? '#f4f1eb' : (p.gradient || 'linear-gradient(135deg, #1B4D3E, #2D7A3A)'),
                  }}>
                  {p.imageUrl ? (
                    <Image src={p.imageUrl} alt={lang === 'en' ? (p.nameEn || p.nameBn) : p.nameBn}
                      fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                  ) : (
                    <div className="text-7xl">{p.icon || '📦'}</div>
                  )}
                  {p.tag && (
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold"
                      style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)', color: 'white', fontFamily: 'var(--font-hind)' }}>
                      <RichText html={p.tag} inline />
                    </div>
                  )}
                  {p.featured === 'yes' && (
                    <div className="absolute top-4 right-4">
                      <Star className="w-5 h-5 fill-current" style={{ color: '#F5C842' }} />
                    </div>
                  )}
                </div>

                {/* Body */}
                <div className="p-7 flex flex-col flex-1">
                  <h3 className="text-xl font-bold mb-1" style={{ color: '#1B4D3E', fontFamily: 'var(--font-hind)' }}>
                    <RichText html={lang === 'en' ? (p.nameEn || p.nameBn) : p.nameBn} inline />
                  </h3>
                  {lang === 'bn' && p.nameEn && (
                    <p className="text-xs mb-3" style={{ color: '#9ca3af', fontFamily: 'var(--font-inter)' }}>
                      <RichText html={p.nameEn} inline />{p.weight ? <> · <RichText html={p.weight} inline /></> : null}
                    </p>
                  )}
                  {lang === 'en' && p.weight && (
                    <p className="text-xs mb-3" style={{ color: '#9ca3af', fontFamily: 'var(--font-inter)' }}>
                      <RichText html={p.weight} inline />
                    </p>
                  )}
                  <div className="flex-1 mb-6"
                    style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden' }}>
                    <RichText html={t(p.descBn || '', p.descEn)}
                      className="text-sm leading-relaxed"
                      style={{ color: '#6b7280', fontFamily: 'var(--font-hind)' }}
                    />
                  </div>
                  <Link href="/products"
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm mt-auto"
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
