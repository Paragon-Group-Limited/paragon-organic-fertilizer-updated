import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import Image from 'next/image'
import { Leaf, CheckCircle, Package, Star, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import AddToCartButton from '@/components/shop/AddToCartButton'
import WishlistButton from '@/components/shop/WishlistButton'
import OrderNowButton from '@/components/shop/OrderNowButton'

export const dynamic = 'force-dynamic'

async function fetchProduct(slug: string) {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'products',
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 2,
    })
    return result.docs[0] ?? null
  } catch {
    return null
  }
}

const CATEGORY_LABELS: Record<string, string> = {
  'organic-fertilizer': 'Organic Fertilizer',
  'vermicompost': 'Vermicompost',
  'organic-pesticide': 'Organic Pesticide',
  'soil-improver': 'Soil Improver',
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await fetchProduct(slug)

  if (!product) return notFound()

  const p = product as Record<string, unknown>
  const price = product.price as number | undefined
  const comparePrice = p.comparePrice as number | undefined
  const nameBn = p.nameBn as string | undefined
  const rating = p.rating as number | undefined
  const reviewCount = p.reviewCount as number | undefined
  const weight = p.weight as string | undefined
  const shortDesc = p.shortDescription as string | undefined
  const benefits = (p.benefits as Array<{ benefit: string }> | undefined) || []
  const category = product.category as string | undefined
  const status = product.status as string | undefined
  const isUpcoming = status === 'upcoming'

  const mainImage = product.image as { url?: string | null; alt?: string } | null
  const gallery = (p.gallery as Array<{ image: { url?: string | null } }> | undefined) || []

  const hasDiscount = comparePrice && price && comparePrice > price
  const discountPct = hasDiscount ? Math.round((1 - price / comparePrice) * 100) : 0

  const cartProduct = {
    id: String(product.id),
    name: product.name,
    nameBn: nameBn || product.name,
    slug: product.slug,
    price: price || 0,
    image: mainImage?.url || null,
    weight: weight,
  }

  return (
    <div className="min-h-screen pt-20" style={{ backgroundColor: '#F4F7F4' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Back */}
        <Link href="/shop" className="inline-flex items-center gap-2 text-sm font-medium mb-6 transition-colors hover:opacity-70"
          style={{ color: '#1B4D3E' }}>
          <ArrowLeft className="w-4 h-4" />
          Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">

          {/* Images */}
          <div className="space-y-3">
            <div className="rounded-2xl overflow-hidden aspect-square relative"
              style={{ background: '#fff', boxShadow: '0 2px 20px rgba(0,0,0,0.08)' }}>
              {mainImage?.url ? (
                <Image src={mainImage.url} alt={mainImage.alt || product.name}
                  fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" priority />
              ) : (
                <div className="w-full h-full flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #e8f5e9, #c8e6c9)' }}>
                  <Leaf className="w-24 h-24" style={{ color: '#1B4D3E', opacity: 0.2 }} />
                </div>
              )}
              {isUpcoming && (
                <div className="absolute inset-0 flex items-center justify-center"
                  style={{ background: 'rgba(0,0,0,0.4)' }}>
                  <span className="px-6 py-2 rounded-full text-white font-bold text-lg tracking-widest"
                    style={{ background: '#1B4D3E', border: '2px solid #D4A017' }}>
                    UPCOMING
                  </span>
                </div>
              )}
            </div>
            {/* Gallery thumbnails */}
            {gallery.length > 0 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {[{ image: mainImage }, ...gallery].filter(g => g.image?.url).map((g, i) => (
                  <div key={i} className="w-16 h-16 rounded-xl overflow-hidden shrink-0 relative"
                    style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                    <Image src={(g.image as { url?: string | null }).url!} alt=""
                      fill sizes="64px" className="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="flex-1">
                {category && (
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide mb-3"
                    style={{ background: 'rgba(27,77,62,0.1)', color: '#1B4D3E' }}>
                    {CATEGORY_LABELS[category] || category}
                  </span>
                )}
                <h1 className="text-2xl font-bold text-gray-900 leading-tight mb-1"
                  style={{ fontFamily: 'var(--font-hind)' }}>
                  {nameBn || product.name}
                </h1>
                <p className="text-gray-500 text-sm">{product.name}</p>
              </div>
              <WishlistButton productId={String(product.id)} />
            </div>

            {/* Rating */}
            {rating != null && rating > 0 && (
              <div className="flex items-center gap-2 mb-4">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="w-4 h-4"
                    style={{ color: i <= Math.round(rating) ? '#F5C842' : '#D1D5DB', fill: i <= Math.round(rating) ? '#F5C842' : 'none' }} />
                ))}
                <span className="text-sm font-semibold text-gray-700">{rating.toFixed(1)}</span>
                {reviewCount && <span className="text-sm text-gray-400">({reviewCount} reviews)</span>}
              </div>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-2">
              {isUpcoming ? (
                <span className="text-xl font-medium text-gray-400">Coming Soon</span>
              ) : (
                <>
                  <span className="text-3xl font-bold" style={{ color: '#1B4D3E' }}>
                    Tk {(price || 0).toLocaleString()}
                  </span>
                  {hasDiscount && (
                    <span className="text-lg line-through text-gray-400">
                      Tk {comparePrice!.toLocaleString()}
                    </span>
                  )}
                  {hasDiscount && (
                    <span className="px-2.5 py-0.5 rounded-full text-sm font-bold"
                      style={{ background: '#ef4444', color: '#fff' }}>
                      -{discountPct}% OFF
                    </span>
                  )}
                </>
              )}
            </div>
            {weight && <p className="text-sm text-gray-500 mb-4">Weight: {weight}</p>}

            {/* Short description */}
            {shortDesc && (
              <p className="text-gray-600 text-sm leading-relaxed mb-6 pb-6 border-b border-gray-100">
                {shortDesc}
              </p>
            )}

            {/* Benefits */}
            {benefits.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-3">Benefits</h3>
                <ul className="space-y-2">
                  {benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" style={{ color: '#1B4D3E' }} />
                      {b.benefit}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Actions */}
            {!isUpcoming && (
              <div className="flex gap-3 mt-6">
                <AddToCartButton product={cartProduct} variant="outline" label="Add to Cart" />
                <OrderNowButton
                  product={cartProduct}
                  className="flex-1 flex items-center justify-center px-6 py-3 rounded-full font-semibold text-sm transition-all hover:scale-[1.02] active:scale-95"
                  style={{ background: 'linear-gradient(135deg, #D4A017, #F5C842)', color: '#1B4D3E' }}
                />
              </div>
            )}

            {/* Shipping note */}
            {!isUpcoming && (
              <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
                <Package className="w-4 h-4" style={{ color: '#1B4D3E' }} />
                Free delivery on orders above Tk 500. Cash on Delivery available.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
