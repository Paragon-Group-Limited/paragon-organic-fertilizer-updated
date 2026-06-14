'use client'

import Link from 'next/link'
import { richTextField } from '@/puck/fields/richTextField'
import { imageUploadField } from '@/puck/fields/imageUploadField'
import { RichText } from '@/components/puck/RichText'
import { useT } from '@/hooks/useT'

// ─── Field helpers ────────────────────────────────────────────────────────────

function textareaField(label: string, rows = 3) {
  return {
    type: 'custom' as const,
    label,
    render: ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: '#374151', fontFamily: 'sans-serif' }}>{label}</div>
        <textarea
          value={value || ''}
          onChange={e => onChange(e.target.value)}
          rows={rows}
          style={{
            width: '100%', padding: '7px 9px', border: '1px solid #d1d5db',
            borderRadius: 5, fontSize: 13, resize: 'vertical',
            fontFamily: 'var(--font-hind, sans-serif)', lineHeight: 1.6,
            boxSizing: 'border-box',
          }}
        />
      </div>
    ),
  }
}

function labeledImageUploadField(label: string) {
  const base = imageUploadField(label)
  return {
    ...base,
    render: (opts: { value: string; onChange: (v: string) => void }) => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: '#374151', fontFamily: 'sans-serif' }}>{label}</div>
        {base.render(opts)}
      </div>
    ),
  }
}

// ─── WhyProductContentBlock ───────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function WhyProductContentRender(props: any) {
  const t = useT()
  const bullets: { bold: string; text: string }[] = props.bullets || []

  return (
    <section className="py-20 lg:py-28" style={{ background: 'white' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Intro subheading */}
        {props.subheading && (
          <h2
            className="text-xl lg:text-2xl font-bold mb-6"
            style={{ color: '#1B4D3E', fontFamily: 'var(--font-hind)' }}
          >
            {t(props.subheading)}
          </h2>
        )}

        {/* Intro paragraphs */}
        {(props.para1 || props.para2) && (
          <div
            className="space-y-5 mb-12 text-base lg:text-[17px]"
            style={{ color: '#374151', fontFamily: 'var(--font-hind)', lineHeight: 1.9 }}
          >
            {props.para1 && <p>{t(props.para1)}</p>}
            {props.para2 && <p>{t(props.para2)}</p>}
          </div>
        )}

        {/* Why choose section */}
        {(props.chooseTitle || bullets.length > 0) && (
          <div className="mb-12">
            {props.chooseTitle && (
              <h3
                className="text-lg lg:text-xl font-bold mb-5"
                style={{ color: '#1B4D3E', fontFamily: 'var(--font-hind)' }}
              >
                {t(props.chooseTitle)}
              </h3>
            )}
            {bullets.length > 0 && (
              <ul className="space-y-4">
                {bullets.map((b, i) => (
                  <li
                    key={i}
                    className="flex gap-4 rounded-xl p-4 border"
                    style={{ background: '#F8F5EE', borderColor: 'rgba(27,77,62,0.08)', fontFamily: 'var(--font-hind)' }}
                  >
                    <span
                      className="flex-shrink-0 w-2 h-2 rounded-full mt-[0.6rem]"
                      style={{ background: '#1B4D3E' }}
                    />
                    <span
                      className="text-base leading-relaxed"
                      style={{ color: '#374151' }}
                    >
                      {b.bold && (
                        <strong style={{ color: '#1B4D3E', fontWeight: 700 }}>
                          {t(b.bold)}:{' '}
                        </strong>
                      )}
                      {t(b.text)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Availability paragraph */}
        {props.availability && (
          <p
            className="text-base lg:text-[17px] leading-[1.9] mb-12"
            style={{ color: '#374151', fontFamily: 'var(--font-hind)' }}
          >
            {t(props.availability)}
          </p>
        )}

        {/* Technical specs block */}
        {props.specsText && (
          <div
            className="rounded-2xl p-7 lg:p-9"
            style={{
              background: 'linear-gradient(135deg, #F8F5EE 0%, #f0ede6 100%)',
              border: '1px solid rgba(27,77,62,0.1)',
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🔬</span>
              <h4
                className="text-base font-bold"
                style={{ color: '#1B4D3E', fontFamily: 'var(--font-hind)' }}
              >
                {t('উপস্থিত উপাদান ও বিশেষ তথ্য', 'Composition & Specifications')}
              </h4>
            </div>
            <p
              className="text-sm leading-[1.9] italic"
              style={{ color: '#4a5568', fontFamily: 'var(--font-hind)' }}
            >
              {t(props.specsText)}
            </p>
          </div>
        )}

        {/* Optional bottom image */}
        {props.imageUrl && (
          <div className="mt-12 rounded-2xl overflow-hidden">
            <img
              src={props.imageUrl}
              alt="প্যারাগন জৈব সার"
              className="w-full"
              style={{ display: 'block', objectFit: 'cover', maxHeight: 480 }}
            />
          </div>
        )}

      </div>
    </section>
  )
}

// ─── WhyUSPBlock ──────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function WhyUSPRender(props: any) {
  const t = useT()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const usps: { icon: string; title: string; titleEn: string; desc: string; color: string }[] = props.usps || []
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const specs: { label: string; value: string }[] = props.specs || []
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const trustPoints: { text: string }[] = props.trustPoints || []
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const trustStats: { value: string; label: string }[] = props.trustStats || []

  return (
    <div style={{ background: '#F8F5EE' }}>
      {/* USPs */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ background: 'rgba(27,77,62,0.08)', color: '#1B4D3E', fontFamily: 'var(--font-inter)' }}
            >
              <RichText html={t(props.tagText)} inline />
            </span>
            <h2
              className="text-3xl lg:text-4xl font-bold mb-4"
              style={{ color: '#1a2e1a', fontFamily: 'var(--font-hind)' }}
            >
              <RichText html={t(props.heading)} inline />{' '}
              <span style={{ color: '#D4A017' }}><RichText html={t(props.headingHighlight)} inline /></span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {usps.map((u, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-7 border"
                style={{ borderColor: 'rgba(27,77,62,0.08)' }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 text-2xl"
                  style={{ background: `linear-gradient(135deg, ${u.color}, ${u.color}cc)` }}
                >
                  {u.icon}
                </div>
                <h4
                  className="font-bold text-base mb-1"
                  style={{ color: '#1a2e1a', fontFamily: 'var(--font-hind)' }}
                >
                  <RichText html={t(u.title)} inline />
                </h4>
                <p
                  className="text-xs mb-4"
                  style={{ color: '#9ca3af', fontFamily: 'var(--font-inter)' }}
                >
                  <RichText html={t(u.titleEn)} inline />
                </p>
                <RichText
                  html={t(u.desc)}
                  className="text-sm leading-relaxed"
                  style={{ color: '#6b7280', fontFamily: 'var(--font-hind)' }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specs + Trust */}
      <section className="py-20 lg:py-24" style={{ background: 'white' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <span
                className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-5"
                style={{ background: 'rgba(27,77,62,0.08)', color: '#1B4D3E', fontFamily: 'var(--font-inter)' }}
              >
                Specifications
              </span>
              <h2
                className="text-3xl lg:text-4xl font-bold mb-6"
                style={{ color: '#1a2e1a', fontFamily: 'var(--font-hind)' }}
              >
                <RichText html={t(props.specTitle)} inline />{' '}
                <span style={{ color: '#D4A017' }}><RichText html={t(props.specHighlight)} inline /></span>
              </h2>
              <RichText
                html={t(props.specBody)}
                className="text-base leading-relaxed mb-8"
                style={{ color: '#4a5568', fontFamily: 'var(--font-hind)' }}
              />
              <div className="grid grid-cols-2 gap-4">
                {specs.map((f, i) => (
                  <div
                    key={i}
                    className="rounded-xl p-4 border"
                    style={{ background: '#F8F5EE', borderColor: 'rgba(27,77,62,0.08)' }}
                  >
                    <div
                      className="text-xs mb-1"
                      style={{ color: '#9ca3af', fontFamily: 'var(--font-inter)' }}
                    >
                      <RichText html={t(f.label)} inline />
                    </div>
                    <div
                      className="text-lg font-bold"
                      style={{ color: '#1B4D3E', fontFamily: 'var(--font-hind)' }}
                    >
                      <RichText html={t(f.value)} inline />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="rounded-3xl p-8 lg:p-10"
              style={{ background: 'linear-gradient(135deg, #1B4D3E, #0F2E24)' }}
            >
              <h3
                className="text-2xl font-bold text-white mb-4"
                style={{ fontFamily: 'var(--font-hind)' }}
              >
                {t('কেন কৃষকরা বিশ্বাস করেন?', 'Why Do Farmers Trust Us?')}
              </h3>
              <div className="space-y-4 mb-8">
                {trustPoints.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(212,160,23,0.2)' }}
                    >
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ background: '#F5C842' }}
                      />
                    </div>
                    <span
                      className="text-sm"
                      style={{ color: 'rgba(255,255,255,0.8)', fontFamily: 'var(--font-hind)' }}
                    >
                      <RichText html={t(item.text)} inline />
                    </span>
                  </div>
                ))}
              </div>
              <div
                className="mt-8 pt-6 border-t border-white/10 grid gap-4"
                style={{ gridTemplateColumns: `repeat(${trustStats.length}, 1fr)` }}
              >
                {trustStats.map((s, i) => (
                  <div key={i} className="text-center">
                    <div
                      className="text-xl font-bold"
                      style={{ color: '#F5C842', fontFamily: 'var(--font-hind)' }}
                    >
                      <RichText html={t(s.value)} inline />
                    </div>
                    <div
                      className="text-xs mt-1"
                      style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-hind)' }}
                    >
                      <RichText html={t(s.label)} inline />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// ─── WhyTestimonialsBlock ─────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function WhyTestimonialsRender(props: any) {
  const tr = useT()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const testimonials: { name: string; location: string; role: string; text: string; emoji: string; years: string }[] = props.testimonials || []

  return (
    <div>
      <section className="py-20 lg:py-28" style={{ background: '#F8F5EE' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ background: 'rgba(27,77,62,0.08)', color: '#1B4D3E', fontFamily: 'var(--font-inter)' }}
            >
              <RichText html={tr(props.tagText)} inline />
            </span>
            <h2
              className="text-3xl lg:text-4xl font-bold"
              style={{ color: '#1a2e1a', fontFamily: 'var(--font-hind)' }}
            >
              <RichText html={tr(props.heading)} inline />{' '}
              <span style={{ color: '#D4A017' }}><RichText html={tr(props.headingHighlight)} inline /></span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-7">
            {testimonials.map((tm, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-7 border"
                style={{ borderColor: 'rgba(27,77,62,0.08)' }}
              >
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, j) => (
                    <span key={j} style={{ color: '#F5C842', fontSize: 16 }}>★</span>
                  ))}
                </div>
                <RichText
                  html={tr(tm.text)}
                  className="text-sm leading-relaxed mb-6"
                  style={{ color: '#4a5568', fontFamily: 'var(--font-hind)' }}
                />
                <div
                  className="flex items-center gap-3 pt-5 border-t"
                  style={{ borderColor: 'rgba(27,77,62,0.06)' }}
                >
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ background: 'rgba(27,77,62,0.06)' }}
                  >
                    {tm.emoji}
                  </div>
                  <div>
                    <div
                      className="font-bold text-sm"
                      style={{ color: '#1a2e1a', fontFamily: 'var(--font-hind)' }}
                    >
                      <RichText html={tr(tm.name)} inline />
                    </div>
                    <div
                      className="text-xs"
                      style={{ color: '#9ca3af', fontFamily: 'var(--font-hind)' }}
                    >
                      <RichText html={tr(tm.role)} inline /> · <RichText html={tr(tm.location)} inline />
                    </div>
                  </div>
                </div>
                <div
                  className="mt-3 text-xs font-semibold"
                  style={{ color: '#1B4D3E', fontFamily: 'var(--font-hind)' }}
                >
                  ✓ <RichText html={tr(tm.years)} inline />
                </div>
              </div>
            ))}
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
            <RichText html={tr(props.ctaTitle)} inline />{' '}
            <span style={{ color: '#F5C842' }}><RichText html={tr(props.ctaHighlight)} inline /></span>
          </h2>
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <Link
              href={props.ctaBtn1Href || '/location'}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold"
              style={{ background: 'linear-gradient(135deg, #D4A017, #F5C842)', color: '#1B4D3E', fontFamily: 'var(--font-hind)' }}
            >
              <RichText html={tr(props.ctaBtn1Label)} inline />
            </Link>
            <Link
              href={props.ctaBtn2Href || '/contact'}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold border"
              style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'white', fontFamily: 'var(--font-hind)' }}
            >
              <RichText html={tr(props.ctaBtn2Label)} inline />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

// ─── Exports ──────────────────────────────────────────────────────────────────

export const whyProductBlocks = {
  WhyProductContentBlock: {
    label: '✅ Why Product — Intro Content & Specs',
    fields: {
      subheading: { type: 'text' as const, label: 'Subheading (শিরোনাম)' },
      para1: textareaField('অনুচ্ছেদ ১ (Paragraph 1)', 4),
      para2: textareaField('অনুচ্ছেদ ২ (Paragraph 2)', 4),
      chooseTitle: { type: 'text' as const, label: '"কেন বেছে নেবেন" Title' },
      bullets: {
        type: 'array' as const,
        label: 'Bullet Points (কারণসমূহ)',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getItemSummary: (item: any) => item.bold || 'Point',
        arrayFields: {
          bold: { type: 'text' as const, label: 'Bold Title (যেমন: উর্বরতা বৃদ্ধি)' },
          text: textareaField('বিবরণ', 2),
        },
        defaultItemProps: { bold: '', text: '' },
      },
      availability: textareaField('পাওয়ার তথ্য (Availability)', 2),
      specsText: textareaField('Technical Specs Text (উপাদান তথ্য)', 5),
      imageUrl: labeledImageUploadField('নিচের ছবি (optional)'),
    },
    defaultProps: {
      subheading: 'ফসলের সমৃদ্ধিতে নির্ভরযোগ্য সঙ্গী: প্যারাগন জৈব সার',
      para1: 'দেশের পরিশ্রমী কৃষক ভাইদের অন্যতম প্রধান দুশ্চিন্তা হলো ফসলের কাঙ্ক্ষিত ফলন। মাটির প্রাণশক্তি হ্রাস পাওয়া এবং রাসায়নিকের অতিরিক্ত ব্যবহারে জমি যখন উর্বরতা হারায়, তখনই প্রয়োজন একটি সঠিক ও কার্যকরী সমাধান। আপনার এই ভাবনার স্থায়ী সমাধান নিয়ে এসেছে প্যারাগন জৈব সার।',
      para2: 'আমাদের নিজস্ব প্ল্যান্টে উৎপাদিত এই সার মাটির স্বাস্থ্য পুনরুদ্ধার করে এবং গাছের জন্য প্রয়োজনীয় অত্যাবশ্যকীয় জৈব উপাদান ও পুষ্টির যোগান নিশ্চিত করে। উন্নত মানের এই সার ব্যবহারে মাটির গঠনশৈলী উন্নত হয়, যা সরাসরি ফসলের উৎপাদন বৃদ্ধিতে সহায়তা করে।',
      chooseTitle: 'কেন বেছে নেবেন প্যারাগন জৈব সার?',
      bullets: [
        { bold: 'উর্বরতা বৃদ্ধি', text: 'মাটির প্রাকৃতিক গুণাগুণ ফিরিয়ে এনে দীর্ঘমেয়াদী উর্বরতা নিশ্চিত করে।' },
        { bold: 'রোগ প্রতিরোধ ক্ষমতা', text: 'গাছের রোগ বালাই দমনের সক্ষমতা বাড়িয়ে তুলে চারাকে করে মজবুত ও সতেজ।' },
        { bold: 'আর্দ্রতা সংরক্ষণ', text: 'মাটির পানি ধারণ ক্ষমতা বৃদ্ধি করে, যা সেচ ব্যবস্থাপনায় সহায়ক।' },
        { bold: 'পিএইচ (pH) নিয়ন্ত্রণ', text: 'মাটির বিষক্রিয়া ও অতিরিক্ত অম্লতা কমিয়ে আবাদযোগ্য পরিবেশ তৈরি করে।' },
      ],
      availability: 'আপনাদের সুবিধার্থে প্যারাগন জৈব সার এখন ১ কেজি, ৫ কেজি এবং ৪০ কেজির আকর্ষণীয় ও টেকসই প্যাকেজিংয়ে নিকটস্থ ডিলার পয়েন্টে পাওয়া যাচ্ছে।',
      specsText: 'উপস্থিত উপাদানসমূহ অনুযায়ী পণ্যের রং কালচে ধুসর এবং গুঁড়াদার। এতে কোন দুর্গন্ধ নেই এবং আর্দ্রতার পরিমাণ ১৫-২০%। পিএইচ মান ৬.০-৮.৫, জৈব কার্বন ১০-২৫%, টোটাল নাইট্রোজেন (N) ০.৫-৪.০%, কার্বন নাইট্রোজেন অনুপাত (C:N) সর্বোচ্চ ২০:১, ফসফরাস (P) ০.৫-৩.০%, পটাশিয়াম (K) ০.৫-৩.০% এবং সালফার (S) ০.১-০.৪%। এছাড়া জিংক (Zn) সর্বোচ্চ ০.১%, কপার (Cu) সর্বোচ্চ ০.০৫%, আর্সেনিক (As) সর্বোচ্চ ১০ পিপিএম, ক্রোমিয়াম (Cr) সর্বোচ্চ ৫০ পিপিএম, ক্যাডমিয়াম (Cd) সর্বোচ্চ ৫ পিপিএম, লেড (Pb) সর্বোচ্চ ৩০ পিপিএম, মার্কারি (Hg) সর্বোচ্চ ০.১ পিপিএম, নিকেল (Ni) সর্বোচ্চ ১০ পিপিএম এবং ইনাট ম্যাটেরিয়াল সর্বোচ্চ ১.০% থাকতে পারে।',
      imageUrl: '',
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render: (props: any) => <WhyProductContentRender {...props} />,
  },

  WhyUSPBlock: {
    label: '✅ Why Product — USP & Specs',
    fields: {
      tagText: richTextField('Tag Text'),
      heading: richTextField('Heading'),
      headingHighlight: richTextField('Heading Highlight (gold)'),
      usps: {
        type: 'array' as const,
        label: 'USP Cards',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getItemSummary: (item: any) => item.title || 'USP',
        arrayFields: {
          icon: { type: 'text' as const, label: 'Icon (emoji)' },
          title: richTextField('Title (বাংলা)'),
          titleEn: richTextField('Title (English)'),
          desc: richTextField('Description'),
          color: { type: 'text' as const, label: 'Color (hex)' },
        },
        defaultItemProps: { icon: '🌿', title: 'সুবিধা', titleEn: 'Feature', desc: 'বিবরণ...', color: '#1B4D3E' },
      },
      specTitle: richTextField('Spec Section Heading'),
      specHighlight: richTextField('Spec Heading Highlight (gold)'),
      specBody: richTextField('Spec Body Text'),
      specs: {
        type: 'array' as const,
        label: 'Spec Items',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getItemSummary: (item: any) => item.label || 'Spec',
        arrayFields: {
          label: richTextField('Label'),
          value: richTextField('Value'),
        },
        defaultItemProps: { label: 'উপাদান', value: '৫০%+' },
      },
      trustPoints: {
        type: 'array' as const,
        label: 'Trust Points',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getItemSummary: (item: any) => item.text || 'Point',
        arrayFields: {
          text: richTextField('Text'),
        },
        defaultItemProps: { text: 'বিশ্বস্ত পয়েন্ট' },
      },
      trustStats: {
        type: 'array' as const,
        label: 'Trust Stats',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getItemSummary: (item: any) => item.value || 'Stat',
        arrayFields: {
          value: richTextField('Value'),
          label: richTextField('Label'),
        },
        defaultItemProps: { value: '৫০০+', label: 'কৃষক' },
      },
    },
    defaultProps: {
      tagText: 'Key Advantages',
      heading: 'আমাদের পণ্যের',
      headingHighlight: 'অনন্য বৈশিষ্ট্য',
      usps: [
        { icon: '🛡️', title: '১০০% জৈব ও নিরাপদ', titleEn: 'Certified Organic', desc: 'কোনো ক্ষতিকর রাসায়নিক উপাদান নেই। সম্পূর্ণ প্রাকৃতিক কাঁচামাল থেকে তৈরি, মানুষ, প্রাণী ও পরিবেশের জন্য সম্পূর্ণ নিরাপদ।', color: '#1B4D3E' },
        { icon: '🏆', title: 'বিজ্ঞানসম্মত ফর্মুলা', titleEn: 'Scientific Formula', desc: 'বাংলাদেশের মাটির বিশেষ চাহিদা বিশ্লেষণ করে তৈরি। কৃষি গবেষণা প্রতিষ্ঠানের সাথে সহযোগিতায় উদ্ভাবিত ফর্মুলা।', color: '#2D7A3A' },
        { icon: '📈', title: 'প্রমাণিত ফলাফল', titleEn: 'Proven Results', desc: 'হাজার হাজার কৃষকের মাঠে পরীক্ষিত ও প্রমাণিত। গড়ে ৩০-৫০% উৎপাদন বৃদ্ধির রেকর্ড।', color: '#D4A017' },
        { icon: '👥', title: 'বিশেষজ্ঞ পরামর্শ সেবা', titleEn: 'Expert Support', desc: 'প্রশিক্ষিত কৃষি বিশেষজ্ঞদের দল সবসময় আপনার পাশে। বিনামূল্যে পরামর্শ সেবা পাওয়া যায়।', color: '#1B4D3E' },
      ],
      specTitle: 'পণ্যের',
      specHighlight: 'গুণগত মান',
      specBody: 'প্রতিটি ব্যাচ কঠোর মান নিয়ন্ত্রণের মধ্য দিয়ে যায়। বাংলাদেশ কৃষি গবেষণা ইনস্টিটিউট (BARI) অনুমোদিত পদ্ধতিতে পরীক্ষিত।',
      specs: [
        { label: 'উপকারী ব্যাকটেরিয়া', value: '৫+ কোটি/গ্রাম' },
        { label: 'জৈব পদার্থ', value: '৪০%+' },
        { label: 'পিএইচ রেঞ্জ', value: '৬.৫ – ৭.৫' },
        { label: 'নাইট্রোজেন (N)', value: '১.৮%+' },
        { label: 'ফসফরাস (P)', value: '১.২%+' },
        { label: 'পটাশিয়াম (K)', value: '১.৫%+' },
      ],
      trustPoints: [
        { text: 'বাস্তব মাঠ পরীক্ষায় ফলাফল প্রমাণিত' },
        { text: 'প্যারাগন গ্রুপের বিশ্বস্ত ব্র্যান্ড' },
        { text: 'দেশীয় কৃষি বিশেষজ্ঞদের তত্ত্বাবধানে তৈরি' },
        { text: 'সারাদেশে সহজলভ্য ডিলার নেটওয়ার্ক' },
        { text: 'বিক্রয়োত্তর সেবা ও পরামর্শ' },
      ],
      trustStats: [
        { value: '৫০০০+', label: 'কৃষক' },
        { value: '৩০-৫০%', label: 'ফলন বৃদ্ধি' },
        { value: '১০+', label: 'বছরের গবেষণা' },
      ],
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render: (props: any) => <WhyUSPRender {...props} />,
  },

  WhyTestimonialsBlock: {
    label: '✅ Why Product — Testimonials & CTA',
    fields: {
      tagText: richTextField('Tag Text'),
      heading: richTextField('Heading'),
      headingHighlight: richTextField('Heading Highlight (gold)'),
      testimonials: {
        type: 'array' as const,
        label: 'Testimonials',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getItemSummary: (item: any) => item.name || 'Testimonial',
        arrayFields: {
          name: richTextField('Name'),
          location: richTextField('Location'),
          role: richTextField('Role'),
          text: richTextField('Testimonial Text'),
          emoji: { type: 'text' as const, label: 'Emoji Avatar' },
          years: richTextField('Usage Duration Text'),
        },
        defaultItemProps: { name: 'কৃষক', location: 'ঢাকা', role: 'কৃষক', text: 'অভিজ্ঞতা লিখুন...', emoji: '🌾', years: '১ বছর ধরে ব্যবহার করছেন' },
      },
      ctaTitle: richTextField('CTA Heading'),
      ctaHighlight: richTextField('CTA Highlight (gold)'),
      ctaBtn1Label: richTextField('Button 1 Label'),
      ctaBtn1Href: { type: 'text' as const, label: 'Button 1 Href' },
      ctaBtn2Label: richTextField('Button 2 Label'),
      ctaBtn2Href: { type: 'text' as const, label: 'Button 2 Href' },
    },
    defaultProps: {
      tagText: 'Testimonials',
      heading: 'কৃষকদের',
      headingHighlight: 'অভিজ্ঞতা',
      testimonials: [
        { name: 'মো. আব্দুর রহমান', location: 'ময়মনসিংহ', role: 'ধান চাষি', text: 'প্যারাগন জৈব সার ব্যবহারের পর আমার ধানের ফলন ৪০% বেড়ে গেছে। মাটিও অনেক ভালো হয়েছে। এখন রাসায়নিক সার কম লাগে।', emoji: '🌾', years: '৩ বছর ধরে ব্যবহার করছেন' },
        { name: 'কামরুন নাহার', location: 'রাজশাহী', role: 'সবজি চাষি', text: 'আমার সবজি বাগানে এখন কোনো রাসায়নিক সার দিই না। প্যারাগন জৈব সারেই মাটি সুস্থ থাকে। সবজিও তাজা থাকে বেশিদিন।', emoji: '🥬', years: '২ বছর ধরে ব্যবহার করছেন' },
        { name: 'মো. জামাল উদ্দিন', location: 'কুমিল্লা', role: 'আম চাষি', text: 'আমের বাগানে প্যারাগন জৈব সার দেওয়ার পর গাছগুলো অনেক সতেজ দেখাচ্ছে। ফলও বেশি হচ্ছে এবং মিষ্টি হচ্ছে।', emoji: '🥭', years: '৪ বছর ধরে ব্যবহার করছেন' },
      ],
      ctaTitle: 'আজই শুরু করুন',
      ctaHighlight: 'জৈব কৃষির যাত্রা',
      ctaBtn1Label: 'ডিলার খুঁজুন',
      ctaBtn1Href: '/location',
      ctaBtn2Label: 'সরাসরি যোগাযোগ করুন',
      ctaBtn2Href: '/contact',
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render: (props: any) => <WhyTestimonialsRender {...props} />,
  },
}
