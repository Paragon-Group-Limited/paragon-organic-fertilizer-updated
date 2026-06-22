'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { RichText } from '@/components/puck/RichText'
import { useT } from '@/hooks/useT'
import { useLanguage } from '@/contexts/LanguageContext'

type Props = {
  tagText: string; tagTextEn?: string
  headingLine1: string; headingLine1En?: string
  highlightText: string; highlightTextEn?: string
  bodyText: string; bodyTextEn?: string
  feature1: string; feature1En?: string
  feature2: string; feature2En?: string
  feature3: string; feature3En?: string
  feature4: string; feature4En?: string
  ctaLabel: string; ctaLabelEn?: string
  ctaHref: string
  badgeValue: string; badgeLabel: string; badgeLabelEn?: string
  imageUrl?: string
}

export function AboutSectionBlock(props: Props) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const t = useT()
  const { lang } = useLanguage()

  const features = [
    { bn: props.feature1, en: props.feature1En },
    { bn: props.feature2, en: props.feature2En },
    { bn: props.feature3, en: props.feature3En },
    { bn: props.feature4, en: props.feature4En },
  ].filter(f => f.bn)

  return (
    <section ref={ref} className="py-24 lg:py-32" style={{ background: '#F8F5EE' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Image side */}
          <motion.div initial={{ opacity: 0, x: -60 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }} className="relative">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3]"
              style={{ background: 'linear-gradient(135deg, #1B4D3E 0%, #2D7A3A 100%)' }}>
              {props.imageUrl
                ? <img src={props.imageUrl} alt={t(props.headingLine1, props.headingLine1En)} className="w-full h-full object-cover" />
                : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white px-8">
                      <div className="text-8xl mb-4">🌱</div>
                      <p className="text-xl font-semibold" style={{ fontFamily: 'var(--font-hind)' }}>
                        {lang === 'en' ? 'Power of Nature' : 'প্রকৃতির শক্তি'}
                      </p>
                      <p className="text-sm opacity-70 mt-1" style={{ fontFamily: 'var(--font-inter)' }}>Power of Nature</p>
                    </div>
                  </div>
                )
              }
              <div className="absolute bottom-0 left-0 right-0 h-32"
                style={{ background: 'linear-gradient(to top, rgba(15,46,36,0.6), transparent)' }} />
            </div>
            {props.badgeValue && (
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="absolute -bottom-6 -right-6 rounded-2xl p-5 shadow-2xl"
                style={{ background: 'white', border: '2px solid rgba(27,77,62,0.1)' }}>
                <div className="text-3xl font-bold text-center" style={{ color: '#1B4D3E', fontFamily: 'var(--font-hind)' }}>
                  <RichText html={props.badgeValue} inline />
                </div>
                <div className="text-xs text-center mt-0.5" style={{ color: '#2D7A3A', fontFamily: 'var(--font-hind)' }}>
                  <RichText html={t(props.badgeLabel, props.badgeLabelEn)} inline />
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Content side */}
          <motion.div initial={{ opacity: 0, x: 60 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6"
              style={{ background: 'rgba(27,77,62,0.08)', color: '#1B4D3E', border: '1px solid rgba(27,77,62,0.15)', fontFamily: 'var(--font-inter)' }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#1B4D3E' }} />
              <RichText html={t(props.tagText, props.tagTextEn)} inline />
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold leading-tight mb-6" style={{ color: '#1B4D3E', fontFamily: 'var(--font-hind)' }}>
              <RichText html={t(props.headingLine1, props.headingLine1En)} inline /><br />
              <span style={{ color: '#D4A017' }}><RichText html={t(props.highlightText, props.highlightTextEn)} inline /></span>
            </h2>

            <RichText html={t(props.bodyText, props.bodyTextEn)}
              className="text-lg leading-relaxed mb-8"
              style={{ color: '#4a5568', fontFamily: 'var(--font-hind)' }}
            />

            <ul className="space-y-3 mb-10">
              {features.map((f, i) => (
                <motion.li key={i} initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" style={{ color: '#2D7A3A' }} />
                  <RichText html={t(f.bn, f.en)} inline className="text-base" style={{ color: '#374151', fontFamily: 'var(--font-hind)' }} />
                </motion.li>
              ))}
            </ul>

            {props.ctaLabel && props.ctaHref && (
              <Link href={props.ctaHref}
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm hover:scale-105 shadow-lg"
                style={{ background: 'linear-gradient(135deg, #1B4D3E, #2D7A3A)', color: 'white', fontFamily: 'var(--font-hind)' }}>
                <RichText html={t(props.ctaLabel, props.ctaLabelEn)} inline />
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
