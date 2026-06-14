'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Leaf, Users, Calendar, Package } from 'lucide-react'

const stats = [
  { icon: Leaf, valueBn: '১০০%', valueEn: '100%', labelBn: 'অর্গানিক জৈব সার', labelEn: 'Certified Organic' },
  { icon: Users, valueBn: '৫০০০+', valueEn: '5000+', labelBn: 'সন্তুষ্ট কৃষক', labelEn: 'Happy Farmers' },
  { icon: Calendar, valueBn: '১০+', valueEn: '10+', labelBn: 'বছরের অভিজ্ঞতা', labelEn: 'Years Experience' },
  { icon: Package, valueBn: '৩টি', valueEn: '3', labelBn: 'প্রিমিয়াম পণ্য', labelEn: 'Premium Products' },
]

export default function StatsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} style={{ background: 'linear-gradient(135deg, #1B4D3E 0%, #0F2E24 100%)' }} className="relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px"
          style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 20, overflow: 'hidden' }}>
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.labelEn}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.6, ease: 'easeOut' }}
                className="flex flex-col items-center text-center py-10 px-6"
                style={{ background: 'rgba(27,77,62,0.7)' }}>

                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                  style={{ background: 'rgba(212,160,23,0.15)', border: '1px solid rgba(212,160,23,0.3)' }}>
                  <Icon className="w-6 h-6" style={{ color: '#D4A017' }} />
                </div>

                <div className="text-4xl font-bold text-white mb-1"
                  style={{ fontFamily: 'var(--font-hind)' }}>
                  {stat.valueBn}
                </div>

                <div className="text-sm font-semibold mb-0.5"
                  style={{ color: '#D4A017', fontFamily: 'var(--font-hind)' }}>
                  {stat.labelBn}
                </div>
                <div className="text-xs" style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-inter)' }}>
                  {stat.labelEn}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
