'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useCart } from '@/contexts/CartContext'
import { useLanguage } from '@/contexts/LanguageContext'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Heart, ShoppingBag, ArrowLeft, Leaf, Tag } from 'lucide-react'
import AddToCartButton from '@/components/shop/AddToCartButton'
import WishlistButton from '@/components/shop/WishlistButton'
import { motion, AnimatePresence } from 'framer-motion'

type Product = {
  id: string | number
  name: string
  nameBn?: string
  slug: string
  price?: number | null
  comparePrice?: number | null
  status?: string | null
  image?: { url?: string | null; alt?: string } | null
  weight?: string | null
  shortDescription?: string | null
}

export default function WishlistPage() {
  const { wishlist } = useCart()
  const { lang } = useLanguage()
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (wishlist.length === 0) {
      setProducts([])
      return
    }
    setLoading(true)
    fetch('/api/products/by-ids', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids: wishlist }),
    })
      .then(r => r.json())
      .then(data => {
        setProducts(data.products || [])
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false))
  }, [wishlist])

  const t = {
    title: lang === 'en' ? 'My Wishlist' : 'আমার পছন্দের তালিকা',
    subtitle: lang === 'en' ? 'Items you\'ve saved for later' : 'পরে কেনার জন্য সংরক্ষিত পণ্য',
    empty: lang === 'en' ? 'Your wishlist is empty' : 'আপনার পছন্দের তালিকা খালি',
    emptyDesc: lang === 'en' ? 'Browse our shop and save products you love' : 'আমাদের পণ্য দেখুন এবং পছন্দের পণ্য সংরক্ষণ করুন',
    browse: lang === 'en' ? 'Browse Shop' : 'পণ্য দেখুন',
    back: lang === 'en' ? 'Back to Shop' : 'দোকানে ফিরুন',
    addCart: lang === 'en' ? 'Add to Cart' : 'কার্টে যোগ করুন',
    remove: lang === 'en' ? 'Remove' : 'সরান',
    saved: lang === 'en' ? 'item saved' : 'টি পণ্য সংরক্ষিত',
    savedPl: lang === 'en' ? 'items saved' : 'টি পণ্য সংরক্ষিত',
  }

  return (
    <div className="min-h-screen pt-24 pb-16" style={{ backgroundColor: '#F4F7F4' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8">
          <Link href="/shop"
            className="inline-flex items-center gap-2 text-sm font-medium mb-6 transition-opacity hover:opacity-70"
            style={{ color: '#1B4D3E' }}>
            <ArrowLeft className="w-4 h-4" />
            {t.back}
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #ffe4e4, #fecaca)' }}>
              <Heart className="w-6 h-6" style={{ fill: '#ef4444', color: '#ef4444' }} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-hind)' }}>
                {t.title}
              </h1>
              {wishlist.length > 0 && (
                <p className="text-sm text-gray-500">
                  {wishlist.length} {wishlist.length === 1 ? t.saved : t.savedPl}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: wishlist.length || 2 }).map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden animate-pulse"
                style={{ background: '#fff', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                <div className="h-52 bg-gray-100" />
                <div className="p-4 space-y-3">
                  <div className="h-3 bg-gray-100 rounded w-3/4" />
                  <div className="h-3 bg-gray-100 rounded w-1/2" />
                  <div className="h-8 bg-gray-100 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && wishlist.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-24 h-24 rounded-full flex items-center justify-center mb-6"
              style={{ background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)' }}>
              <Heart className="w-10 h-10" style={{ color: '#1B4D3E', opacity: 0.3 }} />
            </div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2" style={{ fontFamily: 'var(--font-hind)' }}>
              {t.empty}
            </h2>
            <p className="text-gray-400 text-sm mb-8 max-w-xs">{t.emptyDesc}</p>
            <Link href="/shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm transition-all hover:scale-105 active:scale-95"
              style={{ background: 'linear-gradient(135deg, #1B4D3E, #2d6a57)', color: '#fff' }}>
              <ShoppingBag className="w-4 h-4" />
              {t.browse}
            </Link>
          </div>
        )}

        {/* Product grid */}
        {!loading && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {products.map((product, i) => {
                const displayName = lang === 'en' ? product.name : (product.nameBn || product.name)
                const isUpcoming = product.status === 'upcoming'
                const hasDiscount = product.comparePrice && product.price && product.comparePrice > product.price
                const discountPct = hasDiscount
                  ? Math.round((1 - (product.price! / product.comparePrice!)) * 100)
                  : 0
                const imageUrl = product.image?.url || null

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
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: i * 0.05, duration: 0.25 }}
                    className="group relative rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
                    style={{ background: '#fff', boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}
                    onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 8px 32px rgba(27,77,62,0.15)')}
                    onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.07)')}>

                    {/* Card overlay link */}
                    <Link href={`/shop/${product.slug}`}
                      className="absolute inset-0 z-0"
                      aria-label={product.name} />

                    {/* Image */}
                    <div className="relative overflow-hidden" style={{ height: 220 }}>
                      {imageUrl ? (
                        <Image src={imageUrl} alt={product.image?.alt || product.name}
                          fill sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center"
                          style={{ background: 'linear-gradient(135deg, #e8f5e9, #c8e6c9)' }}>
                          <Tag className="w-12 h-12" style={{ color: '#1B4D3E', opacity: 0.25 }} />
                        </div>
                      )}

                      {isUpcoming && (
                        <div className="absolute inset-0 flex items-center justify-center"
                          style={{ background: 'rgba(0,0,0,0.45)' }}>
                          <span className="px-4 py-1.5 rounded-full text-white text-sm font-bold tracking-widest uppercase"
                            style={{ background: '#1B4D3E', border: '2px solid #D4A017' }}>
                            Upcoming
                          </span>
                        </div>
                      )}

                      {hasDiscount && !isUpcoming && (
                        <div className="absolute top-3 left-3 z-10">
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold"
                            style={{ background: '#ef4444', color: '#fff' }}>
                            -{discountPct}% OFF
                          </span>
                        </div>
                      )}

                      {/* Wishlist (remove) button */}
                      <div className="absolute top-3 right-3 z-10">
                        <WishlistButton productId={String(product.id)} />
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-4 relative z-0">
                      <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-1 line-clamp-2 group-hover:text-green-800 transition-colors"
                        style={{ fontFamily: 'var(--font-hind)' }}>
                        {displayName}
                      </h3>
                      {product.nameBn && lang === 'en' && (
                        <p className="text-xs text-gray-400 mb-2 line-clamp-1">{product.nameBn}</p>
                      )}

                      <div className="flex items-baseline gap-2 mb-4">
                        {isUpcoming ? (
                          <span className="text-sm font-medium text-gray-400">Coming Soon</span>
                        ) : (
                          <>
                            <span className="text-xl font-bold" style={{ color: '#1B4D3E' }}>
                              Tk {(product.price || 0).toLocaleString()}
                            </span>
                            {hasDiscount && (
                              <span className="text-sm line-through text-gray-400">
                                Tk {product.comparePrice!.toLocaleString()}
                              </span>
                            )}
                            {product.weight && (
                              <span className="text-xs text-gray-400 ml-auto">{product.weight}</span>
                            )}
                          </>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="relative z-10">
                        {!isUpcoming ? (
                          <div className="flex gap-2">
                            <AddToCartButton product={cartProduct} variant="icon" />
                            <button
                              onClick={() => router.push(`/shop/${product.slug}`)}
                              className="flex-1 flex items-center justify-center px-3 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-95"
                              style={{ background: 'linear-gradient(135deg, #D4A017, #F5C842)', color: '#1B4D3E' }}>
                              {lang === 'en' ? 'View Details' : 'বিস্তারিত দেখুন'}
                            </button>
                          </div>
                        ) : (
                          <button disabled
                            className="w-full py-2.5 rounded-full text-sm font-semibold text-gray-400 cursor-not-allowed"
                            style={{ background: '#f3f4f6' }}>
                            Coming Soon
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        )}

        {/* Products loaded but none found (IDs in wishlist but deleted from DB) */}
        {!loading && wishlist.length > 0 && products.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Leaf className="w-16 h-16 mb-4" style={{ color: '#1B4D3E', opacity: 0.2 }} />
            <p className="text-gray-500 text-sm mb-6">
              {lang === 'en' ? 'Could not load wishlist products.' : 'পণ্য লোড করা যায়নি।'}
            </p>
            <Link href="/shop"
              className="px-6 py-2.5 rounded-full text-sm font-semibold transition-all hover:scale-105"
              style={{ background: '#1B4D3E', color: '#fff' }}>
              {t.browse}
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
