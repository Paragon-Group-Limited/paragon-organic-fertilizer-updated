'use client'

import { RichText } from '@/components/puck/RichText'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade, Pagination, Navigation } from 'swiper/modules'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { useLanguage } from '@/contexts/LanguageContext'
import { useT } from '@/hooks/useT'

type SlideItem = {
  headingBn: string; headingEn?: string
  tagBn?: string; tagEn?: string
  subtitleBn?: string; subtitleEn?: string
  imageUrl?: string
  bgColor?: string
  accentColor?: string
  cta1Label?: string; cta1LabelEn?: string; cta1Href?: string
  cta2Label?: string; cta2LabelEn?: string; cta2Href?: string
}

export function HomeSlidesBlock({ slides }: { slides?: SlideItem[] }) {
  const [key, setKey] = useState(0)
  const { lang } = useLanguage()
  const t = useT()
  const list = slides && slides.length > 0 ? slides : []

  if (list.length === 0) {
    return (
      <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#1B4D3E', color: 'white', fontSize: 18, fontFamily: 'var(--font-hind)' }}>
        ডান প্যানেলে slide যোগ করুন
      </div>
    )
  }

  return (
    <section className="relative w-full" style={{ height: '100svh', minHeight: 600 }}>
      <Swiper
        modules={[Autoplay, EffectFade, Pagination, Navigation]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{ el: '.hero-pagination', clickable: true }}
        navigation={{ prevEl: '.hero-prev', nextEl: '.hero-next' }}
        loop={list.length > 1}
        speed={1000}
        onSlideChange={() => setKey(k => k + 1)}
        className="w-full h-full"
      >
        {list.map((slide, idx) => {
          const accent = slide.accentColor || '#D4A017'
          const accentRgb = accent === '#D4A017' ? '212,160,23' : '76,175,80'
          const heading = t(slide.headingBn, slide.headingEn)
          const subtitle = slide.subtitleBn ? t(slide.subtitleBn, slide.subtitleEn) : undefined
          const cta1 = slide.cta1Label ? t(slide.cta1Label, slide.cta1LabelEn) : undefined
          const cta2 = slide.cta2Label ? t(slide.cta2Label, slide.cta2LabelEn) : undefined

          return (
            <SwiperSlide key={idx}>
              <div className="relative w-full h-full flex items-center"
                style={{ background: slide.imageUrl ? 'transparent' : (slide.bgColor || '#1B4D3E') }}>

                {slide.imageUrl && (
                  <img src={slide.imageUrl} alt={heading}
                    className="absolute inset-0 w-full h-full object-cover" />
                )}
                {slide.imageUrl && (
                  <div className="absolute inset-0"
                    style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)' }} />
                )}

                <div className="absolute top-20 right-20 w-80 h-80 rounded-full opacity-10"
                  style={{ background: 'radial-gradient(circle, #fff 0%, transparent 70%)', filter: 'blur(40px)' }} />
                <div className="absolute inset-0 opacity-5"
                  style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                    backgroundSize: '60px 60px'
                  }} />

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24">
                  <div className="max-w-3xl">
                    <AnimatePresence mode="wait">
                      <motion.div key={key} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }} className="space-y-5">

                        {slide.tagEn && (
                          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase"
                            style={{ background: `rgba(${accentRgb},0.2)`, border: `1px solid ${accent}40`, color: accent, fontFamily: 'var(--font-inter)' }}>
                            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: accent }} />
                            <RichText html={slide.tagEn} inline />
                          </div>
                        )}

                        {lang === 'bn' && slide.tagBn && (
                          <RichText html={slide.tagBn} inline className="text-lg font-medium" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-hind)' }} />
                        )}

                        <h1 className="font-bold text-white leading-tight"
                          style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontFamily: 'var(--font-hind)' }}>
                          <RichText html={heading} inline />
                        </h1>

                        {subtitle && (
                          <RichText html={subtitle}
                            className="text-base sm:text-lg leading-relaxed max-w-2xl"
                            style={{ color: 'rgba(255,255,255,0.72)', fontFamily: 'var(--font-hind)' }}
                          />
                        )}

                        <div className="flex flex-wrap gap-4 pt-3">
                          {cta1 && slide.cta1Href && (
                            <Link href={slide.cta1Href}
                              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm hover:scale-105"
                              style={{ background: `linear-gradient(135deg, ${accent}, #F5C842)`, color: '#1B4D3E', fontFamily: 'var(--font-hind)' }}>
                              <RichText html={cta1} inline />
                              <ArrowRight className="w-4 h-4" />
                            </Link>
                          )}
                          {cta2 && slide.cta2Href && (
                            <Link href={slide.cta2Href}
                              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-white/20"
                              style={{ border: '1.5px solid rgba(255,255,255,0.4)', color: 'white', fontFamily: 'var(--font-hind)' }}>
                              <RichText html={cta2} inline />
                            </Link>
                          )}
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                <div className="absolute bottom-28 right-8 hidden md:block">
                  <div className="text-5xl font-bold" style={{ color: 'rgba(255,255,255,0.06)', fontFamily: 'var(--font-inter)' }}>
                    0{idx + 1}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>

      <div className="hero-pagination absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2" />
      <button className="hero-prev absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full hidden md:flex items-center justify-center"
        style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)' }}>
        <ChevronLeft className="w-5 h-5 text-white" />
      </button>
      <button className="hero-next absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full hidden md:flex items-center justify-center"
        style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)' }}>
        <ChevronRight className="w-5 h-5 text-white" />
      </button>
    </section>
  )
}
