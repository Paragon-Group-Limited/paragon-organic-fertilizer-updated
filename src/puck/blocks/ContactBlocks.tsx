'use client'

import { useState } from 'react'
import { richTextField } from '@/puck/fields/richTextField'
import { RichText } from '@/components/puck/RichText'
import { useT } from '@/hooks/useT'

// ─── ContactInfoBlock ─────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ContactInfoRender(props: any) {
  const t = useT()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cards: { icon: string; title: string; lines: ({ text: string } | string)[]; href?: string; color: string }[] = props.cards || []

  return (
    <section className="py-20 lg:py-28" style={{ background: '#F8F5EE' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-14">
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-7 border h-full"
              style={{ borderColor: 'rgba(27,77,62,0.08)' }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 text-xl"
                style={{ background: `linear-gradient(135deg, ${card.color}, ${card.color}cc)`, color: 'white' }}
              >
                {card.icon}
              </div>
              <h4
                className="font-bold text-base mb-4"
                style={{ color: '#1a2e1a', fontFamily: 'var(--font-hind)' }}
              >
                <RichText html={t(card.title)} inline />
              </h4>
              <div className="space-y-1.5">
                {(card.lines || []).map((line, j) => {
                  const text = typeof line === 'string' ? t(line) : t(line.text)
                  return card.href ? (
                    <a
                      key={j}
                      href={card.href}
                      className="block text-sm leading-relaxed hover:text-green-700 transition-colors"
                      style={{ color: '#4a5568', fontFamily: 'var(--font-hind)' }}
                    >
                      {text}
                    </a>
                  ) : (
                    <p
                      key={j}
                      className="text-sm leading-relaxed"
                      style={{ color: '#4a5568', fontFamily: 'var(--font-hind)' }}
                    >
                      {text}
                    </p>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── ContactFormMapBlock ──────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ContactFormMapRender(props: any) {
  const t = useT()
  const [form, setForm] = useState({ name: '', phone: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section className="py-20 lg:py-24" style={{ background: 'white' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2
              className="text-2xl lg:text-3xl font-bold mb-8"
              style={{ color: '#1a2e1a', fontFamily: 'var(--font-hind)' }}
            >
              <RichText html={t(props.formHeading)} inline />{' '}
              <span style={{ color: '#D4A017' }}><RichText html={t(props.formHighlight)} inline /></span>
            </h2>

            {sent ? (
              <div
                className="rounded-2xl p-10 text-center border"
                style={{ background: 'rgba(27,77,62,0.04)', borderColor: 'rgba(27,77,62,0.1)' }}
              >
                <div className="text-5xl mb-4">✓</div>
                <h3
                  className="text-xl font-bold mb-2"
                  style={{ color: '#1B4D3E', fontFamily: 'var(--font-hind)' }}
                >
                  {t('বার্তা পাঠানো হয়েছে!')}
                </h3>
                <p
                  className="text-sm"
                  style={{ color: '#6b7280', fontFamily: 'var(--font-hind)' }}
                >
                  {t('ধন্যবাদ! আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।')}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { id: 'name', label: t('আপনার নাম *'), placeholder: t('মো. করিম'), key: 'name' as const },
                    { id: 'phone', label: t('ফোন নম্বর *'), placeholder: '০১XXXXXXXXX', key: 'phone' as const },
                  ].map(field => (
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
                        value={form[field.key]}
                        onChange={e => setForm(p => ({ ...p, [field.key]: e.target.value }))}
                        required
                        className="w-full px-4 py-3 rounded-xl border text-sm outline-none"
                        style={{ borderColor: 'rgba(27,77,62,0.2)', fontFamily: 'var(--font-hind)', color: '#1a2e1a' }}
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <label
                    className="block text-sm font-semibold mb-1.5"
                    style={{ color: '#374151', fontFamily: 'var(--font-hind)' }}
                  >
                    {t('বিষয় *')}
                  </label>
                  <input
                    type="text"
                    placeholder={t('পণ্য সম্পর্কে জিজ্ঞাসা / ডিলারশিপ / অন্যান্য')}
                    value={form.subject}
                    onChange={e => setForm(p => ({ ...p, subject: e.target.value }))}
                    required
                    className="w-full px-4 py-3 rounded-xl border text-sm outline-none"
                    style={{ borderColor: 'rgba(27,77,62,0.2)', fontFamily: 'var(--font-hind)', color: '#1a2e1a' }}
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-semibold mb-1.5"
                    style={{ color: '#374151', fontFamily: 'var(--font-hind)' }}
                  >
                    {t('বার্তা *')}
                  </label>
                  <textarea
                    rows={5}
                    placeholder={t('আপনার বার্তা এখানে লিখুন...')}
                    value={form.message}
                    onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    required
                    className="w-full px-4 py-3 rounded-xl border text-sm outline-none resize-none"
                    style={{ borderColor: 'rgba(27,77,62,0.2)', fontFamily: 'var(--font-hind)', color: '#1a2e1a' }}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2"
                  style={{ background: 'linear-gradient(135deg, #1B4D3E, #2D7A3A)', color: 'white', fontFamily: 'var(--font-hind)' }}
                >
                  ✉️ {t('বার্তা পাঠান')}
                </button>
              </form>
            )}
          </div>

          <div>
            <h2
              className="text-2xl lg:text-3xl font-bold mb-8"
              style={{ color: '#1a2e1a', fontFamily: 'var(--font-hind)' }}
            >
              <RichText html={t(props.mapHeading)} inline />{' '}
              <span style={{ color: '#D4A017' }}><RichText html={t(props.mapHighlight)} inline /></span>
            </h2>
            <div
              className="rounded-2xl overflow-hidden mb-6 border"
              style={{ borderColor: 'rgba(27,77,62,0.08)' }}
            >
              <iframe
                src={props.mapSrc}
                width="100%"
                height="280"
                style={{ border: 0, display: 'block' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Paragon Group Office Location"
              />
            </div>
            <div
              className="rounded-2xl p-6 space-y-4"
              style={{ background: 'rgba(27,77,62,0.04)', border: '1px solid rgba(27,77,62,0.08)' }}
            >
              <div className="flex items-start gap-3">
                <span style={{ color: '#1B4D3E', fontSize: 16, marginTop: 2 }}>📍</span>
                <div>
                  <p
                    className="font-bold text-sm mb-1"
                    style={{ color: '#1a2e1a', fontFamily: 'var(--font-hind)' }}
                  >
                    <RichText html={t(props.officeName)} inline />
                  </p>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: '#6b7280', fontFamily: 'var(--font-hind)' }}
                  >
                    <RichText html={t(props.officeAddress)} inline />
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span style={{ color: '#1B4D3E', fontSize: 16 }}>💬</span>
                <div>
                  <p
                    className="font-bold text-sm mb-1"
                    style={{ color: '#1a2e1a', fontFamily: 'var(--font-hind)' }}
                  >
                    {t('পণ্য অর্ডার')}
                  </p>
                  <a
                    href={`mailto:${props.orderEmail}`}
                    className="text-sm"
                    style={{ color: '#1B4D3E', fontFamily: 'var(--font-inter)' }}
                  >
                    {props.orderEmail}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── ContactFAQBlock ──────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ContactFAQRender(props: any) {
  const t = useT()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const faqs: { q: string; a: string }[] = props.faqs || []

  return (
    <section className="py-20 lg:py-28" style={{ background: '#F8F5EE' }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ background: 'rgba(27,77,62,0.08)', color: '#1B4D3E', fontFamily: 'var(--font-inter)' }}
          >
            <RichText html={t(props.tagText)} inline />
          </span>
          <h2
            className="text-3xl font-bold"
            style={{ color: '#1a2e1a', fontFamily: 'var(--font-hind)' }}
          >
            <RichText html={t(props.heading)} inline />{' '}
            <span style={{ color: '#D4A017' }}><RichText html={t(props.headingHighlight)} inline /></span>
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-7 border"
              style={{ borderColor: 'rgba(27,77,62,0.08)' }}
            >
              <h4
                className="font-bold text-base mb-3"
                style={{ color: '#1B4D3E', fontFamily: 'var(--font-hind)' }}
              >
                {t('প্র:')} <RichText html={t(faq.q)} inline />
              </h4>
              <RichText
                html={t(faq.a)}
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

// ─── Exports ──────────────────────────────────────────────────────────────────

export const contactBlocks = {
  ContactInfoBlock: {
    label: '📞 Contact — Info Cards',
    fields: {
      tagText: richTextField('Tag Text'),
      heading: richTextField('Heading'),
      headingHighlight: richTextField('Heading Highlight (gold)'),
      cards: {
        type: 'array' as const,
        label: 'Contact Cards',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getItemSummary: (item: any) => item.title || 'Card',
        arrayFields: {
          icon: { type: 'text' as const, label: 'Icon (emoji)' },
          title: richTextField('Title'),
          lines: {
            type: 'array' as const,
            label: 'Lines',
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            getItemSummary: (item: any) => item.text || 'Line',
            arrayFields: {
              text: { type: 'text' as const, label: 'Text' },
            },
            defaultItemProps: { text: 'লাইন' },
          },
          href: { type: 'text' as const, label: 'Link (optional)' },
          color: { type: 'text' as const, label: 'Color (hex)' },
        },
        defaultItemProps: { icon: '📞', title: 'যোগাযোগ', lines: [], href: '', color: '#1B4D3E' },
      },
    },
    defaultProps: {
      tagText: 'Contact Details',
      heading: 'আমাদের',
      headingHighlight: 'সাথে কথা বলুন',
      cards: [
        { icon: '📞', title: 'ফোন', lines: [{ text: '+880 1711-630515' }, { text: '+880 9678-882102' }], href: 'tel:+8801711630515', color: '#1B4D3E' },
        { icon: '✉️', title: 'ইমেইল', lines: [{ text: 'info@paragongroup-bd.com' }, { text: 'info.fertilizer@paragon.com.bd' }], href: 'mailto:info@paragongroup-bd.com', color: '#2D7A3A' },
        { icon: '📍', title: 'ঠিকানা', lines: [{ text: 'প্যারাগন হাউস' }, { text: '৫ মহাখালি সি/এ, ঢাকা ১২১২' }, { text: 'বাংলাদেশ' }], href: 'https://maps.google.com/?q=Mohakhali+CA+Dhaka', color: '#D4A017' },
        { icon: '🕐', title: 'অফিস সময়', lines: [{ text: 'রবি – বৃহঃ: সকাল ৯টা – বিকাল ৫টা' }, { text: 'শুক্র: সকাল ৯টা – দুপুর ১টা' }, { text: 'শনি: বন্ধ' }], href: '', color: '#1B4D3E' },
      ],
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render: (props: any) => <ContactInfoRender {...props} />,
  },

  ContactFormMapBlock: {
    label: '📞 Contact — Form & Map',
    fields: {
      formHeading: richTextField('Form Heading'),
      formHighlight: richTextField('Form Heading Highlight (gold)'),
      mapHeading: richTextField('Map Heading'),
      mapHighlight: richTextField('Map Heading Highlight (gold)'),
      mapSrc: { type: 'text' as const, label: 'Google Maps Embed URL' },
      officeName: richTextField('Office Name'),
      officeAddress: richTextField('Office Address'),
      orderEmail: { type: 'text' as const, label: 'Order Email' },
    },
    defaultProps: {
      formHeading: 'বার্তা পাঠান',
      formHighlight: 'আমাদের কাছে',
      mapHeading: 'আমাদের',
      mapHighlight: 'কার্যালয়',
      mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.424!2d90.40315!3d23.77932!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c70000000001%3A0x0!2sMohakhali+CA%2C+Dhaka!5e0!3m2!1sen!2sbd!4v1699000000000',
      officeName: 'প্রধান কার্যালয়',
      officeAddress: 'প্যারাগন হাউস, ৫ মহাখালি সি/এ, ঢাকা ১২১২, বাংলাদেশ',
      orderEmail: 'info.fertilizer@paragon.com.bd',
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render: (props: any) => <ContactFormMapRender {...props} />,
  },

  ContactFAQBlock: {
    label: '📞 Contact — FAQ Section',
    fields: {
      tagText: richTextField('Tag Text'),
      heading: richTextField('Heading'),
      headingHighlight: richTextField('Heading Highlight (gold)'),
      faqs: {
        type: 'array' as const,
        label: 'FAQ Items',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getItemSummary: (item: any) => item.q || 'FAQ',
        arrayFields: {
          q: richTextField('Question'),
          a: richTextField('Answer'),
        },
        defaultItemProps: { q: 'প্রশ্ন?', a: 'উত্তর লিখুন...' },
      },
    },
    defaultProps: {
      tagText: 'FAQ',
      heading: 'সাধারণ',
      headingHighlight: 'প্রশ্নোত্তর',
      faqs: [
        { q: 'পণ্য কোথা থেকে কিনব?', a: 'সারাদেশে আমাদের অনুমোদিত ডিলারদের মাধ্যমে পণ্য পাওয়া যায়। নিকটতম ডিলারের তথ্য জানতে আমাদের ফোন করুন বা ডিলারশিপ পেজ দেখুন।' },
        { q: 'কোন ফসলে ব্যবহার করা যায়?', a: 'ধান, সবজি, ফল, গম, পাট সহ সকল ধরনের ফসলে প্যারাগন জৈব সার ব্যবহার করা যায়।' },
        { q: 'প্রতি বিঘায় কতটুকু দিতে হবে?', a: 'সাধারণত প্রতি বিঘায় ১৫-২০ কেজি ব্যবহার করা হয়। তবে মাটির অবস্থা অনুযায়ী পরিমাণ কম-বেশি হতে পারে।' },
        { q: 'রাসায়নিক সারের সাথে কি মেশানো যায়?', a: 'হ্যাঁ, প্রাথমিকভাবে রাসায়নিক ও জৈব সার একসাথে ব্যবহার করা যায়। ধীরে ধীরে রাসায়নিক সারের পরিমাণ কমিয়ে সম্পূর্ণ জৈব পদ্ধতিতে চলে আসা ভালো।' },
      ],
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render: (props: any) => <ContactFAQRender {...props} />,
  },
}
