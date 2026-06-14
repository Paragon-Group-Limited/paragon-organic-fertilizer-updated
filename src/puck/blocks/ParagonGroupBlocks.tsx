'use client'

import Link from 'next/link'
import { richTextField } from '@/puck/fields/richTextField'
import { RichText } from '@/components/puck/RichText'
import { useT } from '@/hooks/useT'

// ─── ParagonAboutBlock ────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ParagonAboutRender(props: any) {
  const t = useT()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const stats: { icon: string; value: string; label: string; dark: boolean }[] = props.stats || []

  return (
    <section className="py-20 lg:py-28" style={{ background: '#F8F5EE' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-5"
              style={{ background: 'rgba(27,77,62,0.08)', color: '#1B4D3E', fontFamily: 'var(--font-inter)' }}
            >
              <RichText html={t(props.tagText)} inline />
            </span>
            <h2
              className="text-3xl lg:text-4xl font-bold mb-6 leading-tight"
              style={{ color: '#1a2e1a', fontFamily: 'var(--font-hind)' }}
            >
              <RichText html={t(props.heading)} inline />{' '}
              <span style={{ color: '#D4A017' }}><RichText html={t(props.headingHighlight)} inline /></span>
            </h2>
            <RichText
              html={t(props.para1)}
              className="text-base leading-relaxed mb-5"
              style={{ color: '#4a5568', fontFamily: 'var(--font-hind)' }}
            />
            <RichText
              html={t(props.para2)}
              className="text-base leading-relaxed mb-5"
              style={{ color: '#4a5568', fontFamily: 'var(--font-hind)' }}
            />
            <RichText
              html={t(props.para3)}
              className="text-base leading-relaxed"
              style={{ color: '#4a5568', fontFamily: 'var(--font-hind)' }}
            />
          </div>

          <div className="grid grid-cols-2 gap-5">
            {stats.map((s, i) => (
              <div
                key={i}
                className="rounded-2xl p-6 text-center"
                style={{
                  background: s.dark ? 'linear-gradient(135deg, #1B4D3E, #2D7A3A)' : 'white',
                  border: !s.dark ? '1px solid rgba(27,77,62,0.1)' : 'none',
                }}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 text-xl ${s.dark ? 'bg-white/10' : 'bg-green-50'}`}
                >
                  {s.icon}
                </div>
                <div
                  className={`text-3xl font-bold mb-1 ${s.dark ? 'text-white' : 'text-[#1B4D3E]'}`}
                  style={{ fontFamily: 'var(--font-hind)' }}
                >
                  <RichText html={t(s.value)} inline />
                </div>
                <div
                  className={`text-xs ${s.dark ? 'text-white/70' : 'text-gray-500'}`}
                  style={{ fontFamily: 'var(--font-hind)' }}
                >
                  <RichText html={t(s.label)} inline />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── ParagonBusinessesBlock ───────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ParagonBusinessesRender(props: any) {
  const t = useT()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const businesses: { emoji: string; name: string; nameEn: string; desc: string; featured: boolean }[] = props.businesses || []

  return (
    <section className="py-20 lg:py-28" style={{ background: 'white' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ background: 'rgba(27,77,62,0.08)', color: '#1B4D3E', fontFamily: 'var(--font-inter)' }}
          >
            <RichText html={t(props.tagText)} inline />
          </span>
          <h2
            className="text-3xl lg:text-4xl font-bold"
            style={{ color: '#1a2e1a', fontFamily: 'var(--font-hind)' }}
          >
            <RichText html={t(props.heading)} inline />{' '}
            <span style={{ color: '#D4A017' }}><RichText html={t(props.headingHighlight)} inline /></span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {businesses.map((b, i) => (
            <div
              key={i}
              className="rounded-2xl p-7 border relative overflow-hidden"
              style={{
                background: b.featured ? 'linear-gradient(135deg, #1B4D3E, #0F2E24)' : '#F8F5EE',
                borderColor: b.featured ? 'transparent' : 'rgba(27,77,62,0.08)',
              }}
            >
              {b.featured && (
                <div
                  className="absolute top-4 right-4 px-2 py-0.5 rounded-full text-[10px] font-bold"
                  style={{ background: 'rgba(212,160,23,0.2)', color: '#F5C842', fontFamily: 'var(--font-inter)' }}
                >
                  This Product
                </div>
              )}
              <div className="text-4xl mb-4">{b.emoji}</div>
              <h4
                className="font-bold text-base mb-1"
                style={{ color: b.featured ? 'white' : '#1a2e1a', fontFamily: 'var(--font-hind)' }}
              >
                <RichText html={t(b.name)} inline />
              </h4>
              <p
                className="text-xs mb-3"
                style={{ color: b.featured ? 'rgba(255,255,255,0.5)' : '#9ca3af', fontFamily: 'var(--font-inter)' }}
              >
                <RichText html={t(b.nameEn)} inline />
              </p>
              <RichText
                html={t(b.desc)}
                className="text-sm leading-relaxed"
                style={{ color: b.featured ? 'rgba(255,255,255,0.75)' : '#6b7280', fontFamily: 'var(--font-hind)' }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── ParagonWhyOrganicBlock ───────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ParagonWhyOrganicRender(props: any) {
  const t = useT()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const reasons: { title: string; text: string }[] = props.reasons || []

  return (
    <div>
      <section className="py-20 lg:py-28" style={{ background: '#F8F5EE' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ background: 'rgba(27,77,62,0.08)', color: '#1B4D3E', fontFamily: 'var(--font-inter)' }}
            >
              <RichText html={t(props.tagText)} inline />
            </span>
            <h2
              className="text-3xl lg:text-4xl font-bold"
              style={{ color: '#1a2e1a', fontFamily: 'var(--font-hind)' }}
            >
              <RichText html={t(props.heading)} inline />{' '}
              <span style={{ color: '#D4A017' }}><RichText html={t(props.headingHighlight)} inline /></span>
            </h2>
          </div>

          <div
            className="bg-white rounded-3xl p-8 lg:p-10 border"
            style={{ borderColor: 'rgba(27,77,62,0.08)' }}
          >
            <div className="space-y-5">
              {reasons.map((item, i) => (
                <div
                  key={i}
                  className="flex gap-5 pb-5 border-b last:border-0 last:pb-0"
                  style={{ borderColor: 'rgba(27,77,62,0.06)' }}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold"
                    style={{ background: 'rgba(27,77,62,0.08)', color: '#1B4D3E', fontFamily: 'var(--font-inter)' }}
                  >
                    {i + 1}
                  </div>
                  <div>
                    <h4
                      className="font-bold text-base mb-2"
                      style={{ color: '#1B4D3E', fontFamily: 'var(--font-hind)' }}
                    >
                      <RichText html={t(item.title)} inline />
                    </h4>
                    <RichText
                      html={t(item.text)}
                      className="text-sm leading-relaxed"
                      style={{ color: '#6b7280', fontFamily: 'var(--font-hind)' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-20"
        style={{ background: 'linear-gradient(135deg, #0F2E24, #1B4D3E)' }}
      >
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2
            className="text-3xl lg:text-4xl font-bold text-white mb-4"
            style={{ fontFamily: 'var(--font-hind)' }}
          >
            <RichText html={t(props.ctaTitle)} inline />{' '}
            <span style={{ color: '#F5C842' }}><RichText html={t(props.ctaHighlight)} inline /></span>
          </h2>
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <Link
              href={props.ctaBtn1Href || '/location'}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold"
              style={{ background: 'linear-gradient(135deg, #D4A017, #F5C842)', color: '#1B4D3E', fontFamily: 'var(--font-hind)' }}
            >
              <RichText html={t(props.ctaBtn1Label)} inline />
            </Link>
            <Link
              href={props.ctaBtn2Href || '/contact'}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold border"
              style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'white', fontFamily: 'var(--font-hind)' }}
            >
              <RichText html={t(props.ctaBtn2Label)} inline />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

// ─── ParagonVisionBlock ───────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ParagonVisionRender(props: any) {
  const t = useT()
  const cards: { icon: string; title: string; bnText: string; enText: string }[] = props.cards || []

  return (
    <section className="py-20 lg:py-28" style={{ background: 'white' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section heading */}
        <div className="text-center mb-14">
          {props.tagText && (
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ background: 'rgba(27,77,62,0.08)', color: '#1B4D3E', fontFamily: 'var(--font-inter)' }}
            >
              <RichText html={t(props.tagText)} inline />
            </span>
          )}
          <h2
            className="text-2xl lg:text-3xl font-bold mb-5"
            style={{ color: '#1a2e1a', fontFamily: 'var(--font-hind)' }}
          >
            <RichText html={t(props.heading)} inline />
          </h2>
          {(props.bnSubtitle || props.enSubtitle) && (
            <div className="max-w-3xl mx-auto space-y-2">
              {props.bnSubtitle && (
                <RichText
                  html={t(props.bnSubtitle)}
                  className="text-base leading-relaxed"
                  style={{ color: '#4a5568', fontFamily: 'var(--font-hind)' }}
                />
              )}
              {props.enSubtitle && (
                <RichText
                  html={t(props.enSubtitle)}
                  className="text-sm italic leading-relaxed"
                  style={{ color: '#9ca3af', fontFamily: 'var(--font-inter)' }}
                />
              )}
            </div>
          )}
        </div>

        {/* Vision / People / Sustainability cards */}
        <div className="grid sm:grid-cols-3 gap-8">
          {cards.map((c, i) => (
            <div key={i} className="text-center">
              {/* Icon circle */}
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5 text-4xl"
                style={{ background: 'rgba(212,160,23,0.1)', border: '2px solid rgba(212,160,23,0.25)' }}
              >
                {c.icon}
              </div>
              <h3
                className="text-lg font-bold mb-3"
                style={{ color: '#D4A017', fontFamily: 'var(--font-inter)' }}
              >
                <RichText html={t(c.title)} inline />
              </h3>
              <RichText
                html={t(c.bnText)}
                className="text-sm leading-relaxed mb-2"
                style={{ color: '#374151', fontFamily: 'var(--font-hind)' }}
              />
              <RichText
                html={t(c.enText)}
                className="text-xs italic leading-relaxed"
                style={{ color: '#9ca3af', fontFamily: 'var(--font-inter)' }}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

// ─── Exports ──────────────────────────────────────────────────────────────────

export const paragonGroupBlocks = {
  ParagonAboutBlock: {
    label: '🏢 Paragon Group — About & Stats',
    fields: {
      tagText: richTextField('Tag Text'),
      heading: richTextField('Heading'),
      headingHighlight: richTextField('Heading Highlight (gold)'),
      para1: richTextField('Paragraph 1'),
      para2: richTextField('Paragraph 2'),
      para3: richTextField('Paragraph 3'),
      stats: {
        type: 'array' as const,
        label: 'Stats',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getItemSummary: (item: any) => item.value || 'Stat',
        arrayFields: {
          icon: { type: 'text' as const, label: 'Icon (emoji)' },
          value: richTextField('Value'),
          label: richTextField('Label'),
          dark: { type: 'radio' as const, label: 'Dark bg?', options: [{ label: 'Yes (dark green)', value: true }, { label: 'No (white)', value: false }] },
        },
        defaultItemProps: { icon: '🏢', value: '৩০+', label: 'বছরের অভিজ্ঞতা', dark: false },
      },
    },
    defaultProps: {
      tagText: 'About Paragon Group',
      heading: 'বাংলাদেশের',
      headingHighlight: 'একটি বিশ্বস্ত নাম',
      para1: 'প্যারাগন গ্রুপ বাংলাদেশের অন্যতম শীর্ষস্থানীয় শিল্প প্রতিষ্ঠান। তিন দশকেরও বেশি সময় ধরে পোলট্রি, খাদ্য প্রক্রিয়াজাতকরণ, কৃষি এবং লজিস্টিক্স খাতে সফলভাবে কাজ করে আসছে।',
      para2: 'দেশের কৃষিখাতে টেকসই পরিবর্তন আনার লক্ষ্যে প্যারাগন গ্রুপ জৈব সার উৎপাদনে বিনিয়োগ করে। আমাদের বিশ্বাস, সুস্থ মাটিই বাংলাদেশের খাদ্য নিরাপত্তার মূল ভিত্তি।',
      para3: 'প্যারাগন গ্রুপের পোলট্রি বিভাগ থেকে প্রাপ্ত জৈব উপজাত এবং আধুনিক জৈবপ্রযুক্তি ব্যবহার করে তৈরি হয় প্যারাগন জৈব সার।',
      stats: [
        { icon: '🏢', value: '৩০+', label: 'বছরের অভিজ্ঞতা', dark: true },
        { icon: '👥', value: '৫০০০+', label: 'কর্মসংস্থান', dark: false },
        { icon: '🌐', value: '১৫+', label: 'ব্যবসায়িক শাখা', dark: true },
        { icon: '🏆', value: '৬৪', label: 'জেলায় উপস্থিতি', dark: false },
      ],
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render: (props: any) => <ParagonAboutRender {...props} />,
  },

  ParagonBusinessesBlock: {
    label: '🏢 Paragon Group — Businesses Grid',
    fields: {
      tagText: richTextField('Tag Text'),
      heading: richTextField('Heading'),
      headingHighlight: richTextField('Heading Highlight (gold)'),
      businesses: {
        type: 'array' as const,
        label: 'Businesses',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getItemSummary: (item: any) => item.name || 'Business',
        arrayFields: {
          emoji: { type: 'text' as const, label: 'Emoji' },
          name: richTextField('Name (বাংলা)'),
          nameEn: richTextField('Name (English)'),
          desc: richTextField('Description'),
          featured: { type: 'radio' as const, label: 'Featured (dark bg)?', options: [{ label: 'Yes', value: true }, { label: 'No', value: false }] },
        },
        defaultItemProps: { emoji: '🏭', name: 'নতুন ব্যবসা', nameEn: 'New Business', desc: 'বিবরণ লিখুন...', featured: false },
      },
    },
    defaultProps: {
      tagText: 'Group Companies',
      heading: 'প্যারাগন গ্রুপের',
      headingHighlight: 'ব্যবসায়িক শাখা',
      businesses: [
        { emoji: '🐔', name: 'প্যারাগন পোলট্রি', nameEn: 'Paragon Poultry', desc: 'বাংলাদেশের অন্যতম বৃহত্তম পোলট্রি ফার্ম। মুরগি, হ্যাচারি ও ফিড উৎপাদনে শীর্ষস্থানীয়।', featured: false },
        { emoji: '🌾', name: 'প্যারাগন জৈব সার', nameEn: 'Paragon Organic Fertilizer', desc: 'টেকসই কৃষির জন্য উপকারী অণুজীব সমৃদ্ধ জৈব সার উৎপাদন ও বিপণন।', featured: true },
        { emoji: '🏭', name: 'প্যারাগন ফিড মিল', nameEn: 'Paragon Feed Mill', desc: 'উচ্চমানের পোলট্রি ও মৎস্য খাদ্য উৎপাদনে অগ্রণী ভূমিকা রাখছে।', featured: false },
        { emoji: '🥩', name: 'প্যারাগন ফুডস', nameEn: 'Paragon Foods', desc: 'প্রক্রিয়াজাত মাংস ও খাদ্যপণ্যের বাজারে নির্ভরযোগ্য ব্র্যান্ড।', featured: false },
        { emoji: '🚚', name: 'প্যারাগন লজিস্টিক্স', nameEn: 'Paragon Logistics', desc: 'সারাদেশে পণ্য পরিবহন ও সরবরাহ শৃঙ্খল পরিচালনায় দক্ষ।', featured: false },
        { emoji: '🌐', name: 'প্যারাগন এক্সপোর্ট', nameEn: 'Paragon Export', desc: 'আন্তর্জাতিক বাজারে বাংলাদেশি কৃষিপণ্য রপ্তানিতে সক্রিয় ভূমিকা।', featured: false },
      ],
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render: (props: any) => <ParagonBusinessesRender {...props} />,
  },

  ParagonVisionBlock: {
    label: '🏢 Paragon Group — Vision / People / Sustainability',
    fields: {
      tagText: richTextField('Tag Text (optional)'),
      heading: richTextField('Section Heading'),
      bnSubtitle: richTextField('Subtitle (বাংলা)'),
      enSubtitle: richTextField('Subtitle (English, italic)'),
      cards: {
        type: 'array' as const,
        label: 'Value Cards',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getItemSummary: (item: any) => item.title || 'Card',
        arrayFields: {
          icon: { type: 'text' as const, label: 'Icon (emoji)' },
          title: richTextField('Title (e.g. Vision)'),
          bnText: richTextField('Bengali Text'),
          enText: richTextField('English Text (italic)'),
        },
        defaultItemProps: { icon: '🎯', title: 'Vision', bnText: '', enText: '' },
      },
    },
    defaultProps: {
      tagText: 'Our Values',
      heading: 'Excellence Through Innovation &amp; Sustainability',
      bnSubtitle: 'ত্রিশ বছরেরও বেশি সময়ের অভিজ্ঞতায়, আমরা শ্রেষ্ঠত্ব, উদ্ভাবন এবং টেকসই চর্চার প্রতি আমাদের অঙ্গীকারের ভিত্তিতে গড়ে ওঠা এক বৈচিত্র্যপূর্ণ ব্যবসার ক্ষেত্র গড়ে তুলেছি।',
      enSubtitle: '" With over three decades of experience, we\'ve built a diverse portfolio of businesses united by our commitment to excellence, innovation, and sustainable practices. "',
      cards: [
        {
          icon: '🎯',
          title: 'Vision',
          bnText: 'বিভিন্ন শিল্পখাতে টেকসই ব্যবসায়িক চর্চার একটি অগ্রণী শক্তি হয়ে ওঠা।',
          enText: '" To be a leading force in sustainable business practices across multiple industries. "',
        },
        {
          icon: '👥',
          title: 'People',
          bnText: '১০,০০০-এর অধিক দক্ষ পেশাজীবীর কর্মের সক্ষমতা বৃদ্ধি করা।',
          enText: '" Empowering our workforce of over 10,000 skilled professionals. "',
        },
        {
          icon: '🌿',
          title: 'Sustainability',
          bnText: 'পরিবেশগত দায়িত্ববোধ ও সম্প্রদায়ের উন্নয়নে প্রতিশ্রুতিবদ্ধ থাকা।',
          enText: '" Committed to environmental stewardship and community development. "',
        },
      ],
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render: (props: any) => <ParagonVisionRender {...props} />,
  },

  ParagonWhyOrganicBlock: {
    label: '🏢 Paragon Group — Why Organic & CTA',
    fields: {
      tagText: richTextField('Tag Text'),
      heading: richTextField('Heading'),
      headingHighlight: richTextField('Heading Highlight (gold)'),
      reasons: {
        type: 'array' as const,
        label: 'Reasons',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getItemSummary: (item: any) => item.title || 'Reason',
        arrayFields: {
          title: richTextField('Title'),
          text: richTextField('Text'),
        },
        defaultItemProps: { title: 'কারণ', text: 'বিবরণ লিখুন...' },
      },
      ctaTitle: richTextField('CTA Heading'),
      ctaHighlight: richTextField('CTA Highlight (gold)'),
      ctaBtn1Label: richTextField('Button 1 Label'),
      ctaBtn1Href: { type: 'text' as const, label: 'Button 1 Href' },
      ctaBtn2Label: richTextField('Button 2 Label'),
      ctaBtn2Href: { type: 'text' as const, label: 'Button 2 Href' },
    },
    defaultProps: {
      tagText: 'Our Commitment',
      heading: 'কেন আমরা',
      headingHighlight: 'জৈব কৃষিতে বিনিয়োগ করলাম?',
      reasons: [
        { title: 'পোলট্রি শিল্পের দায়িত্ব', text: 'প্যারাগন গ্রুপের পোলট্রি বিভাগ থেকে প্রতিদিন বিপুল পরিমাণ জৈব উপজাত তৈরি হয়। এই উপজাতকে মাটির সুস্বাস্থ্যের জন্য ব্যবহার করাই আমাদের circular economy-র অংশ।' },
        { title: 'কৃষকের প্রয়োজনীয়তা', text: 'বাংলাদেশের কৃষকরা মাটির উর্বরতা হ্রাসের সমস্যায় ভুগছিলেন। তাদের একটি কার্যকর ও সাশ্রয়ী সমাধান দেওয়াই ছিল আমাদের লক্ষ্য।' },
        { title: 'পরিবেশগত দায়বদ্ধতা', text: 'রাসায়নিক সারের অতিরিক্ত ব্যবহার পরিবেশ দূষণ করছে। আমরা একটি পরিবেশবান্ধব বিকল্প তৈরি করতে চেয়েছিলাম যা একই সাথে কার্যকর এবং টেকসই।' },
        { title: 'জাতীয় খাদ্য নিরাপত্তা', text: 'বাংলাদেশের ক্রমবর্ধমান জনগোষ্ঠীর খাদ্য নিরাপত্তা নিশ্চিত করতে হলে মাটির উর্বরতা বজায় রাখা অপরিহার্য। এটি আমাদের জাতীয় দায়িত্ব।' },
      ],
      ctaTitle: 'প্যারাগন পরিবারের',
      ctaHighlight: 'অংশ হন',
      ctaBtn1Label: 'ডিলারশিপ সম্পর্কে জানুন',
      ctaBtn1Href: '/location',
      ctaBtn2Label: 'যোগাযোগ করুন',
      ctaBtn2Href: '/contact',
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render: (props: any) => <ParagonWhyOrganicRender {...props} />,
  },
}
