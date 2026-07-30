'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Star, Tag } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import AddToCartButton from './AddToCartButton'
import WishlistButton from './WishlistButton'

type MediaDoc = { url?: string | null; alt?: string }

type Product = {
  id: string | number
  name: string
  nameBn?: string
  slug: string
  price?: number | null
  comparePrice?: number | null
  category?: string | null
  status?: string | null
  image?: MediaDoc | null
  rating?: number | null
  reviewCount?: number | null
  weight?: string | null
  shortDescription?: string | null
}

function toBn(str: string): string {
  const map: Record<string, string> = { '0':'০','1':'১','2':'২','3':'৩','4':'৪','5':'৫','6':'৬','7':'৭','8':'৮','9':'৯' }
  return str.replace(/[0-9]/g, d => map[d] ?? d)
}

const CATEGORY_LABELS_EN: Record<string, string> = {
  'organic-fertilizer': 'Organic Fertilizer',
  'vermicompost': 'Vermicompost',
  'organic-pesticide': 'Organic Pesticide',
  'soil-improver': 'Soil Improver',
}

const CATEGORY_LABELS_BN: Record<string, string> = {
  'organic-fertilizer': 'জৈব সার',
  'vermicompost': 'ভার্মিকম্পোস্ট',
  'organic-pesticide': 'জৈব কীটনাশক',
  'soil-improver': 'মাটি উন্নয়নকারী',
}

function StarRating({ rating, count }: { rating: number; count?: number | null }) {
  const full = Math.floor(rating)
  const half = rating % 1 >= 0.5
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map(i => (
        <Star key={i} className="w-3.5 h-3.5"
          style={{
            color: i <= full ? '#F5C842' : (i === full + 1 && half ? '#F5C842' : '#D1D5DB'),
            fill: i <= full ? '#F5C842' : (i === full + 1 && half ? '#F5C842' : 'none'),
            opacity: i === full + 1 && half ? 0.6 : 1,
          }}
        />
      ))}
      {count != null && count > 0 && (
        <span className="text-xs text-gray-400 ml-0.5">{count}</span>
      )}
    </div>
  )
}

export default function ProductCard({ product }: { product: Product }) {
  const router = useRouter()
  const { lang } = useLanguage()
  const displayName = lang === 'en' ? product.name : (product.nameBn || product.name)
  const isUpcoming = product.status === 'upcoming'
  const hasDiscount = product.comparePrice && product.price && product.comparePrice > product.price
  const discountPct = hasDiscount
    ? Math.round((1 - (product.price! / product.comparePrice!)) * 100)
    : 0

  const imageUrl = product.image?.url || null
  const categoryLabel = product.category
    ? (lang === 'bn' ? (CATEGORY_LABELS_BN[product.category] || CATEGORY_LABELS_EN[product.category] || product.category) : (CATEGORY_LABELS_EN[product.category] || product.category))
    : null

  const cartProduct = {
    id: String(product.id),
    name: product.name,
    nameBn: product.nameBn || product.name,
    slug: product.slug,
    price: product.price || 0,
    image: imageUrl,
    weight: product.weight || undefined,
  }

  return (
    <div
      className="group relative rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 cursor-pointer"
      style={{ background: '#fff', boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}
      onClick={() => router.push(`/shop/${product.slug}`)}
      onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 8px 32px rgba(27,77,62,0.15)')}
      onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.07)')}>

      {/* Image area */}
      <div className="relative overflow-hidden" style={{ height: 220 }}>
        {imageUrl ? (
          <Image src={imageUrl} alt={product.image?.alt || product.name}
            fill sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <div className="w-full h-full flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #e8f5e9, #c8e6c9)' }}>
            <Tag className="w-12 h-12" style={{ color: '#1B4D3E', opacity: 0.3 }} />
          </div>
        )}

        {isUpcoming && (
          <div className="absolute inset-0 flex items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.45)' }}>
            <span className="px-4 py-1.5 rounded-full text-white text-sm font-bold tracking-widest uppercase"
              style={{ background: '#1B4D3E', border: '2px solid #D4A017', fontFamily: 'var(--font-hind)' }}>
              {lang === 'bn' ? 'শীঘ্রই আসছে' : 'Upcoming'}
            </span>
          </div>
        )}

        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {categoryLabel && (
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wide"
              style={{ background: 'rgba(27,77,62,0.9)', color: '#fff' }}>
              {categoryLabel}
            </span>
          )}
          {hasDiscount && !isUpcoming && (
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold"
              style={{ background: '#ef4444', color: '#fff' }}>
              -{discountPct}% OFF
            </span>
          )}
        </div>

        {/* stopPropagation so wishlist click doesn't also navigate to product page */}
        {!isUpcoming && (
          <div className="absolute top-3 right-3 z-10" onClick={e => e.stopPropagation()}>
            <WishlistButton productId={String(product.id)} />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        {product.rating != null && product.rating > 0 && (
          <div className="mb-2">
            <StarRating rating={product.rating} count={product.reviewCount} />
          </div>
        )}

        <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2 group-hover:text-green-800 transition-colors"
          style={{ fontFamily: lang === 'bn' ? 'var(--font-noto-bn), var(--font-hind)' : 'var(--font-hind)', lineHeight: '1.65' }}>
          {displayName}
        </h3>
        <p className="text-xs text-gray-400 mb-3 line-clamp-1">{product.name}</p>

        <div className="flex items-baseline gap-2 mb-4">
          {isUpcoming ? (
            <span className="text-sm font-medium text-gray-400" style={{ fontFamily: 'var(--font-hind)' }}>
              {lang === 'bn' ? 'শীঘ্রই আসছে' : 'Coming Soon'}
            </span>
          ) : (
            <>
              <span className="text-xl font-bold" style={{ color: '#1B4D3E', fontFamily: lang === 'bn' ? 'var(--font-noto-bn), var(--font-hind)' : 'inherit' }}>
                {lang === 'bn'
                  ? `৳ ${toBn((product.price || 0).toLocaleString())}`
                  : `Tk ${(product.price || 0).toLocaleString()}`}
              </span>
              {hasDiscount && (
                <span className="text-sm line-through text-gray-400" style={{ fontFamily: lang === 'bn' ? 'var(--font-noto-bn), var(--font-hind)' : 'inherit' }}>
                  {lang === 'bn'
                    ? `৳ ${toBn(product.comparePrice!.toLocaleString())}`
                    : `Tk ${product.comparePrice!.toLocaleString()}`}
                </span>
              )}
              {product.weight && (
                <span className="text-xs text-gray-400 ml-auto">{product.weight}</span>
              )}
            </>
          )}
        </div>

        {/* stopPropagation so button clicks don't double-fire the card navigation */}
        <div onClick={e => e.stopPropagation()}>
          {!isUpcoming ? (
            <div className="flex gap-2">
              <AddToCartButton product={cartProduct} variant="icon" />
              <button
                onClick={() => router.push(`/shop/${product.slug}`)}
                className="flex-1 flex items-center justify-center px-3 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-95"
                style={{ background: 'linear-gradient(135deg, #D4A017, #F5C842)', color: '#1B4D3E', fontFamily: 'var(--font-hind)' }}>
                {lang === 'bn' ? 'অর্ডার করুন' : 'Order Now'}
              </button>
            </div>
          ) : (
            <button disabled
              className="w-full py-2.5 rounded-full text-sm font-semibold text-gray-400 cursor-not-allowed"
              style={{ background: '#f3f4f6', fontFamily: 'var(--font-hind)' }}>
              {lang === 'bn' ? 'শীঘ্রই আসছে' : 'Coming Soon'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
