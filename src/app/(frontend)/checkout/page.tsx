'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/contexts/CartContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, CreditCard, ClipboardCheck, ChevronRight, ChevronLeft, ShoppingBag, Tag, Truck, Plus, Minus, X } from 'lucide-react'
import Link from 'next/link'

const DELIVERY_AREAS = [
  { name: 'Inside Dhaka', cost: 60 },
  { name: 'Outside Dhaka', cost: 120 },
]

const COUPON_CODE = 'WELCOME10'
const COUPON_PCT = 10

type Step = 1 | 2 | 3

const STEPS = [
  { id: 1, label: 'Shipping', icon: MapPin },
  { id: 2, label: 'Payment', icon: CreditCard },
  { id: 3, label: 'Review', icon: ClipboardCheck },
]

type ShippingForm = {
  name: string; phone: string; email: string
  address: string; deliveryArea: string; zipCode: string
}

export default function CheckoutPage() {
  const router = useRouter()
  const { lang } = useLanguage()
  const { items, totalPrice, clearCart, updateQuantity, removeItem } = useCart()

  const [step, setStep] = useState<Step>(1)
  const [shipping, setShipping] = useState<ShippingForm>({
    name: '', phone: '', email: '', address: '', deliveryArea: '', zipCode: '',
  })
  const [errors, setErrors] = useState<Partial<ShippingForm>>({})
  const [coupon, setCoupon] = useState('')
  const [couponApplied, setCouponApplied] = useState(false)
  const [couponError, setCouponError] = useState('')
  const [placing, setPlacing] = useState(false)

  const shippingCost = useMemo(() => {
    if (!shipping.deliveryArea) return 0
    return DELIVERY_AREAS.find(a => a.name === shipping.deliveryArea)?.cost ?? 150
  }, [shipping.deliveryArea])

  const discount = couponApplied ? Math.round(totalPrice * COUPON_PCT / 100) : 0
  const total = totalPrice - discount + shippingCost

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === COUPON_CODE) {
      setCouponApplied(true)
      setCouponError('')
    } else {
      setCouponError('Invalid coupon code')
      setCouponApplied(false)
    }
  }

  const validateShipping = () => {
    const e: Partial<ShippingForm> = {}
    if (!shipping.name.trim()) e.name = 'Name is required'
    if (!shipping.phone.trim()) e.phone = 'Phone is required'
    if (!shipping.address.trim()) e.address = 'Address is required'
    if (!shipping.deliveryArea) e.deliveryArea = 'Please select delivery area'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const placeOrder = async () => {
    setPlacing(true)
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: shipping.name,
          customerPhone: shipping.phone,
          customerEmail: shipping.email,
          shippingAddress: shipping.address,
          deliveryArea: shipping.deliveryArea,
          zipCode: shipping.zipCode,
          items: items.map(i => ({
            productId: i.id,
            productName: i.name,
            slug: i.slug,
            price: i.price,
            quantity: i.quantity,
            subtotal: i.price * i.quantity,
          })),
          subtotal: totalPrice,
          shippingCost,
          discount,
          total,
          couponCode: couponApplied ? COUPON_CODE : '',
          paymentMethod: 'cod',
        }),
      })
      const data = await res.json()
      if (data.orderNumber) {
        clearCart()
        router.push(`/checkout/success?order=${data.orderNumber}`)
      }
    } catch {
      alert('Something went wrong. Please try again.')
    } finally {
      setPlacing(false)
    }
  }

  if (items.length === 0 && step !== 3) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20 px-4" style={{ background: '#F4F7F4' }}>
        <ShoppingBag className="w-16 h-16 mb-4" style={{ color: '#1B4D3E', opacity: 0.3 }} />
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">Add some products to get started</p>
        <Link href="/shop"
          className="px-6 py-3 rounded-full font-semibold text-sm"
          style={{ background: 'linear-gradient(135deg, #1B4D3E, #2D7A5B)', color: '#fff' }}>
          Browse Products
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 pb-12" style={{ background: '#F4F7F4' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Step progress */}
        <div className="flex items-center justify-center gap-0 mb-10 pt-4">
          {STEPS.map((s, idx) => {
            const active = step === s.id
            const done = step > s.id
            return (
              <div key={s.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300"
                    style={{
                      background: done ? '#22c55e' : active ? '#1B4D3E' : '#E5E7EB',
                      color: done || active ? '#fff' : '#9CA3AF',
                      boxShadow: active ? '0 0 0 4px rgba(27,77,62,0.15)' : 'none',
                    }}>
                    {done ? '✓' : s.id}
                  </div>
                  <span className="text-xs mt-1.5 font-medium"
                    style={{ color: active ? '#1B4D3E' : done ? '#22c55e' : '#9CA3AF' }}>
                    {s.label}
                  </span>
                </div>
                {idx < STEPS.length - 1 && (
                  <div className="w-24 h-0.5 mx-2 mb-4 transition-all duration-300"
                    style={{ background: step > s.id ? '#22c55e' : '#E5E7EB' }} />
                )}
              </div>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Main form */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">

              {/* Step 1: Shipping */}
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
                  className="rounded-2xl p-6 sm:p-8" style={{ background: '#fff', boxShadow: '0 2px 20px rgba(0,0,0,0.07)' }}>
                  <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                      style={{ background: '#1B4D3E' }}>1</div>
                    Shipping Information
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Full Name *" error={errors.name}>
                      <input value={shipping.name} onChange={e => setShipping(s => ({ ...s, name: e.target.value }))}
                        placeholder="Your full name" className={input} />
                    </Field>
                    <Field label="Phone Number *" error={errors.phone}>
                      <input value={shipping.phone} onChange={e => setShipping(s => ({ ...s, phone: e.target.value }))}
                        placeholder="+880 1X XX XXX XXX" type="tel" className={input} />
                    </Field>
                    <Field label="Street Address *" error={errors.address} className="sm:col-span-2">
                      <textarea value={shipping.address} onChange={e => setShipping(s => ({ ...s, address: e.target.value }))}
                        placeholder="House, Road, Area..." rows={2} className={`${input} resize-none`} />
                    </Field>
                    <Field label="Delivery Area *" error={errors.deliveryArea}>
                      <select value={shipping.deliveryArea} onChange={e => setShipping(s => ({ ...s, deliveryArea: e.target.value }))}
                        className={input} style={{ color: shipping.deliveryArea ? '#111' : '#9CA3AF' }}>
                        <option value="">Select Delivery Area</option>
                        {DELIVERY_AREAS.map(a => (
                          <option key={a.name} value={a.name}>{a.name} — Tk {a.cost}</option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Email Address (Optional)">
                      <input value={shipping.email} onChange={e => setShipping(s => ({ ...s, email: e.target.value }))}
                        placeholder="email@example.com" type="email" className={input} />
                    </Field>
                    <Field label="ZIP Code (Optional)">
                      <input value={shipping.zipCode} onChange={e => setShipping(s => ({ ...s, zipCode: e.target.value }))}
                        placeholder="1212" className={input} />
                    </Field>
                  </div>

                  <button onClick={() => { if (validateShipping()) setStep(2) }}
                    className="mt-8 w-full flex items-center justify-center gap-2 py-3.5 rounded-full font-semibold text-sm transition-all hover:scale-[1.01] active:scale-95"
                    style={{ background: 'linear-gradient(135deg, #1B4D3E, #2D7A5B)', color: '#fff' }}>
                    Next Step <ChevronRight className="w-4 h-4" />
                  </button>
                </motion.div>
              )}

              {/* Step 2: Payment */}
              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
                  className="rounded-2xl p-6 sm:p-8" style={{ background: '#fff', boxShadow: '0 2px 20px rgba(0,0,0,0.07)' }}>
                  <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                      style={{ background: '#1B4D3E' }}>2</div>
                    Payment Method
                  </h2>

                  {/* COD option */}
                  <div className="rounded-xl p-4 border-2 flex items-center gap-4"
                    style={{ borderColor: '#1B4D3E', background: 'rgba(27,77,62,0.04)' }}>
                    <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center"
                      style={{ borderColor: '#1B4D3E' }}>
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#1B4D3E' }} />
                    </div>
                    <div className="flex items-center gap-3">
                      <Truck className="w-5 h-5" style={{ color: '#1B4D3E' }} />
                      <div>
                        <p className="font-semibold text-gray-900">Cash on Delivery</p>
                        <p className="text-sm text-gray-500">Pay when you receive the product</p>
                      </div>
                    </div>
                  </div>

                  {/* Coupon code */}
                  <div className="mt-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <Tag className="w-4 h-4" /> Coupon Code (Optional)
                    </label>
                    <div className="flex gap-2">
                      <input value={coupon} onChange={e => { setCoupon(e.target.value); setCouponError(''); setCouponApplied(false) }}
                        placeholder="e.g. WELCOME10" className={`${input} flex-1`} />
                      <button onClick={applyCoupon}
                        className="px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
                        style={{ background: '#1B4D3E', color: '#fff' }}>
                        Apply
                      </button>
                    </div>
                    {couponApplied && <p className="text-green-600 text-xs mt-1.5 font-medium">✓ 10% discount applied!</p>}
                    {couponError && <p className="text-red-500 text-xs mt-1.5">{couponError}</p>}
                  </div>

                  <div className="flex gap-3 mt-8">
                    <button onClick={() => setStep(1)}
                      className="flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-sm border-2 transition-all hover:bg-gray-50"
                      style={{ borderColor: '#E5E7EB', color: '#374151' }}>
                      <ChevronLeft className="w-4 h-4" /> Back
                    </button>
                    <button onClick={() => setStep(3)}
                      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full font-semibold text-sm transition-all hover:scale-[1.01] active:scale-95"
                      style={{ background: 'linear-gradient(135deg, #1B4D3E, #2D7A5B)', color: '#fff' }}>
                      Review Order <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Review */}
              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
                  className="rounded-2xl p-6 sm:p-8" style={{ background: '#fff', boxShadow: '0 2px 20px rgba(0,0,0,0.07)' }}>
                  <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                      style={{ background: '#1B4D3E' }}>3</div>
                    Review Your Order
                  </h2>

                  {/* Shipping review */}
                  <div className="rounded-xl p-4 mb-4" style={{ background: '#F9FAFB' }}>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">Shipping To</h3>
                    <p className="font-semibold text-gray-900">{shipping.name}</p>
                    <p className="text-sm text-gray-600">{shipping.phone}</p>
                    <p className="text-sm text-gray-600">{shipping.address}</p>
                    <p className="text-sm text-gray-600">{shipping.deliveryArea}</p>
                  </div>

                  {/* Items review */}
                  <div className="space-y-3 mb-6">
                    {items.map(item => (
                      <div key={item.id} className="flex items-center gap-3">
                        {item.image && (
                          <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate" style={{ fontFamily: 'var(--font-hind)' }}>
                            {lang === 'en' ? item.name : (item.nameBn || item.name)}
                          </p>
                          <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                        </div>
                        <p className="text-sm font-semibold" style={{ color: '#1B4D3E' }}>
                          Tk {(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <button onClick={() => setStep(2)}
                      className="flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-sm border-2 transition-all hover:bg-gray-50"
                      style={{ borderColor: '#E5E7EB', color: '#374151' }}>
                      <ChevronLeft className="w-4 h-4" /> Back
                    </button>
                    <button onClick={placeOrder} disabled={placing}
                      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full font-semibold text-sm transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-60"
                      style={{ background: 'linear-gradient(135deg, #D4A017, #F5C842)', color: '#1B4D3E' }}>
                      {placing ? 'Placing Order...' : '✓ Confirm Order'}
                    </button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          {/* Order Summary sidebar */}
          <div>
            <div className="rounded-2xl p-6 sticky top-24" style={{ background: '#fff', boxShadow: '0 2px 20px rgba(0,0,0,0.07)' }}>
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <ShoppingBag className="w-4 h-4" style={{ color: '#1B4D3E' }} />
                Order Summary
              </h3>

              <div className="space-y-3 pb-4 border-b border-gray-100 mb-4">
                {items.map(item => (
                  <div key={item.id} className="flex items-start gap-2">
                    {item.image && (
                      <img src={item.image} alt={item.name}
                        className="w-10 h-10 rounded-lg object-cover shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800 text-xs leading-snug truncate" style={{ fontFamily: 'var(--font-hind)' }}>
                        {lang === 'en' ? item.name : (item.nameBn || item.name)}
                      </p>
                      <p className="text-gray-400 text-xs mb-1.5">Tk {item.price.toLocaleString()} each</p>
                      {/* Qty controls */}
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 rounded-full flex items-center justify-center border border-gray-200 hover:border-green-700 hover:text-green-700 transition-all text-gray-600">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-semibold w-5 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 rounded-full flex items-center justify-center border border-gray-200 hover:border-green-700 hover:text-green-700 transition-all text-gray-600">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      <button onClick={() => removeItem(item.id)}
                        className="w-5 h-5 rounded-full flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all">
                        <X className="w-3 h-3" />
                      </button>
                      <p className="text-xs font-bold" style={{ color: '#1B4D3E' }}>
                        Tk {(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>Tk {totalPrice.toLocaleString()}</span>
                </div>
                {couponApplied && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount (10%)</span>
                    <span>-Tk {discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{shippingCost > 0 ? `Tk ${shippingCost}` : <em className="text-xs text-gray-400">Select area</em>}</span>
                </div>
                <div className="flex justify-between font-bold text-base pt-2 border-t border-gray-100">
                  <span>Total</span>
                  <span style={{ color: '#1B4D3E' }}>Tk {total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

function Field({ label, error, children, className = '' }: { label: string; error?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1.5">{label}</label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}

const input = "w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 outline-none focus:border-green-700 focus:ring-1 focus:ring-green-700 transition-all placeholder-gray-400 bg-white"
