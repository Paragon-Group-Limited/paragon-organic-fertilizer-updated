'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ShoppingCart, Package, ArrowRight, CheckCircle2 } from 'lucide-react'
import { RichText } from '@/components/puck/RichText'
import { useT } from '@/hooks/useT'
import { imageUploadField } from '@/puck/fields/imageUploadField'
import { richTextField } from '@/puck/fields/richTextField'

// Textarea with its own visible label — for use inside array items where
// Puck does not render labels for custom fields automatically.
function textareaField(label: string) {
  return {
    type: 'custom' as const,
    label,
    render: ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: '#374151', fontFamily: 'sans-serif' }}>
          {label}
        </div>
        <textarea
          value={value || ''}
          onChange={e => onChange(e.target.value)}
          rows={3}
          style={{
            width: '100%', padding: '7px 9px', border: '1px solid #d1d5db',
            borderRadius: 5, fontSize: 13, resize: 'vertical',
            fontFamily: 'var(--font-hind, sans-serif)', lineHeight: 1.6,
            boxSizing: 'border-box', outline: 'none',
          }}
        />
      </div>
    ),
  }
}

// Image upload with its own visible label — same reason as above.
function labeledImageUploadField(label: string) {
  const base = imageUploadField(label)
  return {
    ...base,
    render: (opts: { value: string; onChange: (v: string) => void }) => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: '#374151', fontFamily: 'sans-serif' }}>
          {label}
        </div>
        {base.render(opts)}
      </div>
    ),
  }
}

type ProductItem = {
  imageUrl: string
  name: string
  nameEn: string
  weight: string
  desc: string
  descEn: string
  badge: string
  badgeEn: string
  featured: boolean
  gradient: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ProductsGridBlock(props: any) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const t = useT()

  const products: ProductItem[] = (props.products || []).filter(
    (p: ProductItem) => p.name || p.nameEn
  )

  return (
    <section ref={ref} className="py-20 lg:py-28" style={{ background: '#F8F5EE' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {props.sectionTag && (
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6"
              style={{ background: 'rgba(27,77,62,0.08)', color: '#1B4D3E', border: '1px solid rgba(27,77,62,0.15)', fontFamily: 'var(--font-inter)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#1B4D3E' }} />
              <RichText html={t(props.sectionTag, props.sectionTagEn)} inline />
            </div>
          )}
          <h2
            className="text-4xl lg:text-5xl font-bold mb-4"
            style={{ color: '#1B4D3E', fontFamily: 'var(--font-hind)' }}
          >
            <RichText html={t(props.sectionHeading || '', props.sectionHeadingEn)} inline />
            {props.sectionHighlight && (
              <>{' '}<span style={{ color: '#D4A017' }}><RichText html={t(props.sectionHighlight, props.sectionHighlightEn)} inline /></span></>
            )}
          </h2>
          {props.sectionSubtitle && (
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#6b7280', fontFamily: 'var(--font-hind)' }}>
              <RichText html={t(props.sectionSubtitle, props.sectionSubtitleEn)} inline />
            </p>
          )}
        </motion.div>

        {/* Product cards */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + idx * 0.12 }}
                className="relative group"
              >
                {/* Featured glow ring */}
                {product.featured && (
                  <div
                    className="absolute -inset-0.5 rounded-3xl opacity-70 group-hover:opacity-100 transition-opacity"
                    style={{ background: 'linear-gradient(135deg, #1B4D3E, #D4A017)', zIndex: 0 }}
                  />
                )}

                <div
                  className="relative bg-white rounded-3xl overflow-hidden transition-all duration-300 group-hover:-translate-y-2 flex flex-col"
                  style={{
                    boxShadow: product.featured
                      ? '0 20px 60px rgba(27,77,62,0.18)'
                      : '0 8px 40px rgba(27,77,62,0.09)',
                    zIndex: 1,
                  }}
                >
                  {/* Best seller badge */}
                  {product.featured && (
                    <div
                      className="absolute top-4 left-4 z-10 flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold"
                      style={{ background: 'linear-gradient(135deg, #D4A017, #F5C842)', color: '#1B4D3E' }}
                    >
                      ⭐ {t('সেরা বিক্রি', 'Best Seller')}
                    </div>
                  )}

                  {/* Product image */}
                  <div className="relative w-full overflow-hidden" style={{ background: product.gradient || 'linear-gradient(135deg, #1B4D3E 0%, #2D7A3A 100%)' }}>
                    {product.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={product.imageUrl}
                        alt={t(product.name, product.nameEn)}
                        className="w-full h-auto block"
                        style={{ display: 'block' }}
                      />
                    ) : (
                      <>
                        <div style={{ paddingTop: '85%' }} />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Package className="w-24 h-24 text-white opacity-25" />
                        </div>
                      </>
                    )}

                    {/* Weight badge overlay */}
                    {product.weight && (
                      <div
                        className="absolute bottom-0 left-0 right-0 px-5 pb-4 pt-12"
                        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%)' }}
                      >
                        <span
                          className="inline-block px-4 py-1.5 rounded-full text-sm font-bold text-white"
                          style={{
                            background: 'rgba(255,255,255,0.18)',
                            backdropFilter: 'blur(6px)',
                            border: '1px solid rgba(255,255,255,0.35)',
                          }}
                        >
                          {product.weight}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card body */}
                  <div className="p-6 flex flex-col flex-1">
                    {product.badge && (
                      <span
                        className="inline-block self-start px-3 py-1 rounded-full text-xs font-semibold mb-3"
                        style={{ background: 'rgba(27,77,62,0.08)', color: '#1B4D3E' }}
                      >
                        {t(product.badge, product.badgeEn)}
                      </span>
                    )}

                    <h3
                      className="text-xl font-bold mb-3"
                      style={{ color: '#1B4D3E', fontFamily: 'var(--font-hind)', lineHeight: 1.4 }}
                    >
                      <RichText html={t(product.name, product.nameEn)} inline />
                    </h3>

                    {product.desc && (
                      <div
                        className="text-sm leading-relaxed flex-1"
                        style={{ color: '#6b7280', fontFamily: 'var(--font-hind)' }}
                      >
                        <RichText html={t(product.desc, product.descEn)} />
                      </div>
                    )}

                    <div className="mt-4 pt-4" style={{ borderTop: '1px solid rgba(27,77,62,0.08)' }}>
                      <div className="flex items-center gap-2 text-xs" style={{ color: '#1B4D3E' }}>
                        <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: '#2D7A3A' }} />
                        <span style={{ fontFamily: 'var(--font-hind)' }}>{t('১০০% অর্গানিক', '100% Organic')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16" style={{ color: '#9ca3af', fontFamily: 'var(--font-hind)' }}>
            <Package className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <p>{t('Puck editor থেকে পণ্য যোগ করুন', 'Add products from the Puck editor')}</p>
          </div>
        )}

        {/* Order Now CTA */}
        {props.orderHref && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="flex flex-col items-center mt-16 gap-3"
          >
            <a
              href={props.orderHref}
              className="group inline-flex items-center gap-3 px-12 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform"
              style={{
                background: 'linear-gradient(135deg, #D4A017 0%, #F5C842 100%)',
                color: '#1B4D3E',
                fontFamily: 'var(--font-hind)',
                boxShadow: '0 8px 32px rgba(212,160,23,0.45)',
              }}
            >
              <ShoppingCart className="w-5 h-5" />
              <RichText html={t(props.orderLabel || 'এখনই অর্ডার করুন', props.orderLabelEn || 'Order Now')} inline />
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            {props.orderNote && (
              <p className="text-sm text-center" style={{ color: '#9ca3af', fontFamily: 'var(--font-hind)' }}>
                <RichText html={t(props.orderNote, props.orderNoteEn)} inline />
              </p>
            )}
          </motion.div>
        )}
      </div>
    </section>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ProductsCtaBannerBlock(props: any) {
  const t = useT()

  return (
    <section className="relative overflow-hidden" style={{ minHeight: 380 }}>
      {props.bannerImageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={props.bannerImageUrl}
          alt="banner"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: 'center' }}
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{ background: props.bannerGradient || 'linear-gradient(135deg, #0a1f14 0%, #1B4D3E 55%, #2D7A3A 100%)' }}
        />
      )}

      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.15) 100%)' }}
      />

      <div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center"
        style={{ minHeight: 380, paddingTop: 60, paddingBottom: 60 }}
      >
        <h2
          className="text-4xl lg:text-5xl font-bold text-white mb-4 max-w-2xl"
          style={{ fontFamily: 'var(--font-hind)', lineHeight: 1.3 }}
        >
          <RichText html={t(props.bannerTitle || '', props.bannerTitleEn)} inline />
        </h2>
        {props.bannerSubtitle && (
          <p
            className="text-xl mb-8 max-w-xl"
            style={{ color: 'rgba(255,255,255,0.8)', fontFamily: 'var(--font-hind)' }}
          >
            <RichText html={t(props.bannerSubtitle, props.bannerSubtitleEn)} inline />
          </p>
        )}
        {props.bannerCtaHref && (
          <a
            href={props.bannerCtaHref}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold self-start hover:scale-105 transition-transform"
            style={{
              background: 'linear-gradient(135deg, #D4A017, #F5C842)',
              color: '#1B4D3E',
              fontFamily: 'var(--font-hind)',
              boxShadow: '0 6px 24px rgba(212,160,23,0.4)',
            }}
          >
            <RichText html={t(props.bannerCtaLabel || 'এখনই অর্ডার করুন', props.bannerCtaLabelEn || 'Order Now')} inline />
            <ArrowRight className="w-4 h-4" />
          </a>
        )}
      </div>
    </section>
  )
}

// ── Puck block configs ────────────────────────────────────────────────────────

export const productsBlocks = {
  ProductsGridBlock: {
    label: '🛍️ Products Grid (পণ্যের কার্ড)',
    fields: {
      sectionTag: richTextField('Section Tag (বাংলা)'),
      sectionTagEn: richTextField('Section Tag (English)'),
      sectionHeading: richTextField('Section Heading (বাংলা)'),
      sectionHeadingEn: richTextField('Section Heading (English)'),
      sectionHighlight: richTextField('Heading Highlight (gold, বাংলা)'),
      sectionHighlightEn: richTextField('Heading Highlight (gold, English)'),
      sectionSubtitle: richTextField('Section Subtitle (বাংলা)'),
      sectionSubtitleEn: richTextField('Section Subtitle (English)'),

      products: {
        type: 'array' as const,
        label: 'পণ্যের তালিকা (Products) — + দিয়ে নতুন পণ্য যোগ করুন',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getItemSummary: (item: any) => item.name || item.nameEn || 'নতুন পণ্য',
        arrayFields: {
          imageUrl: labeledImageUploadField('📷 পণ্যের ছবি (Product Image)'),
          name: { type: 'text' as const, label: 'পণ্যের নাম *' },
          weight: { type: 'text' as const, label: 'Weight / Size (যেমন: ১ কেজি, ৫ কেজি)' },
          desc: textareaField('বিবরণ'),
          badge: { type: 'text' as const, label: 'Badge (optional — যেমন: সেরা মূল্য, নতুন)' },
          featured: {
            type: 'radio' as const,
            label: 'Featured? (⭐ সেরা বিক্রি badge দেখাবে)',
            options: [{ label: 'হ্যাঁ', value: true }, { label: 'না', value: false }],
          },
          gradient: { type: 'text' as const, label: 'BG Gradient (CSS — ছবি না থাকলে background)' },
        },
        defaultItemProps: {
          imageUrl: '',
          name: 'নতুন পণ্য',
          nameEn: '',
          weight: '',
          desc: '',
          descEn: '',
          badge: '',
          badgeEn: '',
          featured: false,
          gradient: 'linear-gradient(135deg, #1B4D3E 0%, #2D7A3A 100%)',
        },
      },

      orderHref: { type: 'text' as const, label: 'Order Button — Link/Email (mailto:...)' },
      orderLabel: richTextField('Order Button — Label (বাংলা)'),
      orderLabelEn: richTextField('Order Button — Label (English)'),
      orderNote: richTextField('Order Note below button (optional, বাংলা)'),
      orderNoteEn: richTextField('Order Note (optional, English)'),
    },
    defaultProps: {
      sectionTag: 'আমাদের পণ্যসমূহ',
      sectionTagEn: 'Our Products',
      sectionHeading: 'প্যারাগন জৈব সার —',
      sectionHeadingEn: 'Paragon Organic Fertilizer —',
      sectionHighlight: 'তিনটি সাইজে',
      sectionHighlightEn: 'Three Sizes',
      sectionSubtitle: 'আপনার জমির প্রয়োজন অনুযায়ী সঠিক সাইজের প্যারাগন জৈব সার বেছে নিন।',
      sectionSubtitleEn: 'Choose the right size of Paragon Organic Fertilizer for your farm needs.',
      products: [
        {
          imageUrl: '',
          name: 'প্যারাগন জৈব সার — ১ কেজি',
          nameEn: 'Paragon Organic Fertilizer — 1 kg',
          weight: '১ কেজি',
          desc: 'ছোট বাগান ও পরীক্ষামূলক চাষের জন্য আদর্শ। ১০০% অর্গানিক।',
          descEn: 'Ideal for small gardens and trial cultivation. 100% organic.',
          badge: 'পরিচিতি সাইজ',
          badgeEn: 'Starter Size',
          featured: false,
          gradient: 'linear-gradient(135deg, #2D6A2A 0%, #1B4D3E 100%)',
        },
        {
          imageUrl: '',
          name: 'প্যারাগন জৈব সার — ৫ কেজি',
          nameEn: 'Paragon Organic Fertilizer — 5 kg',
          weight: '৫ কেজি',
          desc: 'মাঝারি জমির জন্য সবচেয়ে জনপ্রিয় ও সাশ্রয়ী সাইজ।',
          descEn: 'The most popular and cost-effective size for medium-sized plots.',
          badge: 'সেরা মূল্য',
          badgeEn: 'Best Value',
          featured: true,
          gradient: 'linear-gradient(135deg, #D4A017 0%, #B8860B 100%)',
        },
        {
          imageUrl: '',
          name: 'প্যারাগন জৈব সার — ৪০ কেজি',
          nameEn: 'Paragon Organic Fertilizer — 40 kg',
          weight: '৪০ কেজি',
          desc: 'বড় ক্ষেত ও বাণিজ্যিক চাষের জন্য উপযুক্ত। পাইকারি মূল্যে সর্বোচ্চ সাশ্রয়।',
          descEn: 'Perfect for large fields and commercial farming. Maximum savings at wholesale rates.',
          badge: 'বাণিজ্যিক',
          badgeEn: 'Commercial',
          featured: false,
          gradient: 'linear-gradient(135deg, #4A7C59 0%, #1B4D3E 100%)',
        },
      ],
      orderHref: 'mailto:info.fertilizer@paragon.com.bd',
      orderLabel: 'এখনই অর্ডার করুন',
      orderLabelEn: 'Order Now',
      orderNote: 'ইমেইল: info.fertilizer@paragon.com.bd',
      orderNoteEn: 'Email: info.fertilizer@paragon.com.bd',
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render: (props: any) => <ProductsGridBlock {...props} />,
  },

  ProductsCtaBannerBlock: {
    label: '🖼️ Products CTA Banner (নিচের ব্যানার)',
    fields: {
      bannerImageUrl: imageUploadField('Banner Background Image'),
      bannerGradient: { type: 'text' as const, label: 'Fallback Gradient (no image)' },
      bannerTitle: richTextField('Banner Title (বাংলা)'),
      bannerTitleEn: richTextField('Banner Title (English)'),
      bannerSubtitle: richTextField('Banner Subtitle (বাংলা)'),
      bannerSubtitleEn: richTextField('Banner Subtitle (English)'),
      bannerCtaLabel: richTextField('CTA Button Label (বাংলা)'),
      bannerCtaLabelEn: richTextField('CTA Button Label (English)'),
      bannerCtaHref: { type: 'text' as const, label: 'CTA Button Link/Email' },
    },
    defaultProps: {
      bannerImageUrl: '',
      bannerGradient: 'linear-gradient(135deg, #0a1f14 0%, #1B4D3E 55%, #2D7A3A 100%)',
      bannerTitle: 'প্যারাগন জৈব সার, মাটির প্রাণ, কৃষকের আস্থা',
      bannerTitleEn: "Paragon Organic Fertilizer — Soul of Soil, Farmer's Trust",
      bannerSubtitle: 'আজই অর্ডার করুন এবং আপনার জমির মাটিকে সুস্থ রাখুন।',
      bannerSubtitleEn: 'Order today and keep your soil healthy for a better harvest.',
      bannerCtaLabel: 'এখনই অর্ডার করুন',
      bannerCtaLabelEn: 'Order Now',
      bannerCtaHref: 'mailto:info.fertilizer@paragon.com.bd',
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render: (props: any) => <ProductsCtaBannerBlock {...props} />,
  },
}
