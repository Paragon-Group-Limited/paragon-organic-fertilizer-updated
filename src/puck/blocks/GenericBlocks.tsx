'use client'

import { useState } from 'react'
import Image from 'next/image'
import { richTextField } from '@/puck/fields/richTextField'
import { imageUploadField } from '@/puck/fields/imageUploadField'
import { RichText } from '@/components/puck/RichText'
import { useT } from '@/hooks/useT'

// ─── HeroSection ──────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function HeroSectionRender(props: any) {
  const t = useT()
  const bg = props.bgImage
    ? `linear-gradient(${props.overlayColor || 'rgba(0,0,0,0.55)'}, ${props.overlayColor || 'rgba(0,0,0,0.55)'}), url(${props.bgImage}) center/cover no-repeat`
    : (props.bgGradient || 'linear-gradient(135deg, #0F2E24 0%, #1B4D3E 60%, #2D7A3A 100%)')

  return (
    <div style={{ background: bg, padding: `${props.paddingY || 100}px 40px`, textAlign: props.align || 'center', minHeight: props.minHeight ? `${props.minHeight}px` : undefined, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ maxWidth: 900, width: '100%' }}>
        {props.tag && (
          <span style={{ display: 'inline-block', padding: '6px 18px', borderRadius: 50, fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 4, background: 'rgba(212,160,23,0.18)', color: '#D4A017', marginBottom: 20, fontFamily: 'var(--font-inter)' }}>
            <RichText html={t(props.tagBn, props.tag)} inline />
          </span>
        )}
        <h1 style={{ fontSize: props.titleSize || 52, fontWeight: 800, color: 'white', marginBottom: 20, lineHeight: 1.15, fontFamily: 'var(--font-hind)' }}>
          <RichText html={t(props.titleBn, props.title)} inline />
          {props.titleHighlight && (
            <> <span style={{ color: '#D4A017' }}><RichText html={t(props.titleHighlightBn, props.titleHighlight)} inline /></span></>
          )}
        </h1>
        {props.subtitle && (
          <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.8)', marginBottom: 40, lineHeight: 1.8, fontFamily: 'var(--font-hind)' }}>
            <RichText html={t(props.subtitleBn, props.subtitle)} />
          </div>
        )}
        <div style={{ display: 'flex', gap: 16, justifyContent: props.align === 'left' ? 'flex-start' : 'center', flexWrap: 'wrap' }}>
          {props.cta1Label && (
            <a href={props.cta1Href || '#'} style={{ background: 'linear-gradient(135deg,#D4A017,#F5C842)', color: '#1B4D3E', padding: '14px 36px', borderRadius: 50, fontWeight: 700, textDecoration: 'none', fontSize: 16, fontFamily: 'var(--font-hind)' }}>
              <RichText html={t(props.cta1LabelBn, props.cta1Label)} inline />
            </a>
          )}
          {props.cta2Label && (
            <a href={props.cta2Href || '#'} style={{ background: 'transparent', color: 'white', padding: '14px 36px', borderRadius: 50, fontWeight: 600, textDecoration: 'none', fontSize: 16, border: '2px solid rgba(255,255,255,0.5)', fontFamily: 'var(--font-hind)' }}>
              <RichText html={t(props.cta2LabelBn, props.cta2Label)} inline />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── ImageText ────────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ImageTextRender(props: any) {
  const t = useT()
  const imageLeft = props.imagePosition !== 'right'
  return (
    <div style={{ background: props.bgColor || 'white', padding: '80px 40px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: imageLeft ? 'row' : 'row-reverse', gap: 60, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ flex: `0 0 ${props.imageWidthPct || 45}%`, minWidth: 260 }}>
          {props.imageUrl
            ? <div style={{ position: 'relative', width: '100%', aspectRatio: props.imageAspect || '4/3', borderRadius: props.imageRadius !== undefined ? props.imageRadius : 20, overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.12)' }}>
                <Image src={props.imageUrl} alt={props.imageAlt || ''} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
              </div>
            : <div style={{ width: '100%', aspectRatio: props.imageAspect || '4/3', borderRadius: 20, background: 'linear-gradient(135deg,#1B4D3E22,#2D7A3A33)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 80 }}>🖼️</div>}
        </div>
        <div style={{ flex: 1, minWidth: 260 }}>
          {props.tag && (
            <span style={{ display: 'inline-block', padding: '5px 14px', borderRadius: 50, fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 3, background: 'rgba(27,77,62,0.08)', color: '#1B4D3E', marginBottom: 16, fontFamily: 'var(--font-inter)' }}>
              <RichText html={t(props.tagBn, props.tag)} inline />
            </span>
          )}
          <h2 style={{ fontSize: 36, fontWeight: 700, color: props.titleColor || '#1B4D3E', marginBottom: 16, lineHeight: 1.25, fontFamily: 'var(--font-hind)' }}>
            <RichText html={t(props.titleBn, props.title)} inline />
          </h2>
          <div style={{ fontSize: 16, color: '#4a5568', lineHeight: 1.8, marginBottom: 28, fontFamily: 'var(--font-hind)' }}>
            <RichText html={t(props.bodyBn, props.body)} />
          </div>
          {props.ctaLabel && (
            <a href={props.ctaHref || '#'} style={{ display: 'inline-block', background: props.ctaBg || 'linear-gradient(135deg,#1B4D3E,#2D7A3A)', color: props.ctaColor || 'white', padding: '12px 30px', borderRadius: 50, fontWeight: 600, textDecoration: 'none', fontSize: 15, fontFamily: 'var(--font-hind)' }}>
              <RichText html={t(props.ctaLabelBn, props.ctaLabel)} inline />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── FeatureGrid ──────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function FeatureGridRender(props: any) {
  const t = useT()
  const items: any[] = props.items || []
  const cols = props.columns || 3
  return (
    <div style={{ background: props.bgColor || '#F8F9FA', padding: '80px 40px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {(props.sectionTitle || props.sectionTitleBn) && (
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            {props.tag && (
              <span style={{ display: 'inline-block', padding: '5px 14px', borderRadius: 50, fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 3, background: 'rgba(27,77,62,0.08)', color: '#1B4D3E', marginBottom: 14, fontFamily: 'var(--font-inter)' }}>
                <RichText html={t(props.tagBn, props.tag)} inline />
              </span>
            )}
            <h2 style={{ fontSize: 36, fontWeight: 700, color: '#1a2e1a', fontFamily: 'var(--font-hind)' }}>
              <RichText html={t(props.sectionTitleBn, props.sectionTitle)} inline />
            </h2>
          </div>
        )}
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 24 }}>
          {items.map((item: any, i: number) => (
            <div key={i} style={{ background: 'white', borderRadius: 16, padding: 32, border: '1px solid rgba(27,77,62,0.08)', boxShadow: '0 4px 24px rgba(27,77,62,0.06)', textAlign: props.cardAlign || 'left' }}>
              {item.imageUrl
                ? <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', borderRadius: 12, overflow: 'hidden', marginBottom: 20 }}>
                    <Image src={item.imageUrl} alt={item.imageAlt || ''} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
                  </div>
                : item.icon
                  ? <div style={{ fontSize: 48, marginBottom: 16 }}>{item.icon}</div>
                  : null}
              <h3 style={{ fontSize: 18, fontWeight: 700, color: '#1B4D3E', marginBottom: 10, fontFamily: 'var(--font-hind)' }}>
                <RichText html={t(item.titleBn, item.title)} inline />
              </h3>
              <div style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.8, fontFamily: 'var(--font-hind)' }}>
                <RichText html={t(item.bodyBn, item.body)} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function TestimonialsRender(props: any) {
  const t = useT()
  const items: any[] = props.items || []
  const stars = (n: number) => '★'.repeat(Math.max(0, Math.min(5, n))) + '☆'.repeat(5 - Math.max(0, Math.min(5, n)))
  return (
    <div style={{ background: props.bgColor || 'linear-gradient(135deg,#F8F5EE,#FDFCF8)', padding: '80px 40px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {(props.sectionTitle || props.sectionTitleBn) && (
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontSize: 36, fontWeight: 700, color: '#1a2e1a', fontFamily: 'var(--font-hind)' }}>
              <RichText html={t(props.sectionTitleBn, props.sectionTitle)} inline />
            </h2>
          </div>
        )}
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${props.columns || 3}, 1fr)`, gap: 24 }}>
          {items.map((item: any, i: number) => (
            <div key={i} style={{ background: 'white', borderRadius: 20, padding: 32, border: '1px solid rgba(27,77,62,0.08)', boxShadow: '0 4px 24px rgba(27,77,62,0.06)' }}>
              <div style={{ color: '#D4A017', fontSize: 18, marginBottom: 12 }}>{stars(item.stars || 5)}</div>
              <div style={{ fontSize: 15, color: '#374151', lineHeight: 1.8, marginBottom: 20, fontStyle: 'italic', fontFamily: 'var(--font-hind)' }}>
                &ldquo;<RichText html={t(item.quoteBn, item.quote)} inline />&rdquo;
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                {item.avatarUrl
                  ? <Image src={item.avatarUrl} alt={item.author || ''} width={44} height={44} style={{ borderRadius: '50%', objectFit: 'cover' }} />
                  : <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg,#1B4D3E,#2D7A3A)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 18 }}>{(item.author || 'A')[0]}</div>}
                <div>
                  <div style={{ fontWeight: 700, color: '#1B4D3E', fontSize: 15, fontFamily: 'var(--font-hind)' }}>{item.author}</div>
                  {item.role && <div style={{ fontSize: 12, color: '#9ca3af', fontFamily: 'var(--font-inter)' }}>{item.role}</div>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── FAQAccordion ─────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function FAQAccordionRender(props: any) {
  const t = useT()
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const items: any[] = props.items || []
  return (
    <div style={{ background: props.bgColor || 'white', padding: '80px 40px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        {(props.sectionTitle || props.sectionTitleBn) && (
          <h2 style={{ fontSize: 36, fontWeight: 700, color: '#1a2e1a', textAlign: 'center', marginBottom: 48, fontFamily: 'var(--font-hind)' }}>
            <RichText html={t(props.sectionTitleBn, props.sectionTitle)} inline />
          </h2>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {items.map((item: any, i: number) => {
            const isOpen = openIndex === i
            return (
              <div key={i} style={{ border: `1px solid ${isOpen ? '#1B4D3E' : 'rgba(27,77,62,0.12)'}`, borderRadius: 14, overflow: 'hidden', transition: 'border-color 0.2s' }}>
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  style={{ width: '100%', textAlign: 'left', padding: '20px 24px', background: isOpen ? 'rgba(27,77,62,0.04)' : 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-hind)', fontSize: 16, fontWeight: 600, color: '#1B4D3E' }}
                >
                  <span><RichText html={t(item.questionBn, item.question)} inline /></span>
                  <span style={{ fontSize: 20, fontWeight: 300, flexShrink: 0, marginLeft: 12, transition: 'transform 0.2s', transform: isOpen ? 'rotate(45deg)' : 'none' }}>+</span>
                </button>
                {isOpen && (
                  <div style={{ padding: '0 24px 20px', fontSize: 15, color: '#4a5568', lineHeight: 1.8, fontFamily: 'var(--font-hind)' }}>
                    <RichText html={t(item.answerBn, item.answer)} />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ─── IconList ─────────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function IconListRender(props: any) {
  const t = useT()
  const items: any[] = props.items || []
  return (
    <div style={{ background: props.bgColor || 'white', padding: '80px 40px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {(props.sectionTitle || props.sectionTitleBn) && (
          <h2 style={{ fontSize: 36, fontWeight: 700, color: '#1a2e1a', textAlign: 'center', marginBottom: 48, fontFamily: 'var(--font-hind)' }}>
            <RichText html={t(props.sectionTitleBn, props.sectionTitle)} inline />
          </h2>
        )}
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${props.columns || 2}, 1fr)`, gap: 24 }}>
          {items.map((item: any, i: number) => (
            <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', padding: 24, background: '#F8F9FA', borderRadius: 16 }}>
              <span style={{ fontSize: 36, flexShrink: 0 }}>{item.icon || '✅'}</span>
              <div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: '#1B4D3E', marginBottom: 6, fontFamily: 'var(--font-hind)' }}>
                  <RichText html={t(item.titleBn, item.title)} inline />
                </h3>
                <div style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.7, fontFamily: 'var(--font-hind)' }}>
                  <RichText html={t(item.bodyBn, item.body)} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── GalleryGrid ──────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function GalleryGridRender(props: any) {
  const t = useT()
  const items: any[] = props.items || []
  const cols = props.columns || 3
  return (
    <div style={{ background: props.bgColor || 'white', padding: '80px 40px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {(props.sectionTitle || props.sectionTitleBn) && (
          <h2 style={{ fontSize: 36, fontWeight: 700, color: '#1a2e1a', textAlign: 'center', marginBottom: 48, fontFamily: 'var(--font-hind)' }}>
            <RichText html={t(props.sectionTitleBn, props.sectionTitle)} inline />
          </h2>
        )}
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: props.gap !== undefined ? props.gap : 12 }}>
          {items.map((item: any, i: number) => (
            <div key={i} style={{ borderRadius: 12, overflow: 'hidden', position: 'relative' }}>
              {item.imageUrl
                ? <div style={{ position: 'relative', width: '100%', aspectRatio: props.aspectRatio || '1/1' }}>
                    <Image src={item.imageUrl} alt={item.caption || ''} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" style={{ display: 'block' }} />
                  </div>
                : <div style={{ width: '100%', aspectRatio: props.aspectRatio || '1/1', background: 'linear-gradient(135deg,#1B4D3E22,#2D7A3A33)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40 }}>🖼️</div>}
              {item.caption && (
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(0,0,0,0.6))', color: 'white', padding: '20px 12px 10px', fontSize: 13, fontFamily: 'var(--font-hind)' }}>
                  <RichText html={t(item.captionBn, item.caption)} inline />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Spacer ───────────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function SpacerRender(props: any) {
  return (
    <div style={{ height: `${props.height || 60}px`, background: props.bgColor || 'transparent' }} />
  )
}

// ─── Divider ─────────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function DividerRender(props: any) {
  const t = useT()
  return (
    <div style={{ padding: `${props.paddingY || 24}px 40px`, background: props.bgColor || 'transparent' }}>
      <div style={{ maxWidth: props.maxWidth || 1200, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ flex: 1, height: props.thickness || 1, background: props.color || 'rgba(27,77,62,0.15)' }} />
        {(props.label || props.labelBn) && (
          <span style={{ fontSize: 13, color: props.labelColor || '#9ca3af', textTransform: 'uppercase', letterSpacing: 3, fontWeight: 600, flexShrink: 0, fontFamily: 'var(--font-inter)' }}>
            <RichText html={t(props.labelBn, props.label)} inline />
          </span>
        )}
        {(props.label || props.labelBn) && <div style={{ flex: 1, height: props.thickness || 1, background: props.color || 'rgba(27,77,62,0.15)' }} />}
      </div>
    </div>
  )
}

// ─── Exports ──────────────────────────────────────────────────────────────────

export const genericBlocks = {
  HeroSection: {
    label: '🦸 Hero Section',
    fields: {
      tag: richTextField('Tag / Badge Label (English)'),
      tagBn: richTextField('Tag / Badge Label (বাংলা)'),
      title: richTextField('Main Title (English)'),
      titleBn: richTextField('Main Title (বাংলা)'),
      titleHighlight: richTextField('Title Highlight (gold, English)'),
      titleHighlightBn: richTextField('Title Highlight (gold, বাংলা)'),
      subtitle: richTextField('Subtitle (English)'),
      subtitleBn: richTextField('Subtitle (বাংলা)'),
      bgGradient: { type: 'text' as const, label: 'Background Gradient (CSS) — used when no image' },
      bgImage: imageUploadField('Background Image (optional)'),
      overlayColor: { type: 'text' as const, label: 'Image Overlay Color (default: rgba(0,0,0,0.55))' },
      align: { type: 'radio' as const, label: 'Alignment', options: [{ label: 'Center', value: 'center' }, { label: 'Left', value: 'left' }, { label: 'Right', value: 'right' }] },
      paddingY: { type: 'number' as const, label: 'Vertical Padding (px)' },
      minHeight: { type: 'number' as const, label: 'Min Height (px, optional)' },
      titleSize: { type: 'number' as const, label: 'Title Font Size (px)' },
      cta1Label: richTextField('Button 1 Label (English)'),
      cta1LabelBn: richTextField('Button 1 Label (বাংলা)'),
      cta1Href: { type: 'text' as const, label: 'Button 1 Link' },
      cta2Label: richTextField('Button 2 Label (English, optional)'),
      cta2LabelBn: richTextField('Button 2 Label (বাংলা, optional)'),
      cta2Href: { type: 'text' as const, label: 'Button 2 Link' },
    },
    defaultProps: {
      tag: 'Welcome', tagBn: 'স্বাগতম',
      title: 'Build Anything with Drag & Drop', titleBn: 'ড্র্যাগ অ্যান্ড ড্রপে যেকোনো পেজ বানান',
      titleHighlight: '', titleHighlightBn: '',
      subtitle: 'A powerful page builder for your website.', subtitleBn: 'আপনার ওয়েবসাইটের জন্য একটি শক্তিশালী পেজ বিল্ডার।',
      bgGradient: 'linear-gradient(135deg, #0F2E24 0%, #1B4D3E 60%, #2D7A3A 100%)',
      bgImage: '', overlayColor: 'rgba(0,0,0,0.55)',
      align: 'center', paddingY: 100, minHeight: 0, titleSize: 52,
      cta1Label: 'Get Started', cta1LabelBn: 'শুরু করুন', cta1Href: '#',
      cta2Label: 'Learn More', cta2LabelBn: 'আরও জানুন', cta2Href: '#',
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render: (props: any) => <HeroSectionRender {...props} />,
  },

  ImageText: {
    label: '🖼️ Image + Text (2-column)',
    fields: {
      imageUrl: imageUploadField('Image'),
      imageAlt: { type: 'text' as const, label: 'Image Alt Text' },
      imagePosition: { type: 'radio' as const, label: 'Image Position', options: [{ label: 'Left', value: 'left' }, { label: 'Right', value: 'right' }] },
      imageWidthPct: { type: 'number' as const, label: 'Image Column Width (%)' },
      imageAspect: { type: 'text' as const, label: 'Image Aspect Ratio (e.g. 4/3, 1/1, 16/9)' },
      imageRadius: { type: 'number' as const, label: 'Image Border Radius (px)' },
      tag: richTextField('Tag / Badge (English, optional)'),
      tagBn: richTextField('Tag / Badge (বাংলা, optional)'),
      title: richTextField('Title (English)'),
      titleBn: richTextField('Title (বাংলা)'),
      titleColor: { type: 'text' as const, label: 'Title Color (default: #1B4D3E)' },
      body: richTextField('Body Text (English)'),
      bodyBn: richTextField('Body Text (বাংলা)'),
      ctaLabel: richTextField('Button Label (English, optional)'),
      ctaLabelBn: richTextField('Button Label (বাংলা, optional)'),
      ctaHref: { type: 'text' as const, label: 'Button Link' },
      ctaBg: { type: 'text' as const, label: 'Button Background (CSS)' },
      ctaColor: { type: 'text' as const, label: 'Button Text Color' },
      bgColor: { type: 'text' as const, label: 'Section Background Color' },
    },
    defaultProps: {
      imageUrl: '', imageAlt: '', imagePosition: 'left', imageWidthPct: 45, imageAspect: '4/3', imageRadius: 20,
      tag: '', tagBn: '',
      title: 'Compelling Section Title', titleBn: 'চমৎকার সেকশন শিরোনাম',
      titleColor: '#1B4D3E',
      body: 'Describe your product, service, or story here. This section supports rich text.', bodyBn: 'এখানে আপনার পণ্য, সেবা বা গল্প বর্ণনা করুন। এই সেকশনে রিচ টেক্সট সাপোর্ট করে।',
      ctaLabel: 'Learn More', ctaLabelBn: 'আরও জানুন', ctaHref: '#',
      ctaBg: 'linear-gradient(135deg,#1B4D3E,#2D7A3A)', ctaColor: 'white',
      bgColor: 'white',
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render: (props: any) => <ImageTextRender {...props} />,
  },

  FeatureGrid: {
    label: '⚡ Feature / Card Grid',
    fields: {
      tag: richTextField('Section Tag (English, optional)'),
      tagBn: richTextField('Section Tag (বাংলা, optional)'),
      sectionTitle: richTextField('Section Title (English, optional)'),
      sectionTitleBn: richTextField('Section Title (বাংলা, optional)'),
      columns: { type: 'radio' as const, label: 'Columns', options: [{ label: '2', value: 2 }, { label: '3', value: 3 }, { label: '4', value: 4 }] },
      cardAlign: { type: 'radio' as const, label: 'Card Text Align', options: [{ label: 'Left', value: 'left' }, { label: 'Center', value: 'center' }] },
      bgColor: { type: 'text' as const, label: 'Section Background Color' },
      items: {
        type: 'array' as const,
        label: 'Cards',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getItemSummary: (item: any) => item.title || item.titleBn || 'Card',
        arrayFields: {
          icon: { type: 'text' as const, label: 'Icon (emoji — used when no image)' },
          imageUrl: imageUploadField('Card Image (optional — replaces icon)'),
          imageAlt: { type: 'text' as const, label: 'Image Alt Text' },
          title: richTextField('Title (English)'),
          titleBn: richTextField('Title (বাংলা)'),
          body: richTextField('Body (English)'),
          bodyBn: richTextField('Body (বাংলা)'),
        },
        defaultItemProps: { icon: '⭐', imageUrl: '', imageAlt: '', title: 'Feature Title', titleBn: 'ফিচার শিরোনাম', body: 'Short description here.', bodyBn: 'সংক্ষিপ্ত বিবরণ এখানে।' },
      },
    },
    defaultProps: {
      tag: '', tagBn: '', sectionTitle: 'Our Key Features', sectionTitleBn: 'আমাদের মূল বৈশিষ্ট্যসমূহ',
      columns: 3, cardAlign: 'left', bgColor: '#F8F9FA',
      items: [
        { icon: '🚀', imageUrl: '', imageAlt: '', title: 'Fast Performance', titleBn: 'দ্রুত পারফরম্যান্স', body: 'Lightning-fast load times.', bodyBn: 'দ্রুত লোড সময়।' },
        { icon: '🎨', imageUrl: '', imageAlt: '', title: 'Beautiful Design', titleBn: 'সুন্দর ডিজাইন', body: 'Pixel-perfect, modern UI.', bodyBn: 'পিক্সেল-পারফেক্ট, আধুনিক UI।' },
        { icon: '🔒', imageUrl: '', imageAlt: '', title: 'Secure & Reliable', titleBn: 'নিরাপদ ও নির্ভরযোগ্য', body: 'Enterprise-grade security.', bodyBn: 'এন্টারপ্রাইজ-গ্রেড নিরাপত্তা।' },
      ],
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render: (props: any) => <FeatureGridRender {...props} />,
  },

  Testimonials: {
    label: '💬 Testimonials',
    fields: {
      sectionTitle: richTextField('Section Title (English, optional)'),
      sectionTitleBn: richTextField('Section Title (বাংলা, optional)'),
      columns: { type: 'radio' as const, label: 'Columns', options: [{ label: '1', value: 1 }, { label: '2', value: 2 }, { label: '3', value: 3 }] },
      bgColor: { type: 'text' as const, label: 'Section Background (CSS)' },
      items: {
        type: 'array' as const,
        label: 'Reviews',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getItemSummary: (item: any) => item.author || 'Review',
        arrayFields: {
          quote: richTextField('Quote (English)'),
          quoteBn: richTextField('Quote (বাংলা)'),
          author: { type: 'text' as const, label: 'Author Name' },
          role: { type: 'text' as const, label: 'Role / Company (optional)' },
          stars: { type: 'number' as const, label: 'Star Rating (1–5)' },
          avatarUrl: imageUploadField('Avatar Image (optional)'),
        },
        defaultItemProps: { quote: 'An amazing product that changed how we work.', quoteBn: 'একটি অসাধারণ পণ্য যা আমাদের কাজ করার পদ্ধতি পরিবর্তন করেছে।', author: 'Rahim Uddin', role: 'Farmer, Rajshahi', stars: 5, avatarUrl: '' },
      },
    },
    defaultProps: {
      sectionTitle: 'What Our Customers Say', sectionTitleBn: 'আমাদের গ্রাহকরা কী বলেন',
      columns: 3, bgColor: '',
      items: [
        { quote: 'Excellent quality and fast delivery!', quoteBn: 'চমৎকার মান এবং দ্রুত ডেলিভারি!', author: 'Karim Ahmed', role: 'Farmer, Bogura', stars: 5, avatarUrl: '' },
        { quote: 'This product transformed my harvest.', quoteBn: 'এই পণ্যটি আমার ফসল রূপান্তরিত করেছে।', author: 'Fatema Begum', role: 'Farmer, Comilla', stars: 5, avatarUrl: '' },
        { quote: 'Highly recommended for all farmers.', quoteBn: 'সকল কৃষকদের জন্য অত্যন্ত সুপারিশকৃত।', author: 'Sumon Mia', role: 'Farmer, Mymensingh', stars: 4, avatarUrl: '' },
      ],
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render: (props: any) => <TestimonialsRender {...props} />,
  },

  FAQAccordion: {
    label: '❓ FAQ Accordion',
    fields: {
      sectionTitle: richTextField('Section Title (English, optional)'),
      sectionTitleBn: richTextField('Section Title (বাংলা, optional)'),
      bgColor: { type: 'text' as const, label: 'Section Background Color' },
      items: {
        type: 'array' as const,
        label: 'FAQ Items',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getItemSummary: (item: any) => item.question || item.questionBn || 'FAQ',
        arrayFields: {
          question: richTextField('Question (English)'),
          questionBn: richTextField('Question (বাংলা)'),
          answer: richTextField('Answer (English)'),
          answerBn: richTextField('Answer (বাংলা)'),
        },
        defaultItemProps: { question: 'What is included?', questionBn: 'কী কী অন্তর্ভুক্ত?', answer: 'Everything you need to get started.', answerBn: 'শুরু করার জন্য প্রয়োজনীয় সব কিছু।' },
      },
    },
    defaultProps: {
      sectionTitle: 'Frequently Asked Questions', sectionTitleBn: 'প্রায়শই জিজ্ঞাসিত প্রশ্নাবলী',
      bgColor: 'white',
      items: [
        { question: 'How do I use this product?', questionBn: 'এই পণ্যটি কীভাবে ব্যবহার করব?', answer: 'Apply as directed on the packaging.', answerBn: 'প্যাকেজিংয়ে নির্দেশিত হিসাবে প্রয়োগ করুন।' },
        { question: 'Is this suitable for all crops?', questionBn: 'এটি কি সব ফসলের জন্য উপযুক্ত?', answer: 'Yes, it works for all types of crops.', answerBn: 'হ্যাঁ, এটি সব ধরনের ফসলের জন্য কাজ করে।' },
        { question: 'Where can I buy it?', questionBn: 'এটি কোথায় কিনতে পাই?', answer: 'Available at all major agro shops near you.', answerBn: 'আপনার কাছের সকল প্রধান কৃষি দোকানে পাওয়া যায়।' },
      ],
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render: (props: any) => <FAQAccordionRender {...props} />,
  },

  IconList: {
    label: '📋 Icon List',
    fields: {
      sectionTitle: richTextField('Section Title (English, optional)'),
      sectionTitleBn: richTextField('Section Title (বাংলা, optional)'),
      columns: { type: 'radio' as const, label: 'Columns', options: [{ label: '1', value: 1 }, { label: '2', value: 2 }, { label: '3', value: 3 }] },
      bgColor: { type: 'text' as const, label: 'Section Background Color' },
      items: {
        type: 'array' as const,
        label: 'List Items',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getItemSummary: (item: any) => item.title || item.titleBn || 'Item',
        arrayFields: {
          icon: { type: 'text' as const, label: 'Icon (emoji)' },
          title: richTextField('Title (English)'),
          titleBn: richTextField('Title (বাংলা)'),
          body: richTextField('Body (English, optional)'),
          bodyBn: richTextField('Body (বাংলা, optional)'),
        },
        defaultItemProps: { icon: '✅', title: 'List Item', titleBn: 'তালিকা আইটেম', body: 'Short description.', bodyBn: 'সংক্ষিপ্ত বিবরণ।' },
      },
    },
    defaultProps: {
      sectionTitle: '', sectionTitleBn: '',
      columns: 2, bgColor: 'white',
      items: [
        { icon: '🌱', title: '100% Organic', titleBn: '১০০% জৈব', body: 'Made from natural materials only.', bodyBn: 'শুধুমাত্র প্রাকৃতিক উপাদান থেকে তৈরি।' },
        { icon: '🌾', title: 'Boosts Yield', titleBn: 'ফলন বৃদ্ধি করে', body: 'Up to 30% more yield per season.', bodyBn: 'প্রতি মৌসুমে ৩০% বেশি ফলন।' },
        { icon: '💧', title: 'Water Efficient', titleBn: 'পানি সাশ্রয়ী', body: 'Retains soil moisture longer.', bodyBn: 'মাটির আর্দ্রতা দীর্ঘস্থায়ী করে।' },
        { icon: '🔬', title: 'Lab Tested', titleBn: 'ল্যাব পরীক্ষিত', body: 'Quality assured by experts.', bodyBn: 'বিশেষজ্ঞদের দ্বারা গুণমান নিশ্চিত।' },
      ],
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render: (props: any) => <IconListRender {...props} />,
  },

  GalleryGrid: {
    label: '🖼️ Photo Gallery Grid',
    fields: {
      sectionTitle: richTextField('Section Title (English, optional)'),
      sectionTitleBn: richTextField('Section Title (বাংলা, optional)'),
      columns: { type: 'radio' as const, label: 'Columns', options: [{ label: '2', value: 2 }, { label: '3', value: 3 }, { label: '4', value: 4 }] },
      aspectRatio: { type: 'text' as const, label: 'Aspect Ratio (e.g. 1/1, 4/3, 16/9)' },
      gap: { type: 'number' as const, label: 'Gap between photos (px)' },
      bgColor: { type: 'text' as const, label: 'Section Background Color' },
      items: {
        type: 'array' as const,
        label: 'Photos',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getItemSummary: (item: any) => item.caption || item.captionBn || 'Photo',
        arrayFields: {
          imageUrl: imageUploadField('Photo'),
          caption: richTextField('Caption (English, optional)'),
          captionBn: richTextField('Caption (বাংলা, optional)'),
        },
        defaultItemProps: { imageUrl: '', caption: '', captionBn: '' },
      },
    },
    defaultProps: {
      sectionTitle: 'Gallery', sectionTitleBn: 'গ্যালারি',
      columns: 3, aspectRatio: '1/1', gap: 12, bgColor: 'white',
      items: [
        { imageUrl: '', caption: '', captionBn: '' },
        { imageUrl: '', caption: '', captionBn: '' },
        { imageUrl: '', caption: '', captionBn: '' },
      ],
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render: (props: any) => <GalleryGridRender {...props} />,
  },

  Spacer: {
    label: '↕️ Spacer',
    fields: {
      height: { type: 'number' as const, label: 'Height (px)' },
      bgColor: { type: 'text' as const, label: 'Background Color (default: transparent)' },
    },
    defaultProps: { height: 60, bgColor: 'transparent' },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render: (props: any) => <SpacerRender {...props} />,
  },

  Divider: {
    label: '➖ Divider / Section Break',
    fields: {
      label: richTextField('Center Label (English, optional)'),
      labelBn: richTextField('Center Label (বাংলা, optional)'),
      color: { type: 'text' as const, label: 'Line Color (CSS)' },
      labelColor: { type: 'text' as const, label: 'Label Text Color' },
      thickness: { type: 'number' as const, label: 'Line Thickness (px)' },
      paddingY: { type: 'number' as const, label: 'Vertical Padding (px)' },
      maxWidth: { type: 'number' as const, label: 'Max Width (px)' },
      bgColor: { type: 'text' as const, label: 'Section Background Color' },
    },
    defaultProps: {
      label: '', labelBn: '',
      color: 'rgba(27,77,62,0.15)', labelColor: '#9ca3af',
      thickness: 1, paddingY: 24, maxWidth: 1200, bgColor: 'transparent',
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render: (props: any) => <DividerRender {...props} />,
  },
}
