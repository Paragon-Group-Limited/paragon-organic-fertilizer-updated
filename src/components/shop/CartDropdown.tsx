'use client'

import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, X, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '@/contexts/CartContext'
import { useLanguage } from '@/contexts/LanguageContext'

export default function CartDropdown({ size = 'md' }: { size?: 'sm' | 'md' }) {
  const { items, totalItems, totalPrice, updateQuantity, removeItem } = useCart()
  const { lang } = useLanguage()
  const [open, setOpen] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const ref = useRef<HTMLDivElement>(null)

  const openNow = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpen(true)
  }
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 180)
  }

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const btnClass = size === 'sm'
    ? 'w-9 h-9'
    : 'w-10 h-10'
  const iconClass = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'

  return (
    <div ref={ref} className="relative" onMouseEnter={openNow} onMouseLeave={scheduleClose}>
      <AnimatePresence>
        {totalItems > 0 && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}>
            <button
              onClick={() => setOpen(v => !v)}
              className={`relative flex items-center justify-center ${btnClass} rounded-full transition-all duration-200 hover:bg-white/20 text-white`}>
              <ShoppingCart className={iconClass} />
              <span
                className="absolute -top-1 -right-1 rounded-full flex items-center justify-center font-bold px-1"
                style={{
                  background: '#D4A017',
                  color: '#1B4D3E',
                  minWidth: size === 'sm' ? 16 : 18,
                  height: size === 'sm' ? 16 : 18,
                  fontSize: size === 'sm' ? 10 : 12,
                }}>
                {totalItems > 99 ? '99+' : totalItems}
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dropdown panel */}
      <AnimatePresence>
        {open && totalItems > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute right-0 top-full mt-3 rounded-2xl overflow-hidden z-[60]"
            style={{
              width: 320,
              background: '#fff',
              boxShadow: '0 24px 64px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.06)',
              border: '1px solid rgba(0,0,0,0.06)',
            }}
            onMouseEnter={openNow}
            onMouseLeave={scheduleClose}>

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4" style={{ color: '#1B4D3E' }} />
                <span className="font-bold text-sm" style={{ color: '#1B4D3E', fontFamily: 'var(--font-hind)' }}>
                  {lang === 'en' ? 'My Cart' : 'আমার কার্ট'}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
                  style={{ background: 'rgba(27,77,62,0.1)', color: '#1B4D3E' }}>
                  {totalItems} {lang === 'en' ? (totalItems === 1 ? 'item' : 'items') : 'টি'}
                </span>
              </div>
              <button onClick={() => setOpen(false)}
                className="w-6 h-6 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Items */}
            <div className="overflow-y-auto divide-y divide-gray-50" style={{ maxHeight: 272 }}>
              {items.map(item => {
                const displayName = lang === 'en' ? item.name : (item.nameBn || item.name)
                return (
                  <div key={item.id} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50/60 transition-colors">
                    <div className="w-11 h-11 rounded-xl overflow-hidden shrink-0"
                      style={{ background: 'linear-gradient(135deg, #e8f5e9, #c8e6c9)' }}>
                      {item.image ? (
                        <Image src={item.image} alt={item.name} width={44} height={44} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ShoppingBag className="w-4 h-4" style={{ color: '#1B4D3E', opacity: 0.3 }} />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate leading-tight"
                        style={{ fontFamily: 'var(--font-hind)' }}>
                        {displayName}
                      </p>
                      <p className="text-xs mt-0.5 font-bold" style={{ color: '#1B4D3E' }}>
                        Tk {(item.price * item.quantity).toLocaleString()}
                        <span className="font-normal text-gray-400 ml-1">
                          ({item.quantity} × {item.price})
                        </span>
                      </p>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 rounded-full flex items-center justify-center transition-all hover:bg-gray-100 active:scale-90"
                        style={{ border: '1px solid #e5e7eb' }}>
                        <Minus className="w-3 h-3 text-gray-500" />
                      </button>
                      <span className="text-sm font-bold w-5 text-center" style={{ color: '#1B4D3E' }}>
                        {item.quantity}
                      </span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 rounded-full flex items-center justify-center transition-all hover:bg-gray-100 active:scale-90"
                        style={{ border: '1px solid #e5e7eb' }}>
                        <Plus className="w-3 h-3 text-gray-500" />
                      </button>
                      <button onClick={() => removeItem(item.id)}
                        className="w-6 h-6 rounded-full flex items-center justify-center ml-0.5 transition-all hover:bg-red-50 active:scale-90">
                        <X className="w-3 h-3 text-red-400" />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Footer */}
            <div className="px-5 py-4" style={{ background: '#f9fafb', borderTop: '1px solid #f3f4f6' }}>
              <div className="flex items-center justify-between mb-3.5">
                <span className="text-sm text-gray-500">{lang === 'en' ? 'Subtotal' : 'মোট পরিমাণ'}</span>
                <span className="text-xl font-bold" style={{ color: '#1B4D3E' }}>
                  Tk {totalPrice.toLocaleString()}
                </span>
              </div>
              <Link href="/checkout" onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-full font-bold text-sm transition-all hover:scale-[1.02] active:scale-95"
                style={{ background: 'linear-gradient(135deg, #D4A017, #F5C842)', color: '#1B4D3E' }}>
                {lang === 'en' ? 'Proceed to Checkout' : 'চেকআউটে যান'}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/shop" onClick={() => setOpen(false)}
                className="flex items-center justify-center w-full py-2 mt-1.5 text-sm font-medium transition-colors hover:text-gray-600"
                style={{ color: '#9CA3AF' }}>
                {lang === 'en' ? 'Continue Shopping' : 'কেনাকাটা চালিয়ে যান'}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
