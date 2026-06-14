'use client'

import { useReducer, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { autoTranslate, subscribeToTranslations } from '@/lib/autoTranslate'

/**
 * Returns a bilingual t() function:
 *   t(bnText)            → auto-translates to EN when lang=en
 *   t(bnText, enOverride) → uses enOverride if provided, else auto-translates
 *
 * Components call this once: const t = useT()
 * Then use: t(props.someBanglaField)
 */
export function useT() {
  const { lang } = useLanguage()
  const [, rerender] = useReducer((x: number) => x + 1, 0)

  useEffect(() => {
    if (lang !== 'en') return
    const unsub = subscribeToTranslations(rerender)
    return () => { unsub() }
  }, [lang])

  return (bnText: string, enOverride?: string): string => {
    if (lang === 'bn') return bnText
    if (enOverride?.trim()) return enOverride
    return autoTranslate(bnText)
  }
}
