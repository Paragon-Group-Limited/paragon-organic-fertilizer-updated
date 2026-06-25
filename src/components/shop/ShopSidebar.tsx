'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { Tag, Layers, Leaf, Sprout, ArrowUpDown } from 'lucide-react'

const CATEGORIES = [
  { value: 'all',               label: 'All Products',       icon: Layers },
  { value: 'organic-fertilizer', label: 'Organic Fertilizer', icon: Leaf },
  { value: 'vermicompost',       label: 'Vermicompost',       icon: Sprout },
  { value: 'upcoming',           label: 'Upcoming',           icon: Tag },
]

const SORT_OPTIONS = [
  { value: 'newest',      label: 'Newest First' },
  { value: 'price-asc',   label: 'Price: Low → High' },
  { value: 'price-desc',  label: 'Price: High → Low' },
  { value: 'rating',      label: 'Top Rated' },
]

type Props = {
  activeCategory: string
  activeSort: string
  activeStatus?: string
}

export default function ShopSidebar({ activeCategory, activeSort, activeStatus }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const navigate = useCallback((cat: string, sort: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('category')
    params.delete('status')
    params.delete('sort')

    if (cat === 'upcoming') {
      params.set('status', 'upcoming')
    } else if (cat !== 'all') {
      params.set('category', cat)
    }
    if (sort !== 'newest') params.set('sort', sort)
    router.push(`/shop?${params.toString()}`)
  }, [router, searchParams])

  const currentCat = activeStatus === 'upcoming' ? 'upcoming' : activeCategory
  const currentSort = activeSort || 'newest'

  return (
    <aside className="hidden lg:block w-64 shrink-0">
      {/* Categories */}
      <div className="rounded-2xl overflow-hidden mb-4" style={{ background: '#fff', boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}>
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="text-sm font-bold uppercase tracking-widest" style={{ color: '#1B4D3E', fontFamily: 'var(--font-inter)' }}>
            Categories
          </h2>
        </div>
        <div className="p-3 space-y-1">
          {CATEGORIES.map(({ value, label, icon: Icon }) => {
            const active = currentCat === value
            return (
              <button key={value} onClick={() => navigate(value, currentSort)}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-left"
                style={{
                  background: active ? '#1B4D3E' : 'transparent',
                  color: active ? '#fff' : '#4B5563',
                }}>
                <Icon className="w-4 h-4 shrink-0" style={{ opacity: active ? 1 : 0.6 }} />
                {label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Sort */}
      <div className="rounded-2xl overflow-hidden mb-4" style={{ background: '#fff', boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}>
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
              <button key={value} onClick={() => navigate(currentCat, value)}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-left"
                style={{
                  background: active ? 'rgba(27,77,62,0.08)' : 'transparent',
                  color: active ? '#1B4D3E' : '#4B5563',
                  fontWeight: active ? 600 : 400,
                }}>
                <span className="w-2 h-2 rounded-full shrink-0 transition-all"
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
  )
}
