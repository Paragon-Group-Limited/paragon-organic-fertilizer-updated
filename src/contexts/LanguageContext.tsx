'use client'

import { createContext, useContext, useEffect, useState } from 'react'

export type Lang = 'bn' | 'en'

type Ctx = { lang: Lang; setLang: (l: Lang) => void }

const LanguageContext = createContext<Ctx>({ lang: 'bn', setLang: () => {} })

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('bn')

  // Hydrate from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('site-lang') as Lang | null
    if (stored === 'bn' || stored === 'en') setLangState(stored)
  }, [])

  // Keep <html lang="..."> in sync for accessibility
  useEffect(() => {
    document.documentElement.lang = lang === 'en' ? 'en' : 'bn'
  }, [lang])

  const setLang = (l: Lang) => {
    setLangState(l)
    localStorage.setItem('site-lang', l)
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
