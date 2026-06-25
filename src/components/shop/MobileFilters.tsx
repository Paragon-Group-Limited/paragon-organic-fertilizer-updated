'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { SlidersHorizontal } from 'lucide-react'
import { useState } from 'react'

const CATEGORIES = [
  { value: 'all', label: 'All' },
  { value: 'organic-fertilizer', label: 'Organic Fertilizer' },
  { value: 'vermicompost', label: 'Vermicompost' },
  { value: 'upcoming', label: 'Upcoming' },
]
const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price ↑' },
  { value: 'price-desc', label: 'Price ↓' },
]

type Props = { activeCategory: string; activeSort: string; activeStatus?: string }

export default function MobileFilters({ activeCategory, activeSort, activeStatus }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [open, setOpen] = useState(false)

  const currentCat = activeStatus === 'upcoming' ? 'upcoming' : activeCategory
  const currentSort = activeSort || 'newest'

  const navigate = (cat: string, sort: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('category'); params.delete('status'); params.delete('sort')
    if (cat === 'upcoming') params.set('status', 'upcoming')
    else if (cat !== 'all') params.set('category', cat)
    if (sort !== 'newest') params.set('sort', sort)
    router.push(`/shop?${params.toString()}`)
    setOpen(false)
  }

  return (
    <>
      <button onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border"
        style={{ borderColor: '#1B4D3E', color: '#1B4D3E', background: '#fff' }}>
        <SlidersHorizontal className="w-4 h-4" />
        Filters & Sort
      </button>

      {open && (
        <div className="mt-3 rounded-2xl p-4 space-y-4"
          style={{ background: '#fff', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Category</p>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(c => (
                <button key={c.value} onClick={() => navigate(c.value, currentSort)}
                  className="px-3 py-1.5 rounded-full text-sm font-medium transition-all"
                  style={{
                    background: currentCat === c.value ? '#1B4D3E' : '#f3f4f6',
                    color: currentCat === c.value ? '#fff' : '#374151',
                  }}>
                  {c.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Sort</p>
            <div className="flex flex-wrap gap-2">
              {SORT_OPTIONS.map(s => (
                <button key={s.value} onClick={() => navigate(currentCat, s.value)}
                  className="px-3 py-1.5 rounded-full text-sm font-medium transition-all"
                  style={{
                    background: currentSort === s.value ? '#1B4D3E' : '#f3f4f6',
                    color: currentSort === s.value ? '#fff' : '#374151',
                  }}>
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
