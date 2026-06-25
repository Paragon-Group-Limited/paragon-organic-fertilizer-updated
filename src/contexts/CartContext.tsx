'use client'

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'

export type CartItem = {
  id: string
  name: string
  nameBn: string
  slug: string
  price: number
  image?: string | null
  quantity: number
  weight?: string
}

type CartContextType = {
  items: CartItem[]
  wishlist: string[]
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, qty: number) => void
  clearCart: () => void
  toggleWishlist: (id: string) => void
  isWishlisted: (id: string) => boolean
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextType | null>(null)

const CART_KEY = 'paragon-cart'
const WISH_KEY = 'paragon-wishlist'

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [wishlist, setWishlist] = useState<string[]>([])
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const c = localStorage.getItem(CART_KEY)
      if (c) setItems(JSON.parse(c))
      const w = localStorage.getItem(WISH_KEY)
      if (w) setWishlist(JSON.parse(w))
    } catch {}
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    localStorage.setItem(CART_KEY, JSON.stringify(items))
  }, [items, hydrated])

  useEffect(() => {
    if (!hydrated) return
    localStorage.setItem(WISH_KEY, JSON.stringify(wishlist))
  }, [wishlist, hydrated])

  const addItem = useCallback((item: Omit<CartItem, 'quantity'>) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === item.id)
      if (existing) return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)
      return [...prev, { ...item, quantity: 1 }]
    })
  }, [])

  const removeItem = useCallback((id: string) => {
    setItems(prev => prev.filter(i => i.id !== id))
  }, [])

  const updateQuantity = useCallback((id: string, qty: number) => {
    if (qty <= 0) { removeItem(id); return }
    setItems(prev => prev.map(i => i.id === id ? { ...i, quantity: qty } : i))
  }, [removeItem])

  const clearCart = useCallback(() => setItems([]), [])

  const toggleWishlist = useCallback((id: string) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(w => w !== id) : [...prev, id])
  }, [])

  const isWishlisted = useCallback((id: string) => wishlist.includes(id), [wishlist])

  const totalItems = items.reduce((s, i) => s + i.quantity, 0)
  const totalPrice = items.reduce((s, i) => s + i.price * i.quantity, 0)

  return (
    <CartContext.Provider value={{
      items, wishlist, addItem, removeItem, updateQuantity, clearCart,
      toggleWishlist, isWishlisted, totalItems, totalPrice
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
