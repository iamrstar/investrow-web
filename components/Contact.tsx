'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, Clock, MessageCircle } from 'lucide-react'
import { useState } from 'react'

const contactInfo = [
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 9102070777 | +91 9102050555',
    href: 'tel:+919102070777',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'info@investrow.in',
    href: 'mailto:info@investrow.in',
  },
  {
    icon: MapPin,
    label: 'Head Office',
    value: 'Jealgora No. 7 PO - Jealgora Sindri Road, Dhanbad, Jharkhand - 828110',
    href: '#',
  },
  {
    icon: MapPin,
    label: 'Branch Office',
    value: 'MOCP Thakur More, Jharia, Baliyapur Road, Dhanbad, Jharkhand - 828201',
    href: '#',
  },
  {
    icon: Clock,
    label: 'Business Hours',
    value: 'Mon – Sat, 9:30 AM – 6:30 PM',
    href: '#',
  },
]

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate submission
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
      setTimeout(() => {
        setFormData({ name: '', email: '', phone: '', message: '' })
        setSubmitted(false)
      }, 3000)
    }, 1200)
  }

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-accent/[0.03] rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/[0.02] rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">Get In Touch</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Let&apos;s Start Your <span className="text-gradient-blue">Journey</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-sans)' }}>
            Have questions? Our team of financial experts is here to guide you. Reach out and take the first step.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Left — Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-4"
          >
            {contactInfo.map((info, index) => {
              const Icon = info.icon
              return (
                <motion.a
                  key={index}
                  href={info.href}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border hover:border-accent/30 smooth-transition group"
                >
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/15 smooth-transition">
                    <Icon size={18} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">
                      {info.label}
                    </p>
                    <p className="text-sm font-medium text-foreground">{info.value}</p>
                  </div>
                </motion.a>
              )
            })}

            {/* WhatsApp Quick Connect */}
            <motion.a
              href="https://wa.me/919102070777?text=Hi%2C%20I%20am%20interested%20in%20your%20financial%20advisory%20services."
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/15 smooth-transition group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                <MessageCircle size={18} className="text-emerald-500" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Chat on WhatsApp</p>
                <p className="text-xs text-muted-foreground">Quick response within 30 minutes</p>
              </div>
            </motion.a>
          </motion.div>

          {/* Right — Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="p-6 sm:p-8 rounded-2xl bg-card border border-border shadow-card">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium text-foreground mb-2">
                      Full Name <span className="text-accent">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground/50 text-sm smooth-transition"
                      placeholder="Your full name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-medium text-foreground mb-2">
                      Email <span className="text-accent">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground/50 text-sm smooth-transition"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="contact-phone" className="block text-sm font-medium text-foreground mb-2">
                    Phone Number
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground/50 text-sm smooth-transition"
                    placeholder="+91 98765 43210"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message" className="block text-sm font-medium text-foreground mb-2">
                    Message <span className="text-accent">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground/50 text-sm smooth-transition resize-none"
                    placeholder="Tell us about your financial goals..."
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading || submitted}
                  className="w-full py-3.5 bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-[#3B82F6]/20 hover:shadow-[#3B82F6]/40 smooth-transition hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-5 h-5 border-2 border-[#0B1426]/30 border-t-[#0B1426] rounded-full"
                      />
                      Sending...
                    </>
                  ) : submitted ? (
                    <>
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring' }}
                      >
                        ✓
                      </motion.span>
                      Message Sent Successfully!
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
