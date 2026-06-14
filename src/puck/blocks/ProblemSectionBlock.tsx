'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { AlertTriangle, CheckCircle2 } from 'lucide-react'
import { RichText } from '@/components/puck/RichText'
import { useT } from '@/hooks/useT'

type Props = {
  tagText: string; tagTextEn?: string
  headingBn: string; headingEn?: string
  highlightText: string; highlightTextEn?: string
  problemTitle: string; problemTitleEn?: string
  prob1: string; prob1En?: string
  prob2: string; prob2En?: string
  prob3: string; prob3En?: string
  prob4: string; prob4En?: string
  solutionTitle: string; solutionTitleEn?: string
  sol1: string; sol1En?: string
  sol2: string; sol2En?: string
  sol3: string; sol3En?: string
  sol4: string; sol4En?: string
}

export function ProblemSectionBlock(props: Props) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const t = useT()

  const problems = [
    { bn: props.prob1, en: props.prob1En },
    { bn: props.prob2, en: props.prob2En },
    { bn: props.prob3, en: props.prob3En },
    { bn: props.prob4, en: props.prob4En },
  ].filter(p => p.bn)

  const solutions = [
    { bn: props.sol1, en: props.sol1En },
    { bn: props.sol2, en: props.sol2En },
    { bn: props.sol3, en: props.sol3En },
    { bn: props.sol4, en: props.sol4En },
  ].filter(s => s.bn)

  const probIcons = ['🌾', '⚗️', '💧', '🦠']
  const solIcons = ['🌱', '🔬', '💪', '📈']

  return (
    <section ref={ref} className="py-24 lg:py-32 relative overflow-hidden" style={{ background: 'white' }}>
      <div className="absolute top-0 left-0 right-0" style={{ lineHeight: 0 }}>
        <svg viewBox="0 0 1440 60" className="w-full" style={{ fill: '#F8F5EE' }}>
          <path d="M0,0 C360,60 1080,60 1440,0 L1440,0 L0,0 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ background: 'rgba(27,77,62,0.08)', color: '#1B4D3E', fontFamily: 'var(--font-inter)' }}>
            <RichText html={t(props.tagText, props.tagTextEn)} inline />
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4" style={{ color: '#1a2e1a', fontFamily: 'var(--font-hind)' }}>
            <RichText html={t(props.headingBn, props.headingEn)} inline /><br />
            <span style={{ color: '#D4A017' }}><RichText html={t(props.highlightText, props.highlightTextEn)} inline /></span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Problems */}
          <motion.div initial={{ opacity: 0, x: -50 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="rounded-3xl p-8 relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #fff5f5, #ffe8e8)', border: '1px solid rgba(239,68,68,0.15)' }}>
            <div className="flex items-center gap-3 mb-7">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(239,68,68,0.1)' }}>
                <AlertTriangle className="w-5 h-5" style={{ color: '#dc2626' }} />
              </div>
              <h3 className="text-xl font-bold" style={{ color: '#dc2626', fontFamily: 'var(--font-hind)' }}>
                <RichText html={t(props.problemTitle, props.problemTitleEn)} inline />
              </h3>
            </div>
            <ul className="space-y-4">
              {problems.map((p, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-xl flex-shrink-0 mt-0.5">{probIcons[i] || '⚠️'}</span>
                  <span className="text-base leading-relaxed" style={{ color: '#374151', fontFamily: 'var(--font-hind)' }}>
                    <RichText html={t(p.bn, p.en)} inline />
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Solutions */}
          <motion.div initial={{ opacity: 0, x: 50 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="rounded-3xl p-8 relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)', border: '1px solid rgba(27,77,62,0.15)' }}>
            <div className="flex items-center gap-3 mb-7">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(27,77,62,0.1)' }}>
                <CheckCircle2 className="w-5 h-5" style={{ color: '#1B4D3E' }} />
              </div>
              <h3 className="text-xl font-bold" style={{ color: '#1B4D3E', fontFamily: 'var(--font-hind)' }}>
                <RichText html={t(props.solutionTitle, props.solutionTitleEn)} inline />
              </h3>
            </div>
            <ul className="space-y-4">
              {solutions.map((s, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-xl flex-shrink-0 mt-0.5">{solIcons[i] || '✅'}</span>
                  <span className="text-base leading-relaxed" style={{ color: '#374151', fontFamily: 'var(--font-hind)' }}>
                    <RichText html={t(s.bn, s.en)} inline />
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
