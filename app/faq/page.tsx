'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, MessageCircle } from 'lucide-react'

const faqs = [
  {
    category: "Our Services",
    questions: [
      {
        q: "What specific financial services do you offer?",
        a: "We offer a comprehensive suite of services including Mutual Fund Distribution, direct Portfolio Management, holistic Financial Planning, Retirement Planning, and detailed Risk Assessment to ensure your investments align with your life goals."
      },
      {
        q: "Are you registered with regulatory bodies?",
        a: "Yes, Investrow is an AMFI (Association of Mutual Funds in India) Registered Mutual Fund Distributor. We strictly adhere to all regulatory guidelines to ensure transparency and safety for our clients."
      }
    ]
  },
  {
    category: "Investing with Us",
    questions: [
      {
        q: "How do I start investing with Investrow?",
        a: "Starting is simple. Reach out to us via our contact form or WhatsApp. One of our financial experts will schedule a free initial consultation to understand your financial situation, risk appetite, and future goals before creating a personalized plan."
      },
      {
        q: "Is there a minimum investment amount required?",
        a: "We believe wealth creation should be accessible. You can start your journey with us through a Systematic Investment Plan (SIP) for as little as ₹500 per month."
      },
      {
        q: "How often will we review my portfolio?",
        a: "We actively monitor your investments, but we typically schedule formal portfolio reviews on a quarterly or bi-annual basis. This ensures your investments remain perfectly aligned with changing market conditions and your personal life goals."
      }
    ]
  },
  {
    category: "Security & Returns",
    questions: [
      {
        q: "Are my investments safe from market crashes?",
        a: "While all market-linked investments carry inherent risks, our rigorous risk assessment and proper asset allocation strategies are designed to mitigate extreme volatility. We focus on long-term wealth creation rather than short-term speculation."
      },
      {
        q: "Can you guarantee a specific return rate?",
        a: "No professional financial advisor or mutual fund distributor can legally guarantee returns on market-linked instruments. However, we use historical data and expert analysis to target returns that typically beat inflation and help you achieve your goals."
      }
    ]
  }
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<string | null>("Our Services-0")

  const toggleAccordion = (id: string) => {
    setOpenIndex(openIndex === id ? null : id)
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-accent/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-accent uppercase tracking-wider mb-3 block">Help Center</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Frequently Asked <span className="text-gradient-blue">Questions</span></h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Find quick answers to common questions about our wealth management services, investment strategies, and how we operate.
          </p>
        </motion.div>

        <div className="space-y-12">
          {faqs.map((section, sectionIdx) => (
            <motion.div 
              key={section.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: sectionIdx * 0.1 }}
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                  <span className="text-accent text-sm font-bold">{sectionIdx + 1}</span>
                </div>
                {section.category}
              </h2>
              
              <div className="space-y-4">
                {section.questions.map((faq, faqIdx) => {
                  const id = `${section.category}-${faqIdx}`
                  const isOpen = openIndex === id

                  return (
                    <div 
                      key={faqIdx} 
                      className={`bg-card border rounded-2xl overflow-hidden smooth-transition ${isOpen ? 'border-accent/40 shadow-lg shadow-accent/5' : 'border-border hover:border-accent/20'}`}
                    >
                      <button
                        onClick={() => toggleAccordion(id)}
                        className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left focus:outline-none"
                      >
                        <span className="text-lg font-semibold text-foreground pr-8">{faq.q}</span>
                        <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center smooth-transition ${isOpen ? 'bg-accent text-white rotate-180' : 'bg-secondary text-muted-foreground'}`}>
                          <ChevronDown size={18} />
                        </div>
                      </button>
                      
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                          >
                            <div className="px-6 pb-6 pt-2">
                              <div className="w-full h-px bg-border mb-4" />
                              <p className="text-muted-foreground leading-relaxed">
                                {faq.a}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-20 relative overflow-hidden bg-gradient-to-br from-secondary/80 to-secondary p-8 sm:p-10 rounded-3xl border border-border text-center flex flex-col items-center"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-[80px]" />
          
          <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 relative z-10">
            <MessageCircle size={28} className="text-accent" />
          </div>
          
          <h3 className="text-2xl sm:text-3xl font-bold mb-4 relative z-10">Still have questions?</h3>
          <p className="text-muted-foreground mb-8 max-w-lg relative z-10">
            Can't find the answer you're looking for? Chat with our friendly team directly on WhatsApp for an immediate response.
          </p>
          
          <a 
            href="https://wa.me/919102070777" 
            target="_blank"
            rel="noreferrer"
            className="relative z-10 inline-flex items-center gap-2 px-8 py-3.5 bg-[#25D366] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#25D366]/30 smooth-transition hover:-translate-y-0.5"
          >
            <MessageCircle size={20} />
            Chat on WhatsApp
          </a>
        </motion.div>
      </div>
    </div>
  )
}
