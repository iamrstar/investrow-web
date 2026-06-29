'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Rajesh Mehta',
    role: 'Business Owner, Mumbai',
    initials: 'RM',
    quote:
      'Investrow has completely transformed my approach to wealth management. Their personalized financial planning helped me achieve my retirement goals 5 years ahead of schedule.',
    rating: 5,
  },
  {
    name: 'Priya Sharma',
    role: 'IT Professional, Bangalore',
    initials: 'PS',
    quote:
      'As someone new to investing, the team at Investrow made the entire process simple and transparent. My SIP portfolio has consistently outperformed my expectations.',
    rating: 5,
  },
  {
    name: 'Anil Kumar',
    role: 'Doctor, Delhi',
    initials: 'AK',
    quote:
      'What sets Investrow apart is their genuine care for their clients. They don\'t just manage money — they build long-term relationships and truly understand your financial aspirations.',
    rating: 5,
  },
  {
    name: 'Sunita Patel',
    role: 'Entrepreneur, Ahmedabad',
    initials: 'SP',
    quote:
      'The risk assessment and portfolio rebalancing services have been invaluable. I feel confident knowing my investments are professionally managed and aligned with my risk profile.',
    rating: 5,
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }, [])

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }, [])

  // Auto-scroll
  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [isPaused, next])

  const t = testimonials[current]

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-secondary/50 dark:bg-secondary/30" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-accent/[0.03] rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">Client Stories</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            What Our Clients <span className="text-gradient-blue">Say</span>
          </h2>
        </motion.div>

        {/* Testimonial Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative p-8 sm:p-12 rounded-2xl bg-card border border-border shadow-card">
            {/* Quote icon */}
            <div className="absolute top-6 right-6 sm:top-8 sm:right-8">
              <Quote size={40} className="text-accent/15" />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4 }}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <blockquote
                  className="text-lg sm:text-xl text-foreground leading-relaxed mb-8"
                  style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontWeight: 400 }}
                >
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent/30 to-accent/10 flex items-center justify-center text-sm font-bold text-accent border border-accent/20">
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{t.name}</p>
                    <p className="text-sm text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={prev}
              className="p-2.5 rounded-xl bg-secondary/70 border border-border hover:bg-secondary smooth-transition hover:scale-105 active:scale-95"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`smooth-transition rounded-full ${
                    index === current
                      ? 'w-6 h-2 bg-accent'
                      : 'w-2 h-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-2.5 rounded-xl bg-secondary/70 border border-border hover:bg-secondary smooth-transition hover:scale-105 active:scale-95"
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  )
}
