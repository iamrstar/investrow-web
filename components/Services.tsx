'use client'

import { motion } from 'framer-motion'
import { TrendingUp, FileText, Activity, Shield, Car, PiggyBank, BarChart3, Landmark } from 'lucide-react'

const services = [
  {
    icon: TrendingUp,
    title: 'Mutual Funds',
    description: 'Mutual funds are financial instruments that pool money from multiple investors to invest in securities like stocks and bonds.',
    accentColor: '#3B82F6',
    number: '01',
  },
  {
    icon: FileText,
    title: 'Tax Planning Services',
    description: 'Planning for tax saving investments efficiently to help you maximize your wealth and reduce tax liabilities.',
    accentColor: '#8B5CF6',
    number: '02',
  },
  {
    icon: Activity,
    title: 'Health Insurance',
    description: 'Comprehensive health insurance policies to cover the skyrocketing costs of quality healthcare in India.',
    accentColor: '#10B981',
    number: '03',
  },
  {
    icon: Shield,
    title: 'Life Insurance',
    description: 'Life insurance is a financial product that provides a secure future for your family in unforeseen circumstances.',
    accentColor: '#F59E0B',
    number: '04',
  },
  {
    icon: Car,
    title: 'General Insurance',
    description: 'Motor, property, and other general insurance covers to protect your valuable assets against various risks.',
    accentColor: '#EC4899',
    number: '05',
  },
  {
    icon: PiggyBank,
    title: 'FD and Bond',
    description: 'Fixed income instruments and bonds that pay fixed interest rates, ideal for conservative investors.',
    accentColor: '#06B6D4',
    number: '06',
  },
  {
    icon: BarChart3,
    title: 'Stock Market & Demat Open',
    description: 'Expert guidance for stock market investments and hassle-free opening of Demat and Trading accounts.',
    accentColor: '#F43F5E',
    number: '07',
  },
  {
    icon: Landmark,
    title: 'NPS',
    description: 'National Pension System (NPS) is a voluntary, long-term retirement savings scheme designed to enable systematic savings.',
    accentColor: '#8B5CF6',
    number: '08',
  },
]

export default function Services() {
  return (
    <section id="services" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 right-10 w-80 h-80 bg-accent/[0.03] rounded-full blur-[120px]" />
        <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-accent/[0.02] rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">What We Offer</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Premium <span className="text-gradient-blue">Services</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-sans)' }}>
            Comprehensive financial solutions designed to meet your unique needs and accelerate your journey to financial freedom.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="group relative p-7 rounded-2xl bg-card border border-border smooth-transition hover:shadow-card-hover overflow-hidden"
              >
                {/* Top accent bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 smooth-transition"
                  style={{ background: `linear-gradient(90deg, transparent, ${service.accentColor}, transparent)` }}
                />

                {/* Number badge */}
                <span
                  className="absolute top-5 right-5 text-6xl font-bold opacity-[0.04] group-hover:opacity-[0.08] smooth-transition pointer-events-none select-none"
                  style={{ fontFamily: 'var(--font-sans)', color: service.accentColor }}
                >
                  {service.number}
                </span>

                {/* Content */}
                <div className="relative z-10 space-y-4">
                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center smooth-transition"
                    style={{
                      backgroundColor: `${service.accentColor}15`,
                    }}
                  >
                    <Icon size={24} style={{ color: service.accentColor }} />
                  </div>

                  {/* Text */}
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Learn more link */}
                  <div className="flex items-center gap-2 text-sm font-semibold opacity-0 group-hover:opacity-100 smooth-transition translate-y-2 group-hover:translate-y-0" style={{ color: service.accentColor }}>
                    Learn more
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </div>
                </div>

                {/* Hover glow */}
                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 opacity-0 group-hover:opacity-100 smooth-transition blur-3xl pointer-events-none"
                  style={{ backgroundColor: `${service.accentColor}08` }}
                />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
