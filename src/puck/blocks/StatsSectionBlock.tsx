'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Leaf, Users, Calendar, Package } from 'lucide-react'
import { RichText } from '@/components/puck/RichText'
import { useLanguage } from '@/contexts/LanguageContext'
import { useT } from '@/hooks/useT'

const ICONS = [Leaf, Users, Calendar, Package]

// Convert English digits to Bengali — handles old data stored as "100%", "5000+" etc.
function toBn(str: string): string {
  const map: Record<string, string> = {
    '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪',
    '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯',
  }
  return (str || '').replace(/[0-9]/g, d => map[d] ?? d)
}

type Props = {
  stat1ValueBn: string; stat1ValueEn?: string; stat1LabelBn: string; stat1LabelEn: string
  stat2ValueBn: string; stat2ValueEn?: string; stat2LabelBn: string; stat2LabelEn: string
  stat3ValueBn: string; stat3ValueEn?: string; stat3LabelBn: string; stat3LabelEn: string
  stat4ValueBn: string; stat4ValueEn?: string; stat4LabelBn: string; stat4LabelEn: string
}

export function StatsSectionBlock(props: Props) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { lang } = useLanguage()
  const t = useT()

  const stats = [
    { valueBn: props.stat1ValueBn, valueEn: props.stat1ValueEn, labelBn: props.stat1LabelBn, labelEn: props.stat1LabelEn },
    { valueBn: props.stat2ValueBn, valueEn: props.stat2ValueEn, labelBn: props.stat2LabelBn, labelEn: props.stat2LabelEn },
    { valueBn: props.stat3ValueBn, valueEn: props.stat3ValueEn, labelBn: props.stat3LabelBn, labelEn: props.stat3LabelEn },
    { valueBn: props.stat4ValueBn, valueEn: props.stat4ValueEn, labelBn: props.stat4LabelBn, labelEn: props.stat4LabelEn },
  ]

  return (
    <section ref={ref} style={{ background: 'linear-gradient(135deg, #1B4D3E 0%, #0F2E24 100%)' }} className="relative overflow-hidden">
      <div className="absolute inset-0 opacity-5"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px"
          style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 20, overflow: 'hidden' }}>
          {stats.map((stat, i) => {
            const Icon = ICONS[i]
            return (
              <motion.div key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="flex flex-col items-center text-center py-10 px-6"
                style={{ background: 'rgba(27,77,62,0.7)' }}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                  style={{ background: 'rgba(212,160,23,0.15)', border: '1px solid rgba(212,160,23,0.3)' }}>
                  <Icon className="w-6 h-6" style={{ color: '#D4A017' }} />
                </div>
                <div className="text-4xl font-bold text-white mb-1"
                  style={{ fontFamily: lang === 'bn' ? 'var(--font-noto-bn), var(--font-hind)' : 'var(--font-inter)' }}>
                  <RichText html={lang === 'en' ? (stat.valueEn || stat.valueBn) : toBn(stat.valueBn)} inline />
                </div>
                <div className="text-sm font-semibold" style={{ fontFamily: 'var(--font-hind)' }}>
                  <RichText html={t(stat.labelBn, stat.labelEn)} inline style={{ color: 'inherit' }} />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
