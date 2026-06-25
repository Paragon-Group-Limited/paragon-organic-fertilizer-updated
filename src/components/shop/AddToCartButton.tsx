'use client'

import { useState } from 'react'
import { ShoppingCart, Check } from 'lucide-react'
import { useCart, type CartItem } from '@/contexts/CartContext'
import { motion, AnimatePresence } from 'framer-motion'

type Props = {
  product: Omit<CartItem, 'quantity'>
  variant?: 'icon' | 'full' | 'outline'
  label?: string
}

export default function AddToCartButton({ product, variant = 'full', label }: Props) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  if (variant === 'icon') {
    return (
      <button
        onClick={handleAdd}
        title="Add to cart"
        className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
        style={{ background: added ? '#22c55e' : '#1B4D3E', color: '#fff' }}>
        <AnimatePresence mode="wait">
          {added
            ? <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><Check className="w-4 h-4" /></motion.div>
            : <motion.div key="cart" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><ShoppingCart className="w-4 h-4" /></motion.div>
          }
        </AnimatePresence>
      </button>
    )
  }

  if (variant === 'outline') {
    return (
      <button
        onClick={handleAdd}
        className="flex items-center gap-2 px-4 py-2.5 rounded-full border-2 text-sm font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-95"
        style={{
          borderColor: added ? '#22c55e' : '#1B4D3E',
          color: added ? '#22c55e' : '#1B4D3E',
          background: 'transparent',
        }}>
        <AnimatePresence mode="wait">
          {added
            ? <motion.span key="c" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2"><Check className="w-4 h-4" /> Added!</motion.span>
            : <motion.span key="n" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2"><ShoppingCart className="w-4 h-4" /> {label || 'Add to Cart'}</motion.span>
          }
        </AnimatePresence>
      </button>
    )
  }

  return (
    <button
      onClick={handleAdd}
      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-95"
      style={{
        background: added ? '#22c55e' : 'linear-gradient(135deg, #1B4D3E, #2D7A5B)',
        color: '#fff',
      }}>
      <AnimatePresence mode="wait">
        {added
          ? <motion.span key="c" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2"><Check className="w-4 h-4" /> Added!</motion.span>
          : <motion.span key="n" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2"><ShoppingCart className="w-4 h-4" /> {label || 'Add to Cart'}</motion.span>
        }
      </AnimatePresence>
    </button>
  )
}
