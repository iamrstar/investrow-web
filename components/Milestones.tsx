'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Users, Award, Briefcase, BarChart3 } from 'lucide-react'

interface Milestone {
  icon: React.ElementType
  label: string
  value: number
  suffix: string
  prefix?: string
}

const milestones: Milestone[] = [
  { icon: Users, label: 'Happy Clients', value: 5000, suffix: '+' },
  { icon: Award, label: 'Years of Excellence', value: 15, suffix: '+' },
  { icon: Briefcase, label: 'Assets Under Management', value: 50, suffix: ' Cr+', prefix: '₹' },
  { icon: BarChart3, label: 'Active SIPs', value: 8000, suffix: '+' },
]

function Counter({ target, prefix = '', suffix, isInView }: { target: number; prefix?: string; suffix: string; isInView: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return

    let frame: number
    const duration = 2000
    const startTime = performance.now()

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))

      if (progress < 1) {
        frame = requestAnimationFrame(animate)
      }
    }

    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [isInView, target])

  return (
    <span>
      {prefix}{count.toLocaleString('en-IN')}{suffix}
    </span>
  )
}

export default function Milestones() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section ref={sectionRef} className="relative py-20 overflow-hidden">
      {/* Subtle top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      {/* Background */}
      <div className="absolute inset-0 bg-secondary/50 dark:bg-secondary/30" />
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-accent/[0.03] rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/[0.02] rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">Our Track Record</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Numbers That <span className="text-gradient-blue">Speak</span>
          </h2>
        </motion.div>

        {/* Milestones grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {milestones.map((milestone, index) => {
            const Icon = milestone.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative p-6 sm:p-8 rounded-2xl bg-card border border-border hover:border-accent/30 smooth-transition text-center"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl bg-accent/[0.02] opacity-0 group-hover:opacity-100 smooth-transition" />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/15 smooth-transition">
                    <Icon size={22} className="text-accent" />
                  </div>

                  {/* Counter */}
                  <div className="text-3xl sm:text-4xl font-bold text-foreground mb-1 whitespace-nowrap" style={{ fontFamily: 'var(--font-sans)' }}>
                    <Counter
                      target={milestone.value}
                      prefix={milestone.prefix}
                      suffix={milestone.suffix}
                      isInView={isInView}
                    />
                  </div>

                  {/* Label */}
                  <p className="text-sm text-muted-foreground font-medium">
                    {milestone.label}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Subtle bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  )
}
