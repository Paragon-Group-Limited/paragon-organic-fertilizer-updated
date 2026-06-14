'use client'

import { useState } from 'react'
import { richTextField } from '@/puck/fields/richTextField'
import { imageUploadField } from '@/puck/fields/imageUploadField'
import { RichText } from '@/components/puck/RichText'
import { useT } from '@/hooks/useT'

// ─── Field helpers ────────────────────────────────────────────────────────────

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

function textField(label: string) {
  return { type: 'text' as const, label }
}

// ─── LocationMapContactBlock ──────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function LocationMapContactRender(props: any) {
  const t = useT()
  const contacts: { area1: string; phone1: string; area2: string; phone2: string }[] = props.contacts || []

  return (
    <section className="py-20 lg:py-28" style={{ background: '#F8F5EE' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
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

        {/* Map + text two-col */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-14">
          {/* Map image */}
          <div
            className="rounded-2xl overflow-hidden border shadow-sm"
            style={{ borderColor: 'rgba(27,77,62,0.1)', background: 'white' }}
          >
            {props.mapImageUrl ? (
              <img
                src={props.mapImageUrl}
                alt="Bangladesh District Coverage Map"
                className="w-full h-auto"
                style={{ display: 'block' }}
              />
            ) : (
              <div
                className="flex flex-col items-center justify-center py-20 gap-3"
                style={{ background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)', minHeight: 320 }}
              >
                <span style={{ fontSize: 64 }}>🗺️</span>
                <p className="text-sm font-semibold" style={{ color: '#1B4D3E', fontFamily: 'var(--font-hind)' }}>
                  Bangladesh District Coverage Map
                </p>
              </div>
            )}
          </div>

          {/* Text */}
          <div className="flex flex-col gap-6 pt-2">
            <h3 className="text-2xl lg:text-3xl font-bold" style={{ color: '#1B4D3E', fontFamily: 'var(--font-hind)' }}>
              <RichText html={t(props.coverageTitle)} inline />
            </h3>
            <RichText html={t(props.coveragePara1)} className="text-base leading-[1.9]" style={{ color: '#374151', fontFamily: 'var(--font-hind)' }} />
            <RichText html={t(props.coveragePara2)} className="text-base leading-[1.9]" style={{ color: '#374151', fontFamily: 'var(--font-hind)' }} />
            <div className="rounded-2xl p-6 border" style={{ background: 'linear-gradient(135deg, #1B4D3E, #0F2E24)', borderColor: 'transparent' }}>
              <p className="text-sm leading-[1.8] font-medium" style={{ color: 'rgba(255,255,255,0.88)', fontFamily: 'var(--font-hind)' }}>
                <RichText html={t(props.welcomeText)} inline />
              </p>
            </div>
          </div>
        </div>

        {/* Territory contact table */}
        {contacts.length > 0 && (
          <div className="bg-white rounded-2xl border overflow-hidden" style={{ borderColor: 'rgba(27,77,62,0.1)' }}>
            <div className="px-6 py-4 border-b" style={{ background: 'linear-gradient(135deg, #1B4D3E, #2D7A3A)', borderColor: 'transparent' }}>
              <h4 className="text-base font-bold text-white" style={{ fontFamily: 'var(--font-hind)' }}>
                {t(props.tableTitle || 'বিক্রয় প্রতিনিধি যোগাযোগ')}
              </h4>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full" style={{ borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'rgba(27,77,62,0.04)' }}>
                    {['এলাকা', 'মোবাইল নম্বর', 'এলাকা', 'মোবাইল নম্বর'].map((h, i) => (
                      <th key={i} className="text-left text-xs font-bold px-5 py-3 border-b"
                        style={{ color: '#1B4D3E', fontFamily: 'var(--font-hind)', borderColor: 'rgba(27,77,62,0.08)' }}>
                        {t(h)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid rgba(27,77,62,0.06)', background: i % 2 === 0 ? 'white' : 'rgba(27,77,62,0.015)' }}>
                      <td className="px-5 py-3 text-sm" style={{ color: '#374151', fontFamily: 'var(--font-hind)' }}>{t(row.area1)}</td>
                      <td className="px-5 py-3 text-sm font-medium" style={{ color: '#1B4D3E', fontFamily: 'var(--font-inter)' }}>
                        <a href={`tel:${row.phone1.replace(/\D/g, '')}`} className="hover:underline">{row.phone1}</a>
                      </td>
                      <td className="px-5 py-3 text-sm" style={{ color: '#374151', fontFamily: 'var(--font-hind)' }}>{t(row.area2)}</td>
                      <td className="px-5 py-3 text-sm font-medium" style={{ color: '#1B4D3E', fontFamily: 'var(--font-inter)' }}>
                        {row.phone2 ? <a href={`tel:${row.phone2.replace(/\D/g, '')}`} className="hover:underline">{row.phone2}</a> : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

// ─── LocationCoverageBlock ────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function LocationCoverageRender(props: any) {
  const tr = useT()
  const statTiles: { value: string; label: string }[] = props.statTiles || []
  const areas: { division: string; districts: string }[] = props.areas || []

  return (
    <section className="py-20 lg:py-28" style={{ background: '#F8F5EE' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ background: 'rgba(27,77,62,0.08)', color: '#1B4D3E', fontFamily: 'var(--font-inter)' }}>
            <RichText html={tr(props.tagText)} inline />
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ color: '#1a2e1a', fontFamily: 'var(--font-hind)' }}>
            <RichText html={tr(props.heading)} inline />{' '}
            <span style={{ color: '#D4A017' }}><RichText html={tr(props.headingHighlight)} inline /></span>
          </h2>
          <RichText html={tr(props.subtitle)} className="text-base leading-relaxed" style={{ color: '#6b7280', fontFamily: 'var(--font-hind)' }} />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {statTiles.map((tile, i) => (
            <div key={i} className="rounded-2xl p-6 text-center" style={{ background: 'linear-gradient(135deg, #1B4D3E, #0F2E24)' }}>
              <div className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-hind)' }}>
                <RichText html={tr(tile.value)} inline />
              </div>
              <div className="text-sm" style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-hind)' }}>
                <RichText html={tr(tile.label)} inline />
              </div>
            </div>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {areas.map((area, i) => (
            <div key={i} className="bg-white rounded-xl p-5 border" style={{ borderColor: 'rgba(27,77,62,0.08)' }}>
              <div className="flex items-center gap-2 mb-3">
                <span style={{ color: '#1B4D3E', fontSize: 14 }}>📍</span>
                <h4 className="font-bold text-sm" style={{ color: '#1B4D3E', fontFamily: 'var(--font-hind)' }}>
                  <RichText html={tr(area.division)} inline />
                </h4>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: '#9ca3af', fontFamily: 'var(--font-hind)' }}>
                {tr(area.districts)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── LocationDealerBenefitsBlock ──────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function LocationDealerBenefitsRender(props: any) {
  const t = useT()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const benefits: { icon: string; title: string; desc: string }[] = props.benefits || []

  return (
    <section className="py-20 lg:py-24" style={{ background: 'white' }}>
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
          <RichText
            html={t(props.subtitle)}
            className="text-base leading-relaxed"
            style={{ color: '#6b7280', fontFamily: 'var(--font-hind)' }}
          />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, i) => (
            <div
              key={i}
              className="rounded-2xl p-7 border"
              style={{ background: '#F8F5EE', borderColor: 'rgba(27,77,62,0.06)' }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 text-xl"
                style={{ background: 'linear-gradient(135deg, #1B4D3E, #2D7A3A)', color: '#F5C842' }}
              >
                {b.icon}
              </div>
              <h4
                className="font-bold text-base mb-3"
                style={{ color: '#1B4D3E', fontFamily: 'var(--font-hind)' }}
              >
                <RichText html={t(b.title)} inline />
              </h4>
              <RichText
                html={t(b.desc)}
                className="text-sm leading-relaxed"
                style={{ color: '#6b7280', fontFamily: 'var(--font-hind)' }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── LocationApplicationBlock ─────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function LocationApplicationRender(props: any) {
  const t = useT()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const requirements: { text: string }[] = props.requirements || []
  const [formData, setFormData] = useState({ name: '', org: '', phone: '', address: '', experience: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section className="py-20 lg:py-28" style={{ background: '#F8F5EE' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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

        <div className="grid lg:grid-cols-2 gap-10">
          <div
            className="bg-white rounded-2xl p-8 border h-full"
            style={{ borderColor: 'rgba(27,77,62,0.08)' }}
          >
            <h3
              className="text-xl font-bold mb-6"
              style={{ color: '#1B4D3E', fontFamily: 'var(--font-hind)' }}
            >
              {t('আবেদনের জন্য প্রয়োজনীয় তথ্য')}
            </h3>
            <ul className="space-y-3 mb-8">
              {requirements.map((r, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span style={{ color: '#1B4D3E', fontSize: 16, marginTop: 2 }}>✓</span>
                  <span
                    className="text-sm leading-relaxed"
                    style={{ color: '#4a5568', fontFamily: 'var(--font-hind)' }}
                  >
                    <RichText html={t(r.text)} inline />
                  </span>
                </li>
              ))}
            </ul>

            <div
              className="rounded-2xl p-6 border"
              style={{ background: 'rgba(27,77,62,0.04)', borderColor: 'rgba(27,77,62,0.1)' }}
            >
              <h4
                className="font-bold text-sm mb-4"
                style={{ color: '#1B4D3E', fontFamily: 'var(--font-hind)' }}
              >
                {t('সরাসরি যোগাযোগ করুন:')}
              </h4>
              <div className="space-y-3">
                <a
                  href={`tel:${props.phone}`}
                  className="flex items-center gap-3"
                >
                  <span style={{ color: '#1B4D3E' }}>📞</span>
                  <span
                    className="text-sm font-medium"
                    style={{ color: '#1B4D3E', fontFamily: 'var(--font-inter)' }}
                  >
                    {props.phone}
                  </span>
                </a>
                <a
                  href={`mailto:${props.email}`}
                  className="flex items-center gap-3"
                >
                  <span style={{ color: '#1B4D3E' }}>✉️</span>
                  <span
                    className="text-sm font-medium"
                    style={{ color: '#1B4D3E', fontFamily: 'var(--font-inter)' }}
                  >
                    {props.email}
                  </span>
                </a>
              </div>
            </div>
          </div>

          <div>
            {submitted ? (
              <div
                className="bg-white rounded-2xl p-8 border flex flex-col items-center justify-center text-center h-full"
                style={{ borderColor: 'rgba(27,77,62,0.08)' }}
              >
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mb-6 text-4xl"
                  style={{ background: 'rgba(27,77,62,0.08)' }}
                >
                  ✓
                </div>
                <h3
                  className="text-xl font-bold mb-3"
                  style={{ color: '#1B4D3E', fontFamily: 'var(--font-hind)' }}
                >
                  <RichText html={t(props.formSuccessTitle)} inline />
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: '#6b7280', fontFamily: 'var(--font-hind)' }}
                >
                  <RichText html={t(props.formSuccessText)} inline />
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl p-8 border"
                style={{ borderColor: 'rgba(27,77,62,0.08)' }}
              >
                <h3
                  className="text-xl font-bold mb-6"
                  style={{ color: '#1B4D3E', fontFamily: 'var(--font-hind)' }}
                >
                  <RichText html={t(props.formTitle)} inline />
                </h3>
                <div className="space-y-4">
                  {[
                    { id: 'name', label: t('আপনার নাম *'), placeholder: t('মো. আব্দুর রহমান'), key: 'name' as const },
                    { id: 'org', label: t('প্রতিষ্ঠানের নাম'), placeholder: t('রহমান এগ্রো সার্ভিসেস'), key: 'org' as const },
                    { id: 'phone', label: t('মোবাইল নম্বর *'), placeholder: '০১XXXXXXXXX', key: 'phone' as const },
                    { id: 'address', label: t('ব্যবসার ঠিকানা *'), placeholder: t('জেলা, উপজেলা'), key: 'address' as const },
                  ].map((field) => (
                    <div key={field.id}>
                      <label
                        className="block text-sm font-semibold mb-1.5"
                        style={{ color: '#374151', fontFamily: 'var(--font-hind)' }}
                      >
                        {field.label}
                      </label>
                      <input
                        type="text"
                        placeholder={field.placeholder}
                        value={formData[field.key]}
                        onChange={e => setFormData(prev => ({ ...prev, [field.key]: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border text-sm outline-none"
                        style={{ borderColor: 'rgba(27,77,62,0.2)', fontFamily: 'var(--font-hind)', color: '#1a2e1a' }}
                        required={field.label.includes('*')}
                      />
                    </div>
                  ))}
                  <div>
                    <label
                      className="block text-sm font-semibold mb-1.5"
                      style={{ color: '#374151', fontFamily: 'var(--font-hind)' }}
                    >
                      {t('ব্যবসায়িক অভিজ্ঞতা')}
                    </label>
                    <textarea
                      rows={3}
                      placeholder={t('সার বা কৃষি পণ্যের ব্যবসায় আপনার অভিজ্ঞতা সম্পর্কে সংক্ষেপে লিখুন...')}
                      value={formData.experience}
                      onChange={e => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border text-sm outline-none resize-none"
                      style={{ borderColor: 'rgba(27,77,62,0.2)', fontFamily: 'var(--font-hind)', color: '#1a2e1a' }}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2"
                    style={{ background: 'linear-gradient(135deg, #1B4D3E, #2D7A3A)', color: 'white', fontFamily: 'var(--font-hind)' }}
                  >
                    <RichText html={t(props.submitLabel)} inline /> →
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Exports ──────────────────────────────────────────────────────────────────

export const locationBlocks = {
  LocationMapContactBlock: {
    label: '📍 Location — Map & Territory Contacts',
    fields: {
      tagText: richTextField('Tag Text'),
      heading: richTextField('Heading'),
      headingHighlight: richTextField('Heading Highlight (gold)'),
      mapImageUrl: labeledImageUploadField('Bangladesh Map Image'),
      coverageTitle: richTextField('Coverage Section Title'),
      coveragePara1: richTextField('Coverage Paragraph 1'),
      coveragePara2: richTextField('Coverage Paragraph 2'),
      welcomeText: richTextField('Welcome Box Text'),
      tableTitle: textField('Contact Table Title'),
      contacts: {
        type: 'array' as const,
        label: 'Territory Contacts (2 per row)',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getItemSummary: (item: any) => item.area1 || 'Row',
        arrayFields: {
          area1: textField('Area 1 (বাম)'),
          phone1: textField('Phone 1'),
          area2: textField('Area 2 (ডান)'),
          phone2: textField('Phone 2'),
        },
        defaultItemProps: { area1: 'এলাকা', phone1: '০১XXXXXXXXX', area2: '', phone2: '' },
      },
    },
    defaultProps: {
      tagText: 'Coverage',
      heading: 'বাংলাদেশ জুড়ে',
      headingHighlight: 'আমাদের উপস্থিতি',
      mapImageUrl: '',
      coverageTitle: 'বাংলাদেশ জুড়ে আমাদের উপস্থিতি',
      coveragePara1: 'প্যারাগন জৈব সার বাংলাদেশের বিভিন্ন জেলার কৃষকদের কাছে পৌঁছে যাচ্ছে একটি নির্ভরযোগ্য ও পরিবেশবান্ধব কৃষি সমাধান হিসেবে। আমাদের লক্ষ্য হলো মাটির স্বাস্থ্য উন্নয়ন, ফসলের উৎপাদনশীলতা বৃদ্ধি এবং টেকসই কৃষি ব্যবস্থাকে আরও শক্তিশালী করা।',
      coveragePara2: 'মানচিত্রে চিহ্নিত এলাকাগুলোতে আমাদের সেবা ও পণ্য বিতরণ নিশ্চিত। আমরা দেশের আনাচে-কানাচে আরও মানুষের কাছে জৈব সারের সঠিক দিকনির্দেশনা পৌঁছে দিয়ে যাচ্ছি।',
      welcomeText: 'বাংলাদেশের কৃষি উন্নয়ন ও পরিবেশবান্ধব চাষাবাদ উৎসাহিত রাখতে প্যারাগন জৈব সার দেশের বিভিন্ন অঞ্চলে ডিলার ও ব্যবসায়িক অংশীদার নিয়োগ করছে। আপনি যদি উদ্যোক্তা, কৃষি উপকরণ ব্যবসায়ী, ডিলার বা পরিবেশক হন — তাহলে এখনই আপনার সুযোগ।',
      tableTitle: 'বিক্রয় প্রতিনিধি যোগাযোগ',
      contacts: [
        { area1: 'মহাখালী ঢাকা (হেড অফিস)', phone1: '০১৭৯২৬৩০৫২৩', area2: 'গাজীপুর অফিস', phone2: '০১৩২৫৮১৩২২৯' },
        { area1: 'দিনাজপুর টেরিটরি', phone1: '০১৫৩২৪১২৩০৫২', area2: 'সিলেট টেরিটরি', phone2: '০১৫৩০০৩৩৪৫২' },
        { area1: 'রংপুর টেরিটরি', phone1: '০১৫২৫৫৭৩০৫২', area2: 'ময়মনসিংহ টেরিটরি', phone2: '০১৫৩২৬১৩০৮৬' },
        { area1: 'বগুড়া টেরিটরি', phone1: '০১৫৩২৬২৬৩০৫২', area2: 'মানিকগঞ্জ টেরিটরি', phone2: '০১৭৮৬৪৩৩৮৬৩' },
        { area1: 'রাজশাহী টেরিটরি', phone1: '০১৭৯২৬৩০৫২৩', area2: 'মুন্সিগঞ্জ টেরিটরি', phone2: '০১৫৩২৮১৩০৫৪' },
      ],
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render: (props: any) => <LocationMapContactRender {...props} />,
  },

  LocationCoverageBlock: {
    label: '📍 Location — Coverage Stats & Areas',
    fields: {
      tagText: richTextField('Tag Text'),
      heading: richTextField('Heading'),
      headingHighlight: richTextField('Heading Highlight (gold)'),
      subtitle: richTextField('Subtitle'),
      statTiles: {
        type: 'array' as const,
        label: 'Stat Tiles',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getItemSummary: (item: any) => item.value || 'Stat',
        arrayFields: {
          value: richTextField('Value'),
          label: richTextField('Label'),
        },
        defaultItemProps: { value: '৬৪', label: 'জেলা' },
      },
      areas: {
        type: 'array' as const,
        label: 'Coverage Areas',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getItemSummary: (item: any) => item.division || 'Area',
        arrayFields: {
          division: richTextField('Division Name'),
          districts: { type: 'textarea' as const, label: 'Districts (comma separated)' },
        },
        defaultItemProps: { division: 'নতুন বিভাগ', districts: 'জেলা ১, জেলা ২' },
      },
    },
    defaultProps: {
      tagText: 'Coverage Area',
      heading: 'সারাবাংলাদেশে',
      headingHighlight: 'আমাদের উপস্থিতি',
      subtitle: 'দেশের সকল বিভাগে আমাদের ডিলার নেটওয়ার্ক সক্রিয়। নতুন এলাকায় ডিলার নিয়োগ প্রক্রিয়া চলমান।',
      statTiles: [
        { value: '৬৪', label: 'জেলা' },
        { value: '৮', label: 'বিভাগ' },
        { value: '৫০০+', label: 'সক্রিয় ডিলার' },
        { value: 'সারাদেশ', label: 'কভারেজ' },
      ],
      areas: [
        { division: 'ঢাকা বিভাগ', districts: 'ঢাকা, গাজীপুর, মানিকগঞ্জ, নারায়ণগঞ্জ, টাঙ্গাইল, কিশোরগঞ্জ, ময়মনসিংহ' },
        { division: 'চট্টগ্রাম বিভাগ', districts: 'চট্টগ্রাম, কুমিল্লা, নোয়াখালী, ফেনী, ব্রাহ্মণবাড়িয়া, চাঁদপুর, লক্ষ্মীপুর' },
        { division: 'রাজশাহী বিভাগ', districts: 'রাজশাহী, বগুড়া, নাটোর, চাঁপাইনবাবগঞ্জ, পাবনা, সিরাজগঞ্জ, নওগাঁ' },
        { division: 'খুলনা বিভাগ', districts: 'খুলনা, যশোর, সাতক্ষীরা, বাগেরহাট, নড়াইল, মাগুরা, ঝিনাইদহ, কুষ্টিয়া' },
        { division: 'বরিশাল বিভাগ', districts: 'বরিশাল, পটুয়াখালী, ভোলা, পিরোজপুর, বরগুনা, ঝালকাঠি' },
        { division: 'সিলেট বিভাগ', districts: 'সিলেট, মৌলভীবাজার, হবিগঞ্জ, সুনামগঞ্জ' },
        { division: 'রংপুর বিভাগ', districts: 'রংপুর, দিনাজপুর, গাইবান্ধা, নীলফামারী, কুড়িগ্রাম, ঠাকুরগাঁও, পঞ্চগড়' },
        { division: 'ময়মনসিংহ বিভাগ', districts: 'ময়মনসিংহ, জামালপুর, শেরপুর, নেত্রকোণা' },
      ],
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render: (props: any) => <LocationCoverageRender {...props} />,
  },

  LocationDealerBenefitsBlock: {
    label: '📍 Location — Dealer Benefits',
    fields: {
      tagText: richTextField('Tag Text'),
      heading: richTextField('Heading'),
      headingHighlight: richTextField('Heading Highlight (gold)'),
      subtitle: richTextField('Subtitle'),
      benefits: {
        type: 'array' as const,
        label: 'Benefits',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getItemSummary: (item: any) => item.title || 'Benefit',
        arrayFields: {
          icon: { type: 'text' as const, label: 'Icon (emoji)' },
          title: richTextField('Title'),
          desc: richTextField('Description'),
        },
        defaultItemProps: { icon: '🤝', title: 'সুবিধা', desc: 'বিবরণ লিখুন...' },
      },
    },
    defaultProps: {
      tagText: 'Why Become A Dealer',
      heading: 'কেন হবেন',
      headingHighlight: 'আমাদের ডিলার?',
      subtitle: 'কৃষকদের কাছে ক্রমবর্ধমান জৈব সারের চাহিদা কাজে লাগিয়ে আপনার ব্যবসা গড়ে তুলুন।',
      benefits: [
        { icon: '🏢', title: 'বিশ্বস্ত ব্র্যান্ড সাপোর্ট', desc: 'প্যারাগন গ্রুপের শক্তিশালী ব্র্যান্ড পরিচিতি আপনার ব্যবসাকে এগিয়ে নিয়ে যাবে। বিজ্ঞাপন ও প্রচারণায় আমরা পাশে থাকব।' },
        { icon: '📈', title: 'লাভজনক ব্যবসার সুযোগ', desc: 'প্রতিযোগিতামূলক মূল্য ও আকর্ষণীয় কমিশনে পণ্য সরবরাহ। দীর্ঘমেয়াদী অংশীদারিত্বে লাভজনক ব্যবসা পরিচালনা।' },
        { icon: '👥', title: 'প্রশিক্ষণ ও উন্নয়ন', desc: 'নিয়মিত প্রশিক্ষণ, কৃষক সমাবেশ ও মার্কেটিং সহায়তা প্রদান করা হয়। আপনার দলকে আমরা দক্ষ করে তুলব।' },
        { icon: '🤝', title: 'দীর্ঘমেয়াদী অংশীদারিত্ব', desc: 'আমরা শুধু পণ্য বিক্রেতা খুঁজি না, প্রকৃত অংশীদার খুঁজি। আপনার সাফল্যই আমাদের সাফল্য।' },
      ],
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render: (props: any) => <LocationDealerBenefitsRender {...props} />,
  },

  LocationApplicationBlock: {
    label: '📍 Location — Apply Form',
    fields: {
      tagText: richTextField('Tag Text'),
      heading: richTextField('Heading'),
      headingHighlight: richTextField('Heading Highlight (gold)'),
      requirements: {
        type: 'array' as const,
        label: 'Requirements List',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getItemSummary: (item: any) => item.text || 'Requirement',
        arrayFields: {
          text: richTextField('Requirement Text'),
        },
        defaultItemProps: { text: 'প্রয়োজনীয় তথ্য' },
      },
      phone: { type: 'text' as const, label: 'Phone Number' },
      email: { type: 'text' as const, label: 'Email' },
      formTitle: richTextField('Form Title'),
      formSuccessTitle: richTextField('Success Title'),
      formSuccessText: richTextField('Success Message'),
      submitLabel: richTextField('Submit Button Label'),
    },
    defaultProps: {
      tagText: 'Apply Now',
      heading: 'ডিলারশিপের জন্য',
      headingHighlight: 'আবেদন করুন',
      requirements: [
        { text: 'নাম ও প্রতিষ্ঠানের নাম' },
        { text: 'যোগাযোগের মোবাইল নম্বর' },
        { text: 'ব্যবসার ঠিকানা (জেলা, উপজেলা)' },
        { text: 'সংক্ষিপ্ত ব্যবসায়িক অভিজ্ঞতার বিবরণ' },
        { text: 'কৃষি পণ্য বা সার ব্যবসার পূর্ব অভিজ্ঞতা (থাকলে)' },
      ],
      phone: '+880 1324-413282',
      email: 'info.fertilizer@paragon.com.bd',
      formTitle: 'আবেদন ফর্ম',
      formSuccessTitle: 'আবেদন সফলভাবে জমা হয়েছে!',
      formSuccessText: 'আমাদের টিম শীঘ্রই আপনার সাথে যোগাযোগ করবে। ধন্যবাদ আপনার আগ্রহের জন্য।',
      submitLabel: 'আবেদন জমা দিন',
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render: (props: any) => <LocationApplicationRender {...props} />,
  },
}
