'use client'

import { motion } from 'framer-motion'
import { ShieldCheck, Lock, Key, Building2 } from 'lucide-react'

const reasons = [
  {
    icon: ShieldCheck,
    title: 'Verified by Verisign',
    description: 'Our platform uses state-of-the-art encryption certified by top authorities.',
  },
  {
    icon: Lock,
    title: 'No money can be moved',
    description: 'Your investments are routed directly between your bank and the AMCs.',
  },
  {
    icon: Key,
    title: 'Password Encryption',
    description: 'End-to-end security ensures your credentials are never exposed.',
  },
  {
    icon: Building2,
    title: 'Bank Level Security',
    description: 'We employ the same robust security standards as major financial institutions.',
  },
]

export default function WhyUs() {
  return (
    <section id="why-us" className="section-padding relative overflow-hidden bg-secondary/30">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-accent/[0.03] rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Reason to <span className="text-gradient-blue">Invest with us</span>
            </h2>
            <h3 className="text-xl font-medium text-foreground mb-4">Trust us, your savings are in safe hands</h3>
            <p className="text-muted-foreground max-w-3xl mx-auto" style={{ fontFamily: 'var(--font-sans)' }}>
              We value the trust you place in us that&apos;s why, we are committed to keeping highest standards for securing transactions and customer confidentiality.
            </p>
          </motion.div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => {
            const Icon = reason.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-card border border-border flex items-center justify-center group-hover:bg-accent/10 group-hover:border-accent/30 smooth-transition shadow-sm">
                  <Icon size={32} className="text-accent group-hover:scale-110 smooth-transition" />
                </div>
                <h4 className="text-lg font-bold mb-3">{reason.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{reason.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
