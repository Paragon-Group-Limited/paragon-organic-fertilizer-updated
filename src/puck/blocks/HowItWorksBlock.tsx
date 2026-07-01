'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { RichText } from '@/components/puck/RichText'
import { useT } from '@/hooks/useT'
import { useLanguage } from '@/contexts/LanguageContext'

type Props = {
  tagText: string; tagTextEn?: string
  headingBn: string; headingEn?: string
  highlightText: string; highlightTextEn?: string
  step1No: string; step1Icon: string; step1ImageUrl?: string; step1Title: string; step1En: string; step1Desc: string; step1DescEn?: string
  step2No: string; step2Icon: string; step2ImageUrl?: string; step2Title: string; step2En: string; step2Desc: string; step2DescEn?: string
  step3No: string; step3Icon: string; step3ImageUrl?: string; step3Title: string; step3En: string; step3Desc: string; step3DescEn?: string
  step4No: string; step4Icon: string; step4ImageUrl?: string; step4Title: string; step4En: string; step4Desc: string; step4DescEn?: string
}

export function HowItWorksBlock(props: Props) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const t = useT()
  const { lang } = useLanguage()

  const steps = [
    { no: props.step1No, icon: props.step1Icon, imageUrl: props.step1ImageUrl, title: props.step1Title, en: props.step1En, desc: props.step1Desc, descEn: props.step1DescEn },
    { no: props.step2No, icon: props.step2Icon, imageUrl: props.step2ImageUrl, title: props.step2Title, en: props.step2En, desc: props.step2Desc, descEn: props.step2DescEn },
    { no: props.step3No, icon: props.step3Icon, imageUrl: props.step3ImageUrl, title: props.step3Title, en: props.step3En, desc: props.step3Desc, descEn: props.step3DescEn },
    { no: props.step4No, icon: props.step4Icon, imageUrl: props.step4ImageUrl, title: props.step4Title, en: props.step4En, desc: props.step4Desc, descEn: props.step4DescEn },
  ]

  return (
    <section ref={ref} className="py-24 lg:py-32 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #F8F5EE 0%, #ffffff 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ background: 'rgba(27,77,62,0.08)', color: '#1B4D3E', fontFamily: 'var(--font-inter)' }}>
            <RichText html={t(props.tagText, props.tagTextEn)} inline />
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold" style={{ color: '#1a2e1a', fontFamily: 'var(--font-hind)' }}>
            <RichText html={t(props.headingBn, props.headingEn)} inline />{' '}
            <span style={{ color: '#D4A017' }}><RichText html={t(props.highlightText, props.highlightTextEn)} inline /></span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative items-stretch">
          {steps.map((step, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.6 }} className="relative group flex">
              <div className="rounded-2xl p-7 text-center flex flex-col w-full"
                style={{ background: 'white', border: '1px solid rgba(27,77,62,0.08)', boxShadow: '0 4px 24px rgba(27,77,62,0.06)' }}>
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold"
                  style={{ background: 'linear-gradient(135deg, #1B4D3E, #2D7A3A)', color: 'white', fontFamily: 'var(--font-inter)' }}>
                  {lang === 'en' ? 'Step ' : 'ধাপ '}<RichText html={step.no} inline />
                </div>
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 mt-2 overflow-hidden flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, rgba(27,77,62,0.06), rgba(45,122,58,0.1))' }}>
                  {step.imageUrl ? (
                    <Image src={step.imageUrl} alt="" width={64} height={64} className="w-full h-full object-contain p-1" />
                  ) : (
                    <span className="text-3xl">{step.icon}</span>
                  )}
                </div>
                <h3 className="text-lg font-bold mb-1" style={{ color: '#1B4D3E', fontFamily: 'var(--font-hind)' }}>
                  <RichText html={lang === 'en' ? (step.en || step.title) : step.title} inline />
                </h3>
                {lang === 'bn' && step.en && (
                  <p className="text-xs mb-3" style={{ color: '#9ca3af', fontFamily: 'var(--font-inter)' }}>
                    <RichText html={step.en} inline />
                  </p>
                )}
                <div className="flex-1 overflow-hidden mt-1"
                  style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden' }}>
                  <RichText html={t(step.desc, step.descEn)} className="text-sm leading-relaxed" style={{ color: '#6b7280', fontFamily: 'var(--font-hind)' }} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
