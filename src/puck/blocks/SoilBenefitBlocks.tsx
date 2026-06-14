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

// ─── SoilProblemBlock ─────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function SoilProblemRender(props: any) {
  const t = useT()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const problems: { icon: string; title: string; desc: string }[] = props.problems || []

  return (
    <section className="py-20 lg:py-28" style={{ background: '#F8F5EE' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ background: 'rgba(220,38,38,0.08)', color: '#dc2626', fontFamily: 'var(--font-inter)' }}
          >
            <RichText html={t(props.tagText)} inline />
          </span>
          <h2
            className="text-3xl lg:text-4xl font-bold mb-4"
            style={{ color: '#1a2e1a', fontFamily: 'var(--font-hind)' }}
          >
            <RichText html={t(props.heading)} inline />{' '}
            <span style={{ color: '#dc2626' }}><RichText html={t(props.headingHighlight)} inline /></span>
          </h2>
          <RichText html={t(props.subtitle)} className="text-base leading-relaxed" style={{ color: '#6b7280', fontFamily: 'var(--font-hind)' }} />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {problems.map((p, i) => (
            <div
              key={i}
              className="rounded-2xl p-6 border h-full"
              style={{ background: 'white', borderColor: 'rgba(220,38,38,0.1)' }}
            >
              <div className="text-4xl mb-4">{p.icon}</div>
              <div className="flex items-center gap-2 mb-3">
                <span style={{ color: '#dc2626', fontSize: 16 }}>⚠️</span>
                <h4
                  className="font-bold text-sm"
                  style={{ color: '#1a2e1a', fontFamily: 'var(--font-hind)' }}
                >
                  <RichText html={t(p.title)} inline />
                </h4>
              </div>
              <RichText
                html={t(p.desc)}
                className="text-xs leading-relaxed"
                style={{ color: '#6b7280', fontFamily: 'var(--font-hind)' }}
              />
            </div>
          ))}
        </div>

        <div
          className="rounded-3xl p-8 lg:p-12 text-center"
          style={{ background: 'linear-gradient(135deg, #dc2626, #b91c1c)' }}
        >
          <p
            className="text-lg mb-2 font-semibold text-white"
            style={{ fontFamily: 'var(--font-hind)' }}
          >
            <RichText html={t(props.statLabel)} inline />
          </p>
          <p
            className="text-5xl lg:text-6xl font-bold mb-2"
            style={{ color: '#fca5a5', fontFamily: 'var(--font-hind)' }}
          >
            <RichText html={t(props.statNumber)} inline />
          </p>
          <p
            className="text-xl font-bold text-white"
            style={{ fontFamily: 'var(--font-hind)' }}
          >
            <RichText html={t(props.statDesc)} inline />
          </p>
        </div>
      </div>
    </section>
  )
}

// ─── SoilBenefitCardsBlock ────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function SoilBenefitCardsRender(props: any) {
  const t = useT()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const benefits: { icon: string; title: string; titleEn: string; desc: string; stat: string; statLabel: string }[] = props.benefits || []

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
            className="text-3xl lg:text-4xl font-bold mb-4"
            style={{ color: '#1a2e1a', fontFamily: 'var(--font-hind)' }}
          >
            <RichText html={t(props.heading)} inline />{' '}
            <span style={{ color: '#D4A017' }}><RichText html={t(props.headingHighlight)} inline /></span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden border h-full"
              style={{ background: '#F8F5EE', borderColor: 'rgba(27,77,62,0.06)' }}
            >
              <div className="p-6">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 text-xl"
                  style={{ background: 'linear-gradient(135deg, #1B4D3E, #2D7A3A)', color: '#F5C842' }}
                >
                  {b.icon}
                </div>
                <h4
                  className="font-bold text-base mb-1"
                  style={{ color: '#1B4D3E', fontFamily: 'var(--font-hind)' }}
                >
                  <RichText html={t(b.title)} inline />
                </h4>
                <p
                  className="text-xs mb-4"
                  style={{ color: '#9ca3af', fontFamily: 'var(--font-inter)' }}
                >
                  <RichText html={t(b.titleEn)} inline />
                </p>
                <RichText
                  html={t(b.desc)}
                  className="text-sm leading-relaxed"
                  style={{ color: '#6b7280', fontFamily: 'var(--font-hind)' }}
                />
              </div>
              <div
                className="px-6 py-4 border-t"
                style={{ borderColor: 'rgba(27,77,62,0.06)', background: 'rgba(27,77,62,0.03)' }}
              >
                <span
                  className="text-2xl font-bold"
                  style={{ color: '#1B4D3E', fontFamily: 'var(--font-hind)' }}
                >
                  <RichText html={t(b.stat)} inline />
                </span>
                <span
                  className="text-xs ml-2"
                  style={{ color: '#6b7280', fontFamily: 'var(--font-hind)' }}
                >
                  <RichText html={t(b.statLabel)} inline />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── SoilHowItWorksBlock ──────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function SoilHowItWorksRender(props: any) {
  const t = useT()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const steps: { no: string; title: string; desc: string }[] = props.steps || []

  return (
    <section className="py-20 lg:py-28" style={{ background: '#F8F5EE' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
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

        <div className="grid sm:grid-cols-2 gap-6">
          {steps.map((s, i) => (
            <div
              key={i}
              className="flex gap-5 bg-white rounded-2xl p-7 border h-full"
              style={{ borderColor: 'rgba(27,77,62,0.08)' }}
            >
              <div
                className="text-4xl font-bold flex-shrink-0 leading-none"
                style={{ color: 'rgba(27,77,62,0.12)', fontFamily: 'var(--font-inter)' }}
              >
                <RichText html={t(s.no)} inline />
              </div>
              <div>
                <h4
                  className="font-bold text-base mb-2"
                  style={{ color: '#1B4D3E', fontFamily: 'var(--font-hind)' }}
                >
                  <RichText html={t(s.title)} inline />
                </h4>
                <RichText
                  html={t(s.desc)}
                  className="text-sm leading-relaxed"
                  style={{ color: '#6b7280', fontFamily: 'var(--font-hind)' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── SoilComparisonBlock ──────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function SoilComparisonRender(props: any) {
  const t = useT()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rows: { label: string; organic: string; chemical: string }[] = props.rows || []

  return (
    <div>
      <section className="py-20 lg:py-28" style={{ background: 'white' }}>
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
            className="rounded-3xl overflow-hidden border"
            style={{ borderColor: 'rgba(27,77,62,0.1)' }}
          >
            <div className="grid grid-cols-3 text-center" style={{ background: '#1B4D3E' }}>
              <div
                className="p-4 text-sm font-bold text-white"
                style={{ fontFamily: 'var(--font-hind)' }}
              >
                {t('বিষয়')}
              </div>
              <div
                className="p-4 text-sm font-bold border-l border-white/10"
                style={{ color: '#F5C842', fontFamily: 'var(--font-hind)' }}
              >
                {t('🌿 প্যারাগন জৈব সার')}
              </div>
              <div
                className="p-4 text-sm font-bold border-l border-white/10 text-white/60"
                style={{ fontFamily: 'var(--font-hind)' }}
              >
                {t('⚗️ রাসায়নিক সার')}
              </div>
            </div>
            {rows.map((row, i) => (
              <div
                key={i}
                className="grid grid-cols-3 text-center border-t"
                style={{ borderColor: 'rgba(27,77,62,0.06)', background: i % 2 === 0 ? '#F8F5EE' : 'white' }}
              >
                <div
                  className="p-4 text-sm font-semibold"
                  style={{ color: '#1a2e1a', fontFamily: 'var(--font-hind)' }}
                >
                  <RichText html={t(row.label)} inline />
                </div>
                <div
                  className="p-4 border-l flex items-center justify-center gap-2"
                  style={{ borderColor: 'rgba(27,77,62,0.06)' }}
                >
                  <span style={{ color: '#1B4D3E', fontSize: 14 }}>✓</span>
                  <span
                    className="text-sm font-semibold"
                    style={{ color: '#1B4D3E', fontFamily: 'var(--font-hind)' }}
                  >
                    <RichText html={t(row.organic)} inline />
                  </span>
                </div>
                <div
                  className="p-4 border-l flex items-center justify-center gap-2"
                  style={{ borderColor: 'rgba(27,77,62,0.06)' }}
                >
                  <span style={{ color: '#dc2626', fontSize: 14 }}>⚠</span>
                  <span
                    className="text-sm"
                    style={{ color: '#9ca3af', fontFamily: 'var(--font-hind)' }}
                  >
                    <RichText html={t(row.chemical)} inline />
                  </span>
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
            <RichText html={t(props.ctaTitle)} inline />{' '}
            <span style={{ color: '#F5C842' }}><RichText html={t(props.ctaHighlight)} inline /></span>
          </h2>
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <Link
              href={props.ctaBtn1Href || '/contact'}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold"
              style={{ background: 'linear-gradient(135deg, #D4A017, #F5C842)', color: '#1B4D3E', fontFamily: 'var(--font-hind)' }}
            >
              <RichText html={t(props.ctaBtn1Label)} inline />
            </Link>
            <Link
              href={props.ctaBtn2Href || '/about/why-this-product'}
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

// ─── SoilApplicationTableBlock ───────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function SoilApplicationTableRender(props: any) {
  const t = useT()
  const rows: { crop: string; quantity: string; method: string }[] = props.rows || []

  return (
    <section className="py-20 lg:py-28" style={{ background: 'white' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Intro paragraphs */}
        {(props.para1 || props.para2 || props.para3) && (
          <div
            className="mb-16 space-y-5 text-base lg:text-[17px]"
            style={{ color: '#374151', fontFamily: 'var(--font-hind)', lineHeight: 1.9 }}
          >
            {props.para1 && <p>{t(props.para1)}</p>}
            {props.para2 && <p>{t(props.para2)}</p>}
            {props.para3 && <p>{t(props.para3)}</p>}
          </div>
        )}

        {/* Application table */}
        {rows.length > 0 && (
          <div className="mb-10">
            {props.tableTitle && (
              <h3
                className="text-xl lg:text-2xl font-bold mb-6"
                style={{ color: '#1B4D3E', fontFamily: 'var(--font-hind)' }}
              >
                {t(props.tableTitle)}
              </h3>
            )}
            <div className="rounded-2xl overflow-hidden border" style={{ borderColor: 'rgba(27,77,62,0.12)' }}>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse" style={{ tableLayout: 'fixed', minWidth: 640 }}>
                  <colgroup>
                    <col style={{ width: '25%' }} />
                    <col style={{ width: '20%' }} />
                    <col style={{ width: '55%' }} />
                  </colgroup>
                  <thead>
                    <tr style={{ background: '#1B4D3E' }}>
                      <th
                        className="px-5 py-4 text-left text-sm font-semibold text-white"
                        style={{ fontFamily: 'var(--font-hind)' }}
                      >
                        {t('ফসলের নাম')}
                      </th>
                      <th
                        className="px-5 py-4 text-left text-sm font-semibold"
                        style={{ fontFamily: 'var(--font-hind)', color: '#F5C842' }}
                      >
                        {t('পরিমাণ')}
                      </th>
                      <th
                        className="px-5 py-4 text-left text-sm font-semibold text-white"
                        style={{ fontFamily: 'var(--font-hind)' }}
                      >
                        {t('প্রয়োগের সময় ও পদ্ধতি')}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, i) => (
                      <tr
                        key={i}
                        className="border-t"
                        style={{
                          borderColor: 'rgba(27,77,62,0.06)',
                          background: i % 2 === 0 ? '#F8F5EE' : 'white',
                        }}
                      >
                        <td
                          className="px-5 py-4 text-sm font-medium align-top"
                          style={{ color: '#1a2e1a', fontFamily: 'var(--font-hind)' }}
                        >
                          {t(row.crop)}
                        </td>
                        <td
                          className="px-5 py-4 text-sm font-bold align-top"
                          style={{ color: '#1B4D3E', fontFamily: 'var(--font-hind)' }}
                        >
                          {t(row.quantity)}
                        </td>
                        <td
                          className="px-5 py-4 text-sm leading-relaxed align-top"
                          style={{ color: '#374151', fontFamily: 'var(--font-hind)' }}
                        >
                          {t(row.method)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Footer note */}
        {props.footerNote && (
          <p
            className="text-sm italic mb-12"
            style={{
              color: '#6b7280',
              fontFamily: 'var(--font-hind)',
              borderLeft: '3px solid #1B4D3E',
              paddingLeft: 14,
            }}
          >
            {t(props.footerNote)}
          </p>
        )}

        {/* Bottom image */}
        {props.bottomImageUrl && (
          <div className="mt-4 rounded-2xl overflow-hidden">
            <img
              src={props.bottomImageUrl}
              alt={t('প্যারাগন জৈব সার প্রয়োগ')}
              className="w-full"
              style={{ display: 'block', objectFit: 'cover', maxHeight: 520 }}
            />
          </div>
        )}
      </div>
    </section>
  )
}

// ─── Exports ──────────────────────────────────────────────────────────────────

export const soilBenefitBlocks = {
  SoilProblemBlock: {
    label: '🌱 Soil — Problem Section',
    fields: {
      tagText: richTextField('Tag Text'),
      heading: richTextField('Heading'),
      headingHighlight: richTextField('Heading Highlight (red)'),
      subtitle: richTextField('Subtitle'),
      problems: {
        type: 'array' as const,
        label: 'Problem Cards',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getItemSummary: (item: any) => item.title || 'Problem',
        arrayFields: {
          icon: { type: 'text' as const, label: 'Icon (emoji)' },
          title: richTextField('Title'),
          desc: richTextField('Description'),
        },
        defaultItemProps: { icon: '⚠️', title: 'সমস্যা', desc: 'বিবরণ লিখুন...' },
      },
      statNumber: richTextField('Stat Number (big text)'),
      statLabel: richTextField('Stat Label (above number)'),
      statDesc: richTextField('Stat Description (below number)'),
    },
    defaultProps: {
      tagText: 'The Crisis',
      heading: 'বাংলাদেশের মাটির',
      headingHighlight: 'ক্রমবর্ধমান সংকট',
      subtitle: 'বছরের পর বছর রাসায়নিক সার ও কীটনাশকের অতিরিক্ত ব্যবহারে বাংলাদেশের কৃষিজমির মাটি তার প্রাকৃতিক উর্বরতা হারাচ্ছে।',
      problems: [
        { icon: '🌾', title: 'জৈব পদার্থ হ্রাস', desc: 'বারবার চাষের ফলে মাটির জৈব পদার্থ দ্রুত কমে যাচ্ছে, যা মাটির উর্বরতার মূল ভিত্তি।' },
        { icon: '⚗️', title: 'অম্লীয় মাটি', desc: 'অতিরিক্ত রাসায়নিক সার ব্যবহারে মাটির pH কমে গিয়ে অম্লীয় হয়ে পড়ছে।' },
        { icon: '💧', title: 'পানি ধারণ ক্ষমতা হ্রাস', desc: 'মাটির গঠন ক্ষতিগ্রস্ত হওয়ায় পানি ধারণ ও বায়ু চলাচল উভয়ই কমে যাচ্ছে।' },
        { icon: '🦠', title: 'অণুজীব ধ্বংস', desc: 'উপকারী ব্যাকটেরিয়া ও ছত্রাক বিনাশ পেয়ে মাটি "মৃত" হয়ে পড়ছে।' },
      ],
      statNumber: '৬০%+ জমিতে',
      statLabel: 'বাংলাদেশের কৃষিজমির',
      statDesc: 'জৈব পদার্থের পরিমাণ বিপদজনকভাবে কম',
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render: (props: any) => <SoilProblemRender {...props} />,
  },

  SoilBenefitCardsBlock: {
    label: '🌱 Soil — Benefit Cards',
    fields: {
      tagText: richTextField('Tag Text'),
      heading: richTextField('Heading'),
      headingHighlight: richTextField('Heading Highlight (gold)'),
      benefits: {
        type: 'array' as const,
        label: 'Benefit Cards',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getItemSummary: (item: any) => item.title || 'Benefit',
        arrayFields: {
          icon: { type: 'text' as const, label: 'Icon (emoji)' },
          title: richTextField('Title (বাংলা)'),
          titleEn: richTextField('Title (English)'),
          desc: richTextField('Description'),
          stat: richTextField('Stat Value'),
          statLabel: richTextField('Stat Label'),
        },
        defaultItemProps: { icon: '🌿', title: 'সুবিধা', titleEn: 'Benefit', desc: 'বিবরণ...', stat: '৫০%+', statLabel: 'উন্নতি' },
      },
    },
    defaultProps: {
      tagText: 'Solution',
      heading: 'জৈব সার কীভাবে',
      headingHighlight: 'মাটি সুস্থ রাখে',
      benefits: [
        { icon: '💧', title: 'পানি ধারণ বৃদ্ধি', titleEn: 'Water Retention', desc: 'জৈব পদার্থ মাটির পানি ধারণ ক্ষমতা ৩০-৫০% বৃদ্ধি করে, ফলে সেচের পরিমাণ কমে।', stat: '৪০%+', statLabel: 'পানি ধারণ বৃদ্ধি' },
        { icon: '💨', title: 'মাটির গঠন উন্নতি', titleEn: 'Soil Structure', desc: 'মাটির কণাগুলো একত্রিত হয়ে ভালো গঠন তৈরি হয়, শিকড় সহজে মাটির গভীরে যেতে পারে।', stat: '৬০%+', statLabel: 'গঠন উন্নতি' },
        { icon: '🦠', title: 'উপকারী অণুজীব', titleEn: 'Beneficial Microbes', desc: 'লক্ষ লক্ষ উপকারী ব্যাকটেরিয়া ও ছত্রাক মাটিতে যুক্ত হয়ে পুষ্টি সরবরাহ করে।', stat: '১০x', statLabel: 'অণুজীব বৃদ্ধি' },
        { icon: '⚡', title: 'পুষ্টি সরবরাহ', titleEn: 'Nutrient Supply', desc: 'নাইট্রোজেন, ফসফরাস, পটাশিয়ামসহ ১৬টি প্রয়োজনীয় পুষ্টি উপাদান ধীরে ধীরে সরবরাহ করে।', stat: '১৬টি', statLabel: 'পুষ্টি উপাদান' },
      ],
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render: (props: any) => <SoilBenefitCardsRender {...props} />,
  },

  SoilHowItWorksBlock: {
    label: '🌱 Soil — How It Works Steps',
    fields: {
      tagText: richTextField('Tag Text'),
      heading: richTextField('Heading'),
      headingHighlight: richTextField('Heading Highlight (gold)'),
      steps: {
        type: 'array' as const,
        label: 'Steps',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getItemSummary: (item: any) => item.title || 'Step',
        arrayFields: {
          no: richTextField('Step Number (e.g. ০১)'),
          title: richTextField('Title'),
          desc: richTextField('Description'),
        },
        defaultItemProps: { no: '০১', title: 'ধাপ', desc: 'বিবরণ লিখুন...' },
      },
    },
    defaultProps: {
      tagText: 'How It Works',
      heading: 'কীভাবে কাজ করে',
      headingHighlight: 'প্যারাগন জৈব সার?',
      steps: [
        { no: '০১', title: 'মাটিতে মিশানো', desc: 'জমি তৈরির সময় বা বীজ বপনের আগে প্যারাগন জৈব সার মাটিতে মিশিয়ে দিন। প্রতি বিঘায় ১৫-২০ কেজি ব্যবহার করুন।' },
        { no: '০২', title: 'অণুজীব সক্রিয়', desc: 'পানির সংস্পর্শে এলে উপকারী অণুজীব সক্রিয় হয় এবং জৈব পদার্থ ভাঙ্গতে শুরু করে।' },
        { no: '০৩', title: 'পুষ্টি নিঃসরণ', desc: 'ধীরে ধীরে পুষ্টি উপাদান নিঃসরণ হয়, গাছের শিকড় সহজে শোষণ করতে পারে।' },
        { no: '০৪', title: 'মাটি পুনরুজ্জীবিত', desc: 'নিয়মিত ব্যবহারে মাটির জৈব পদার্থ বৃদ্ধি পায় এবং মাটির সামগ্রিক স্বাস্থ্য উন্নত হয়।' },
      ],
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render: (props: any) => <SoilHowItWorksRender {...props} />,
  },

  SoilApplicationTableBlock: {
    label: '🌱 Soil — Intro Paragraphs + Application Table',
    fields: {
      para1: textareaField('অনুচ্ছেদ ১ (Paragraph 1)', 4),
      para2: textareaField('অনুচ্ছেদ ২ (Paragraph 2)', 4),
      para3: textareaField('অনুচ্ছেদ ৩ (Paragraph 3)', 4),
      tableTitle: { type: 'text' as const, label: 'Table Title' },
      rows: {
        type: 'array' as const,
        label: 'Application Rows (ফসল প্রয়োগ পদ্ধতি)',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getItemSummary: (item: any) => item.crop || 'ফসল',
        arrayFields: {
          crop: { type: 'text' as const, label: 'ফসলের নাম' },
          quantity: { type: 'text' as const, label: 'পরিমাণ' },
          method: textareaField('প্রয়োগের সময় ও পদ্ধতি', 2),
        },
        defaultItemProps: { crop: 'নতুন ফসল', quantity: '', method: '' },
      },
      footerNote: { type: 'text' as const, label: 'Footer Note (বি. দ্র.)' },
      bottomImageUrl: labeledImageUploadField('নিচের ছবি (Bottom Image)'),
    },
    defaultProps: {
      para1: 'প্যারাগন অর্গানিক ফার্টিলাইজার একটি প্রাকৃতিক ও টেকসই মাটির প্রয়োজনীয় পুষ্টির সহজ সমাধান, যা মাটির স্বাস্থ্য উন্নত করতে, ফসলের পর্যাপ্ত বৃদ্ধি নিশ্চিত করতে এবং পরিবেশবান্ধব কৃষি ব্যবস্থাকে এগিয়ে নিতে সহায়তা করে। সঠিকভাবে প্রক্রিয়াজাতকৃত জৈব উপাদান থেকে প্রস্তুত এই সার মাটিতে প্রাকৃতিক পুষ্টি যোগ করে, মাটির গঠন উন্নত করে এবং উপকারী অণুজীবের কার্যকারিতা বৃদ্ধি করে দীর্ঘমেয়াদি উর্বরতা বজায় রাখতে সহায়তা করে।',
      para2: 'প্যারাগন এগ্রো বিশ্বাস করে যে, সুস্থ মাটি সুস্থ ফসলের মূল ভিত্তি। আমাদের অর্গানিক ফার্টিলাইজার কৃষক, বাগানপ্রেমী, নার্সারি মালিক এবং বাণিজ্যিক চাষিদের জন্য তৈরি, যারা রাসায়নিক সারের উপর নির্ভরতা কমিয়ে নিরাপদ ও কার্যকর ফসল উৎপাদন করতে চান।',
      para3: 'গুণগত মান, টেকসই কৃষি এবং সর্বোপরি কৃষকের উপকার - এই তিনটি বিষয়কে গুরুত্ব দিয়ে প্যারাগন অর্গানিক ফার্টিলাইজার মজবুত শিকড় গঠন, গাছের উপযুক্ত বৃদ্ধি, মাটির পানি ধারণক্ষমতা বৃদ্ধি এবং সুষম পুষ্টি সরবরাহে সহায়তা করে। আমাদের লক্ষ্য হলো নিরাপদ খাদ্য উৎপাদন এবং বাংলাদেশের জন্য টেকসই কৃষির ভবিষ্যৎ গড়ে তোলায় অবদান রাখা।',
      tableTitle: 'বিভিন্ন ফসল উৎপাদনে প্যারাগন জৈব সার জমিতে প্রয়োগ পদ্ধতি',
      rows: [
        { crop: 'ধান, গম', quantity: '৪-৫ কেজি/শতক', method: 'জমি তৈরির শেষ চাপে প্রয়োজনীয় রাসায়নিক সারের সাথে মিশিয়ে প্রয়োগ।' },
        { crop: 'ভুট্টা, আখ', quantity: '৫-৭ কেজি/শতক', method: 'অর্ধেক পরিমাণ জমি তৈরির শেষ চাপে মিশিয়ে এবং বাকি অর্ধেক রোপণ গর্তে প্রয়োজনীয় রাসায়নিক সারের সাথে প্রয়োগ।' },
        { crop: 'ফুলকপি, বাঁধাকপি, ব্রোকলি, মরিচ, বেগুন, টমেটো', quantity: '৮-১০ কেজি/শতক', method: 'জমি তৈরির শেষ চাপে প্রয়োজনীয় রাসায়নিক সারের সাথে মিশিয়ে প্রয়োগ।' },
        { crop: 'আলু, মুলা, গাজর, মসুর, হলুদ, আদা, পেঁয়াজ, রসুন', quantity: '৮-১২ কেজি/শতক', method: 'জমি তৈরির শেষ চাপে প্রয়োজনীয় রাসায়নিক সারের সাথে মিশিয়ে প্রয়োগ।' },
        { crop: 'পান', quantity: '৪-৫ কেজি/শতক', method: 'জমি তৈরির শেষ চাপে প্রয়োজনীয় রাসায়নিক সারের সাথে মিশিয়ে প্রয়োগ।' },
        { crop: 'শিম, লাউ, পটল, মিষ্টি কুমড়া, চাল কুমড়া, শসা, করলা, ঝিঙা, কাকরোল, চিচিঙা', quantity: '১.৫-২ কেজি/গর্ত', method: 'প্রয়োজনীয় রাসায়নিক সারের সাথে মিশিয়ে রোপণ গর্তে প্রয়োগ করে পানি ভিজিয়ে ৭-৮ দিন পর বীজ বা চারা রোপণ করতে হবে।' },
        { crop: 'ঢেঁড়স, বরবটি, পেঁপে, বেগুন', quantity: '৬-৮ কেজি/শতক', method: 'জমি তৈরির শেষ চাপে প্রয়োজনীয় রাসায়নিক সারের সাথে মিশিয়ে প্রয়োগ।' },
        { crop: 'লাল শাক, ডাটা শাক, পালং শাক, কলমি শাক', quantity: '১০-১৫ কেজি/শতক', method: 'জমি তৈরির শেষ চাপে প্রয়োজনীয় রাসায়নিক সারের সাথে মিশিয়ে প্রয়োগ।' },
        { crop: 'ফলজ গাছ — আম, লিচু, কাঁঠাল, পেয়ারা, বরই, কলা, পেঁপে, আমড়া, সফেদা, সরিষা, লেবু ইত্যাদি', quantity: '২-৫ কেজি/প্রতি গাছ', method: 'প্রয়োজনীয় রাসায়নিক সারের সাথে মিশিয়ে রোপণ গর্তে প্রয়োগ করে পানি ভিজিয়ে ৭-৮ দিন পর বীজ বা চারা রোপণ করতে হবে।' },
        { crop: 'ফলবান বা বাড়ন্ত গাছ', quantity: '২-৩ কেজি/প্রতি গাছ', method: 'বর্ষা শুরুর আগে বা বর্ষা শেষে গাছের চারপাশে কুপকাটার প্রয়োগ করে মাটির সাথে মিশিয়ে দিতে হবে।' },
        { crop: 'ফুল গাছ — গোলাপ, গাঁদা, জারবেরা, গ্লাডিওলাস, রজনীগন্ধা, ক্যালেন্ডুলা', quantity: '১.৫-২ কেজি/শতক', method: 'জমি তৈরির শেষ চাপের সময় অথবা বীজ বপন/চারা রোপণের ৫-৭ দিন আগে মাটির সাথে ভালোভাবে মিশিয়ে দিতে হবে।' },
        { crop: 'চা বাগানে', quantity: '১ বছর=৩০০গ্রাম/গাছ; ২বছর=৪০০গ্রাম; ৩বছর=৫০০গ্রাম; ৪+বছর=১টন/হেক্টর', method: 'গাছের বয়স ৪ বছর বা তার বেশি হলে বর্ষা মৌসুমে প্যারাগন জৈব সার প্রয়োগ করতে হবে।' },
        { crop: 'চা — নার্সারির ক্ষেত্রে', quantity: '২০০-৩০০ গ্রাম/গর্ত প্রতি', method: 'নতুন চারা রোপণের ক্ষেত্রে ৪ ভাগ মাটি ও ১ ভাগ প্যারাগন জৈব সার দিতে হবে।' },
      ],
      footerNote: 'বি. দ্র.: জমির উর্বরতা শক্তি অনুযায়ী প্যারাগন জৈব সারের পরিমাণ কম বা বেশি ব্যবহার করুন।',
      bottomImageUrl: '',
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render: (props: any) => <SoilApplicationTableRender {...props} />,
  },

  SoilComparisonBlock: {
    label: '🌱 Soil — Comparison Table & CTA',
    fields: {
      tagText: richTextField('Tag Text'),
      heading: richTextField('Heading'),
      headingHighlight: richTextField('Heading Highlight (gold)'),
      rows: {
        type: 'array' as const,
        label: 'Comparison Rows',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getItemSummary: (item: any) => item.label || 'Row',
        arrayFields: {
          label: richTextField('Label'),
          organic: richTextField('Organic (green)'),
          chemical: richTextField('Chemical (red)'),
        },
        defaultItemProps: { label: 'বিষয়', organic: 'ভালো', chemical: 'খারাপ' },
      },
      ctaTitle: richTextField('CTA Heading'),
      ctaHighlight: richTextField('CTA Highlight (gold)'),
      ctaBtn1Label: richTextField('Button 1 Label'),
      ctaBtn1Href: { type: 'text' as const, label: 'Button 1 Href' },
      ctaBtn2Label: richTextField('Button 2 Label'),
      ctaBtn2Href: { type: 'text' as const, label: 'Button 2 Href' },
    },
    defaultProps: {
      tagText: 'Comparison',
      heading: 'জৈব বনাম',
      headingHighlight: 'রাসায়নিক সার',
      rows: [
        { label: 'পুষ্টি সরবরাহ', organic: 'ধীরে ধীরে, দীর্ঘস্থায়ী', chemical: 'দ্রুত কিন্তু স্বল্পস্থায়ী' },
        { label: 'মাটির স্বাস্থ্য', organic: 'উন্নত করে', chemical: 'ক্রমশ ক্ষতি করে' },
        { label: 'উপকারী অণুজীব', organic: 'বৃদ্ধি পায়', chemical: 'ধ্বংস হয়' },
        { label: 'পরিবেশ প্রভাব', organic: 'পরিবেশবান্ধব', chemical: 'পানি ও মাটি দূষণ' },
        { label: 'দীর্ঘমেয়াদী ফলন', organic: 'ক্রমাগত বাড়ে', chemical: 'ক্রমশ কমে' },
        { label: 'উৎপাদন খরচ', organic: 'দীর্ঘমেয়াদে কম', chemical: 'বাড়তে থাকে' },
      ],
      ctaTitle: 'আপনার জমির মাটি',
      ctaHighlight: 'পরীক্ষা করুন',
      ctaBtn1Label: 'বিনামূল্যে পরামর্শ নিন',
      ctaBtn1Href: '/contact',
      ctaBtn2Label: 'কেন এই পণ্য বেছে নেবেন?',
      ctaBtn2Href: '/about/why-this-product',
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render: (props: any) => <SoilComparisonRender {...props} />,
  },
}
