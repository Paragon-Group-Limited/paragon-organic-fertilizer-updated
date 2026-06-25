'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Search, X, ShoppingBag } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

type Suggestion = {
  id: string
  name: string
  nameBn?: string
  slug: string
  price?: number | null
  image?: string | null
}

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(t)
  }, [value, delay])
  return debounced
}

export default function NavSearch() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [loading, setLoading] = useState(false)
  const [activeIdx, setActiveIdx] = useState(-1)
  const debouncedQuery = useDebounce(query, 220)
  const router = useRouter()
  const { lang } = useLanguage()
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Open → focus input
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 60)
      return () => clearTimeout(t)
    } else {
      setQuery('')
      setSuggestions([])
      setActiveIdx(-1)
    }
  }, [open])

  // Fetch suggestions
  const fetchSuggestions = useCallback(async (q: string) => {
    if (q.trim().length < 2) { setSuggestions([]); return }
    setLoading(true)
    try {
      const res = await fetch(`/api/products/search?q=${encodeURIComponent(q)}`)
      const data = await res.json()
      setSuggestions(data.products ?? [])
      setActiveIdx(-1)
    } catch {
      setSuggestions([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchSuggestions(debouncedQuery) }, [debouncedQuery, fetchSuggestions])

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const q = query.trim()
    if (!q) return
    router.push(`/shop?q=${encodeURIComponent(q)}`)
    setOpen(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') { setOpen(false); return }
    if (suggestions.length === 0) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIdx(i => (i + 1) % suggestions.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIdx(i => (i <= 0 ? suggestions.length - 1 : i - 1))
    } else if (e.key === 'Enter' && activeIdx >= 0) {
      e.preventDefault()
      const s = suggestions[activeIdx]
      router.push(`/shop/${s.slug}`)
      setOpen(false)
    }
  }

  const showDropdown = open && query.trim().length >= 2

  return (
    <div ref={containerRef} className="relative flex items-center">
      <AnimatePresence mode="wait">
        {open ? (
          <motion.div
            key="search-open"
            initial={{ width: 36, opacity: 0.4 }}
            animate={{ width: 240, opacity: 1 }}
            exit={{ width: 36, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}>
            <form onSubmit={handleSubmit}
              className="flex items-center overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.16)',
                border: '1px solid rgba(255,255,255,0.35)',
                borderRadius: 9999,
                paddingLeft: 12,
                paddingRight: 6,
                height: 38,
              }}>
              <Search className="w-4 h-4 text-white/55 shrink-0 mr-2" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={lang === 'en' ? 'Search products…' : 'পণ্য খুঁজুন…'}
                className="flex-1 bg-transparent text-white text-sm outline-none placeholder-white/40 min-w-0"
                style={{ fontFamily: 'var(--font-hind)' }}
                autoComplete="off"
              />
              {query ? (
                <button type="button" onClick={() => { setQuery(''); inputRef.current?.focus() }}
                  className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white/55 hover:text-white hover:bg-white/15 transition-colors ml-1">
                  <X className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button type="button" onClick={() => setOpen(false)}
                  className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white/55 hover:text-white hover:bg-white/15 transition-colors ml-1">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </form>
          </motion.div>
        ) : (
          <motion.button
            key="search-icon"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.15 }}
            onClick={() => setOpen(true)}
            className="flex items-center justify-center w-10 h-10 rounded-full text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200"
            title={lang === 'en' ? 'Search' : 'খুঁজুন'}>
            <Search className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Suggestions dropdown */}
      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            className="absolute right-0 top-full mt-2 rounded-2xl overflow-hidden z-[70]"
            style={{
              width: 300,
              background: '#fff',
              boxShadow: '0 20px 60px rgba(0,0,0,0.2), 0 4px 16px rgba(0,0,0,0.06)',
              border: '1px solid rgba(0,0,0,0.06)',
            }}>

            {loading ? (
              <div className="px-5 py-4 flex items-center gap-3">
                <div className="w-4 h-4 border-2 rounded-full border-t-transparent animate-spin"
                  style={{ borderColor: '#1B4D3E', borderTopColor: 'transparent' }} />
                <span className="text-sm text-gray-400">
                  {lang === 'en' ? 'Searching…' : 'খুঁজছে…'}
                </span>
              </div>
            ) : suggestions.length === 0 ? (
              <div className="px-5 py-4 text-sm text-gray-400 text-center">
                {lang === 'en' ? 'No products found' : 'কোনো পণ্য পাওয়া যায়নি'}
              </div>
            ) : (
              <>
                <div className="px-4 pt-3 pb-1">
                  <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#1B4D3E' }}>
                    {lang === 'en' ? 'Products' : 'পণ্য'}
                  </span>
                </div>
                {suggestions.map((s, i) => {
                  const displayName = lang === 'en' ? s.name : (s.nameBn || s.name)
                  return (
                    <Link
                      key={s.id}
                      href={`/shop/${s.slug}`}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 transition-colors"
                      style={{
                        background: activeIdx === i ? 'rgba(27,77,62,0.06)' : 'transparent',
                      }}
                      onMouseEnter={() => setActiveIdx(i)}>
                      <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0"
                        style={{ background: 'linear-gradient(135deg, #e8f5e9, #c8e6c9)' }}>
                        {s.image ? (
                          <img src={s.image} alt={s.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ShoppingBag className="w-4 h-4" style={{ color: '#1B4D3E', opacity: 0.3 }} />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate"
                          style={{ fontFamily: 'var(--font-hind)' }}>
                          {displayName}
                        </p>
                        {s.price != null && (
                          <p className="text-xs font-bold mt-0.5" style={{ color: '#1B4D3E' }}>
                            Tk {s.price.toLocaleString()}
                          </p>
                        )}
                      </div>
                      <Search className="w-3.5 h-3.5 text-gray-300 shrink-0" />
                    </Link>
                  )
                })}
                {/* "View all results" footer */}
                <div className="border-t border-gray-100">
                  <button
                    onClick={() => { router.push(`/shop?q=${encodeURIComponent(query.trim())}`); setOpen(false) }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold transition-colors hover:bg-gray-50"
                    style={{ color: '#1B4D3E' }}>
                    <Search className="w-3.5 h-3.5" />
                    {lang === 'en'
                      ? `See all results for "${query.trim()}"`
                      : `"${query.trim()}" এর সব ফলাফল`}
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
