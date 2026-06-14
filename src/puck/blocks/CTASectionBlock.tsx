'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Phone } from 'lucide-react'
import { RichText } from '@/components/puck/RichText'
import { useT } from '@/hooks/useT'

type Props = {
  tagText: string; tagTextEn?: string
  headingLine1: string; headingLine1En?: string
  headingLine2?: string
  highlightText: string; highlightTextEn?: string
  bodyText: string; bodyTextEn?: string
  cta1Label: string; cta1LabelEn?: string; cta1Href: string
  cta2Label: string; cta2LabelEn?: string; phone: string
}

export function CTASectionBlock(props: Props) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const t = useT()

  return (
    <section ref={ref} className="relative overflow-hidden py-24"
      style={{ background: 'linear-gradient(135deg, #0F2E24 0%, #1B4D3E 50%, #2D7A3A 100%)' }}>

      <div className="absolute inset-0 opacity-5"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #D4A017 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6"
            style={{ background: 'rgba(212,160,23,0.2)', border: '1px solid rgba(212,160,23,0.4)', color: '#F5C842', fontFamily: 'var(--font-inter)' }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#F5C842' }} />
            <RichText html={t(props.tagText, props.tagTextEn)} inline />
          </div>

          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-6" style={{ fontFamily: 'var(--font-hind)' }}>
            <RichText html={t(props.headingLine1, props.headingLine1En)} inline /><br />
            <span style={{ color: '#F5C842' }}><RichText html={t(props.highlightText || props.headingLine2 || '', props.highlightTextEn)} inline /></span>
          </h2>

          <RichText html={t(props.bodyText, props.bodyTextEn)}
            className="text-lg leading-relaxed mb-10 max-w-2xl mx-auto"
            style={{ color: 'rgba(255,255,255,0.72)', fontFamily: 'var(--font-hind)' }}
          />

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {props.cta1Label && props.cta1Href && (
              <Link href={props.cta1Href}
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-base hover:scale-105 shadow-xl"
                style={{ background: 'linear-gradient(135deg, #D4A017, #F5C842)', color: '#1B4D3E', fontFamily: 'var(--font-hind)', boxShadow: '0 8px 30px rgba(212,160,23,0.4)' }}>
                <RichText html={t(props.cta1Label, props.cta1LabelEn)} inline />
                <ArrowRight className="w-5 h-5" />
              </Link>
            )}
            {props.phone && (
              <a href={`tel:${props.phone}`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-base hover:bg-white/20"
                style={{ border: '1.5px solid rgba(255,255,255,0.4)', color: 'white', fontFamily: 'var(--font-hind)' }}>
                <Phone className="w-5 h-5" />
                <RichText html={t(props.cta2Label || 'কল করুন', props.cta2LabelEn)} inline />
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
