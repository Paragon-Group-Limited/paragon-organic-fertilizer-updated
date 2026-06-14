'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { richTextField } from '@/puck/fields/richTextField'
import { imageUploadField } from '@/puck/fields/imageUploadField'
import { RichText } from '@/components/puck/RichText'
import { useT } from '@/hooks/useT'

// ─── OurStoryFoundingBlock ────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function OurStoryFoundingRender(props: any) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const t = useT()

  return (
    <div ref={ref} style={{ background: '#F8F5EE' }}>
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-start">

            {/* Left — text */}
            <motion.div initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7 }}>
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-5"
                style={{ background: 'rgba(27,77,62,0.08)', color: '#1B4D3E', fontFamily: 'var(--font-inter)' }}>
                <RichText html={t(props.tagText)} inline />
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6 leading-tight"
                style={{ color: '#1a2e1a', fontFamily: 'var(--font-hind)' }}>
                <RichText html={t(props.heading)} inline />{' '}
                <span style={{ color: '#D4A017' }}><RichText html={t(props.headingHighlight)} inline /></span>
              </h2>
              <RichText html={t(props.para1)} className="text-base leading-relaxed mb-4" style={{ color: '#4a5568', fontFamily: 'var(--font-hind)' }} />
              <RichText html={t(props.para2)} className="text-base leading-relaxed mb-5" style={{ color: '#4a5568', fontFamily: 'var(--font-hind)' }} />

              {/* Benefits list */}
              {props.benefitsList && (
                <div className="rounded-2xl p-6 mb-2"
                  style={{ background: 'white', border: '1px solid rgba(27,77,62,0.08)' }}>
                  <RichText
                    html={t(props.benefitsList)}
                    className="text-sm leading-relaxed space-y-1"
                    style={{ color: '#374151', fontFamily: 'var(--font-hind)' }}
                  />
                </div>
              )}
            </motion.div>

            {/* Right — Mission & Vision cards */}
            <motion.div initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 }} className="grid grid-cols-1 gap-6 lg:pt-14">
              <div className="rounded-3xl p-8" style={{ background: 'linear-gradient(135deg, #1B4D3E, #0F2E24)' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-lg"
                  style={{ background: 'rgba(212,160,23,0.2)' }}>🎯</div>
                <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-hind)' }}>
                  <RichText html={t(props.missionTitle)} inline />
                </h3>
                <RichText html={t(props.missionText)} className="text-sm leading-relaxed"
                  style={{ color: 'rgba(255,255,255,0.8)', fontFamily: 'var(--font-hind)' }} />
              </div>
              <div className="rounded-3xl p-8 border" style={{ background: '#F8F5EE', borderColor: 'rgba(212,160,23,0.2)' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-lg"
                  style={{ background: 'rgba(212,160,23,0.12)' }}>👁️</div>
                <h3 className="text-xl font-bold mb-3" style={{ color: '#D4A017', fontFamily: 'var(--font-hind)' }}>
                  <RichText html={t(props.visionTitle)} inline />
                </h3>
                <RichText html={t(props.visionText)} className="text-sm leading-relaxed"
                  style={{ color: '#4a5568', fontFamily: 'var(--font-hind)' }} />
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  )
}

// ─── OurStoryTimelineBlock ─────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function OurStoryTimelineRender(props: any) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const t = useT()
  const items: { year: string; title: string; desc: string }[] = (props.items || [])

  return (
    <section ref={ref} className="py-20 lg:py-28" style={{ background: 'white' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ background: 'rgba(27,77,62,0.08)', color: '#1B4D3E', fontFamily: 'var(--font-inter)' }}>
            <RichText html={t(props.tagText)} inline />
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold" style={{ color: '#1a2e1a', fontFamily: 'var(--font-hind)' }}>
            <RichText html={t(props.heading)} inline />{' '}
            <span style={{ color: '#D4A017' }}><RichText html={t(props.headingHighlight)} inline /></span>
          </h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px hidden md:block"
            style={{ background: 'linear-gradient(to bottom, #1B4D3E, rgba(27,77,62,0.1))' }} />
          <div className="space-y-10">
            {items.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                className={`flex flex-col md:flex-row items-center gap-6 ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                <div className={`flex-1 ${i % 2 === 1 ? 'md:text-right' : ''}`}>
                  <div className="bg-white rounded-2xl p-7 shadow-sm border" style={{ borderColor: 'rgba(27,77,62,0.08)' }}>
                    <span className="text-2xl font-bold block mb-2"
                      style={{ color: i % 2 === 0 ? '#1B4D3E' : '#D4A017', fontFamily: 'var(--font-inter)' }}>
                      <RichText html={t(item.year)} inline />
                    </span>
                    <h4 className="text-lg font-bold mb-2" style={{ color: '#1a2e1a', fontFamily: 'var(--font-hind)' }}>
                      <RichText html={t(item.title)} inline />
                    </h4>
                    <RichText html={t(item.desc)} className="text-sm leading-relaxed"
                      style={{ color: '#6b7280', fontFamily: 'var(--font-hind)' }} />
                  </div>
                </div>
                <div className="hidden md:flex w-5 h-5 rounded-full flex-shrink-0 z-10 border-4 border-white shadow-md"
                  style={{ background: i % 2 === 0 ? '#1B4D3E' : '#D4A017' }} />
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── OurStorySuccessStoriesBlock ──────────────────────────────────────────────

type StorySlot = {
  imageUrl: string
  cropEmoji: string
  cropName: string
  location: string
  farmerName: string
  heading: string
  body: string
  tagline: string
  bgGradient: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function StoryCard({ story, index, inView }: { story: StorySlot; index: number; inView: boolean }) {
  const t = useT()
  return (
    <motion.div initial={{ opacity: 0, y: 50 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.18, duration: 0.7 }}>
      <div className="rounded-3xl overflow-hidden h-full flex flex-col"
        style={{ background: 'white', border: '1px solid rgba(27,77,62,0.08)', boxShadow: '0 8px 32px rgba(27,77,62,0.08)' }}>

        {/* Image — natural ratio, no cropping */}
        <div className="relative w-full"
          style={{ background: story.bgGradient || 'linear-gradient(135deg, #1B4D3E 0%, #2D7A3A 100%)' }}>
          {story.imageUrl ? (
            <img src={story.imageUrl} alt={story.heading}
              className="w-full h-auto block" style={{ display: 'block' }} />
          ) : (
            <>
              {/* height spacer for emoji placeholder (4:3 ratio) */}
              <div style={{ paddingTop: '75%' }} />
              <div className="absolute inset-0 opacity-10"
                style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <span style={{ fontSize: '80px', filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.3))' }}>{story.cropEmoji}</span>
              </div>
            </>
          )}
          {/* Bottom gradient overlay */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.1) 40%, transparent 70%)' }} />
          {/* Badges */}
          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-6 pb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
              style={{ background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)', color: 'white', border: '1px solid rgba(255,255,255,0.3)' }}>
              {story.cropEmoji} <RichText html={t(story.cropName)} inline />
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-medium"
              style={{ color: 'rgba(255,255,255,0.9)' }}>
              📍 <RichText html={t(story.location)} inline />
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-7 flex flex-col flex-1">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, rgba(27,77,62,0.12), rgba(45,122,58,0.15))' }}>
              👨‍🌾
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest mb-0.5"
                style={{ color: '#1B4D3E', fontFamily: 'var(--font-inter)' }}>
                {t('কৃষক', 'Farmer')}
              </div>
              <div className="text-base font-bold" style={{ color: '#1a2e1a', fontFamily: 'var(--font-hind)' }}>
                <RichText html={t(story.farmerName)} inline />
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-bold mb-4" style={{ color: '#1B4D3E', fontFamily: 'var(--font-hind)' }}>
            <RichText html={t(story.heading)} inline />
          </h3>

          <RichText html={t(story.body)} className="text-base leading-relaxed flex-1 mb-5"
            style={{ color: '#4a5568', fontFamily: 'var(--font-hind)' }} />

          {story.tagline && (
            <div className="rounded-xl px-5 py-4 mt-auto"
              style={{ background: 'linear-gradient(135deg, rgba(27,77,62,0.06), rgba(45,122,58,0.08))', borderLeft: '3px solid #1B4D3E' }}>
              <p className="text-base font-semibold italic" style={{ color: '#1B4D3E', fontFamily: 'var(--font-hind)' }}>
                ❝ <RichText html={t(story.tagline)} inline /> ❞
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function OurStorySuccessStoriesRender(props: any) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const t = useT()

  const stories: StorySlot[] = [
    {
      imageUrl: props.story1ImageUrl || '',
      cropEmoji: props.story1CropEmoji || '🌱',
      cropName: props.story1CropName || '',
      location: props.story1Location || '',
      farmerName: props.story1FarmerName || '',
      heading: props.story1Heading || '',
      body: props.story1Body || '',
      tagline: props.story1Tagline || '',
      bgGradient: props.story1BgGradient || 'linear-gradient(135deg, #1B4D3E 0%, #2D7A3A 100%)',
    },
    {
      imageUrl: props.story2ImageUrl || '',
      cropEmoji: props.story2CropEmoji || '🌾',
      cropName: props.story2CropName || '',
      location: props.story2Location || '',
      farmerName: props.story2FarmerName || '',
      heading: props.story2Heading || '',
      body: props.story2Body || '',
      tagline: props.story2Tagline || '',
      bgGradient: props.story2BgGradient || 'linear-gradient(135deg, #D4A017 0%, #B8860B 100%)',
    },
  ].filter(s => s.heading)

  return (
    <section ref={ref} className="py-20 lg:py-28" style={{ background: 'white' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ background: 'rgba(27,77,62,0.08)', color: '#1B4D3E', fontFamily: 'var(--font-inter)' }}>
            <RichText html={t(props.tagText)} inline />
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold" style={{ color: '#1a2e1a', fontFamily: 'var(--font-hind)' }}>
            <RichText html={t(props.heading)} inline />{' '}
            <span style={{ color: '#D4A017' }}><RichText html={t(props.headingHighlight)} inline /></span>
          </h2>
          {props.subheading && (
            <RichText html={t(props.subheading)} className="mt-4 text-base max-w-2xl mx-auto"
              style={{ color: '#6b7280', fontFamily: 'var(--font-hind)' }} />
          )}
        </motion.div>

        {/* Story cards */}
        <div className="grid lg:grid-cols-2 gap-8">
          {stories.map((story, i) => (
            <StoryCard key={i} story={story} index={i} inView={inView} />
          ))}
        </div>

        {/* Video Links */}
        {props.videoLinks && props.videoLinks.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }} className="mt-14">
            <div className="rounded-2xl p-8" style={{ background: '#F8F5EE', border: '1px solid rgba(27,77,62,0.1)' }}>
              <h3 className="text-lg font-bold mb-5" style={{ color: '#1B4D3E', fontFamily: 'var(--font-hind)' }}>
                <RichText html={t(props.videoSectionTitle || 'ভিডিও লিংক:')} inline />
              </h3>
              <div className="flex flex-wrap gap-4">
                {(props.videoLinks as { label: string; url: string }[]).map((link, i) => (
                  <a key={i} href={link.url} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all hover:scale-105"
                    style={{ background: 'linear-gradient(135deg, #1B4D3E, #2D7A3A)', color: 'white', fontFamily: 'var(--font-hind)', textDecoration: 'none' }}>
                    ▶ {t(link.label)}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}

      </div>
    </section>
  )
}

// ─── OurStoryValuesBlock ──────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function OurStoryValuesRender(props: any) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const t = useT()
  const values: { icon: string; title: string; desc: string }[] = (props.values || [])

  return (
    <div ref={ref}>
      {/* Values */}
      <section className="py-20 lg:py-28" style={{ background: '#F8F5EE' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }} className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ background: 'rgba(27,77,62,0.08)', color: '#1B4D3E', fontFamily: 'var(--font-inter)' }}>
              <RichText html={t(props.tagText)} inline />
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold" style={{ color: '#1a2e1a', fontFamily: 'var(--font-hind)' }}>
              <RichText html={t(props.heading)} inline />{' '}
              <span style={{ color: '#D4A017' }}><RichText html={t(props.headingHighlight)} inline /></span>
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.6 }}>
                <div className="rounded-2xl p-7 text-center border h-full"
                  style={{ background: 'white', borderColor: 'rgba(27,77,62,0.06)', boxShadow: '0 2px 12px rgba(27,77,62,0.04)' }}>
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 text-2xl"
                    style={{ background: 'linear-gradient(135deg, #1B4D3E, #2D7A3A)' }}>
                    {v.icon}
                  </div>
                  <h4 className="text-lg font-bold mb-3" style={{ color: '#1B4D3E', fontFamily: 'var(--font-hind)' }}>
                    <RichText html={t(v.title)} inline />
                  </h4>
                  <RichText html={t(v.desc)} className="text-sm leading-relaxed"
                    style={{ color: '#6b7280', fontFamily: 'var(--font-hind)' }} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ background: 'linear-gradient(135deg, #0F2E24, #1B4D3E, #2D7A3A)' }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-8" style={{ fontFamily: 'var(--font-hind)' }}>
            <RichText html={t(props.ctaTitle)} inline />{' '}
            <span style={{ color: '#F5C842' }}><RichText html={t(props.ctaHighlight)} inline /></span>
          </h2>
          <RichText html={t(props.ctaText)} className="mb-8 text-lg"
            style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-hind)' }} />
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href={props.ctaBtn1Href || '/contact'}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold"
              style={{ background: 'linear-gradient(135deg, #D4A017, #F5C842)', color: '#1B4D3E', fontFamily: 'var(--font-hind)' }}>
              <RichText html={t(props.ctaBtn1Label)} inline />
            </Link>
            <Link href={props.ctaBtn2Href || '/about/soil-benefit'}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold border"
              style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'white', fontFamily: 'var(--font-hind)' }}>
              <RichText html={t(props.ctaBtn2Label)} inline />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

// ─── Exports ──────────────────────────────────────────────────────────────────

export const ourStoryBlocks = {
  OurStoryFoundingBlock: {
    label: '📖 Our Story — Founding & Mission/Vision',
    fields: {
      tagText: richTextField('Tag Text'),
      heading: richTextField('Heading'),
      headingHighlight: richTextField('Heading Highlight (gold)'),
      para1: richTextField('Paragraph 1'),
      para2: richTextField('Paragraph 2'),
      benefitsList: richTextField('Benefits List (HTML <ul> list)'),
      missionTitle: richTextField('Mission Card Title'),
      missionText: richTextField('Mission Card Text'),
      visionTitle: richTextField('Vision Card Title'),
      visionText: richTextField('Vision Card Text'),
    },
    defaultProps: {
      tagText: 'আমাদের শুরু',
      heading: 'প্রবৃদ্ধির সাথে আসে',
      headingHighlight: 'দায়িত্ব',
      para1: '২০২০ সালে, প্যারাগন তার প্রথম জৈব সার প্রকল্প চালু করে। এই উদ্যোগে সমস্ত জৈব বর্জ্য ব্যবহার করে, প্যারাগন পরিবেশগত প্রভাব কমাতে এবং পরিবেশবান্ধব প্রচেষ্টাকে এগিয়ে নিতে আরও একটি গুরুত্বপূর্ণ পদক্ষেপ নিয়েছিল।',
      para2: 'প্রযুক্তিগত সহায়তায়, প্যারাগন একটি জৈব সার তৈরি করেছে যা:',
      benefitsList: '<ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:8px"><li style="display:flex;align-items:flex-start;gap:8px"><span style="color:#1B4D3E;font-weight:700;flex-shrink:0">✓</span> মাটির গঠন উন্নত করে</li><li style="display:flex;align-items:flex-start;gap:8px"><span style="color:#1B4D3E;font-weight:700;flex-shrink:0">✓</span> মাটিতে পানি ধারণ ক্ষমতা বৃদ্ধি করে</li><li style="display:flex;align-items:flex-start;gap:8px"><span style="color:#1B4D3E;font-weight:700;flex-shrink:0">✓</span> উপকারী ব্যাকটেরিয়া ও ছত্রাকের কার্যক্রম বাড়ায়</li><li style="display:flex;align-items:flex-start;gap:8px"><span style="color:#1B4D3E;font-weight:700;flex-shrink:0">✓</span> পুষ্টির কার্যকারিতা উন্নত করে</li><li style="display:flex;align-items:flex-start;gap:8px"><span style="color:#1B4D3E;font-weight:700;flex-shrink:0">✓</span> উদ্ভিদের প্রয়োজন অনুযায়ী ধীরে ধীরে পুষ্টি সরবরাহ করে</li><li style="display:flex;align-items:flex-start;gap:8px"><span style="color:#1B4D3E;font-weight:700;flex-shrink:0">✓</span> ফসলের পানি ব্যবহারের দক্ষতা বাড়ায়</li><li style="display:flex;align-items:flex-start;gap:8px"><span style="color:#1B4D3E;font-weight:700;flex-shrink:0">✓</span> পুষ্টি লিচিং কমিয়ে পরিবেশ ও বাস্তুতন্ত্র রক্ষা করে</li><li style="display:flex;align-items:flex-start;gap:8px"><span style="color:#1B4D3E;font-weight:700;flex-shrink:0">✓</span> ভবিষ্যতের ফসলের জন্য মাটিকে আরও উর্বর করে</li></ul>',
      missionTitle: 'আমাদের মিশন',
      missionText: 'মাটির স্বাস্থ্য রক্ষা করা ও কৃষকের জীবনমান উন্নয়ন — বাংলাদেশের কৃষিজমির উর্বরতা পুনরুদ্ধার করা এবং রাসায়নিক সারের উপর নির্ভরশীলতা ক্রমশ কমিয়ে আনা।',
      visionTitle: 'আমাদের ভিশন',
      visionText: 'রাসায়নিকমুক্ত বাংলাদেশ গড়া — ২০৩০ সালের মধ্যে বাংলাদেশের প্রতিটি জেলায় কৃষকদের কাছে জৈব কৃষির সুবিধা পৌঁছে দেওয়া।',
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render: (props: any) => <OurStoryFoundingRender {...props} />,
  },

  OurStoryTimelineBlock: {
    label: '📖 Our Story — Timeline',
    fields: {
      tagText: richTextField('Tag Text'),
      heading: richTextField('Heading'),
      headingHighlight: richTextField('Heading Highlight (gold)'),
      items: {
        type: 'array' as const,
        label: 'Timeline Items',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getItemSummary: (item: any) => item.year || 'Item',
        arrayFields: {
          year: richTextField('Year'),
          title: richTextField('Title'),
          desc: richTextField('Description'),
        },
        defaultItemProps: { year: '২০২৪', title: 'নতুন মাইলফলক', desc: 'বিবরণ লিখুন...' },
      },
    },
    defaultProps: {
      tagText: 'আমাদের যাত্রা',
      heading: 'একটি',
      headingHighlight: 'গৌরবময় পথচলা',
      items: [
        { year: '২০১০', title: 'প্যারাগন গ্রুপের দৃষ্টিভঙ্গি', desc: 'বাংলাদেশের শীর্ষস্থানীয় শিল্প প্রতিষ্ঠান প্যারাগন গ্রুপ কৃষিখাতে টেকসই সমাধান নিয়ে আসার সিদ্ধান্ত নেয়।' },
        { year: '২০২০', title: 'প্রথম জৈব সার প্রকল্প', desc: 'প্যারাগন তার প্রথম জৈব সার প্রকল্প চালু করে। সমস্ত জৈব বর্জ্য ব্যবহার করে পরিবেশবান্ধব উদ্যোগের এক নতুন অধ্যায় শুরু হয়।' },
        { year: '২০২১', title: 'কৃষকদের মাঝে বিস্তার', desc: 'পণ্যের গুণমান ও কার্যকারিতা দ্রুত কৃষকদের মধ্যে ছড়িয়ে পড়ে। বগুড়া, শেরপুরসহ বিভিন্ন অঞ্চলে সফলতার গল্প রচিত হয়।' },
        { year: '২০২২', title: 'ডিলার নেটওয়ার্ক গঠন', desc: 'সারাদেশে ডিলার নেটওয়ার্ক প্রসারিত হয় এবং কৃষকদের দোরগোড়ায় পণ্য পৌঁছে দেওয়ার ব্যবস্থা নিশ্চিত করা হয়।' },
        { year: '২০২৩', title: 'নতুন গবেষণা ও উন্নয়ন', desc: 'অত্যাধুনিক গবেষণার মাধ্যমে পণ্যের মান আরও উন্নত করা হয় এবং নতুন ফর্মুলেশন বাজারে আনা হয়।' },
      ],
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render: (props: any) => <OurStoryTimelineRender {...props} />,
  },

  OurStorySuccessStoriesBlock: {
    label: '📖 Our Story — Success Stories (Farmer Cards)',
    fields: {
      tagText: richTextField('Tag Text'),
      heading: richTextField('Heading'),
      headingHighlight: richTextField('Heading Highlight (gold)'),
      subheading: richTextField('Subheading (optional)'),

      // ── Story 1 ──────────────────────────────────────────────────────
      story1ImageUrl: imageUploadField('Story 1 — কৃষকের ছবি (Farmer Photo)'),
      story1CropEmoji: { type: 'text' as const, label: 'Story 1 — Crop Emoji' },
      story1CropName: richTextField('Story 1 — Crop Name'),
      story1Location: richTextField('Story 1 — Location'),
      story1FarmerName: richTextField('Story 1 — Farmer Name(s)'),
      story1Heading: richTextField('Story 1 — Heading'),
      story1Body: richTextField('Story 1 — Body Text'),
      story1Tagline: richTextField('Story 1 — Tagline / Quote'),
      story1BgGradient: { type: 'text' as const, label: 'Story 1 — BG Gradient (CSS)' },

      // ── Story 2 ──────────────────────────────────────────────────────
      story2ImageUrl: imageUploadField('Story 2 — কৃষকের ছবি (Farmer Photo)'),
      story2CropEmoji: { type: 'text' as const, label: 'Story 2 — Crop Emoji' },
      story2CropName: richTextField('Story 2 — Crop Name'),
      story2Location: richTextField('Story 2 — Location'),
      story2FarmerName: richTextField('Story 2 — Farmer Name(s)'),
      story2Heading: richTextField('Story 2 — Heading'),
      story2Body: richTextField('Story 2 — Body Text'),
      story2Tagline: richTextField('Story 2 — Tagline / Quote'),
      story2BgGradient: { type: 'text' as const, label: 'Story 2 — BG Gradient (CSS)' },

      // ── Video Links ───────────────────────────────────────────────────
      videoSectionTitle: richTextField('Video Section Title'),
      videoLinks: {
        type: 'array' as const,
        label: 'Video Links',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getItemSummary: (item: any) => item.label || 'Link',
        arrayFields: {
          label: { type: 'text' as const, label: 'Link Label' },
          url: { type: 'text' as const, label: 'Video URL' },
        },
        defaultItemProps: { label: 'Video', url: '' },
      },
    },
    defaultProps: {
      tagText: 'কৃষকের সাফল্য',
      heading: 'সফলতার',
      headingHighlight: 'গল্প',
      subheading: 'প্যারাগন জৈব সার ব্যবহার করে বাংলাদেশের কৃষকরা যেভাবে তাদের জীবন বদলে নিচ্ছেন।',

      story1ImageUrl: '',
      story1CropEmoji: '🥔',
      story1CropName: 'মুখি কচু',
      story1Location: 'শেরপুর, বগুড়া',
      story1FarmerName: 'রফিকুল ইসলাম',
      story1Heading: 'বগুড়ার শেরপুরে মুখি কচু: রফিকুল ইসলাম ভাইয়ের অভাবনীয় সাফল্য!',
      story1Body: 'বগুড়ার শেরপুরের সফল চাষি রফিকুল ইসলাম ভাই মুখি কচুর জমিতে প্যারাগন জৈব সার ব্যবহার করে পেয়েছেন ভালো ফলন ও বেশি লাভ। আগে কচু চাষে খরচ বেশি হতো এবং ফলন নিয়ে চিন্তা থাকত। কিন্তু প্যারাগন জৈব সার ব্যবহারের পর তার জমির মাটি হয়েছে আরও উর্বর, গাছ হয়েছে সতেজ ও সবল, আর কচুর আকার ও মান হয়েছে উন্নত। রাসায়নিক সারের ওপর নির্ভরতা কমে যাওয়ায় উৎপাদন খরচও কমেছে।',
      story1Tagline: 'প্যারাগন জৈব সার—মাটির শক্তি বাড়ায়, ফসলের ফলন উন্নত করে।',
      story1BgGradient: 'linear-gradient(135deg, #2D6A2A 0%, #1B4D3E 100%)',

      story2ImageUrl: '',
      story2CropEmoji: '🌾',
      story2CropName: 'ধান',
      story2Location: 'শেরপুর, বগুড়া',
      story2FarmerName: 'সাইফুল ইসলাম ও তুষার সরকার',
      story2Heading: 'ধানের বাম্পার ফলন: বগুড়ার শেরপুরের সাইফুল ইসলাম ও তুষার সরকারের অবিশ্বাস্য সাফল্য!',
      story2Body: 'বগুড়ার শেরপুরের কৃষক সাইফুল ইসলাম ও তুষার সরকার ধানের জমিতে প্যারাগন জৈব সার ব্যবহার করে পেয়েছেন আশানুরূপ বাম্পার ফলন। আগে ধান চাষে শুধু রাসায়নিক সারের ওপর নির্ভর করতে হতো, কিন্তু এবার প্যারাগন জৈব সার ব্যবহারের পর জমির মাটি হয়েছে আরও উর্বর এবং ধান গাছ হয়েছে সতেজ ও মজবুত।',
      story2Tagline: 'প্যারাগন জৈব সার—মাটির শক্তি বাড়ায়, ধানের ফলন উন্নত করে।',
      story2BgGradient: 'linear-gradient(135deg, #D4A017 0%, #B8860B 100%)',

      videoSectionTitle: 'Video Links:',
      videoLinks: [],
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render: (props: any) => <OurStorySuccessStoriesRender {...props} />,
  },

  OurStoryValuesBlock: {
    label: '📖 Our Story — Values & CTA',
    fields: {
      tagText: richTextField('Tag Text'),
      heading: richTextField('Heading'),
      headingHighlight: richTextField('Heading Highlight (gold)'),
      values: {
        type: 'array' as const,
        label: 'Values',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getItemSummary: (item: any) => item.title || 'Value',
        arrayFields: {
          icon: { type: 'text' as const, label: 'Icon (emoji)' },
          title: richTextField('Title'),
          desc: richTextField('Description'),
        },
        defaultItemProps: { icon: '🌿', title: 'নতুন মূল্যবোধ', desc: 'বিবরণ লিখুন...' },
      },
      ctaTitle: richTextField('CTA Heading'),
      ctaHighlight: richTextField('CTA Highlight (gold)'),
      ctaText: richTextField('CTA Body Text'),
      ctaBtn1Label: richTextField('Button 1 Label'),
      ctaBtn1Href: { type: 'text' as const, label: 'Button 1 Href' },
      ctaBtn2Label: richTextField('Button 2 Label'),
      ctaBtn2Href: { type: 'text' as const, label: 'Button 2 Href' },
    },
    defaultProps: {
      tagText: 'আমাদের মূল্যবোধ',
      heading: 'আমাদের',
      headingHighlight: 'মূল্যবোধ',
      values: [
        { icon: '🌿', title: 'পরিবেশবান্ধবতা', desc: 'প্রতিটি পদক্ষেপে পরিবেশ ও মাটির স্বাস্থ্য রক্ষাকে সর্বোচ্চ অগ্রাধিকার দেওয়া হয়।' },
        { icon: '🎯', title: 'মানের প্রতি অঙ্গীকার', desc: 'সর্বোচ্চ মানের কাঁচামাল ও বৈজ্ঞানিক প্রক্রিয়ায় প্রতিটি পণ্য তৈরি করা হয়।' },
        { icon: '❤️', title: 'কৃষকের প্রতি দায়বদ্ধতা', desc: 'আমাদের প্রতিটি সিদ্ধান্তের কেন্দ্রে থাকেন বাংলাদেশের কৃষক ও তার পরিবার।' },
        { icon: '👁️', title: 'স্বচ্ছতা', desc: 'পণ্যের উপাদান, প্রক্রিয়া ও মূল্য নির্ধারণে সম্পূর্ণ স্বচ্ছতা বজায় রাখা হয়।' },
      ],
      ctaTitle: 'আজই',
      ctaHighlight: 'যোগাযোগ করুন',
      ctaText: 'আমাদের সাথে যোগাযোগ করুন এবং জৈব কৃষির যাত্রায় যোগ দিন।',
      ctaBtn1Label: 'যোগাযোগ করুন',
      ctaBtn1Href: '/contact',
      ctaBtn2Label: 'মাটির উপকার জানুন',
      ctaBtn2Href: '/about/soil-benefit',
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render: (props: any) => <OurStoryValuesRender {...props} />,
  },
}
