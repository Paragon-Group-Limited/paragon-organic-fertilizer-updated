import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'পেজ পাওয়া যায়নি',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ background: '#F8F5EE' }}>
      <div className="text-center max-w-md">
        <div className="text-8xl font-bold mb-4" style={{ color: '#1B4D3E' }}>৪০৪</div>
        <h1 className="text-2xl font-bold mb-3" style={{ color: '#1a2e1a', fontFamily: 'var(--font-hind)' }}>
          পেজ পাওয়া যায়নি
        </h1>
        <p className="text-base mb-8" style={{ color: '#6b7280', fontFamily: 'var(--font-hind)' }}>
          আপনি যে পেজটি খুঁজছেন সেটি সরানো হয়েছে অথবা বিদ্যমান নেই।
        </p>
        <Link href="/"
          className="inline-block px-8 py-3 rounded-xl font-bold text-white"
          style={{ background: 'linear-gradient(135deg, #1B4D3E, #2D7A3A)', fontFamily: 'var(--font-hind)' }}>
          হোম পেজে যান
        </Link>
      </div>
    </div>
  )
}
