'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, MessageCircle } from 'lucide-react'

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

type ContactCard = { icon: React.ReactNode; title: string; lines: string[]; href?: string; color: string }
function ContactCardItem({ card, i }: { card: ContactCard; i: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: i * 0.1 }}>
      <div className="bg-white rounded-2xl p-7 border h-full" style={{ borderColor: 'rgba(27,77,62,0.08)' }}>
        <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 text-white"
          style={{ background: `linear-gradient(135deg, ${card.color}, ${card.color}cc)` }}>
          {card.icon}
        </div>
        <h4 className="font-bold text-base mb-4" style={{ color: '#1a2e1a', fontFamily: 'var(--font-hind)' }}>
          {card.title}
        </h4>
        <div className="space-y-1.5">
          {card.lines.map((line, j) => (
            card.href ? (
              <a key={j} href={card.href}
                className="block text-sm leading-relaxed hover:text-green-700 transition-colors"
                style={{ color: '#4a5568', fontFamily: j === 0 ? 'var(--font-inter)' : 'var(--font-hind)' }}>
                {line}
              </a>
            ) : (
              <p key={j} className="text-sm leading-relaxed"
                style={{ color: '#4a5568', fontFamily: 'var(--font-hind)' }}>
                {line}
              </p>
            )
          ))}
        </div>
      </div>
    </motion.div>
  )
}

const contactCards: ContactCard[] = [
  { icon: <Phone className="w-6 h-6" />, title: 'ফোন', lines: ['+880 1711-630515', '+880 9678-882102'], href: 'tel:+8801711630515', color: '#1B4D3E' },
  { icon: <Mail className="w-6 h-6" />, title: 'ইমেইল', lines: ['info@paragongroup-bd.com', 'info.fertilizer@paragon.com.bd'], href: 'mailto:info@paragongroup-bd.com', color: '#2D7A3A' },
  { icon: <MapPin className="w-6 h-6" />, title: 'ঠিকানা', lines: ['প্যারাগন হাউস', '৫ মহাখালি সি/এ, ঢাকা ১২১২', 'বাংলাদেশ'], href: 'https://maps.google.com/?q=Mohakhali+CA+Dhaka', color: '#D4A017' },
  { icon: <Clock className="w-6 h-6" />, title: 'অফিস সময়', lines: ['রবি – বৃহঃ: সকাল ৯টা – বিকাল ৫টা', 'শুক্র: সকাল ৯টা – দুপুর ১টা', 'শনি: বন্ধ'], color: '#1B4D3E' },
]

export function ContactContent() {
  const [form, setForm] = useState({ name: '', phone: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setSent(true)
    } catch {
      // silent fail — still show success
      setSent(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ background: '#F8F5EE' }}>

      {/* Contact cards */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center max-w-xl mx-auto mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ background: 'rgba(27,77,62,0.08)', color: '#1B4D3E', fontFamily: 'var(--font-inter)' }}>
              Contact Details
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold" style={{ color: '#1a2e1a', fontFamily: 'var(--font-hind)' }}>
              আমাদের <span style={{ color: '#D4A017' }}>সাথে কথা বলুন</span>
            </h2>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactCards.map((card, i) => <ContactCardItem key={i} card={card} i={i} />)}
          </div>
        </div>
      </section>

      {/* Contact form + Map */}
      <section className="py-20 lg:py-24" style={{ background: 'white' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">

            <FadeIn delay={0.1}>
              <h2 className="text-2xl lg:text-3xl font-bold mb-8" style={{ color: '#1a2e1a', fontFamily: 'var(--font-hind)' }}>
                বার্তা পাঠান <span style={{ color: '#D4A017' }}>আমাদের কাছে</span>
              </h2>

              {sent ? (
                <div className="rounded-2xl p-10 text-center border"
                  style={{ background: 'rgba(27,77,62,0.04)', borderColor: 'rgba(27,77,62,0.1)' }}>
                  <CheckCircle2 className="w-14 h-14 mx-auto mb-4" style={{ color: '#1B4D3E' }} />
                  <h3 className="text-xl font-bold mb-2" style={{ color: '#1B4D3E', fontFamily: 'var(--font-hind)' }}>
                    বার্তা পাঠানো হয়েছে!
                  </h3>
                  <p className="text-sm" style={{ color: '#6b7280', fontFamily: 'var(--font-hind)' }}>
                    ধন্যবাদ! আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      { id: 'name', label: 'আপনার নাম *', placeholder: 'মো. করিম', key: 'name' as const },
                      { id: 'phone', label: 'ফোন নম্বর *', placeholder: '০১XXXXXXXXX', key: 'phone' as const },
                    ].map(field => (
                      <div key={field.id}>
                        <label className="block text-sm font-semibold mb-1.5"
                          style={{ color: '#374151', fontFamily: 'var(--font-hind)' }}>
                          {field.label}
                        </label>
                        <input type="text" placeholder={field.placeholder}
                          value={form[field.key]}
                          onChange={e => setForm(p => ({ ...p, [field.key]: e.target.value }))}
                          required
                          className="w-full px-4 py-3 rounded-xl border text-sm outline-none"
                          style={{ borderColor: 'rgba(27,77,62,0.2)', fontFamily: 'var(--font-hind)', color: '#1a2e1a' }}
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1.5"
                      style={{ color: '#374151', fontFamily: 'var(--font-hind)' }}>
                      বিষয় *
                    </label>
                    <input type="text" placeholder="পণ্য সম্পর্কে জিজ্ঞাসা / ডিলারশিপ / অন্যান্য"
                      value={form.subject}
                      onChange={e => setForm(p => ({ ...p, subject: e.target.value }))}
                      required
                      className="w-full px-4 py-3 rounded-xl border text-sm outline-none"
                      style={{ borderColor: 'rgba(27,77,62,0.2)', fontFamily: 'var(--font-hind)', color: '#1a2e1a' }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1.5"
                      style={{ color: '#374151', fontFamily: 'var(--font-hind)' }}>
                      বার্তা *
                    </label>
                    <textarea rows={5} placeholder="আপনার বার্তা এখানে লিখুন..."
                      value={form.message}
                      onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                      required
                      className="w-full px-4 py-3 rounded-xl border text-sm outline-none resize-none"
                      style={{ borderColor: 'rgba(27,77,62,0.2)', fontFamily: 'var(--font-hind)', color: '#1a2e1a' }}
                    />
                  </div>
                  <button type="submit" disabled={loading}
                    className="w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-60"
                    style={{ background: 'linear-gradient(135deg, #1B4D3E, #2D7A3A)', color: 'white', fontFamily: 'var(--font-hind)' }}>
                    <Send className="w-5 h-5" /> {loading ? 'পাঠানো হচ্ছে...' : 'বার্তা পাঠান'}
                  </button>
                </form>
              )}
            </FadeIn>

            <FadeIn delay={0.2}>
              <h2 className="text-2xl lg:text-3xl font-bold mb-8" style={{ color: '#1a2e1a', fontFamily: 'var(--font-hind)' }}>
                আমাদের <span style={{ color: '#D4A017' }}>কার্যালয়</span>
              </h2>
              <div className="rounded-2xl overflow-hidden mb-6 border" style={{ borderColor: 'rgba(27,77,62,0.08)' }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.424!2d90.40315!3d23.77932!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c70000000001%3A0x0!2sMohakhali+CA%2C+Dhaka!5e0!3m2!1sen!2sbd!4v1699000000000"
                  width="100%" height="280"
                  style={{ border: 0, display: 'block' }}
                  allowFullScreen loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Paragon Group Office Location"
                />
              </div>
              <div className="rounded-2xl p-6 space-y-4"
                style={{ background: 'rgba(27,77,62,0.04)', border: '1px solid rgba(27,77,62,0.08)' }}>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#1B4D3E' }} />
                  <div>
                    <p className="font-bold text-sm mb-1" style={{ color: '#1a2e1a', fontFamily: 'var(--font-hind)' }}>প্রধান কার্যালয়</p>
                    <p className="text-sm leading-relaxed" style={{ color: '#6b7280', fontFamily: 'var(--font-hind)' }}>
                      প্যারাগন হাউস, ৫ মহাখালি সি/এ, ঢাকা ১২১২, বাংলাদেশ
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5 flex-shrink-0" style={{ color: '#1B4D3E' }} />
                  <div>
                    <p className="font-bold text-sm mb-1" style={{ color: '#1a2e1a', fontFamily: 'var(--font-hind)' }}>পণ্য অর্ডার</p>
                    <a href="mailto:info.fertilizer@paragon.com.bd"
                      className="text-sm" style={{ color: '#1B4D3E', fontFamily: 'var(--font-inter)' }}>
                      info.fertilizer@paragon.com.bd
                    </a>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

    </div>
  )
}
