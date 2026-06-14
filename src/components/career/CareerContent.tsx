'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, ArrowRight, Briefcase, GraduationCap, Leaf, TrendingUp, Award, Users } from 'lucide-react'

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-70px' })
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 35 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}>
      {children}
    </motion.div>
  )
}

type WhyCard = { Icon: React.ElementType; title: string; desc: string }
function WhyWorkCard({ w, i }: { w: WhyCard; i: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: i * 0.1 }}
      className="bg-white rounded-2xl p-7 border"
      style={{ borderColor: 'rgba(27,77,62,0.08)' }}>
      <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
        style={{ background: 'linear-gradient(135deg, #1B4D3E, #2D7A3A)', color: '#F5C842' }}>
        <w.Icon className="w-6 h-6" />
      </div>
      <h4 className="font-bold text-base mb-3" style={{ color: '#1B4D3E', fontFamily: 'var(--font-hind)' }}>{w.title}</h4>
      <p className="text-sm leading-relaxed" style={{ color: '#6b7280', fontFamily: 'var(--font-hind)' }}>{w.desc}</p>
    </motion.div>
  )
}

type FieldCard = { icon: string; title: string; desc: string }
function FieldItem({ f, i }: { f: FieldCard; i: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.45, delay: i * 0.07 }}
      className="rounded-2xl p-6 border"
      style={{ background: '#F8F5EE', borderColor: 'rgba(27,77,62,0.07)' }}>
      <div className="text-4xl mb-4">{f.icon}</div>
      <h4 className="font-bold text-sm mb-2" style={{ color: '#1B4D3E', fontFamily: 'var(--font-hind)' }}>{f.title}</h4>
      <p className="text-xs leading-relaxed" style={{ color: '#9ca3af', fontFamily: 'var(--font-hind)' }}>{f.desc}</p>
    </motion.div>
  )
}

type Step = { no: string; title: string; desc: string }
function StepCard({ s, i }: { s: Step; i: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: i * 0.1 }}
      className="bg-white rounded-2xl p-6 border text-center"
      style={{ borderColor: 'rgba(27,77,62,0.08)' }}>
      <div className="text-4xl font-bold mb-4" style={{ color: 'rgba(27,77,62,0.1)', fontFamily: 'var(--font-inter)' }}>
        {s.no}
      </div>
      <h4 className="font-bold text-base mb-2" style={{ color: '#1B4D3E', fontFamily: 'var(--font-hind)' }}>{s.title}</h4>
      <p className="text-sm leading-relaxed" style={{ color: '#6b7280', fontFamily: 'var(--font-hind)' }}>{s.desc}</p>
    </motion.div>
  )
}

const whyWorkHere: WhyCard[] = [
  { Icon: Briefcase, title: 'শীর্ষস্থানীয় প্রতিষ্ঠান', desc: 'বাংলাদেশের অন্যতম নেতৃস্থানীয় কৃষি-শিল্প প্রতিষ্ঠানে কর্মসংস্থানের সুযোগ।' },
  { Icon: Leaf, title: 'পরিবেশ রক্ষায় অবদান', desc: 'আপনার কাজ সরাসরি মাটির স্বাস্থ্য রক্ষায় এবং পরিবেশবান্ধব কৃষির প্রসারে ভূমিকা রাখবে।' },
  { Icon: TrendingUp, title: 'পেশাদার উন্নয়ন', desc: 'নিয়মিত প্রশিক্ষণ, কর্মশালা এবং ক্যারিয়ার উন্নয়নের সুযোগ প্রদান করা হয়।' },
  { Icon: Users, title: 'প্রাণবন্ত পরিবেশ', desc: 'তরুণ, উদ্ভাবনী ও বৈচিত্র্যময় দলের সাথে কাজ করার সুযোগ।' },
]

const fields: FieldCard[] = [
  { icon: '🌱', title: 'জৈব সার উৎপাদন', desc: 'উৎপাদন প্রক্রিয়া, মান নিয়ন্ত্রণ ও গবেষণায় দক্ষ প্রার্থী।' },
  { icon: '🔬', title: 'কৃষি ও মৃত্তিকাবিজ্ঞান', desc: 'কৃষিবিদ, মৃত্তিকাবিজ্ঞানী ও উদ্ভিদবিজ্ঞানী।' },
  { icon: '✅', title: 'গুণমান নিয়ন্ত্রণ', desc: 'ল্যাবরেটরি পরীক্ষা ও মান নিশ্চিতকরণে অভিজ্ঞ।' },
  { icon: '📢', title: 'বিপণন ও বিক্রয়', desc: 'ফিল্ড মার্কেটিং, ডিজিটাল মার্কেটিং ও সেলস প্রফেশনাল।' },
  { icon: '🧪', title: 'গবেষণা ও উন্নয়ন', desc: 'নতুন পণ্য উদ্ভাবন ও বিদ্যমান ফর্মুলা উন্নয়নে আগ্রহী।' },
  { icon: '🚛', title: 'সাপ্লাই চেইন', desc: 'লজিস্টিক্স, সরবরাহ ব্যবস্থাপনা ও ডিস্ট্রিবিউশনে দক্ষ।' },
  { icon: '⚙️', title: 'ইঞ্জিনিয়ারিং', desc: 'যন্ত্রপাতি রক্ষণাবেক্ষণ ও উৎপাদন প্রকৌশলে অভিজ্ঞ।' },
  { icon: '💼', title: 'প্রশাসন ও অর্থ', desc: 'HR, Finance ও Administrative পদে যোগ্য প্রার্থী।' },
]

const steps: Step[] = [
  { no: '০১', title: 'CV জমা দিন', desc: 'আপনার আপডেট করা CV, কভার লেটার এবং সংশ্লিষ্ট সার্টিফিকেটের কপি ইমেইলে পাঠান।' },
  { no: '০২', title: 'স্ক্রিনিং', desc: 'আমাদের HR টিম সব আবেদন পর্যালোচনা করে যোগ্য প্রার্থীদের সাথে যোগাযোগ করে।' },
  { no: '০৩', title: 'ইন্টারভিউ', desc: 'প্রাথমিক স্ক্রিনিং পেরোলে ফোন বা সরাসরি ইন্টারভিউয়ের জন্য আমন্ত্রণ জানানো হয়।' },
  { no: '০৪', title: 'যোগদান', desc: 'চূড়ান্ত নির্বাচন হলে নিয়োগপত্র ও অনবোর্ডিং প্রক্রিয়া সম্পন্ন হয়।' },
]

export function CareerContent() {
  return (
    <div style={{ background: '#F8F5EE' }}>

      {/* Why work here */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ background: 'rgba(27,77,62,0.08)', color: '#1B4D3E', fontFamily: 'var(--font-inter)' }}>
              Why Join Us
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ color: '#1a2e1a', fontFamily: 'var(--font-hind)' }}>
              কেন আমাদের সাথে <span style={{ color: '#D4A017' }}>কাজ করবেন?</span>
            </h2>
            <p className="text-base leading-relaxed" style={{ color: '#6b7280', fontFamily: 'var(--font-hind)' }}>
              আমরা শুধু চাকরি দিই না — একটি উদ্দেশ্যমুখী ক্যারিয়ার গড়ার সুযোগ দিই।
            </p>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyWorkHere.map((w, i) => <WhyWorkCard key={i} w={w} i={i} />)}
          </div>
        </div>
      </section>

      {/* Areas */}
      <section className="py-20 lg:py-24" style={{ background: 'white' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ background: 'rgba(27,77,62,0.08)', color: '#1B4D3E', fontFamily: 'var(--font-inter)' }}>
              Open Positions
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ color: '#1a2e1a', fontFamily: 'var(--font-hind)' }}>
              কোন কোন <span style={{ color: '#D4A017' }}>বিভাগে সুযোগ আছে?</span>
            </h2>
            <p className="text-base" style={{ color: '#6b7280', fontFamily: 'var(--font-hind)' }}>
              আমরা বিভিন্ন বিভাগে প্রতিভাবান, উদ্যমী ও অভিজ্ঞ মানুষদের খুঁজছি।
            </p>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {fields.map((f, i) => <FieldItem key={i} f={f} i={i} />)}
          </div>
        </div>
      </section>

      {/* How to apply */}
      <section className="py-20 lg:py-28" style={{ background: '#F8F5EE' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ background: 'rgba(27,77,62,0.08)', color: '#1B4D3E', fontFamily: 'var(--font-inter)' }}>
              Application Process
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold" style={{ color: '#1a2e1a', fontFamily: 'var(--font-hind)' }}>
              আবেদন করার <span style={{ color: '#D4A017' }}>পদ্ধতি</span>
            </h2>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
            {steps.map((s, i) => <StepCard key={i} s={s} i={i} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ background: 'linear-gradient(135deg, #0F2E24, #1B4D3E)' }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
            style={{ background: 'rgba(212,160,23,0.2)' }}>
            <GraduationCap className="w-8 h-8" style={{ color: '#F5C842' }} />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-hind)' }}>
            আপনার CV পাঠান <span style={{ color: '#F5C842' }}>আজই</span>
          </h2>
          <p className="mb-4 text-lg" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-hind)' }}>
            আমরা প্রতিনিয়ত প্রতিভাবান মানুষদের খুঁজে চলেছি। আপনার CV আমাদের ডেটাবেসে যুক্ত হলে উপযুক্ত পদ খালি হলে আমরা যোগাযোগ করব।
          </p>
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            {['কৃষির প্রতি আগ্রহ', 'পরিবেশ সচেতনতা', 'দলগত কাজের মানসিকতা'].map((tag) => (
              <div key={tag} className="flex items-center gap-2 text-sm"
                style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-hind)' }}>
                <Award className="w-4 h-4" style={{ color: '#F5C842' }} />
                {tag}
              </div>
            ))}
          </div>
          <a href="mailto:careers@paragongroup.com.bd"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-base"
            style={{ background: 'linear-gradient(135deg, #D4A017, #F5C842)', color: '#1B4D3E', fontFamily: 'var(--font-hind)' }}>
            <Mail className="w-5 h-5" />
            careers@paragongroup.com.bd
            <ArrowRight className="w-5 h-5" />
          </a>
          <p className="mt-4 text-sm" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-hind)' }}>
            Subject line: &ldquo;Application - [আপনার কাঙ্ক্ষিত পদের নাম]&rdquo;
          </p>
        </div>
      </section>
    </div>
  )
}
