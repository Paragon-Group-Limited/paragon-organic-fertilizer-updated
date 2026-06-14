const CACHE_KEY = 'paragon-bn-en-v1'

// Module-level cache — shared across all components
const cache = new Map<string, string>()
let cacheLoaded = false

function loadCache() {
  if (cacheLoaded || typeof window === 'undefined') return
  cacheLoaded = true
  try {
    const stored = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}')
    Object.entries(stored).forEach(([k, v]) => cache.set(k, v as string))
  } catch {}
}

function saveCache() {
  if (typeof window === 'undefined') return
  try {
    const obj: Record<string, string> = {}
    cache.forEach((v, k) => { obj[k] = v })
    localStorage.setItem(CACHE_KEY, JSON.stringify(obj))
  } catch {}
}

// Pub-sub: notify all subscribed components when new translations arrive
type UpdateFn = () => void
const subs = new Set<UpdateFn>()

export function subscribeToTranslations(fn: UpdateFn) {
  subs.add(fn)
  return () => subs.delete(fn)
}

function notifyAll() {
  subs.forEach(fn => fn())
}

// Queue + debounced flush
const pendingQueue = new Set<string>()
let flushTimer: ReturnType<typeof setTimeout> | null = null

async function flush() {
  flushTimer = null
  loadCache()

  const texts = Array.from(pendingQueue).filter(t => !!t?.trim() && !cache.has(t))
  pendingQueue.clear()
  if (texts.length === 0) return

  // Batch in chunks of 20 to avoid URL length issues
  for (let i = 0; i < texts.length; i += 20) {
    const chunk = texts.slice(i, i + 20)
    try {
      const res = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texts: chunk }),
      })
      if (res.ok) {
        const { translations } = await res.json()
        chunk.forEach((text, j) => {
          if (translations[j]) cache.set(text, translations[j])
        })
      }
    } catch {}
  }

  saveCache()
  notifyAll()
}

/**
 * Auto-translates Bengali text to English.
 * Returns cached translation immediately, or queues a fetch and returns
 * the original text while waiting. Subscribers are notified on completion.
 */
export function autoTranslate(bnText: string): string {
  if (!bnText?.trim()) return bnText
  loadCache()

  const cached = cache.get(bnText)
  if (cached !== undefined) return cached

  pendingQueue.add(bnText)
  if (!flushTimer) flushTimer = setTimeout(flush, 80)

  return bnText // original text while pending
}

export function clearTranslationCache() {
  cache.clear()
  cacheLoaded = false
  if (typeof window !== 'undefined') localStorage.removeItem(CACHE_KEY)
}
