'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'

export default function ShopSearchBar({ initialQuery = '' }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery)
  const router = useRouter()
  const { lang } = useLanguage()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setQuery(initialQuery)
  }, [initialQuery])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const q = query.trim()
    if (!q) {
      router.push('/shop')
    } else {
      router.push(`/shop?q=${encodeURIComponent(q)}`)
    }
  }

  const handleClear = () => {
    setQuery('')
    router.push('/shop')
    inputRef.current?.focus()
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-xl">
      <div className="flex items-center rounded-full overflow-hidden transition-all"
        style={{
          background: 'rgba(255,255,255,0.12)',
          border: '1px solid rgba(255,255,255,0.25)',
        }}>
        <button type="submit"
          className="flex items-center justify-center pl-4 pr-2 h-11 text-white/60 hover:text-white transition-colors shrink-0">
          <Search className="w-4 h-4" />
        </button>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder={lang === 'en' ? 'Search products by name…' : 'পণ্যের নাম দিয়ে খুঁজুন…'}
          className="flex-1 bg-transparent text-white text-sm py-3 outline-none placeholder-white/40"
          style={{ fontFamily: 'var(--font-hind)', minWidth: 0 }}
        />
        {query && (
          <button type="button" onClick={handleClear}
            className="flex items-center justify-center pr-4 pl-2 h-11 text-white/50 hover:text-white transition-colors shrink-0">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      {initialQuery && (
        <p className="absolute -bottom-6 left-4 text-xs text-white/50">
          {lang === 'en'
            ? `Showing results for "${initialQuery}"`
            : `"${initialQuery}" এর ফলাফল দেখাচ্ছে`}
        </p>
      )}
    </form>
  )
}
