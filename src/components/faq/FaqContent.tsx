'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { faqs } from './faqData'
import type { FaqItem } from './faqData'
import { useT } from '@/hooks/useT'

function AccordionItem({ faq, i }: { faq: FaqItem; i: number }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const t = useT()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: i * 0.06 }}
      className="rounded-2xl border overflow-hidden"
      style={{ borderColor: open ? 'rgba(27,77,62,0.3)' : 'rgba(27,77,62,0.1)', background: '#fff' }}
    >
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="font-semibold text-base leading-snug" style={{ color: '#1a2e1a', fontFamily: 'var(--font-hind)' }}>
          {t(faq.q, faq.qEn)}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: open ? '#1B4D3E' : 'rgba(27,77,62,0.08)' }}
        >
          <ChevronDown className="w-4 h-4" style={{ color: open ? '#fff' : '#1B4D3E' }} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <p className="px-6 pb-6 text-sm leading-relaxed" style={{ color: '#6b7280', fontFamily: 'var(--font-hind)' }}>
              {t(faq.a, faq.aEn)}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function FaqContent() {
  return (
    <section className="py-20 lg:py-28" style={{ background: '#F8F5EE' }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} faq={faq} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
