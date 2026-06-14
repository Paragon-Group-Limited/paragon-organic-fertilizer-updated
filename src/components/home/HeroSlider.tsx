'use client'

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

type Slide = {
  id: number
  tagBn?: string
  tagEn?: string
  headingBn: string
  subtitleBn?: string
  cta1Label?: string
  cta1Href?: string
  cta2Label?: string
  cta2Href?: string
  bgColor?: string
  accentColor?: string
  image?: { url?: string; alt?: string } | null
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.7, ease: 'easeOut' as const },
})

export default function HeroSlider({ slides }: { slides: Slide[] }) {
  const [key, setKey] = useState(0)

  return (
    <section className="relative w-full" style={{ height: '100svh', minHeight: 600 }}>
      <Swiper
        modules={[Autoplay, EffectFade, Pagination, Navigation]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{ el: '.hero-pagination', clickable: true }}
        navigation={{ prevEl: '.hero-prev', nextEl: '.hero-next' }}
        loop
        speed={1000}
        onSlideChange={() => setKey(k => k + 1)}
        className="w-full h-full"
      >
        {slides.map((slide) => {
          const accent = slide.accentColor || '#D4A017'
          const accentRgb = accent === '#D4A017' ? '212,160,23' : '76,175,80'
          return (
            <SwiperSlide key={slide.id}>
              <div className="relative w-full h-full flex items-center" style={{ background: slide.image?.url ? 'transparent' : (slide.bgColor || '#1B4D3E') }}>
                {/* Background image */}
                {slide.image?.url && (
                  <img
                    src={slide.image.url}
                    alt={slide.image.alt || slide.headingBn}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
                {/* Dark overlay when image is set */}
                {slide.image?.url && (
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)' }} />
                )}
                {/* Decorative circles */}
                <div className="absolute top-20 right-20 w-80 h-80 rounded-full opacity-10"
                  style={{ background: 'radial-gradient(circle, #fff 0%, transparent 70%)', filter: 'blur(40px)' }} />
                <div className="absolute bottom-20 left-10 w-60 h-60 rounded-full opacity-8"
                  style={{ background: 'radial-gradient(circle, #D4A017 0%, transparent 70%)', filter: 'blur(50px)' }} />

                {/* Grid pattern */}
                <div className="absolute inset-0 opacity-5"
                  style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                    backgroundSize: '60px 60px'
                  }} />

                {/* Content */}
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24">
                  <div className="max-w-3xl">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={key}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="space-y-5">

                        {/* Tag */}
                        {slide.tagEn && (
                          <motion.div {...fadeUp(0)}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase"
                            style={{ background: `rgba(${accentRgb},0.2)`, border: `1px solid ${accent}40`, color: accent, fontFamily: 'var(--font-inter)' }}>
                            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: accent }} />
                            {slide.tagEn}
                          </motion.div>
                        )}

                        {/* Bengali tagline */}
                        {slide.tagBn && (
                          <motion.p {...fadeUp(0.15)} className="text-lg font-medium"
                            style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-hind)' }}>
                            {slide.tagBn}
                          </motion.p>
                        )}

                        {/* Main heading */}
                        <motion.h1 {...fadeUp(0.3)} className="font-bold text-white leading-tight"
                          style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontFamily: 'var(--font-hind)' }}>
                          {slide.headingBn}
                        </motion.h1>

                        {/* Subtitle */}
                        {slide.subtitleBn && (
                          <motion.p {...fadeUp(0.45)} className="text-base sm:text-lg leading-relaxed max-w-2xl"
                            style={{ color: 'rgba(255,255,255,0.72)', fontFamily: 'var(--font-hind)' }}>
                            {slide.subtitleBn}
                          </motion.p>
                        )}

                        {/* CTAs */}
                        <motion.div {...fadeUp(0.6)} className="flex flex-wrap gap-4 pt-3">
                          {slide.cta1Label && slide.cta1Href && (
                            <Link href={slide.cta1Href}
                              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
                              style={{ background: `linear-gradient(135deg, ${accent}, #F5C842)`, color: '#1B4D3E', fontFamily: 'var(--font-hind)' }}>
                              {slide.cta1Label}
                              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                          )}
                          {slide.cta2Label && slide.cta2Href && (
                            <Link href={slide.cta2Href}
                              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 hover:bg-white/20"
                              style={{ border: '1.5px solid rgba(255,255,255,0.4)', color: 'white', fontFamily: 'var(--font-hind)' }}>
                              {slide.cta2Label}
                            </Link>
                          )}
                        </motion.div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                {/* Slide number */}
                <div className="absolute bottom-28 right-8 text-right hidden md:block">
                  <div className="text-5xl font-bold" style={{ color: 'rgba(255,255,255,0.06)', fontFamily: 'var(--font-inter)' }}>
                    0{slide.id}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>

      {/* Custom Pagination */}
      <div className="hero-pagination absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2" />

      {/* Custom Navigation */}
      <button className="hero-prev absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full hidden md:flex items-center justify-center transition-all duration-200 hover:scale-110"
        style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)' }}>
        <ChevronLeft className="w-5 h-5 text-white" />
      </button>
      <button className="hero-next absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full hidden md:flex items-center justify-center transition-all duration-200 hover:scale-110"
        style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)' }}>
        <ChevronRight className="w-5 h-5 text-white" />
      </button>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-1">
        <div className="w-px h-10 rounded-full" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.6), transparent)' }} />
      </motion.div>
    </section>
  )
}
