'use client'

import type { Config } from '@puckeditor/core'
import { richTextField } from '@/puck/fields/richTextField'
import { imageUploadField } from '@/puck/fields/imageUploadField'
import { RichText } from '@/components/puck/RichText'
import { useT } from '@/hooks/useT'
import { HomeSlidesBlock } from './blocks/HomeSlidesBlock'
import { StatsSectionBlock } from './blocks/StatsSectionBlock'
import { AboutSectionBlock } from './blocks/AboutSectionBlock'
import { ProblemSectionBlock } from './blocks/ProblemSectionBlock'
import { HowItWorksBlock } from './blocks/HowItWorksBlock'
import { ProductsPreviewBlock } from './blocks/ProductsPreviewBlock'
import { CTASectionBlock } from './blocks/CTASectionBlock'
import { StaticPageBlock } from './blocks/StaticPageBlock'
import { PageBannerBlock } from './blocks/PageBannerBlock'
import { ourStoryBlocks } from './blocks/OurStoryBlocks'
import { soilBenefitBlocks } from './blocks/SoilBenefitBlocks'
import { whyProductBlocks } from './blocks/WhyProductBlocks'
import { paragonGroupBlocks } from './blocks/ParagonGroupBlocks'
import { locationBlocks } from './blocks/LocationBlocks'
import { careerBlocks } from './blocks/CareerBlocks'
import { contactBlocks } from './blocks/ContactBlocks'
import { productsBlocks } from './blocks/ProductsBlocks'
import { LiveProductsBlock } from './blocks/LiveProductsBlock'
import { youTubeVideoGridBlock } from './blocks/YouTubeVideoGridBlock'
import { genericBlocks } from './blocks/GenericBlocks'

// ── Inline block wrappers that use useLanguage ───────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function HeroBannerRender(props: any) {
  const t = useT()
  return (
    <div style={{ background: props.bgColor, padding: '80px 40px', textAlign: 'center' }}>
      <p style={{ color: '#D4A017', fontSize: 14, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 12, fontFamily: 'var(--font-inter)' }}>
        <RichText html={t(props.headingEn || '', props.headingEn)} inline />
      </p>
      <h1 style={{ color: 'white', fontSize: 48, fontWeight: 700, marginBottom: 20, fontFamily: 'var(--font-hind)' }}>
        <RichText html={t(props.headingBn, props.headingEnMain)} inline />
      </h1>
      <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 18, marginBottom: 32, fontFamily: 'var(--font-hind)' }}>
        <RichText html={t(props.subtitleBn, props.subtitleEn)} />
      </div>
      {props.ctaLabel && (
        <a href={props.ctaHref} style={{ background: 'linear-gradient(135deg,#D4A017,#F5C842)', color: '#1B4D3E', padding: '14px 32px', borderRadius: 50, fontWeight: 700, textDecoration: 'none', fontFamily: 'var(--font-hind)' }}>
          <RichText html={t(props.ctaLabel, props.ctaLabelEn)} inline />
        </a>
      )}
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ContentBlockRender(props: any) {
  const t = useT()
  return (
    <div style={{ background: props.bgColor, padding: '80px 40px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: props.layout === 'image-right' ? 'row-reverse' : 'row', gap: 60, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 280 }}>
          {props.imageUrl
            ? <img src={props.imageUrl} alt={props.imageAlt} style={{ width: '100%', borderRadius: 20, objectFit: 'cover', aspectRatio: '4/3' }} />
            : <div style={{ width: '100%', aspectRatio: '4/3', borderRadius: 20, background: 'linear-gradient(135deg,#1B4D3E,#2D7A3A)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 64 }}>🌿</div>}
        </div>
        <div style={{ flex: 1, minWidth: 280 }}>
          <h2 style={{ fontSize: 36, fontWeight: 700, color: '#1B4D3E', marginBottom: 16, fontFamily: 'var(--font-hind)' }}>
            <RichText html={t(props.titleBn, props.titleEn)} inline />
          </h2>
          <div style={{ fontSize: 16, lineHeight: 1.8, color: '#4a5568', marginBottom: 28, fontFamily: 'var(--font-hind)' }}>
            <RichText html={t(props.bodyBn, props.bodyEn)} />
          </div>
          {props.ctaLabel && (
            <a href={props.ctaHref} style={{ display: 'inline-block', background: 'linear-gradient(135deg,#1B4D3E,#2D7A3A)', color: 'white', padding: '12px 28px', borderRadius: 50, fontWeight: 600, textDecoration: 'none', fontFamily: 'var(--font-hind)' }}>
              <RichText html={t(props.ctaLabel, props.ctaLabelEn)} inline />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function SectionHeadingRender(props: any) {
  const t = useT()
  return (
    <div style={{ padding: '60px 40px 20px', textAlign: props.align, maxWidth: 1200, margin: '0 auto' }}>
      <span style={{ display: 'inline-block', padding: '6px 16px', borderRadius: 50, fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 4, background: 'rgba(27,77,62,0.08)', color: '#1B4D3E', marginBottom: 16, fontFamily: 'var(--font-inter)' }}>
        <RichText html={t(props.tagBn, props.tagEn)} inline />
      </span>
      <h2 style={{ fontSize: 40, fontWeight: 700, color: '#1a2e1a', fontFamily: 'var(--font-hind)' }}>
        <RichText html={t(props.titleBn, props.titleEn)} inline />
        {props.titleHighlight && (
          <> <span style={{ color: '#D4A017' }}><RichText html={t(props.titleHighlight, props.titleHighlightEn)} inline /></span></>
        )}
      </h2>
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function StatsRowRender(props: any) {
  const t = useT()
  const stats = [
    { v: props.stat1Value, l: props.stat1Label, lEn: props.stat1LabelEn },
    { v: props.stat2Value, l: props.stat2Label, lEn: props.stat2LabelEn },
    { v: props.stat3Value, l: props.stat3Label, lEn: props.stat3LabelEn },
    { v: props.stat4Value, l: props.stat4Label, lEn: props.stat4LabelEn },
  ]
  return (
    <div style={{ background: 'linear-gradient(135deg,#1B4D3E,#0F2E24)', padding: '60px 40px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 2 }}>
        {stats.map((s, i) => (
          <div key={i} style={{ textAlign: 'center', padding: '30px 20px' }}>
            <div style={{ fontSize: 40, fontWeight: 700, color: 'white', fontFamily: 'var(--font-hind)' }}><RichText html={s.v} inline /></div>
            <div style={{ fontSize: 14, color: '#D4A017', marginTop: 4, fontFamily: 'var(--font-hind)' }}><RichText html={t(s.l, s.lEn)} inline /></div>
          </div>
        ))}
      </div>
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CardGridRender(props: any) {
  const t = useT()
  const cards = [
    { t: props.card1Title, tEn: props.card1TitleEn, b: props.card1Body, bEn: props.card1BodyEn, i: props.card1Icon },
    { t: props.card2Title, tEn: props.card2TitleEn, b: props.card2Body, bEn: props.card2BodyEn, i: props.card2Icon },
    { t: props.card3Title, tEn: props.card3TitleEn, b: props.card3Body, bEn: props.card3BodyEn, i: props.card3Icon },
  ]
  return (
    <div style={{ padding: '40px', maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${props.columns},1fr)`, gap: 24 }}>
        {cards.map((c, idx) => (
          <div key={idx} style={{ background: 'white', borderRadius: 20, padding: 32, border: '1px solid rgba(27,77,62,0.08)', boxShadow: '0 4px 24px rgba(27,77,62,0.06)' }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>{c.i}</div>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#1B4D3E', marginBottom: 10, fontFamily: 'var(--font-hind)' }}><RichText html={t(c.t, c.tEn)} inline /></h3>
            <div style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.8, fontFamily: 'var(--font-hind)' }}><RichText html={t(c.b, c.bEn)} /></div>
          </div>
        ))}
      </div>
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CTABannerRender(props: any) {
  const t = useT()
  return (
    <div style={{ background: 'linear-gradient(135deg,#0F2E24,#1B4D3E,#2D7A3A)', padding: '80px 40px', textAlign: 'center' }}>
      <h2 style={{ color: 'white', fontSize: 40, fontWeight: 700, marginBottom: 16, fontFamily: 'var(--font-hind)' }}><RichText html={t(props.titleBn, props.titleEn)} inline /></h2>
      <div style={{ color: 'rgba(255,255,255,0.72)', fontSize: 18, marginBottom: 32, fontFamily: 'var(--font-hind)' }}><RichText html={t(props.subtitleBn, props.subtitleEn)} /></div>
      <a href={props.ctaHref} style={{ background: 'linear-gradient(135deg,#D4A017,#F5C842)', color: '#1B4D3E', padding: '16px 40px', borderRadius: 50, fontWeight: 700, textDecoration: 'none', fontSize: 16, fontFamily: 'var(--font-hind)' }}>
        <RichText html={t(props.ctaLabel, props.ctaLabelEn)} inline />
      </a>
    </div>
  )
}

// ────────────────────────────────────────────────────────────────────────────

export const puckConfig: Config = {
  categories: {
    // ── Visible in "Add New Blocks" panel ──────────────────────────
    '🎨 Site Layout': {
      components: ['NavbarConfigBlock', 'FooterConfigBlock'],
      visible: false,
    },
    '🎬 YouTube ভিডিও': {
      components: ['YouTubeVideoGridBlock'],
    },
    'সাধারণ ব্লক': {
      components: ['HeroBanner', 'ContentBlock', 'SectionHeading', 'StatsRow', 'TextBlock', 'CardGrid', 'CTABanner'],
    },
    '🧩 Generic Blocks': {
      components: ['HeroSection', 'ImageText', 'FeatureGrid', 'Testimonials', 'FAQAccordion', 'IconList', 'GalleryGrid', 'Spacer', 'Divider'],
    },
    // ── Hidden from panel (page-specific blocks, added via Existing Sections) ──
    'পেজ কন্টেন্ট': {
      components: ['StaticPageBlock'],
      visible: false,
    },
    '🎨 পেজ ব্যানার': {
      components: ['PageBannerBlock'],
      visible: false,
    },
    '📖 About — Our Story': {
      components: ['OurStoryFoundingBlock', 'OurStoryTimelineBlock', 'OurStorySuccessStoriesBlock', 'OurStoryValuesBlock'],
      visible: false,
    },
    '🌱 About — Soil Benefit': {
      components: ['SoilApplicationTableBlock', 'SoilProblemBlock', 'SoilBenefitCardsBlock', 'SoilHowItWorksBlock', 'SoilComparisonBlock'],
      visible: false,
    },
    '✅ About — Why This Product': {
      components: ['WhyProductContentBlock', 'WhyUSPBlock', 'WhyTestimonialsBlock'],
      visible: false,
    },
    '🏢 About — Paragon Group': {
      components: ['ParagonAboutBlock', 'ParagonVisionBlock', 'ParagonBusinessesBlock', 'ParagonWhyOrganicBlock'],
      visible: false,
    },
    '📍 Location': {
      components: ['LocationMapContactBlock', 'LocationCoverageBlock', 'LocationDealerBenefitsBlock', 'LocationApplicationBlock'],
      visible: false,
    },
    '💼 Career': {
      components: ['CareerWhyJoinBlock', 'CareerFieldsBlock', 'CareerProcessBlock'],
      visible: false,
    },
    '📞 Contact': {
      components: ['ContactInfoBlock', 'ContactFormMapBlock', 'ContactFAQBlock'],
      visible: false,
    },
    '📦 Products': {
      components: ['LiveProductsBlock', 'ProductsGridBlock', 'ProductsCtaBannerBlock'],
      visible: false,
    },
    'হোম পেজ সেকশন': {
      components: ['HomeSlidesBlock', 'StatsSectionBlock', 'AboutSectionBlock', 'ProblemSectionBlock', 'HowItWorksBlock', 'ProductsPreviewBlock', 'CTASectionBlock'],
      visible: false,
    },
  },

  components: {
    PageBannerBlock: {
      label: '🎨 Page Banner (inner page header)',
      fields: {
        tagText: richTextField('Tag Text (pill badge)'),
        tagTextEn: richTextField('Tag Text (English)'),
        title: richTextField('Title (white)'),
        titleEn: richTextField('Title (English)'),
        titleHighlight: richTextField('Title Highlight (gold color)'),
        titleHighlightEn: richTextField('Title Highlight (English)'),
        subtitle: richTextField('Subtitle'),
        subtitleEn: richTextField('Subtitle (English)'),
        bgGradient: { type: 'text', label: 'Background Gradient (CSS)' },
        bgImageUrl: imageUploadField('Banner Background Image (optional — overlaid with gradient)'),
        align: { type: 'radio', label: 'Alignment', options: [{ label: 'Left', value: 'left' }, { label: 'Center', value: 'center' }, { label: 'Right', value: 'right' }] },
        showTag: { type: 'radio', label: '👁 Show Tag Badge', options: [{ label: 'দেখাও', value: 'yes' }, { label: 'লুকাও', value: 'no' }] },
        showTitle: { type: 'radio', label: '👁 Show Title', options: [{ label: 'দেখাও', value: 'yes' }, { label: 'লুকাও', value: 'no' }] },
        showSubtitle: { type: 'radio', label: '👁 Show Subtitle', options: [{ label: 'দেখাও', value: 'yes' }, { label: 'লুকাও', value: 'no' }] },
        breadcrumb1Label: richTextField('Breadcrumb 1 Label'),
        breadcrumb1LabelEn: richTextField('Breadcrumb 1 Label (English)'),
        breadcrumb1Href: { type: 'text', label: 'Breadcrumb 1 Href (optional)' },
        breadcrumb2Label: richTextField('Breadcrumb 2 Label (optional)'),
        breadcrumb2LabelEn: richTextField('Breadcrumb 2 Label (English, optional)'),
      },
      defaultProps: {
        tagText: 'About', tagTextEn: 'About',
        title: 'আমাদের', titleEn: 'About',
        titleHighlight: 'সম্পর্কে', titleHighlightEn: 'Us',
        subtitle: 'প্যারাগন জৈব সার — মাটির প্রাণ, কৃষকের আস্থা।', subtitleEn: 'Paragon Organic Fertilizer — Soul of Soil, Farmer\'s Trust.',
        bgGradient: 'linear-gradient(135deg, #0a1f14 0%, #1B4D3E 55%, #2D7A3A 100%)',
        align: 'left',
        showTag: 'yes', showTitle: 'yes', showSubtitle: 'yes',
        breadcrumb1Label: 'আমাদের সম্পর্কে', breadcrumb1LabelEn: 'About Us',
        breadcrumb1Href: '/about/our-story',
        breadcrumb2Label: '', breadcrumb2LabelEn: '',
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (props: any) => <PageBannerBlock {...props} />,
    },

    ...ourStoryBlocks,
    ...soilBenefitBlocks,
    ...whyProductBlocks,
    ...paragonGroupBlocks,
    ...locationBlocks,
    ...careerBlocks,
    ...contactBlocks,
    ...productsBlocks,
    LiveProductsBlock: {
      label: '📦 Live Products (fetches real data)',
      fields: {},
      defaultProps: {},
      render: () => <LiveProductsBlock />,
    },
    ...youTubeVideoGridBlock,
    ...genericBlocks,

    // ══════════════════════════════════════════════════════════════
    // HOME PAGE BLOCKS
    // ══════════════════════════════════════════════════════════════

    HomeSlidesBlock: {
      label: '🎞 Hero Slider (Banner)',
      fields: {
        slides: {
          type: 'array',
          label: 'Slides (banner গুলো)',
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          getItemSummary: (item: any) => item.headingBn || 'Slide',
          arrayFields: {
            headingBn: richTextField('Heading (বাংলা) *'),
            headingEn: richTextField('Heading (English)'),
            tagBn: richTextField('Tag (বাংলা)'),
            tagEn: richTextField('Tag (English)'),
            subtitleBn: richTextField('Subtitle (বাংলা)'),
            subtitleEn: richTextField('Subtitle (English)'),
            imageUrl: imageUploadField('Slide Image'),
            bgColor: { type: 'text', label: 'Background Color (image না থাকলে)' },
            accentColor: { type: 'text', label: 'Accent Color (default: #D4A017)' },
            cta1Label: richTextField('Button 1 Label (বাংলা)'),
            cta1LabelEn: richTextField('Button 1 Label (English)'),
            cta1Href: { type: 'text', label: 'Button 1 Link' },
            cta2Label: richTextField('Button 2 Label (বাংলা)'),
            cta2LabelEn: richTextField('Button 2 Label (English)'),
            cta2Href: { type: 'text', label: 'Button 2 Link' },
            align: { type: 'radio', label: 'Text Alignment', options: [{ label: 'Left', value: 'left' }, { label: 'Center', value: 'center' }, { label: 'Right', value: 'right' }] },
            showTag: { type: 'radio', label: '👁 Show Tag', options: [{ label: 'দেখাও', value: 'yes' }, { label: 'লুকাও', value: 'no' }] },
            showHeading: { type: 'radio', label: '👁 Show Heading', options: [{ label: 'দেখাও', value: 'yes' }, { label: 'লুকাও', value: 'no' }] },
            showSubtitle: { type: 'radio', label: '👁 Show Subtitle', options: [{ label: 'দেখাও', value: 'yes' }, { label: 'লুকাও', value: 'no' }] },
            showButtons: { type: 'radio', label: '👁 Show Buttons', options: [{ label: 'দেখাও', value: 'yes' }, { label: 'লুকাও', value: 'no' }] },
          },
          defaultItemProps: {
            headingBn: 'নতুন Slide', headingEn: 'New Slide',
            tagBn: '', tagEn: '', subtitleBn: '', subtitleEn: '',
            imageUrl: '', bgColor: '#1B4D3E', accentColor: '#D4A017',
            cta1Label: 'আরও জানুন', cta1LabelEn: 'Learn More', cta1Href: '/',
            cta2Label: '', cta2LabelEn: '', cta2Href: '',
            align: 'left', showTag: 'yes', showHeading: 'yes', showSubtitle: 'yes', showButtons: 'yes',
          },
        },
      },
      defaultProps: {
        slides: [
          {
            headingBn: 'প্যারাগন জৈব সার', headingEn: 'Paragon Organic Fertilizer',
            tagBn: 'মাটির প্রাণ, কৃষকের আস্থা', tagEn: "Soul of Soil, Farmer's Trust",
            subtitleBn: 'উপকারী অণুজীব সমৃদ্ধ ১০০% অর্গানিক জৈব সার — মাটির গঠন উন্নত করতে, উর্বরতা বাড়াতে এবং ফসলের স্বাভাবিক বৃদ্ধিতে কার্যকর।',
            subtitleEn: '100% organic fertilizer enriched with beneficial microorganisms — effective for improving soil structure, increasing fertility and ensuring natural crop growth.',
            imageUrl: '', bgColor: 'linear-gradient(135deg, #0a1f14 0%, #1B4D3E 55%, #2D7A3A 100%)', accentColor: '#D4A017',
            cta1Label: 'আমাদের পণ্য দেখুন', cta1LabelEn: 'View Our Products', cta1Href: '/products',
            cta2Label: 'আরও জানুন', cta2LabelEn: 'Learn More', cta2Href: '/about/our-story',
          },
          {
            headingBn: 'মাটি বাঁচান, ফসল বাড়ান', headingEn: 'Save Soil, Grow More',
            tagBn: 'মাটির স্বাস্থ্য রক্ষা করুন', tagEn: "Protect Your Soil's Health",
            subtitleBn: 'বারবার চাষ এবং রাসায়নিক সারের অতিরিক্ত ব্যবহারে ক্ষতিগ্রস্ত মাটিকে পুনরুজ্জীবিত করুন।',
            subtitleEn: 'Revitalize soil damaged by repeated cultivation and overuse of chemical fertilizers.',
            imageUrl: '', bgColor: 'linear-gradient(135deg, #0d2438 0%, #1a3d2b 45%, #0F5132 100%)', accentColor: '#4CAF50',
            cta1Label: 'কীভাবে কাজ করে?', cta1LabelEn: 'How It Works?', cta1Href: '/about/soil-benefit',
            cta2Label: 'ডিলার খুঁজুন', cta2LabelEn: 'Find a Dealer', cta2Href: '/dealership',
          },
          {
            headingBn: 'হাজার কৃষকের বিশ্বাস', headingEn: 'Trusted by Thousands of Farmers',
            tagBn: 'বাংলাদেশের কৃষকদের পাশে', tagEn: 'Standing With Bangladeshi Farmers',
            subtitleBn: 'সারাদেশে হাজার হাজার কৃষক প্যারাগন জৈব সার ব্যবহার করে উৎপাদন বাড়াচ্ছেন।',
            subtitleEn: 'Thousands of farmers across the country are increasing production using Paragon Organic Fertilizer.',
            imageUrl: '', bgColor: 'linear-gradient(160deg, #1B4D3E 0%, #0F2E24 50%, #0a1a10 100%)', accentColor: '#D4A017',
            cta1Label: 'যোগাযোগ করুন', cta1LabelEn: 'Contact Us', cta1Href: '/contact',
            cta2Label: 'ক্যারিয়ার', cta2LabelEn: 'Career', cta2Href: '/career',
          },
        ],
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (props: any) => <HomeSlidesBlock slides={props.slides} />,
    },

    StatsSectionBlock: {
      label: '📊 Stats Section (সংখ্যা)',
      fields: {
        stat1ValueBn: richTextField('Stat 1 Value (বড় সংখ্যা)'), stat1LabelBn: richTextField('Stat 1 Label (বাংলা)'), stat1LabelEn: richTextField('Stat 1 Label (English)'),
        stat2ValueBn: richTextField('Stat 2 Value (বড় সংখ্যা)'), stat2LabelBn: richTextField('Stat 2 Label (বাংলা)'), stat2LabelEn: richTextField('Stat 2 Label (English)'),
        stat3ValueBn: richTextField('Stat 3 Value (বড় সংখ্যা)'), stat3LabelBn: richTextField('Stat 3 Label (বাংলা)'), stat3LabelEn: richTextField('Stat 3 Label (English)'),
        stat4ValueBn: richTextField('Stat 4 Value (বড় সংখ্যা)'), stat4LabelBn: richTextField('Stat 4 Label (বাংলা)'), stat4LabelEn: richTextField('Stat 4 Label (English)'),
      },
      defaultProps: {
        stat1ValueBn: '১০০%', stat1LabelBn: 'অর্গানিক জৈব সার', stat1LabelEn: 'Certified Organic',
        stat2ValueBn: '৫০০০+', stat2LabelBn: 'সন্তুষ্ট কৃষক', stat2LabelEn: 'Happy Farmers',
        stat3ValueBn: '১০+', stat3LabelBn: 'বছরের অভিজ্ঞতা', stat3LabelEn: 'Years Experience',
        stat4ValueBn: '৩টি', stat4LabelBn: 'প্রিমিয়াম পণ্য', stat4LabelEn: 'Premium Products',
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (props: any) => <StatsSectionBlock {...props} />,
    },

    AboutSectionBlock: {
      label: '🌿 About Section (আমাদের সম্পর্কে)',
      fields: {
        tagText: richTextField('Tag Text (বাংলা)'),
        tagTextEn: richTextField('Tag Text (English)'),
        headingLine1: richTextField('Heading Line 1 (বাংলা)'),
        headingLine1En: richTextField('Heading Line 1 (English)'),
        highlightText: richTextField('Highlighted Text (বাংলা)'),
        highlightTextEn: richTextField('Highlighted Text (English)'),
        bodyText: richTextField('Body Text (বাংলা)'),
        bodyTextEn: richTextField('Body Text (English)', 100),
        feature1: richTextField('Feature 1 (বাংলা)'), feature1En: richTextField('Feature 1 (English)'),
        feature2: richTextField('Feature 2 (বাংলা)'), feature2En: richTextField('Feature 2 (English)'),
        feature3: richTextField('Feature 3 (বাংলা)'), feature3En: richTextField('Feature 3 (English)'),
        feature4: richTextField('Feature 4 (বাংলা)'), feature4En: richTextField('Feature 4 (English)'),
        ctaLabel: richTextField('Button Label (বাংলা)'), ctaLabelEn: richTextField('Button Label (English)'),
        ctaHref: { type: 'text', label: 'Button Link' },
        badgeValue: richTextField('Badge Value (e.g. ১০০%)'),
        badgeLabel: richTextField('Badge Label (বাংলা)'), badgeLabelEn: richTextField('Badge Label (English)'),
        imageUrl: imageUploadField('Section Image (optional)'),
      },
      defaultProps: {
        tagText: 'আমাদের সম্পর্কে', tagTextEn: 'About Us',
        headingLine1: 'মাটিকে সুস্থ রাখুন,', headingLine1En: 'Keep Your Soil Healthy,',
        highlightText: 'ফসল বাড়ান', highlightTextEn: 'Grow More',
        bodyText: 'প্যারাগন জৈব সার উপকারী অণুজীব সমৃদ্ধ একটি ১০০% প্রাকৃতিক সার, যা বাংলাদেশের কৃষিজমির মাটির উর্বরতা পুনরুদ্ধার করতে এবং ফসলের স্বাভাবিক বৃদ্ধি নিশ্চিত করতে বিশেষভাবে তৈরি।',
        bodyTextEn: 'Paragon Organic Fertilizer is a 100% natural fertilizer enriched with beneficial microorganisms, specially formulated to restore soil fertility and ensure natural crop growth in Bangladeshi farmland.',
        feature1: 'উপকারী অণুজীব সমৃদ্ধ প্রাকৃতিক উপাদান', feature1En: 'Natural ingredients rich in beneficial microorganisms',
        feature2: 'মাটির জৈব পদার্থ বৃদ্ধি করে', feature2En: 'Increases soil organic matter',
        feature3: 'ফসলের রোগ প্রতিরোধ ক্ষমতা বাড়ায়', feature3En: 'Boosts crop disease resistance',
        feature4: 'রাসায়নিক সারের নির্ভরতা কমায়', feature4En: 'Reduces dependence on chemical fertilizers',
        ctaLabel: 'আমাদের গল্প জানুন', ctaLabelEn: 'Our Story', ctaHref: '/about/our-story',
        badgeValue: '১০০%', badgeLabel: 'প্রাকৃতিক উপাদান', badgeLabelEn: 'Natural Ingredients',
        imageUrl: '',
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (props: any) => <AboutSectionBlock {...props} />,
    },

    ProblemSectionBlock: {
      label: '⚠️ Problem & Solution Section',
      fields: {
        tagText: richTextField('Tag Text (বাংলা)'), tagTextEn: richTextField('Tag Text (English)'),
        headingBn: richTextField('Heading (বাংলা)'), headingEn: richTextField('Heading (English)'),
        highlightText: richTextField('Highlighted Text (বাংলা)'), highlightTextEn: richTextField('Highlighted Text (English)'),
        problemTitle: richTextField('Problem Card Title (বাংলা)'), problemTitleEn: richTextField('Problem Card Title (English)'),
        prob1: richTextField('Problem 1 (বাংলা)'), prob1En: richTextField('Problem 1 (English)'),
        prob2: richTextField('Problem 2 (বাংলা)'), prob2En: richTextField('Problem 2 (English)'),
        prob3: richTextField('Problem 3 (বাংলা)'), prob3En: richTextField('Problem 3 (English)'),
        prob4: richTextField('Problem 4 (বাংলা)'), prob4En: richTextField('Problem 4 (English)'),
        solutionTitle: richTextField('Solution Card Title (বাংলা)'), solutionTitleEn: richTextField('Solution Card Title (English)'),
        sol1: richTextField('Solution 1 (বাংলা)'), sol1En: richTextField('Solution 1 (English)'),
        sol2: richTextField('Solution 2 (বাংলা)'), sol2En: richTextField('Solution 2 (English)'),
        sol3: richTextField('Solution 3 (বাংলা)'), sol3En: richTextField('Solution 3 (English)'),
        sol4: richTextField('Solution 4 (বাংলা)'), sol4En: richTextField('Solution 4 (English)'),
      },
      defaultProps: {
        tagText: 'সমস্যা ও সমাধান', tagTextEn: 'Problem & Solution',
        headingBn: 'বাংলাদেশের মাটির সংকট ও', headingEn: "Bangladesh's Soil Crisis &",
        highlightText: 'আমাদের সমাধান', highlightTextEn: 'Our Solution',
        problemTitle: 'বাংলাদেশের মাটির উর্বরতা কেন কমছে?', problemTitleEn: "Why is Bangladesh's soil fertility declining?",
        prob1: 'বারবার চাষের ফলে মাটির জৈব পদার্থ হ্রাস পাচ্ছে', prob1En: 'Repeated cultivation is reducing soil organic matter',
        prob2: 'অতিরিক্ত রাসায়নিক সার ব্যবহারে মাটি অম্লীয় হয়ে পড়ছে', prob2En: 'Excessive chemical fertilizer use is acidifying the soil',
        prob3: 'মাটির পানি ধারণ ক্ষমতা কমে যাচ্ছে', prob3En: 'Soil water retention capacity is decreasing',
        prob4: 'উপকারী অণুজীবের সংখ্যা উল্লেখযোগ্যভাবে কমছে', prob4En: 'The number of beneficial microorganisms is declining significantly',
        solutionTitle: 'প্যারাগন জৈব সার কীভাবে কাজ করে?', solutionTitleEn: 'How does Paragon Organic Fertilizer work?',
        sol1: 'মাটিতে জৈব পদার্থ ও পুষ্টি উপাদান পুনরায় যোগ করে', sol1En: 'Replenishes organic matter and nutrients in the soil',
        sol2: 'উপকারী অণুজীব সরবরাহ করে মাটির জীবন ফিরিয়ে আনে', sol2En: 'Restores soil life by supplying beneficial microorganisms',
        sol3: 'মাটির পানি ধারণ ও বায়ু চলাচল উন্নত করে', sol3En: 'Improves soil water retention and aeration',
        sol4: 'ফসলের উৎপাদন ৩০-৫০% পর্যন্ত বৃদ্ধি করতে সক্ষম', sol4En: 'Capable of increasing crop yield by 30-50%',
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (props: any) => <ProblemSectionBlock {...props} />,
    },

    HowItWorksBlock: {
      label: '🔄 How It Works (ব্যবহারের পদ্ধতি)',
      fields: {
        tagText: richTextField('Tag Text (বাংলা)'), tagTextEn: richTextField('Tag Text (English)'),
        headingBn: richTextField('Heading (বাংলা)'), headingEn: richTextField('Heading (English)'),
        highlightText: richTextField('Highlighted Text (বাংলা)'), highlightTextEn: richTextField('Highlighted Text (English)'),
        step1No: richTextField('Step 1 Number'),
        step1Icon: { type: 'text' as const, label: 'Step 1 Icon (emoji — image না দিলে)' },
        step1ImageUrl: imageUploadField('Step 1 Icon Image (upload করুন)'),
        step1Title: richTextField('Step 1 Title (বাংলা)'), step1En: richTextField('Step 1 Title (English)'),
        step1Desc: richTextField('Step 1 Description (বাংলা)'), step1DescEn: richTextField('Step 1 Description (English)'),
        step2No: richTextField('Step 2 Number'),
        step2Icon: { type: 'text' as const, label: 'Step 2 Icon (emoji — image না দিলে)' },
        step2ImageUrl: imageUploadField('Step 2 Icon Image (upload করুন)'),
        step2Title: richTextField('Step 2 Title (বাংলা)'), step2En: richTextField('Step 2 Title (English)'),
        step2Desc: richTextField('Step 2 Description (বাংলা)'), step2DescEn: richTextField('Step 2 Description (English)'),
        step3No: richTextField('Step 3 Number'),
        step3Icon: { type: 'text' as const, label: 'Step 3 Icon (emoji — image না দিলে)' },
        step3ImageUrl: imageUploadField('Step 3 Icon Image (upload করুন)'),
        step3Title: richTextField('Step 3 Title (বাংলা)'), step3En: richTextField('Step 3 Title (English)'),
        step3Desc: richTextField('Step 3 Description (বাংলা)'), step3DescEn: richTextField('Step 3 Description (English)'),
        step4No: richTextField('Step 4 Number'),
        step4Icon: { type: 'text' as const, label: 'Step 4 Icon (emoji — image না দিলে)' },
        step4ImageUrl: imageUploadField('Step 4 Icon Image (upload করুন)'),
        step4Title: richTextField('Step 4 Title (বাংলা)'), step4En: richTextField('Step 4 Title (English)'),
        step4Desc: richTextField('Step 4 Description (বাংলা)'), step4DescEn: richTextField('Step 4 Description (English)'),
      },
      defaultProps: {
        tagText: 'ব্যবহারের পদ্ধতি', tagTextEn: 'How To Use',
        headingBn: 'মাত্র', headingEn: 'Boost Yield in Just',
        highlightText: '৪টি ধাপে ফলন বাড়ান', highlightTextEn: '4 Simple Steps',
        step1No: '০১', step1Icon: '🌿', step1ImageUrl: '',
        step1Title: 'প্রয়োগ করুন', step1En: 'Apply',
        step1Desc: 'জমি প্রস্তুতির সময় বা ফসল লাগানোর আগে প্যারাগন জৈব সার মাটিতে মিশিয়ে দিন।',
        step1DescEn: 'Mix Paragon Organic Fertilizer into the soil during land preparation or before planting crops.',
        step2No: '০২', step2Icon: '🔬', step2ImageUrl: '',
        step2Title: 'অণুজীব সক্রিয় হয়', step2En: 'Microbes Activate',
        step2Desc: 'উপকারী অণুজীব মাটিতে সক্রিয় হয়ে জৈব পদার্থ বিশ্লেষণ শুরু করে এবং পুষ্টি সরবরাহ করে।',
        step2DescEn: 'Beneficial microorganisms become active in the soil, begin breaking down organic matter and supplying nutrients.',
        step3No: '০৩', step3Icon: '🌱', step3ImageUrl: '',
        step3Title: 'মাটি সুস্থ হয়', step3En: 'Soil Recovers',
        step3Desc: 'মাটির গঠন, পানি ধারণ ক্ষমতা এবং জৈব পদার্থের পরিমাণ উল্লেখযোগ্যভাবে বৃদ্ধি পায়।',
        step3DescEn: 'Soil structure, water retention capacity and organic matter content improve significantly.',
        step4No: '০৪', step4Icon: '🌾', step4ImageUrl: '',
        step4Title: 'ফলন বাড়ে', step4En: 'Yield Increases',
        step4Desc: 'সুস্থ মাটিতে ফসল দ্রুত ও শক্তিশালীভাবে বৃদ্ধি পায়, উৎপাদন ৩০-৫০% পর্যন্ত বৃদ্ধি পেতে পারে।',
        step4DescEn: 'Crops grow rapidly and strongly in healthy soil, with yield potentially increasing by 30-50%.',
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (props: any) => <HowItWorksBlock {...props} />,
    },

    ProductsPreviewBlock: {
      label: '🛒 Products Preview (পণ্য)',
      fields: {
        tagText: richTextField('Tag Badge (বাংলা)'), tagTextEn: richTextField('Tag Badge (English)'),
        headingBn: richTextField('Heading (বাংলা)'), headingEn: richTextField('Heading (English)'),
        highlightText: richTextField('Highlighted Text (বাংলা)'), highlightTextEn: richTextField('Highlighted Text (English)'),
        allProductsHref: { type: 'text' as const, label: '"সব পণ্য" Link' },
        products: {
          type: 'array' as const,
          label: 'Products',
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          getItemSummary: (item: any) => item.nameBn || 'Product',
          arrayFields: {
            nameBn: richTextField('নাম (বাংলা)'),
            nameEn: richTextField('Name (English)'),
            descBn: richTextField('বিবরণ (বাংলা)'),
            descEn: richTextField('Description (English)'),
            weight: richTextField('ওজন / Size'),
            icon: { type: 'text' as const, label: 'Icon (emoji — image না দিলে দেখাবে)' },
            imageUrl: imageUploadField('Product Image (upload করুন)'),
            tag: richTextField('Tag Badge'),
            gradient: { type: 'text' as const, label: 'Background Gradient (CSS)' },
            featured: { type: 'radio' as const, label: '⭐ Featured?', options: [{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }] },
          },
          defaultItemProps: {
            nameBn: 'পণ্যের নাম',
            nameEn: 'Product Name',
            descBn: 'পণ্যের বিবরণ লিখুন।',
            descEn: 'Write product description.',
            weight: '১ কেজি',
            icon: '📦',
            imageUrl: '',
            tag: '',
            gradient: 'linear-gradient(135deg, #1B4D3E 0%, #2D7A3A 100%)',
            featured: 'no',
          },
        },
      },
      defaultProps: {
        tagText: 'আমাদের পণ্যসমূহ', tagTextEn: 'Our Products',
        headingBn: 'প্রিমিয়াম', headingEn: 'Premium',
        highlightText: 'কৃষি পণ্য', highlightTextEn: 'Agriculture Products',
        allProductsHref: '/products',
        products: [
          {
            nameBn: 'প্যারাগন জৈব সার', nameEn: 'Paragon Organic Fertilizer',
            descBn: 'উপকারী অণুজীব সমৃদ্ধ ১০০% অর্গানিক সার। মাটির উর্বরতা বৃদ্ধি ও ফসলের স্বাভাবিক বৃদ্ধির জন্য।',
            descEn: '100% organic fertilizer enriched with beneficial microorganisms. For increasing soil fertility and natural crop growth.',
            weight: '৫০ কেজি', icon: '🌿', imageUrl: '', tag: 'সেরা বিক্রি',
            gradient: 'linear-gradient(135deg, #1B4D3E 0%, #2D7A3A 100%)', featured: 'yes',
          },
          {
            nameBn: 'জৈব কীটনাশক', nameEn: 'Organic Pesticide',
            descBn: 'প্রাকৃতিক উপাদান দিয়ে তৈরি পরিবেশবান্ধব কীটনাশক।',
            descEn: 'Eco-friendly pesticide made with natural ingredients.',
            weight: '১ লিটার', icon: '🌾', imageUrl: '', tag: 'নতুন',
            gradient: 'linear-gradient(135deg, #D4A017 0%, #F5C842 100%)', featured: 'no',
          },
          {
            nameBn: 'মাটি উন্নয়নকারী', nameEn: 'Soil Improver',
            descBn: 'মাটির পিএইচ ঠিক রাখে এবং মাটির গঠন উন্নত করে।',
            descEn: 'Maintains soil pH balance and improves soil structure.',
            weight: '২৫ কেজি', icon: '🏔️', imageUrl: '', tag: 'জনপ্রিয়',
            gradient: 'linear-gradient(135deg, #8B5E3C 0%, #C49A6C 100%)', featured: 'no',
          },
        ],
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (props: any) => <ProductsPreviewBlock {...props} />,
    },

    CTASectionBlock: {
      label: '📣 CTA Section (যোগাযোগ)',
      fields: {
        tagText: richTextField('Tag Text (বাংলা)'), tagTextEn: richTextField('Tag Text (English)'),
        headingLine1: richTextField('Heading Line 1 (বাংলা)'), headingLine1En: richTextField('Heading Line 1 (English)'),
        highlightText: richTextField('Highlighted Text (বাংলা)'), highlightTextEn: richTextField('Highlighted Text (English)'),
        bodyText: richTextField('Body Text (বাংলা)'), bodyTextEn: richTextField('Body Text (English)'),
        cta1Label: richTextField('Button 1 Label (বাংলা)'), cta1LabelEn: richTextField('Button 1 Label (English)'),
        cta1Href: { type: 'text', label: 'Button 1 Link' },
        cta2Label: richTextField('Phone Button Label (বাংলা)'), cta2LabelEn: richTextField('Phone Button Label (English)'),
        phone: { type: 'text', label: 'Phone Number' },
      },
      defaultProps: {
        tagText: 'আজই শুরু করুন', tagTextEn: 'Get Started Today',
        headingLine1: 'আপনার জমির মাটি', headingLine1En: 'Restore Your Soil',
        highlightText: 'সুস্থ করুন আজই', highlightTextEn: 'Health Today',
        bodyText: 'প্যারাগন জৈব সার ব্যবহার করে আপনার ফসলের উৎপাদন বাড়ান এবং মাটির দীর্ঘমেয়াদী স্বাস্থ্য নিশ্চিত করুন। আমাদের বিশেষজ্ঞ দল আপনাকে সহায়তা করতে সদা প্রস্তুত।',
        bodyTextEn: 'Use Paragon Organic Fertilizer to increase your crop yield and ensure long-term soil health. Our team of experts is always ready to assist you.',
        cta1Label: 'এখনই যোগাযোগ করুন', cta1LabelEn: 'Contact Us Now', cta1Href: '/contact',
        cta2Label: 'কল করুন', cta2LabelEn: 'Call Us', phone: '+8801700000000',
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (props: any) => <CTASectionBlock {...props} />,
    },

    // ══════════════════════════════════════════════════════════════
    // STATIC PAGE BLOCK
    // ══════════════════════════════════════════════════════════════

    StaticPageBlock: {
      label: '📄 Page Content (Full Page Preview)',
      fields: {
        pageSlug: {
          type: 'select',
          label: 'Page to show',
          options: [
            { label: 'About — আমাদের গল্প', value: 'about/our-story' },
            { label: 'About — মাটির উপকার', value: 'about/soil-benefit' },
            { label: 'About — কেন এই পণ্য?', value: 'about/why-this-product' },
            { label: 'About — প্যারাগন গ্রুপ', value: 'about/paragon-group' },
            { label: 'লোকেশন / ডিলারশিপ', value: 'location' },
            { label: 'ক্যারিয়ার', value: 'career' },
            { label: 'যোগাযোগ', value: 'contact' },
            { label: 'পণ্য ও ক্রয়', value: 'products' },
          ],
        },
      },
      defaultProps: { pageSlug: 'about/our-story' },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (props: any) => <StaticPageBlock pageSlug={props.pageSlug} />,
    },

    // ══════════════════════════════════════════════════════════════
    // GENERAL PURPOSE BLOCKS
    // ══════════════════════════════════════════════════════════════

    HeroBanner: {
      label: 'Hero Banner (simple)',
      fields: {
        headingBn: richTextField('Heading (Bengali)'),
        headingEn: richTextField('Heading (English)'),
        subtitleBn: richTextField('Subtitle (Bengali)', 80),
        subtitleEn: richTextField('Subtitle (English)', 80),
        ctaLabel: richTextField('Button Label (Bengali)'),
        ctaLabelEn: richTextField('Button Label (English)'),
        ctaHref: { type: 'text', label: 'Button Link' },
        bgColor: { type: 'text', label: 'Background Color' },
      },
      defaultProps: {
        headingBn: 'প্যারাগন জৈব সার', headingEn: 'Paragon Organic Fertilizer',
        subtitleBn: 'মাটির প্রাণ, কৃষকের আস্থা', subtitleEn: "Soul of Soil, Farmer's Trust",
        ctaLabel: 'আরও জানুন', ctaLabelEn: 'Learn More',
        ctaHref: '/about/our-story', bgColor: '#1B4D3E',
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (props: any) => <HeroBannerRender {...props} />,
    },

    ContentBlock: {
      label: 'Content Block (Image + Text)',
      fields: {
        layout: { type: 'radio', label: 'Layout', options: [{ label: 'Image Left', value: 'image-left' }, { label: 'Image Right', value: 'image-right' }] },
        titleBn: richTextField('Title (Bengali)'),
        titleEn: richTextField('Title (English)'),
        bodyBn: richTextField('Body Text (Bengali)', 100),
        bodyEn: richTextField('Body Text (English)', 100),
        imageUrl: imageUploadField('Block Image'), imageAlt: { type: 'text', label: 'Image Alt Text' },
        ctaLabel: richTextField('Button Label (Bengali)'),
        ctaLabelEn: richTextField('Button Label (English)'),
        ctaHref: { type: 'text', label: 'Button Link' },
        bgColor: { type: 'text', label: 'Background Color' },
      },
      defaultProps: {
        layout: 'image-left', titleBn: 'আমাদের সম্পর্কে', titleEn: 'About Us',
        bodyBn: 'এখানে আপনার content লিখুন...', bodyEn: 'Write your content here...',
        imageUrl: '', imageAlt: '',
        ctaLabel: 'আরও জানুন', ctaLabelEn: 'Learn More', ctaHref: '#', bgColor: '#ffffff',
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (props: any) => <ContentBlockRender {...props} />,
    },

    SectionHeading: {
      label: 'Section Heading',
      fields: {
        tagBn: richTextField('Tag Text (Bengali)'),
        tagEn: richTextField('Tag Text (English)'),
        titleBn: richTextField('Title (Bengali)'),
        titleEn: richTextField('Title (English)'),
        titleHighlight: richTextField('Highlighted Word (Bengali)'),
        titleHighlightEn: richTextField('Highlighted Word (English)'),
        align: { type: 'radio', label: 'Alignment', options: [{ label: 'Left', value: 'left' }, { label: 'Center', value: 'center' }, { label: 'Right', value: 'right' }] },
      },
      defaultProps: {
        tagBn: 'আমাদের সম্পর্কে', tagEn: 'About Us',
        titleBn: 'বিভাগের শিরোনাম', titleEn: 'Section Heading',
        titleHighlight: '', titleHighlightEn: '',
        align: 'center',
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (props: any) => <SectionHeadingRender {...props} />,
    },

    StatsRow: {
      label: 'Stats Row (4 counters)',
      fields: {
        stat1Value: richTextField('Stat 1 Value'), stat1Label: richTextField('Stat 1 Label (Bengali)'), stat1LabelEn: richTextField('Stat 1 Label (English)'),
        stat2Value: richTextField('Stat 2 Value'), stat2Label: richTextField('Stat 2 Label (Bengali)'), stat2LabelEn: richTextField('Stat 2 Label (English)'),
        stat3Value: richTextField('Stat 3 Value'), stat3Label: richTextField('Stat 3 Label (Bengali)'), stat3LabelEn: richTextField('Stat 3 Label (English)'),
        stat4Value: richTextField('Stat 4 Value'), stat4Label: richTextField('Stat 4 Label (Bengali)'), stat4LabelEn: richTextField('Stat 4 Label (English)'),
      },
      defaultProps: {
        stat1Value: '১০০%', stat1Label: 'অর্গানিক', stat1LabelEn: 'Organic',
        stat2Value: '৫০০০+', stat2Label: 'কৃষক', stat2LabelEn: 'Farmers',
        stat3Value: '১০+', stat3Label: 'বছর', stat3LabelEn: 'Years',
        stat4Value: '৩টি', stat4Label: 'পণ্য', stat4LabelEn: 'Products',
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (props: any) => <StatsRowRender {...props} />,
    },

    TextBlock: {
      label: 'Text Block',
      fields: {
        content: richTextField('Content', 100),
        align: { type: 'radio', label: 'Alignment', options: [{ label: 'Left', value: 'left' }, { label: 'Center', value: 'center' }, { label: 'Right', value: 'right' }] },
      },
      defaultProps: { content: 'এখানে আপনার লেখা লিখুন...', align: 'left' },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (props: any) => (
        <div style={{ padding: '40px', maxWidth: 1200, margin: '0 auto', textAlign: props.align, fontFamily: 'var(--font-hind)', lineHeight: 1.9 }}>
          <RichText html={props.content} />
        </div>
      ),
    },

    CardGrid: {
      label: 'Card Grid (3 cards)',
      fields: {
        columns: { type: 'radio', label: 'Columns', options: [{ label: '2', value: '2' }, { label: '3', value: '3' }, { label: '4', value: '4' }] },
        card1Title: richTextField('Card 1 Title (Bengali)'), card1TitleEn: richTextField('Card 1 Title (English)'),
        card1Body: richTextField('Card 1 Body (Bengali)', 80), card1BodyEn: richTextField('Card 1 Body (English)', 80),
        card1Icon: { type: 'text', label: 'Card 1 Icon (emoji)' },
        card2Title: richTextField('Card 2 Title (Bengali)'), card2TitleEn: richTextField('Card 2 Title (English)'),
        card2Body: richTextField('Card 2 Body (Bengali)', 80), card2BodyEn: richTextField('Card 2 Body (English)', 80),
        card2Icon: { type: 'text', label: 'Card 2 Icon (emoji)' },
        card3Title: richTextField('Card 3 Title (Bengali)'), card3TitleEn: richTextField('Card 3 Title (English)'),
        card3Body: richTextField('Card 3 Body (Bengali)', 80), card3BodyEn: richTextField('Card 3 Body (English)', 80),
        card3Icon: { type: 'text', label: 'Card 3 Icon (emoji)' },
      },
      defaultProps: {
        columns: '3',
        card1Title: 'শিরোনাম ১', card1TitleEn: 'Title 1', card1Body: 'বিবরণ...', card1BodyEn: 'Description...', card1Icon: '🌱',
        card2Title: 'শিরোনাম ২', card2TitleEn: 'Title 2', card2Body: 'বিবরণ...', card2BodyEn: 'Description...', card2Icon: '🌾',
        card3Title: 'শিরোনাম ৩', card3TitleEn: 'Title 3', card3Body: 'বিবরণ...', card3BodyEn: 'Description...', card3Icon: '🏆',
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (props: any) => <CardGridRender {...props} />,
    },

    CTABanner: {
      label: 'CTA Banner (simple)',
      fields: {
        titleBn: richTextField('Title (Bengali)'),
        titleEn: richTextField('Title (English)'),
        subtitleBn: richTextField('Subtitle (Bengali)', 80),
        subtitleEn: richTextField('Subtitle (English)', 80),
        ctaLabel: richTextField('Button Label (Bengali)'),
        ctaLabelEn: richTextField('Button Label (English)'),
        ctaHref: { type: 'text', label: 'Button Link' },
      },
      defaultProps: {
        titleBn: 'আজই যোগাযোগ করুন', titleEn: 'Contact Us Today',
        subtitleBn: 'আমরা আপনাকে সাহায্য করতে প্রস্তুত', subtitleEn: 'We are ready to help you',
        ctaLabel: 'যোগাযোগ করুন', ctaLabelEn: 'Contact Us', ctaHref: '/contact',
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (props: any) => <CTABannerRender {...props} />,
    },

    // ══════════════════════════════════════════════════════════════
    // SITE LAYOUT BLOCKS (Navbar / Footer editors)
    // ══════════════════════════════════════════════════════════════

    NavbarConfigBlock: {
      label: '🔝 Navbar Configuration',
      fields: {
        siteName:    { type: 'text', label: 'Site Name (বাংলা)' },
        siteSubtitle:{ type: 'text', label: 'Site Subtitle (English)' },
        ctaLabel:    { type: 'text', label: 'CTA বাটন লেবেল (বাংলা)' },
        ctaLabelEn:  { type: 'text', label: 'CTA Button Label (English)' },
        ctaHref:     { type: 'text', label: 'CTA Link (e.g. /shop)' },
        logoUrl:     imageUploadField('Logo Image (browser থেকে upload করুন)'),
        navLinks: {
          type: 'array',
          label: 'Navigation Links',
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          getItemSummary: (item: any) => item.en || item.bn || 'Link',
          arrayFields: {
            href: { type: 'text', label: 'URL (dropdown এর জন্য খালি রাখুন)' },
            bn:   { type: 'text', label: 'লেবেল (বাংলা)' },
            en:   { type: 'text', label: 'Label (English)' },
          },
          defaultItemProps: { href: '/', bn: 'লিঙ্ক', en: 'Link' },
        },
        aboutChildren: {
          type: 'array',
          label: 'About Dropdown Items',
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          getItemSummary: (item: any) => item.en || item.bn || 'About item',
          arrayFields: {
            href: { type: 'text', label: 'URL' },
            bn:   { type: 'text', label: 'লেবেল (বাংলা)' },
            en:   { type: 'text', label: 'Label (English)' },
          },
          defaultItemProps: { href: '/about/our-story', bn: 'আমাদের গল্প', en: 'Our Story' },
        },
      },
      defaultProps: {
        siteName: 'প্যারাগন',
        siteSubtitle: 'Organic Fertilizer',
        ctaLabel: 'এখনই কিনুন',
        ctaLabelEn: 'Order Now',
        ctaHref: '/shop',
        logoUrl: '',
        navLinks: [
          { href: '/', bn: 'হোম', en: 'Home' },
          { href: '', bn: 'সম্পর্কে', en: 'About' },
          { href: '/shop', bn: 'পণ্য ও ক্রয়', en: 'Products' },
          { href: '/dealership', bn: 'ডিলারশিপ', en: 'Dealership' },
          { href: '/career', bn: 'ক্যারিয়ার', en: 'Career' },
          { href: '/contact', bn: 'যোগাযোগ', en: 'Contact' },
        ],
        aboutChildren: [
          { href: '/about/our-story', bn: 'আমাদের গল্প', en: 'Our Story' },
          { href: '/about/soil-benefit', bn: 'মাটির উপকার', en: 'Soil Benefit' },
          { href: '/about/why-this-product', bn: 'কেন এই পণ্য?', en: 'Why This Product?' },
          { href: '/about/paragon-group', bn: 'প্যারাগন গ্রুপ', en: 'Paragon Group' },
        ],
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (props: any) => (
        <div style={{ background: 'rgba(27,77,62,0.97)', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, borderRadius: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {props.logoUrl
              ? <img src={props.logoUrl} alt="Logo" style={{ height: 36, objectFit: 'contain' }} />
              : <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#D4A017,#F5C842)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🌿</div>
            }
            <div>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: 14 }}>{props.siteName || 'প্যারাগন'}</div>
              <div style={{ color: '#D4A017', fontSize: 10, letterSpacing: 2 }}>{props.siteSubtitle || 'ORGANIC FERTILIZER'}</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {(props.navLinks || []).map((l: { bn: string; en: string; href: string }, i: number) => (
              <span key={i} style={{ color: 'rgba(255,255,255,0.85)', fontSize: 12 }}>{l.en || l.bn}</span>
            ))}
          </div>
          <div style={{ background: 'linear-gradient(135deg,#D4A017,#F5C842)', color: '#1B4D3E', padding: '6px 16px', borderRadius: 20, fontSize: 12, fontWeight: 700 }}>
            {props.ctaLabelEn || props.ctaLabel || 'Order Now'}
          </div>
        </div>
      ),
    },

    FooterConfigBlock: {
      label: '🔻 Footer Configuration',
      fields: {
        logoUrl:          imageUploadField('Logo Image (browser থেকে upload করুন)'),
        description:      { type: 'textarea', label: 'Footer Description (বাংলা)' },
        descriptionEn:    { type: 'textarea', label: 'Footer Description (English)' },
        contactAddress:   { type: 'text', label: 'ঠিকানা (বাংলা)' },
        contactAddressEn: { type: 'text', label: 'Address (English)' },
        contactPhone:     { type: 'text', label: 'ফোন নম্বর' },
        contactEmail:     { type: 'text', label: 'ইমেইল' },
        quickLinks: {
          type: 'array',
          label: 'Quick Links',
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          getItemSummary: (item: any) => item.en || item.bn || 'Link',
          arrayFields: {
            href: { type: 'text', label: 'URL' },
            bn:   { type: 'text', label: 'লেবেল (বাংলা)' },
            en:   { type: 'text', label: 'Label (English)' },
          },
          defaultItemProps: { href: '/', bn: 'লিঙ্ক', en: 'Link' },
        },
        productLinks: {
          type: 'array',
          label: 'Our Products Links',
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          getItemSummary: (item: any) => item.en || item.bn || 'Product',
          arrayFields: {
            href: { type: 'text', label: 'URL' },
            bn:   { type: 'text', label: 'নাম (বাংলা)' },
            en:   { type: 'text', label: 'Name (English)' },
          },
          defaultItemProps: { href: '/products', bn: 'পণ্য', en: 'Product' },
        },
      },
      defaultProps: {
        logoUrl: '',
        description: 'উপকারী অণুজীব সমৃদ্ধ ১০০% অর্গানিক জৈব সার। বাংলাদেশের কৃষকদের মাটির সুস্বাস্থ্য ফিরিয়ে আনতে আমরা প্রতিশ্রুতিবদ্ধ।',
        descriptionEn: '100% organic fertilizer enriched with beneficial microorganisms. We are committed to restoring soil health for Bangladeshi farmers.',
        contactAddress: 'প্যারাগন গ্রুপ, ঢাকা, বাংলাদেশ',
        contactAddressEn: 'Paragon Group, Dhaka, Bangladesh',
        contactPhone: '+880 1XXX-XXXXXX',
        contactEmail: 'info@paragonorganic.com.bd',
        quickLinks: [
          { href: '/', bn: 'হোম', en: 'Home' },
          { href: '/about/our-story', bn: 'আমাদের গল্প', en: 'Our Story' },
          { href: '/products', bn: 'পণ্যসমূহ', en: 'Products' },
          { href: '/dealership', bn: 'ডিলারশিপ', en: 'Dealership' },
          { href: '/career', bn: 'ক্যারিয়ার', en: 'Career' },
          { href: '/contact', bn: 'যোগাযোগ', en: 'Contact' },
        ],
        productLinks: [
          { href: '/products', bn: 'প্যারাগন জৈব সার', en: 'Paragon Organic Fertilizer' },
          { href: '/products', bn: 'জৈব কীটনাশক', en: 'Organic Pesticide' },
          { href: '/products', bn: 'মাটি উন্নয়নকারী', en: 'Soil Improver' },
        ],
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (props: any) => (
        <div style={{ background: '#0F2E24', color: '#fff', padding: '24px 32px', borderRadius: 8 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20 }}>
            <div>
              <div style={{ fontWeight: 700, marginBottom: 6, color: '#fff' }}>প্যারাগন</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>{props.description || ''}</div>
              <div style={{ marginTop: 8, fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>📱 {props.contactPhone}</div>
            </div>
            <div>
              <div style={{ fontWeight: 700, marginBottom: 8, color: '#D4A017', fontSize: 12 }}>Quick Links</div>
              {(props.quickLinks || []).map((l: { en: string; bn: string }, i: number) => (
                <div key={i} style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', marginBottom: 4 }}>· {l.en || l.bn}</div>
              ))}
            </div>
            <div>
              <div style={{ fontWeight: 700, marginBottom: 8, color: '#D4A017', fontSize: 12 }}>Our Products</div>
              {(props.productLinks || []).map((l: { en: string; bn: string }, i: number) => (
                <div key={i} style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', marginBottom: 4 }}>· {l.en || l.bn}</div>
              ))}
            </div>
            <div>
              <div style={{ fontWeight: 700, marginBottom: 8, color: '#D4A017', fontSize: 12 }}>Contact</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', marginBottom: 4 }}>📍 {props.contactAddressEn || props.contactAddress}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', marginBottom: 4 }}>📞 {props.contactPhone}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>✉️ {props.contactEmail}</div>
            </div>
          </div>
        </div>
      ),
    },
  },

  root: {
    fields: { title: { type: 'text', label: 'Page Title' } },
    defaultProps: { title: 'New Page' },
    render: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  },
}
