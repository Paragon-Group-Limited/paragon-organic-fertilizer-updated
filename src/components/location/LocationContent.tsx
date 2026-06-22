'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, Phone, Mail, CheckCircle2, ArrowRight, Building2, TrendingUp, Users, Handshake, Upload, X, FileText } from 'lucide-react'

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

function StatTile({ v, l, i }: { v: string; l: string; i: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: i * 0.08 }}
      className="rounded-2xl p-6 text-center"
      style={{ background: 'linear-gradient(135deg, #1B4D3E, #0F2E24)' }}>
      <div className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-hind)' }}>{v}</div>
      <div className="text-sm" style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-hind)' }}>{l}</div>
    </motion.div>
  )
}

type CoverageArea = { division: string; districts: string }
function AreaCard({ area, i }: { area: CoverageArea; i: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 25 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: i * 0.07 }}
      className="bg-white rounded-xl p-5 border"
      style={{ borderColor: 'rgba(27,77,62,0.08)' }}>
      <div className="flex items-center gap-2 mb-3">
        <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: '#1B4D3E' }} />
        <h4 className="font-bold text-sm" style={{ color: '#1B4D3E', fontFamily: 'var(--font-hind)' }}>{area.division}</h4>
      </div>
      <p className="text-xs leading-relaxed" style={{ color: '#9ca3af', fontFamily: 'var(--font-hind)' }}>{area.districts}</p>
    </motion.div>
  )
}

type DealerBenefit = { icon: React.ReactNode; title: string; desc: string }
function BenefitCard({ b, i }: { b: DealerBenefit; i: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: i * 0.1 }}
      className="rounded-2xl p-7 border"
      style={{ background: '#F8F5EE', borderColor: 'rgba(27,77,62,0.06)' }}>
      <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
        style={{ background: 'linear-gradient(135deg, #1B4D3E, #2D7A3A)', color: '#F5C842' }}>
        {b.icon}
      </div>
      <h4 className="font-bold text-base mb-3" style={{ color: '#1B4D3E', fontFamily: 'var(--font-hind)' }}>{b.title}</h4>
      <p className="text-sm leading-relaxed" style={{ color: '#6b7280', fontFamily: 'var(--font-hind)' }}>{b.desc}</p>
    </motion.div>
  )
}

const dealerBenefits: DealerBenefit[] = [
  { icon: <Building2 className="w-6 h-6" />, title: 'বিশ্বস্ত ব্র্যান্ড সাপোর্ট', desc: 'প্যারাগন গ্রুপের শক্তিশালী ব্র্যান্ড পরিচিতি আপনার ব্যবসাকে এগিয়ে নিয়ে যাবে। বিজ্ঞাপন ও প্রচারণায় আমরা পাশে থাকব।' },
  { icon: <TrendingUp className="w-6 h-6" />, title: 'লাভজনক ব্যবসার সুযোগ', desc: 'প্রতিযোগিতামূলক মূল্য ও আকর্ষণীয় কমিশনে পণ্য সরবরাহ। দীর্ঘমেয়াদী অংশীদারিত্বে লাভজনক ব্যবসা পরিচালনা।' },
  { icon: <Users className="w-6 h-6" />, title: 'প্রশিক্ষণ ও উন্নয়ন', desc: 'নিয়মিত প্রশিক্ষণ, কৃষক সমাবেশ ও মার্কেটিং সহায়তা প্রদান করা হয়। আপনার দলকে আমরা দক্ষ করে তুলব।' },
  { icon: <Handshake className="w-6 h-6" />, title: 'দীর্ঘমেয়াদী অংশীদারিত্ব', desc: 'আমরা শুধু পণ্য বিক্রেতা খুঁজি না, প্রকৃত অংশীদার খুঁজি। আপনার সাফল্যই আমাদের সাফল্য।' },
]

const requirements = [
  'নাম ও প্রতিষ্ঠানের নাম',
  'যোগাযোগের মোবাইল নম্বর',
  'ব্যবসার ঠিকানা (জেলা, উপজেলা)',
  'সংক্ষিপ্ত ব্যবসায়িক অভিজ্ঞতার বিবরণ',
  'কৃষি পণ্য বা সার ব্যবসার পূর্ব অভিজ্ঞতা (থাকলে)',
  'ট্রেড লাইসেন্স (ছবি বা PDF — ঐচ্ছিক)',
]

const coverageAreas: CoverageArea[] = [
  { division: 'ঢাকা বিভাগ', districts: 'ঢাকা, গাজীপুর, মানিকগঞ্জ, নারায়ণগঞ্জ, টাঙ্গাইল, কিশোরগঞ্জ, ময়মনসিংহ' },
  { division: 'চট্টগ্রাম বিভাগ', districts: 'চট্টগ্রাম, কুমিল্লা, নোয়াখালী, ফেনী, ব্রাহ্মণবাড়িয়া, চাঁদপুর, লক্ষ্মীপুর' },
  { division: 'রাজশাহী বিভাগ', districts: 'রাজশাহী, বগুড়া, নাটোর, চাঁপাইনবাবগঞ্জ, পাবনা, সিরাজগঞ্জ, নওগাঁ' },
  { division: 'খুলনা বিভাগ', districts: 'খুলনা, যশোর, সাতক্ষীরা, বাগেরহাট, নড়াইল, মাগুরা, ঝিনাইদহ, কুষ্টিয়া' },
  { division: 'বরিশাল বিভাগ', districts: 'বরিশাল, পটুয়াখালী, ভোলা, পিরোজপুর, বরগুনা, ঝালকাঠি' },
  { division: 'সিলেট বিভাগ', districts: 'সিলেট, মৌলভীবাজার, হবিগঞ্জ, সুনামগঞ্জ' },
  { division: 'রংপুর বিভাগ', districts: 'রংপুর, দিনাজপুর, গাইবান্ধা, নীলফামারী, কুড়িগ্রাম, ঠাকুরগাঁও, পঞ্চগড়' },
  { division: 'ময়মনসিংহ বিভাগ', districts: 'ময়মনসিংহ, জামালপুর, শেরপুর, নেত্রকোণা' },
]

const statTiles: [string, string][] = [['৬৪', 'জেলা'], ['৮', 'বিভাগ'], ['৫০০+', 'সক্রিয় ডিলার'], ['সারাদেশ', 'কভারেজ']]

export function LocationContent() {
  const [formData, setFormData] = useState({ name: '', org: '', phone: '', address: '', experience: '' })
  const [tradeLicense, setTradeLicense] = useState<File | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      setError('ফাইলের আকার ৫MB-এর বেশি হতে পারবে না')
      return
    }
    setError('')
    setTradeLicense(file)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      const fd = new FormData()
      fd.append('name', formData.name)
      fd.append('org', formData.org)
      fd.append('phone', formData.phone)
      fd.append('address', formData.address)
      fd.append('experience', formData.experience)
      if (tradeLicense) fd.append('tradeLicense', tradeLicense)

      const res = await fetch('/api/dealer-apply', { method: 'POST', body: fd })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'ত্রুটি হয়েছে')
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'সার্ভার ত্রুটি হয়েছে')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div style={{ background: '#F8F5EE' }}>

      {/* Coverage Map visual */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ background: 'rgba(27,77,62,0.08)', color: '#1B4D3E', fontFamily: 'var(--font-inter)' }}>
              Coverage Area
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ color: '#1a2e1a', fontFamily: 'var(--font-hind)' }}>
              সারাবাংলাদেশে <span style={{ color: '#D4A017' }}>আমাদের উপস্থিতি</span>
            </h2>
            <p className="text-base leading-relaxed" style={{ color: '#6b7280', fontFamily: 'var(--font-hind)' }}>
              দেশের সকল বিভাগে আমাদের ডিলার নেটওয়ার্ক সক্রিয়। নতুন এলাকায় ডিলার নিয়োগ প্রক্রিয়া চলমান।
            </p>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {statTiles.map(([v, l], i) => <StatTile key={i} v={v} l={l} i={i} />)}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {coverageAreas.map((area, i) => <AreaCard key={i} area={area} i={i} />)}
          </div>
        </div>
      </section>

      {/* Why become a dealer */}
      <section className="py-20 lg:py-24" style={{ background: 'white' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ background: 'rgba(27,77,62,0.08)', color: '#1B4D3E', fontFamily: 'var(--font-inter)' }}>
              Why Become A Dealer
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ color: '#1a2e1a', fontFamily: 'var(--font-hind)' }}>
              কেন হবেন <span style={{ color: '#D4A017' }}>আমাদের ডিলার?</span>
            </h2>
            <p className="text-base leading-relaxed" style={{ color: '#6b7280', fontFamily: 'var(--font-hind)' }}>
              কৃষকদের কাছে ক্রমবর্ধমান জৈব সারের চাহিদা কাজে লাগিয়ে আপনার ব্যবসা গড়ে তুলুন।
            </p>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {dealerBenefits.map((b, i) => <BenefitCard key={i} b={b} i={i} />)}
          </div>
        </div>
      </section>

      {/* Application form */}
      <section className="py-20 lg:py-28" style={{ background: '#F8F5EE' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ background: 'rgba(27,77,62,0.08)', color: '#1B4D3E', fontFamily: 'var(--font-inter)' }}>
              Apply Now
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold" style={{ color: '#1a2e1a', fontFamily: 'var(--font-hind)' }}>
              ডিলারশিপের জন্য <span style={{ color: '#D4A017' }}>আবেদন করুন</span>
            </h2>
          </FadeIn>

          <div className="grid lg:grid-cols-2 gap-10">
            <FadeIn delay={0.1}>
              <div className="bg-white rounded-2xl p-8 border h-full" style={{ borderColor: 'rgba(27,77,62,0.08)' }}>
                <h3 className="text-xl font-bold mb-6" style={{ color: '#1B4D3E', fontFamily: 'var(--font-hind)' }}>
                  আবেদনের জন্য প্রয়োজনীয় তথ্য
                </h3>
                <ul className="space-y-3 mb-8">
                  {requirements.map((r, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#1B4D3E' }} />
                      <span className="text-sm leading-relaxed" style={{ color: '#4a5568', fontFamily: 'var(--font-hind)' }}>{r}</span>
                    </li>
                  ))}
                </ul>

                <div className="rounded-2xl p-6 border"
                  style={{ background: 'rgba(27,77,62,0.04)', borderColor: 'rgba(27,77,62,0.1)' }}>
                  <h4 className="font-bold text-sm mb-4" style={{ color: '#1B4D3E', fontFamily: 'var(--font-hind)' }}>
                    সরাসরি যোগাযোগ করুন:
                  </h4>
                  <div className="space-y-3">
                    <a href="tel:+8801324413282" className="flex items-center gap-3">
                      <Phone className="w-4 h-4" style={{ color: '#1B4D3E' }} />
                      <span className="text-sm font-medium" style={{ color: '#1B4D3E', fontFamily: 'var(--font-inter)' }}>
                        +880 1324-413282
                      </span>
                    </a>
                    <a href="mailto:info.fertilizer@paragon.com.bd" className="flex items-center gap-3">
                      <Mail className="w-4 h-4" style={{ color: '#1B4D3E' }} />
                      <span className="text-sm font-medium" style={{ color: '#1B4D3E', fontFamily: 'var(--font-inter)' }}>
                        info.fertilizer@paragon.com.bd
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              {submitted ? (
                <div className="bg-white rounded-2xl p-8 border flex flex-col items-center justify-center text-center h-full"
                  style={{ borderColor: 'rgba(27,77,62,0.08)' }}>
                  <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
                    style={{ background: 'rgba(27,77,62,0.08)' }}>
                    <CheckCircle2 className="w-10 h-10" style={{ color: '#1B4D3E' }} />
                  </div>
                  <h3 className="text-xl font-bold mb-3" style={{ color: '#1B4D3E', fontFamily: 'var(--font-hind)' }}>
                    আবেদন সফলভাবে জমা হয়েছে!
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#6b7280', fontFamily: 'var(--font-hind)' }}>
                    আমাদের টিম শীঘ্রই আপনার সাথে যোগাযোগ করবে। ধন্যবাদ আপনার আগ্রহের জন্য।
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 border"
                  style={{ borderColor: 'rgba(27,77,62,0.08)' }}>
                  <h3 className="text-xl font-bold mb-6" style={{ color: '#1B4D3E', fontFamily: 'var(--font-hind)' }}>
                    আবেদন ফর্ম
                  </h3>
                  <div className="space-y-4">
                    {[
                      { id: 'name', label: 'আপনার নাম *', placeholder: 'মো. আব্দুর রহমান', key: 'name' as const },
                      { id: 'org', label: 'প্রতিষ্ঠানের নাম', placeholder: 'রহমান এগ্রো সার্ভিসেস', key: 'org' as const },
                      { id: 'phone', label: 'মোবাইল নম্বর *', placeholder: '০১XXXXXXXXX', key: 'phone' as const },
                      { id: 'address', label: 'ব্যবসার ঠিকানা *', placeholder: 'জেলা, উপজেলা', key: 'address' as const },
                    ].map((field) => (
                      <div key={field.id}>
                        <label className="block text-sm font-semibold mb-1.5"
                          style={{ color: '#374151', fontFamily: 'var(--font-hind)' }}>
                          {field.label}
                        </label>
                        <input
                          type="text"
                          placeholder={field.placeholder}
                          value={formData[field.key]}
                          onChange={e => setFormData(prev => ({ ...prev, [field.key]: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl border text-sm outline-none"
                          style={{ borderColor: 'rgba(27,77,62,0.2)', fontFamily: 'var(--font-hind)', color: '#1a2e1a' }}
                          required={field.label.includes('*')}
                        />
                      </div>
                    ))}

                    <div>
                      <label className="block text-sm font-semibold mb-1.5"
                        style={{ color: '#374151', fontFamily: 'var(--font-hind)' }}>
                        ব্যবসায়িক অভিজ্ঞতা
                      </label>
                      <textarea
                        rows={3}
                        placeholder="সার বা কৃষি পণ্যের ব্যবসায় আপনার অভিজ্ঞতা সম্পর্কে সংক্ষেপে লিখুন..."
                        value={formData.experience}
                        onChange={e => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border text-sm outline-none resize-none"
                        style={{ borderColor: 'rgba(27,77,62,0.2)', fontFamily: 'var(--font-hind)', color: '#1a2e1a' }}
                      />
                    </div>

                    {/* Trade license upload */}
                    <div>
                      <label className="block text-sm font-semibold mb-1.5"
                        style={{ color: '#374151', fontFamily: 'var(--font-hind)' }}>
                        ট্রেড লাইসেন্স
                        <span className="ml-1 font-normal text-xs" style={{ color: '#9ca3af' }}>(ছবি বা PDF — ঐচ্ছিক, সর্বোচ্চ ৫MB)</span>
                      </label>

                      {tradeLicense ? (
                        <div className="flex items-center gap-3 px-4 py-3 rounded-xl border"
                          style={{ borderColor: 'rgba(27,77,62,0.3)', background: 'rgba(27,77,62,0.04)' }}>
                          <FileText className="w-5 h-5 flex-shrink-0" style={{ color: '#1B4D3E' }} />
                          <span className="text-sm flex-1 truncate" style={{ color: '#1a2e1a', fontFamily: 'var(--font-hind)' }}>
                            {tradeLicense.name}
                          </span>
                          <button
                            type="button"
                            onClick={() => { setTradeLicense(null); if (fileInputRef.current) fileInputRef.current.value = '' }}
                            className="flex-shrink-0 p-1 rounded-full hover:bg-red-50"
                            style={{ color: '#ef4444' }}>
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="w-full px-4 py-5 rounded-xl border-2 border-dashed flex flex-col items-center gap-2 transition-colors"
                          style={{ borderColor: 'rgba(27,77,62,0.2)', color: '#6b7280' }}
                          onMouseEnter={e => (e.currentTarget.style.borderColor = '#1B4D3E')}
                          onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(27,77,62,0.2)')}>
                          <Upload className="w-6 h-6" style={{ color: '#1B4D3E' }} />
                          <span className="text-sm" style={{ fontFamily: 'var(--font-hind)' }}>
                            ক্লিক করুন বা ফাইল এখানে টেনে আনুন
                          </span>
                          <span className="text-xs" style={{ color: '#9ca3af', fontFamily: 'var(--font-inter)' }}>
                            JPG, PNG, PDF — max 5MB
                          </span>
                        </button>
                      )}

                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*,application/pdf"
                        className="hidden"
                        onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f) }}
                      />
                    </div>

                    {error && (
                      <p className="text-sm rounded-xl px-4 py-3"
                        style={{ color: '#dc2626', background: '#fef2f2', fontFamily: 'var(--font-hind)' }}>
                        {error}
                      </p>
                    )}

                    <button type="submit" disabled={submitting}
                      className="w-full py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 disabled:opacity-60"
                      style={{ background: 'linear-gradient(135deg, #1B4D3E, #2D7A3A)', color: 'white', fontFamily: 'var(--font-hind)' }}>
                      {submitting ? (
                        <>
                          <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                          </svg>
                          জমা দেওয়া হচ্ছে...
                        </>
                      ) : (
                        <>আবেদন জমা দিন <ArrowRight className="w-5 h-5" /></>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  )
}
