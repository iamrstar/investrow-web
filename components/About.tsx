'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, Award, Users, TrendingUp, Shield } from 'lucide-react'

const timeline = [
  { year: '2009', event: 'Founded Investrow with a vision to democratize investing' },
  { year: '2014', event: 'Crossed ₹10 Crore in Assets Under Management' },
  { year: '2018', event: 'Expanded team to 15+ certified financial advisors' },
  { year: '2022', event: 'Reached 5,000+ happy clients milestone' },
  { year: '2024', event: '₹50Cr+ AUM and growing strong' },
]

const features = [
  { icon: Shield, text: 'AMFI Registered Distributor' },
  { icon: Award, text: 'Certified Financial Advisors' },
  { icon: Users, text: 'Personalized Investment Plans' },
  { icon: TrendingUp, text: 'Regular Portfolio Reviews' },
  { icon: CheckCircle2, text: 'Transparent Fee Structure' },
  { icon: CheckCircle2, text: 'Award-Winning Service' },
]

export default function About() {
  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/[0.03] rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/[0.02] rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Side — Timeline */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            <div className="mb-8">
              <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">Our Journey</p>
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
                15+ Years of Building <span className="text-gradient-blue">Financial Success</span>
              </h3>
            </div>

            {/* Timeline */}
            <div className="relative pl-8">
              {/* Vertical line */}
              <div className="absolute left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-accent/40 via-accent/20 to-transparent" />

              <div className="space-y-6">
                {timeline.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative group"
                  >
                    {/* Dot */}
                    <div className="absolute -left-8 top-1.5 w-[9px] h-[9px] rounded-full bg-accent/40 group-hover:bg-accent smooth-transition ring-4 ring-background" />

                    <div className="flex gap-4 items-start">
                      <span className="text-sm font-bold text-accent min-w-[3rem] tabular-nums" style={{ fontFamily: 'var(--font-sans)' }}>
                        {item.year}
                      </span>
                      <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground smooth-transition">
                        {item.event}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* AMFI Certification badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-10 p-4 rounded-xl bg-accent/5 border border-accent/15 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Shield size={24} className="text-accent" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">AMFI Registered</p>
                <p className="text-xs text-muted-foreground">Association of Mutual Funds in India — Certified Distributor</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side — Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <p className="text-sm font-semibold text-accent uppercase tracking-wider">Why Investrow</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                Why Choose
                <br />
                <span className="text-gradient-blue">Investrow?</span>
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
                We&apos;re not just a mutual fund distributor — we&apos;re your trusted partner
                in building generational wealth. Our team of certified financial advisors
                works with you to create strategies that align with your life goals.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.06 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 hover:bg-secondary smooth-transition group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/15 smooth-transition">
                      <Icon size={16} className="text-accent" />
                    </div>
                    <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground smooth-transition">
                      {feature.text}
                    </span>
                  </motion.div>
                )
              })}
            </div>

            {/* CTA */}
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white rounded-xl font-semibold shadow-lg shadow-[#3B82F6]/20 hover:shadow-[#3B82F6]/40 smooth-transition hover:scale-[1.02] active:scale-[0.98]"
            >
              Schedule Consultation
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="ml-1">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
