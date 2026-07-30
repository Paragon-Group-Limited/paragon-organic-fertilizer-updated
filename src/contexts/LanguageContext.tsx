'use client'

import { createContext, useContext, useEffect, useState } from 'react'

export type Lang = 'bn' | 'en'

type Ctx = { lang: Lang; setLang: (l: Lang) => void }

const LanguageContext = createContext<Ctx>({ lang: 'bn', setLang: () => {} })

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // SSR always starts at 'bn' (no mismatch with server render).
  // After mount, read sessionStorage so language persists within a tab session
  // but resets to Bengali on every new page load / new tab.
  const [lang, setLangState] = useState<Lang>('bn')

  useEffect(() => {
    const stored = sessionStorage.getItem('site-lang') as Lang | null
    if (stored === 'en') setLangState('en')
  }, [])

  // Keep <html lang="..."> in sync for accessibility
  useEffect(() => {
    document.documentElement.lang = lang === 'en' ? 'en' : 'bn'
  }, [lang])

  const setLang = (l: Lang) => {
    setLangState(l)
    sessionStorage.setItem('site-lang', l)
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
