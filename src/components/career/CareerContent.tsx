'use client'

import { useRef, useState, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, ArrowRight, Briefcase, GraduationCap, Leaf, TrendingUp, Award, Users } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

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

type WhyCard = { Icon: React.ElementType; titleBn: string; titleEn: string; descBn: string; descEn: string }
function WhyWorkCard({ w, i }: { w: WhyCard; i: number }) {
  const { lang } = useLanguage()
  const t = (bn: string, en: string) => lang === 'en' ? en : bn
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
      <h4 className="font-bold text-base mb-3" style={{ color: '#1B4D3E', fontFamily: 'var(--font-hind)' }}>{t(w.titleBn, w.titleEn)}</h4>
      <p className="text-sm leading-relaxed" style={{ color: '#6b7280', fontFamily: 'var(--font-hind)' }}>{t(w.descBn, w.descEn)}</p>
    </motion.div>
  )
}

type FieldCard = { icon: string; titleBn: string; titleEn: string; descBn: string; descEn: string }
function FieldItem({ f, i }: { f: FieldCard; i: number }) {
  const { lang } = useLanguage()
  const t = (bn: string, en: string) => lang === 'en' ? en : bn
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
      <h4 className="font-bold text-sm mb-2" style={{ color: '#1B4D3E', fontFamily: 'var(--font-hind)' }}>{t(f.titleBn, f.titleEn)}</h4>
      <p className="text-xs leading-relaxed" style={{ color: '#9ca3af', fontFamily: 'var(--font-hind)' }}>{t(f.descBn, f.descEn)}</p>
    </motion.div>
  )
}

type Step = { no: string; titleBn: string; titleEn: string; descBn: string; descEn: string }
function StepCard({ s, i }: { s: Step; i: number }) {
  const { lang } = useLanguage()
  const t = (bn: string, en: string) => lang === 'en' ? en : bn
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
      <h4 className="font-bold text-base mb-2" style={{ color: '#1B4D3E', fontFamily: 'var(--font-hind)' }}>{t(s.titleBn, s.titleEn)}</h4>
      <p className="text-sm leading-relaxed" style={{ color: '#6b7280', fontFamily: 'var(--font-hind)' }}>{t(s.descBn, s.descEn)}</p>
    </motion.div>
  )
}

// ── Static data ───────────────────────────────────────────────────────────────
const whyWorkHere: WhyCard[] = [
  { Icon: Briefcase, titleBn: 'শীর্ষস্থানীয় প্রতিষ্ঠান',  titleEn: 'Leading Organization',       descBn: 'বাংলাদেশের অন্যতম নেতৃস্থানীয় কৃষি-শিল্প প্রতিষ্ঠানে কর্মসংস্থানের সুযোগ।', descEn: 'Work at one of Bangladesh\'s leading agro-industrial organizations.' },
  { Icon: Leaf,      titleBn: 'পরিবেশ রক্ষায় অবদান',      titleEn: 'Environmental Impact',        descBn: 'আপনার কাজ সরাসরি মাটির স্বাস্থ্য রক্ষায় এবং পরিবেশবান্ধব কৃষির প্রসারে ভূমিকা রাখবে।', descEn: 'Your work directly protects soil health and promotes eco-friendly farming.' },
  { Icon: TrendingUp,titleBn: 'পেশাদার উন্নয়ন',           titleEn: 'Professional Growth',        descBn: 'নিয়মিত প্রশিক্ষণ, কর্মশালা এবং ক্যারিয়ার উন্নয়নের সুযোগ প্রদান করা হয়।',  descEn: 'Regular training, workshops, and career development opportunities provided.' },
  { Icon: Users,     titleBn: 'প্রাণবন্ত পরিবেশ',          titleEn: 'Vibrant Environment',        descBn: 'তরুণ, উদ্ভাবনী ও বৈচিত্র্যময় দলের সাথে কাজ করার সুযোগ।',               descEn: 'Collaborate with a young, innovative and diverse team.' },
]

const fields: FieldCard[] = [
  { icon: '🌱', titleBn: 'জৈব সার উৎপাদন',   titleEn: 'Organic Fertilizer Production', descBn: 'উৎপাদন প্রক্রিয়া, মান নিয়ন্ত্রণ ও গবেষণায় দক্ষ প্রার্থী।', descEn: 'Candidates skilled in production, quality control & research.' },
  { icon: '🔬', titleBn: 'কৃষি ও মৃত্তিকাবিজ্ঞান', titleEn: 'Agriculture & Soil Science', descBn: 'কৃষিবিদ, মৃত্তিকাবিজ্ঞানী ও উদ্ভিদবিজ্ঞানী।', descEn: 'Agronomists, soil scientists and botanists.' },
  { icon: '✅', titleBn: 'গুণমান নিয়ন্ত্রণ',  titleEn: 'Quality Control',  descBn: 'ল্যাবরেটরি পরীক্ষা ও মান নিশ্চিতকরণে অভিজ্ঞ।', descEn: 'Experienced in laboratory testing and quality assurance.' },
  { icon: '📢', titleBn: 'বিপণন ও বিক্রয়',   titleEn: 'Marketing & Sales', descBn: 'ফিল্ড মার্কেটিং, ডিজিটাল মার্কেটিং ও সেলস প্রফেশনাল।', descEn: 'Field marketing, digital marketing and sales professionals.' },
  { icon: '🧪', titleBn: 'গবেষণা ও উন্নয়ন',  titleEn: 'Research & Development', descBn: 'নতুন পণ্য উদ্ভাবন ও বিদ্যমান ফর্মুলা উন্নয়নে আগ্রহী।', descEn: 'Passionate about new product innovation and formula improvement.' },
  { icon: '🚛', titleBn: 'সাপ্লাই চেইন',     titleEn: 'Supply Chain',     descBn: 'লজিস্টিক্স, সরবরাহ ব্যবস্থাপনা ও ডিস্ট্রিবিউশনে দক্ষ।', descEn: 'Skilled in logistics, supply management and distribution.' },
  { icon: '⚙️', titleBn: 'ইঞ্জিনিয়ারিং',     titleEn: 'Engineering',      descBn: 'যন্ত্রপাতি রক্ষণাবেক্ষণ ও উৎপাদন প্রকৌশলে অভিজ্ঞ।', descEn: 'Experienced in machinery maintenance and production engineering.' },
  { icon: '💼', titleBn: 'প্রশাসন ও অর্থ',   titleEn: 'Admin & Finance',   descBn: 'HR, Finance ও Administrative পদে যোগ্য প্রার্থী।', descEn: 'Qualified candidates for HR, Finance and Administrative roles.' },
]

const steps: Step[] = [
  { no: '01', titleBn: 'CV জমা দিন',  titleEn: 'Submit your CV',  descBn: 'আপনার আপডেট করা CV, কভার লেটার এবং সংশ্লিষ্ট সার্টিফিকেটের কপি ইমেইলে পাঠান।', descEn: 'Email your updated CV, cover letter and copies of relevant certificates.' },
  { no: '02', titleBn: 'স্ক্রিনিং',   titleEn: 'Screening',       descBn: 'আমাদের HR টিম সব আবেদন পর্যালোচনা করে যোগ্য প্রার্থীদের সাথে যোগাযোগ করে।', descEn: 'Our HR team reviews all applications and contacts qualified candidates.' },
  { no: '03', titleBn: 'ইন্টারভিউ',   titleEn: 'Interview',       descBn: 'প্রাথমিক স্ক্রিনিং পেরোলে ফোন বা সরাসরি ইন্টারভিউয়ের জন্য আমন্ত্রণ জানানো হয়।', descEn: 'Initial screening results in invitations for phone or face-to-face interviews.' },
  { no: '04', titleBn: 'যোগদান',      titleEn: 'Joining',         descBn: 'চূড়ান্ত নির্বাচন হলে নিয়োগপত্র ও অনবোর্ডিং প্রক্রিয়া সম্পন্ন হয়।', descEn: 'After the final selection, the recruitment and onboarding process is completed.' },
]

// ── Application Form ──────────────────────────────────────────────────────────
const EMPTY_FORM = { fullName: '', mobile: '', address: '', applyingFor: '' }

function ApplicationForm() {
  const { lang } = useLanguage()
  const t = (bn: string, en: string) => lang === 'en' ? en : bn

  const [form, setForm]     = useState(EMPTY_FORM)
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [cvName, setCvName] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted]   = useState(false)
  const [error, setError]           = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  const set = useCallback((k: keyof typeof EMPTY_FORM) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm(prev => ({ ...prev, [k]: e.target.value })), [])

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null
    setCvFile(f)
    setCvName(f?.name ?? '')
  }

  const handleSubmit = async () => {
    if (!form.fullName.trim() || !form.mobile.trim()) {
      setError(t('পূর্ণ নাম এবং মোবাইল নম্বর আবশ্যক।', 'Full name and mobile number are required.'))
      return
    }
    setError('')
    setSubmitting(true)
    try {
      const fd = new FormData()
      fd.append('fullName',    form.fullName.trim())
      fd.append('mobile',      form.mobile.trim())
      fd.append('address',     form.address.trim())
      fd.append('applyingFor', form.applyingFor.trim())
      if (cvFile) fd.append('cv', cvFile)

      const res = await fetch('/api/career/apply', { method: 'POST', body: fd })
      if (!res.ok) {
        const d = await res.json()
        setError(d.error ?? t('আবেদন জমা দিতে সমস্যা হয়েছে। আবার চেষ্টা করুন।', 'Failed to submit application. Please try again.'))
        return
      }
      setSubmitted(true)
      setForm(EMPTY_FORM)
      setCvFile(null)
      setCvName('')
    } catch {
      setError(t('নেটওয়ার্ক সমস্যা। আবার চেষ্টা করুন।', 'Network error. Please try again.'))
    } finally { setSubmitting(false) }
  }

  const inp: React.CSSProperties = {
    width: '100%', padding: '12px 16px', borderRadius: 10, boxSizing: 'border-box',
    border: '1.5px solid rgba(27,77,62,0.18)', background: '#fff',
    fontSize: 15, color: '#1a2e1a', outline: 'none',
    fontFamily: 'var(--font-hind, system-ui, sans-serif)',
    transition: 'border-color 0.2s',
  }
  const lbl: React.CSSProperties = { display: 'block', marginBottom: 6, fontSize: 13, fontWeight: 700, color: '#1B4D3E', fontFamily: 'var(--font-hind, system-ui, sans-serif)' }

  return (
    <section className="py-20 lg:py-24" style={{ background: 'white' }}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ background: 'rgba(27,77,62,0.08)', color: '#1B4D3E', fontFamily: 'var(--font-inter)' }}>
            Apply Now
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold mb-3" style={{ color: '#1a2e1a', fontFamily: 'var(--font-hind)' }}>
            {t('অনলাইনে', 'Apply')} <span style={{ color: '#D4A017' }}>{t('আবেদন করুন', 'Online')}</span>
          </h2>
          <p className="text-base" style={{ color: '#6b7280', fontFamily: 'var(--font-hind)' }}>
            {t('নিচের ফর্মটি পূরণ করুন — আমরা সরাসরি আপনার সাথে যোগাযোগ করব।', 'Fill out the form below — we will contact you directly.')}
          </p>
        </FadeIn>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '48px 32px', background: '#f0fdf4', borderRadius: 20, border: '1.5px solid #86efac' }}>
            <div style={{ fontSize: 52, marginBottom: 16 }}>✅</div>
            <h3 style={{ fontSize: 22, fontWeight: 800, color: '#166534', marginBottom: 8, fontFamily: 'var(--font-hind)' }}>
              {t('আবেদন সফলভাবে জমা হয়েছে!', 'Application Submitted Successfully!')}
            </h3>
            <p style={{ fontSize: 15, color: '#15803d', lineHeight: 1.7, fontFamily: 'var(--font-hind)' }}>
              {t('আপনার আবেদন আমাদের HR টিম পর্যালোচনা করবে এবং শীঘ্রই আপনার সাথে যোগাযোগ করা হবে।',
                 'Your application will be reviewed by our HR team and we will contact you soon.')}
            </p>
            <button onClick={() => setSubmitted(false)}
              style={{ marginTop: 20, padding: '10px 24px', borderRadius: 10, border: '1.5px solid #16a34a', background: 'transparent', color: '#166534', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-hind)' }}>
              {t('আরেকটি আবেদন করুন', 'Submit Another Application')}
            </button>
          </div>
        ) : (
          <div
            style={{ background: '#fff', borderRadius: 20, border: '1.5px solid rgba(27,77,62,0.12)', padding: '36px 32px', boxShadow: '0 4px 32px rgba(27,77,62,0.07)' }}>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px 20px' }}>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={lbl}>{t('পূর্ণ নাম', 'Full Name')} <span style={{ color: '#dc2626' }}>*</span></label>
                <input type="text" value={form.fullName} onChange={set('fullName')}
                  placeholder={t('আপনার পূর্ণ নাম লিখুন', 'Enter your full name')} required style={inp} />
              </div>

              <div>
                <label style={lbl}>{t('মোবাইল নম্বর', 'Mobile Number')} <span style={{ color: '#dc2626' }}>*</span></label>
                <input type="tel" value={form.mobile} onChange={set('mobile')}
                  placeholder="01XXXXXXXXX" required style={inp} />
              </div>

              <div>
                <label style={lbl}>{t('কোন পদে আবেদন করছেন', 'Position Applying For')}</label>
                <input type="text" value={form.applyingFor} onChange={set('applyingFor')}
                  placeholder={t('যেমন: Marketing Executive', 'e.g. Marketing Executive')} style={inp} />
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={lbl}>{t('ঠিকানা', 'Address')}</label>
                <textarea value={form.address} onChange={set('address')}
                  placeholder={t('আপনার বর্তমান ঠিকানা', 'Your current address')} rows={3}
                  style={{ ...inp, resize: 'vertical', minHeight: 80 }} />
              </div>

              {/* CV Upload */}
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={lbl}>{t('CV / রেজুমে', 'CV / Resume')}</label>
                <div
                  onClick={() => fileRef.current?.click()}
                  style={{ padding: '20px 24px', borderRadius: 12, border: '2px dashed rgba(27,77,62,0.25)', background: '#f8fdfb', cursor: 'pointer', textAlign: 'center' }}>
                  <input ref={fileRef} type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" onChange={handleFile} style={{ display: 'none' }} />
                  {cvName ? (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                      <span style={{ fontSize: 22 }}>📄</span>
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: '#1B4D3E' }}>{cvName}</div>
                        <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>{t('পরিবর্তন করতে ক্লিক করুন', 'Click to change')}</div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div style={{ fontSize: 28, marginBottom: 8 }}>📎</div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: '#1B4D3E', fontFamily: 'var(--font-hind)' }}>{t('CV আপলোড করুন', 'Upload your CV')}</div>
                      <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 4 }}>{t('PDF, Word, বা ছবি ফাইল (সর্বোচ্চ 10MB)', 'PDF, Word, or image file (max 10MB)')}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {error && (
              <div style={{ marginTop: 16, padding: '10px 16px', borderRadius: 9, background: '#fef2f2', border: '1px solid #fecaca', color: '#991b1b', fontSize: 13 }}>
                ⚠️ {error}
              </div>
            )}

            <button type="button" onClick={handleSubmit} disabled={submitting}
              style={{ marginTop: 24, width: '100%', padding: '14px', borderRadius: 12, border: 'none', cursor: submitting ? 'default' : 'pointer', background: submitting ? '#9ca3af' : 'linear-gradient(135deg, #1B4D3E, #2D7A5B)', color: '#fff', fontSize: 16, fontWeight: 800, fontFamily: 'var(--font-hind, system-ui, sans-serif)', letterSpacing: '0.01em' }}>
              {submitting ? t('⏳ জমা হচ্ছে…', '⏳ Submitting…') : t('📤 আবেদন জমা দিন', '📤 Submit Application')}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export function CareerContent() {
  const { lang } = useLanguage()
  const t = (bn: string, en: string) => lang === 'en' ? en : bn

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
              {t('কেন আমাদের সাথে', 'Why Work')} <span style={{ color: '#D4A017' }}>{t('কাজ করবেন?', 'With Us?')}</span>
            </h2>
            <p className="text-base leading-relaxed" style={{ color: '#6b7280', fontFamily: 'var(--font-hind)' }}>
              {t('আমরা শুধু চাকরি দিই না — একটি উদ্দেশ্যমুখী ক্যারিয়ার গড়ার সুযোগ দিই।',
                 "We don't just offer jobs — we offer the opportunity to build a purposeful career.")}
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
              {t('কোন কোন', 'Which')} <span style={{ color: '#D4A017' }}>{t('বিভাগে সুযোগ আছে?', 'Departments Are Hiring?')}</span>
            </h2>
            <p className="text-base" style={{ color: '#6b7280', fontFamily: 'var(--font-hind)' }}>
              {t('আমরা বিভিন্ন বিভাগে প্রতিভাবান, উদ্যমী ও অভিজ্ঞ মানুষদের খুঁজছি।',
                 'We are looking for talented, energetic, and experienced people across various departments.')}
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
              {t('আবেদন করার', 'to apply')} <span style={{ color: '#D4A017' }}>{t('পদ্ধতি', 'method')}</span>
            </h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
            {steps.map((s, i) => <StepCard key={i} s={s} i={i} />)}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <ApplicationForm />

      {/* CTA */}
      <section className="py-20" style={{ background: 'linear-gradient(135deg, #0F2E24, #1B4D3E)' }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
            style={{ background: 'rgba(212,160,23,0.2)' }}>
            <GraduationCap className="w-8 h-8" style={{ color: '#F5C842' }} />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-hind)' }}>
            {t('আপনার CV পাঠান', 'Send Your CV')} <span style={{ color: '#F5C842' }}>{t('আজই', 'Today')}</span>
          </h2>
          <p className="mb-4 text-lg" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-hind)' }}>
            {t('আমরা প্রতিনিয়ত প্রতিভাবান মানুষদের খুঁজে চলেছি। আপনার CV আমাদের ডেটাবেসে যুক্ত হলে উপযুক্ত পদ খালি হলে আমরা যোগাযোগ করব।',
               "We are constantly looking for talented people. Once your CV is in our database, we'll reach out when the right position opens.")}
          </p>
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            {[
              { bn: 'কৃষির প্রতি আগ্রহ',     en: 'Passion for Agriculture' },
              { bn: 'পরিবেশ সচেতনতা',         en: 'Environmental Awareness' },
              { bn: 'দলগত কাজের মানসিকতা',    en: 'Team-oriented Mindset' },
            ].map((tag) => (
              <div key={tag.bn} className="flex items-center gap-2 text-sm"
                style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-hind)' }}>
                <Award className="w-4 h-4" style={{ color: '#F5C842' }} />
                {t(tag.bn, tag.en)}
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
            {t('Subject line:', 'Subject line:')} &ldquo;Application - [{t('আপনার কাঙ্ক্ষিত পদের নাম', 'Your desired position')}]&rdquo;
          </p>
        </div>
      </section>
    </div>
  )
}
