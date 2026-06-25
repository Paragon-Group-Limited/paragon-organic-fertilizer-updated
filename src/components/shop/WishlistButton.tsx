'use client'

import { Heart } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'
import { motion } from 'framer-motion'

export default function WishlistButton({ productId }: { productId: string }) {
  const { toggleWishlist, isWishlisted } = useCart()
  const wishlisted = isWishlisted(productId)

  return (
    <motion.button
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(productId) }}
      whileTap={{ scale: 0.85 }}
      className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
      style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(4px)' }}
      title={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}>
      <Heart
        className="w-4 h-4 transition-all duration-200"
        style={{ color: wishlisted ? '#ef4444' : '#9ca3af', fill: wishlisted ? '#ef4444' : 'none' }}
      />
    </motion.button>
  )
}
