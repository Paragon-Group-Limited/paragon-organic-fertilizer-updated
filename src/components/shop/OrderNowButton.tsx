'use client'

import { useRouter } from 'next/navigation'
import { useCart, type CartItem } from '@/contexts/CartContext'

type Props = {
  product: Omit<CartItem, 'quantity'>
  className?: string
  style?: React.CSSProperties
  label?: string
}

export default function OrderNowButton({ product, className, style, label = 'Order Now' }: Props) {
  const { addItem } = useCart()
  const router = useRouter()

  const handleOrderNow = () => {
    addItem(product)
    router.push('/checkout')
  }

  return (
    <button
      onClick={handleOrderNow}
      className={className}
      style={style}>
      {label}
    </button>
  )
}
