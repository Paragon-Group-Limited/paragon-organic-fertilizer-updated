'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, ShoppingBag, Phone } from 'lucide-react'
import { motion } from 'framer-motion'

function SuccessContent() {
  const searchParams = useSearchParams()
  const orderNumber = searchParams.get('order') || '—'

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center px-4" style={{ background: '#F4F7F4' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="max-w-md w-full text-center rounded-3xl p-10"
        style={{ background: '#fff', boxShadow: '0 8px 40px rgba(0,0,0,0.1)' }}>

        <motion.div
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ background: 'linear-gradient(135deg, #1B4D3E, #2D7A5B)' }}>
          <CheckCircle className="w-10 h-10 text-white" />
        </motion.div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Placed!</h1>
        <p className="text-gray-500 text-sm mb-6">
          Thank you for your order. We'll contact you shortly to confirm delivery.
        </p>

        <div className="rounded-xl py-3 px-5 mb-6 inline-block"
          style={{ background: 'rgba(27,77,62,0.08)' }}>
          <p className="text-xs text-gray-500 font-medium">Order Number</p>
          <p className="text-lg font-bold" style={{ color: '#1B4D3E', letterSpacing: '0.05em' }}>{orderNumber}</p>
        </div>

        <div className="flex items-center gap-2 justify-center text-sm text-gray-500 mb-8">
          <Phone className="w-4 h-4" />
          <span>We'll call you within 24 hours to confirm</span>
        </div>

        <div className="flex gap-3">
          <Link href="/shop"
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full font-semibold text-sm border-2 transition-all hover:bg-gray-50"
            style={{ borderColor: '#1B4D3E', color: '#1B4D3E' }}>
            <ShoppingBag className="w-4 h-4" /> Continue Shopping
          </Link>
          <Link href="/"
            className="flex-1 flex items-center justify-center py-3 rounded-full font-semibold text-sm transition-all"
            style={{ background: 'linear-gradient(135deg, #1B4D3E, #2D7A5B)', color: '#fff' }}>
            Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center" style={{ background: '#F4F7F4' }} />}>
      <SuccessContent />
    </Suspense>
  )
}
