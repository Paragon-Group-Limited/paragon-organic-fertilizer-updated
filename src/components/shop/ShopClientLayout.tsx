'use client'

import { useState, useMemo, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, X, Leaf, Layers, Tag, Sprout, ArrowUpDown } from 'lucide-react'
import ProductCard from './ProductCard'
import MobileFilters from './MobileFilters'

export type ShopProduct = {
  id: string
  name: string
  nameBn?: string
  slug: string
  price?: number | null
  comparePrice?: number | null
  category?: string | null
  status?: string | null
  image?: { url?: string | null; alt?: string } | null
  rating?: number | null
  reviewCount?: number | null
  weight?: string | null
  shortDescription?: string | null
}

const CATEGORIES = [
  { value: 'all',                label: 'All Products',        icon: Layers },
  { value: 'organic-fertilizer', label: 'Organic Fertilizer',  icon: Leaf   },
  { value: 'vermicompost',       label: 'Vermicompost',        icon: Sprout },
  { value: 'upcoming',           label: 'Upcoming',            icon: Tag    },
]

const SORT_OPTIONS = [
  { value: 'newest',      label: 'Newest First'       },
  { value: 'price-asc',   label: 'Price: Low → High'  },
  { value: 'price-desc',  label: 'Price: High → Low'  },
  { value: 'rating',      label: 'Top Rated'           },
]

export default function ShopClientLayout({
  products,
  activeCategory,
  activeSort,
  activeStatus,
}: {
  products: ShopProduct[]
  activeCategory: string
  activeSort: string
  activeStatus?: string
}) {
  const [localSearch, setLocalSearch] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()

  const navigate = useCallback((cat: string, sort: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('category')
    params.delete('status')
    params.delete('sort')
    params.delete('q')
    if (cat === 'upcoming') params.set('status', 'upcoming')
    else if (cat !== 'all') params.set('category', cat)
    if (sort !== 'newest') params.set('sort', sort)
    router.push(`/shop?${params.toString()}`)
    setLocalSearch('')
  }, [router, searchParams])

  const currentCat = activeStatus === 'upcoming' ? 'upcoming' : activeCategory
  const currentSort = activeSort || 'newest'

  const filtered = useMemo(() => {
    const q = localSearch.trim().toLowerCase()
    if (!q) return products
    return products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      (p.nameBn && p.nameBn.toLowerCase().includes(q))
    )
  }, [products, localSearch])

  return (
    <div className="flex gap-8 items-start">

      {/* ── Desktop Sidebar ── */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 gap-4">

        {/* Search box */}
        <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}>
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="text-sm font-bold uppercase tracking-widest" style={{ color: '#1B4D3E', fontFamily: 'var(--font-inter)' }}>
              Search
            </h2>
          </div>
          <div className="p-3">
            <div
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl transition-all"
              style={{ background: '#f3f4f6', border: localSearch ? '1.5px solid #1B4D3E' : '1.5px solid transparent' }}>
              <Search className="w-4 h-4 shrink-0" style={{ color: localSearch ? '#1B4D3E' : '#9CA3AF' }} />
              <input
                type="text"
                value={localSearch}
                onChange={e => setLocalSearch(e.target.value)}
                placeholder="Search by name…"
                className="flex-1 bg-transparent text-sm text-gray-800 outline-none placeholder-gray-400 min-w-0"
                style={{ fontFamily: 'var(--font-hind)' }}
              />
              {localSearch && (
                <button
                  onClick={() => setLocalSearch('')}
                  className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center transition-all hover:bg-gray-300"
                  style={{ background: '#e5e7eb' }}
                  title="Clear search">
                  <X className="w-3 h-3 text-gray-600" />
                </button>
              )}
            </div>
            {localSearch && (
              <p className="text-xs mt-2 px-1" style={{ color: '#1B4D3E' }}>
                <span className="font-semibold">{filtered.length}</span> result{filtered.length !== 1 ? 's' : ''} for&nbsp;
                <span className="font-semibold">"{localSearch}"</span>
              </p>
            )}
          </div>
        </div>

        {/* Categories */}
        <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}>
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="text-sm font-bold uppercase tracking-widest" style={{ color: '#1B4D3E', fontFamily: 'var(--font-inter)' }}>
              Categories
            </h2>
          </div>
          <div className="p-3 space-y-1">
            {CATEGORIES.map(({ value, label, icon: Icon }) => {
              const active = currentCat === value
              return (
                <button key={value}
                  onClick={() => navigate(value, currentSort)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-left"
                  style={{ background: active ? '#1B4D3E' : 'transparent', color: active ? '#fff' : '#4B5563' }}>
                  <Icon className="w-4 h-4 shrink-0" style={{ opacity: active ? 1 : 0.6 }} />
                  {label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Sort */}
        <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}>
          <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4" style={{ color: '#1B4D3E' }} />
            <h2 className="text-sm font-bold uppercase tracking-widest" style={{ color: '#1B4D3E', fontFamily: 'var(--font-inter)' }}>
              Sort By
            </h2>
          </div>
          <div className="p-3 space-y-1">
            {SORT_OPTIONS.map(({ value, label }) => {
              const active = currentSort === value
              return (
                <button key={value}
                  onClick={() => navigate(currentCat, value)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-left"
                  style={{
                    background: active ? 'rgba(27,77,62,0.08)' : 'transparent',
                    color: active ? '#1B4D3E' : '#4B5563',
                    fontWeight: active ? 600 : 400,
                  }}>
                  <span className="w-2 h-2 rounded-full shrink-0"
                    style={{ background: active ? '#1B4D3E' : '#D1D5DB' }} />
                  {label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Promo card */}
        <div className="rounded-2xl p-5 text-white"
          style={{ background: 'linear-gradient(135deg, #1B4D3E 0%, #2D7A5B 60%, #D4A017 180%)' }}>
          <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#F5C842' }}>
            Special Offer
          </div>
          <div className="text-lg font-bold leading-tight mb-2">
            1st Order get<br />
            <span style={{ color: '#F5C842' }}>10% Off</span>
          </div>
          <p className="text-white/80 text-xs mb-3">
            Get 10% off your first order with code:
          </p>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-mono font-bold"
            style={{ background: 'rgba(255,255,255,0.15)', border: '1px dashed rgba(255,255,255,0.4)', color: '#F5C842', letterSpacing: '0.1em' }}>
            WELCOME10
          </div>
          <p className="text-white/50 text-xs mt-2">Valid Until: 8/31/2026</p>
        </div>
      </aside>

      {/* ── Main content ── */}
      <div className="flex-1 min-w-0">

        {/* Mobile filters */}
        <div className="lg:hidden mb-4">
          <MobileFilters
            activeCategory={activeCategory}
            activeSort={activeSort}
            activeStatus={activeStatus}
          />
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
              style={{ background: 'rgba(27,77,62,0.08)' }}>
              <Search className="w-8 h-8" style={{ color: '#1B4D3E', opacity: 0.4 }} />
            </div>
            <p className="text-gray-600 font-semibold text-base mb-1">
              {localSearch
                ? `No results for "${localSearch}"`
                : 'No products found'}
            </p>
            {localSearch ? (
              <button onClick={() => setLocalSearch('')}
                className="mt-3 text-sm font-semibold px-5 py-2 rounded-full transition-all hover:scale-105"
                style={{ background: '#1B4D3E', color: '#fff' }}>
                Clear search
              </button>
            ) : (
              <p className="text-gray-400 text-sm mt-1">Try a different category</p>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
