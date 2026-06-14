'use client'

import { richTextField } from '@/puck/fields/richTextField'
import { RichText } from '@/components/puck/RichText'
import { useT } from '@/hooks/useT'

// ─── CareerWhyJoinBlock ───────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CareerWhyJoinRender(props: any) {
  const t = useT()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cards: { icon: string; title: string; desc: string }[] = props.cards || []

  return (
    <section className="py-20 lg:py-28" style={{ background: '#F8F5EE' }}>
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
          {cards.map((w, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-7 border"
              style={{ borderColor: 'rgba(27,77,62,0.08)' }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 text-xl"
                style={{ background: 'linear-gradient(135deg, #1B4D3E, #2D7A3A)', color: '#F5C842' }}
              >
                {w.icon}
              </div>
              <h4
                className="font-bold text-base mb-3"
                style={{ color: '#1B4D3E', fontFamily: 'var(--font-hind)' }}
              >
                <RichText html={t(w.title)} inline />
              </h4>
              <RichText
                html={t(w.desc)}
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

// ─── CareerFieldsBlock ────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CareerFieldsRender(props: any) {
  const t = useT()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fields: { icon: string; title: string; desc: string }[] = props.fields || []

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
            className="text-base"
            style={{ color: '#6b7280', fontFamily: 'var(--font-hind)' }}
          />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {fields.map((f, i) => (
            <div
              key={i}
              className="rounded-2xl p-6 border"
              style={{ background: '#F8F5EE', borderColor: 'rgba(27,77,62,0.07)' }}
            >
              <div className="text-4xl mb-4">{f.icon}</div>
              <h4
                className="font-bold text-sm mb-2"
                style={{ color: '#1B4D3E', fontFamily: 'var(--font-hind)' }}
              >
                <RichText html={t(f.title)} inline />
              </h4>
              <RichText
                html={t(f.desc)}
                className="text-xs leading-relaxed"
                style={{ color: '#9ca3af', fontFamily: 'var(--font-hind)' }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CareerProcessBlock ───────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CareerProcessRender(props: any) {
  const t = useT()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const steps: { no: string; title: string; desc: string }[] = props.steps || []
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ctaTags: { text: string }[] = props.ctaTags || []

  return (
    <div>
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

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border text-center"
                style={{ borderColor: 'rgba(27,77,62,0.08)' }}
              >
                <div
                  className="text-4xl font-bold mb-4"
                  style={{ color: 'rgba(27,77,62,0.1)', fontFamily: 'var(--font-inter)' }}
                >
                  <RichText html={t(s.no)} inline />
                </div>
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
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-20"
        style={{ background: 'linear-gradient(135deg, #0F2E24, #1B4D3E)' }}
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl"
            style={{ background: 'rgba(212,160,23,0.2)' }}
          >
            🎓
          </div>
          <h2
            className="text-3xl lg:text-4xl font-bold text-white mb-4"
            style={{ fontFamily: 'var(--font-hind)' }}
          >
            <RichText html={t(props.ctaTitle)} inline />{' '}
            <span style={{ color: '#F5C842' }}><RichText html={t(props.ctaHighlight)} inline /></span>
          </h2>
          <RichText
            html={t(props.ctaBody)}
            className="mb-4 text-lg"
            style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-hind)' }}
          />
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            {ctaTags.map((tag, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-sm"
                style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-hind)' }}
              >
                <span style={{ color: '#F5C842' }}>🏆</span>
                <RichText html={t(tag.text)} inline />
              </div>
            ))}
          </div>
          <a
            href={`mailto:${props.ctaEmail}`}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-base"
            style={{ background: 'linear-gradient(135deg, #D4A017, #F5C842)', color: '#1B4D3E', fontFamily: 'var(--font-hind)' }}
          >
            ✉️ {props.ctaEmail} →
          </a>
          <p
            className="mt-4 text-sm"
            style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-hind)' }}
          >
            {t('Subject line: “Application - [আপনার কাঙ্ক্ষিত পদের নাম]”', 'Subject line: “Application - [Your Desired Position Name]”')}
          </p>
        </div>
      </section>
    </div>
  )
}

// ─── Exports ──────────────────────────────────────────────────────────────────

export const careerBlocks = {
  CareerWhyJoinBlock: {
    label: '💼 Career — Why Join Us',
    fields: {
      tagText: richTextField('Tag Text'),
      heading: richTextField('Heading'),
      headingHighlight: richTextField('Heading Highlight (gold)'),
      subtitle: richTextField('Subtitle'),
      cards: {
        type: 'array' as const,
        label: 'Why Join Cards',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getItemSummary: (item: any) => item.title || 'Card',
        arrayFields: {
          icon: { type: 'text' as const, label: 'Icon (emoji)' },
          title: richTextField('Title'),
          desc: richTextField('Description'),
        },
        defaultItemProps: { icon: '🌿', title: 'কারণ', desc: 'বিবরণ লিখুন...' },
      },
    },
    defaultProps: {
      tagText: 'Why Join Us',
      heading: 'কেন আমাদের সাথে',
      headingHighlight: 'কাজ করবেন?',
      subtitle: 'আমরা শুধু চাকরি দিই না — একটি উদ্দেশ্যমুখী ক্যারিয়ার গড়ার সুযোগ দিই।',
      cards: [
        { icon: '💼', title: 'শীর্ষস্থানীয় প্রতিষ্ঠান', desc: 'বাংলাদেশের অন্যতম নেতৃস্থানীয় কৃষি-শিল্প প্রতিষ্ঠানে কর্মসংস্থানের সুযোগ।' },
        { icon: '🌿', title: 'পরিবেশ রক্ষায় অবদান', desc: 'আপনার কাজ সরাসরি মাটির স্বাস্থ্য রক্ষায় এবং পরিবেশবান্ধব কৃষির প্রসারে ভূমিকা রাখবে।' },
        { icon: '📈', title: 'পেশাদার উন্নয়ন', desc: 'নিয়মিত প্রশিক্ষণ, কর্মশালা এবং ক্যারিয়ার উন্নয়নের সুযোগ প্রদান করা হয়।' },
        { icon: '👥', title: 'প্রাণবন্ত পরিবেশ', desc: 'তরুণ, উদ্ভাবনী ও বৈচিত্র্যময় দলের সাথে কাজ করার সুযোগ।' },
      ],
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render: (props: any) => <CareerWhyJoinRender {...props} />,
  },

  CareerFieldsBlock: {
    label: '💼 Career — Open Positions',
    fields: {
      tagText: richTextField('Tag Text'),
      heading: richTextField('Heading'),
      headingHighlight: richTextField('Heading Highlight (gold)'),
      subtitle: richTextField('Subtitle'),
      fields: {
        type: 'array' as const,
        label: 'Position Fields',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getItemSummary: (item: any) => item.title || 'Position',
        arrayFields: {
          icon: { type: 'text' as const, label: 'Icon (emoji)' },
          title: richTextField('Title'),
          desc: richTextField('Description'),
        },
        defaultItemProps: { icon: '🌿', title: 'পদ', desc: 'বিবরণ লিখুন...' },
      },
    },
    defaultProps: {
      tagText: 'Open Positions',
      heading: 'কোন কোন',
      headingHighlight: 'বিভাগে সুযোগ আছে?',
      subtitle: 'আমরা বিভিন্ন বিভাগে প্রতিভাবান, উদ্যমী ও অভিজ্ঞ মানুষদের খুঁজছি।',
      fields: [
        { icon: '🌱', title: 'জৈব সার উৎপাদন', desc: 'উৎপাদন প্রক্রিয়া, মান নিয়ন্ত্রণ ও গবেষণায় দক্ষ প্রার্থী।' },
        { icon: '🔬', title: 'কৃষি ও মৃত্তিকাবিজ্ঞান', desc: 'কৃষিবিদ, মৃত্তিকাবিজ্ঞানী ও উদ্ভিদবিজ্ঞানী।' },
        { icon: '✅', title: 'গুণমান নিয়ন্ত্রণ', desc: 'ল্যাবরেটরি পরীক্ষা ও মান নিশ্চিতকরণে অভিজ্ঞ।' },
        { icon: '📢', title: 'বিপণন ও বিক্রয়', desc: 'ফিল্ড মার্কেটিং, ডিজিটাল মার্কেটিং ও সেলস প্রফেশনাল।' },
        { icon: '🧪', title: 'গবেষণা ও উন্নয়ন', desc: 'নতুন পণ্য উদ্ভাবন ও বিদ্যমান ফর্মুলা উন্নয়নে আগ্রহী।' },
        { icon: '🚛', title: 'সাপ্লাই চেইন', desc: 'লজিস্টিক্স, সরবরাহ ব্যবস্থাপনা ও ডিস্ট্রিবিউশনে দক্ষ।' },
        { icon: '⚙️', title: 'ইঞ্জিনিয়ারিং', desc: 'যন্ত্রপাতি রক্ষণাবেক্ষণ ও উৎপাদন প্রকৌশলে অভিজ্ঞ।' },
        { icon: '💼', title: 'প্রশাসন ও অর্থ', desc: 'HR, Finance ও Administrative পদে যোগ্য প্রার্থী।' },
      ],
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render: (props: any) => <CareerFieldsRender {...props} />,
  },

  CareerProcessBlock: {
    label: '💼 Career — Application Process & CTA',
    fields: {
      tagText: richTextField('Tag Text'),
      heading: richTextField('Heading'),
      headingHighlight: richTextField('Heading Highlight (gold)'),
      steps: {
        type: 'array' as const,
        label: 'Process Steps',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getItemSummary: (item: any) => item.title || 'Step',
        arrayFields: {
          no: richTextField('Step Number (e.g. ০১)'),
          title: richTextField('Title'),
          desc: richTextField('Description'),
        },
        defaultItemProps: { no: '০১', title: 'ধাপ', desc: 'বিবরণ লিখুন...' },
      },
      ctaTitle: richTextField('CTA Heading'),
      ctaHighlight: richTextField('CTA Highlight (gold)'),
      ctaBody: richTextField('CTA Body Text'),
      ctaTags: {
        type: 'array' as const,
        label: 'CTA Tags',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getItemSummary: (item: any) => item.text || 'Tag',
        arrayFields: {
          text: richTextField('Tag Text'),
        },
        defaultItemProps: { text: 'ট্যাগ' },
      },
      ctaEmail: { type: 'text' as const, label: 'Email Address' },
    },
    defaultProps: {
      tagText: 'Application Process',
      heading: 'আবেদন করার',
      headingHighlight: 'পদ্ধতি',
      steps: [
        { no: '০১', title: 'CV জমা দিন', desc: 'আপনার আপডেট করা CV, কভার লেটার এবং সংশ্লিষ্ট সার্টিফিকেটের কপি ইমেইলে পাঠান।' },
        { no: '০২', title: 'স্ক্রিনিং', desc: 'আমাদের HR টিম সব আবেদন পর্যালোচনা করে যোগ্য প্রার্থীদের সাথে যোগাযোগ করে।' },
        { no: '০৩', title: 'ইন্টারভিউ', desc: 'প্রাথমিক স্ক্রিনিং পেরোলে ফোন বা সরাসরি ইন্টারভিউয়ের জন্য আমন্ত্রণ জানানো হয়।' },
        { no: '০৪', title: 'যোগদান', desc: 'চূড়ান্ত নির্বাচন হলে নিয়োগপত্র ও অনবোর্ডিং প্রক্রিয়া সম্পন্ন হয়।' },
      ],
      ctaTitle: 'আপনার CV পাঠান',
      ctaHighlight: 'আজই',
      ctaBody: 'আমরা প্রতিনিয়ত প্রতিভাবান মানুষদের খুঁজে চলেছি। আপনার CV আমাদের ডেটাবেসে যুক্ত হলে উপযুক্ত পদ খালি হলে আমরা যোগাযোগ করব।',
      ctaTags: [
        { text: 'কৃষির প্রতি আগ্রহ' },
        { text: 'পরিবেশ সচেতনতা' },
        { text: 'দলগত কাজের মানসিকতা' },
      ],
      ctaEmail: 'careers@paragongroup.com.bd',
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render: (props: any) => <CareerProcessRender {...props} />,
  },
}
