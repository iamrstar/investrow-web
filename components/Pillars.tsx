'use client'

import { motion } from 'framer-motion'

const pillars = [
  { letter: 'I', text: 'Integrity' },
  { letter: 'N', text: 'Nurturing Wealth' },
  { letter: 'V', text: 'Visionary Planning' },
  { letter: 'E', text: 'Expertise' },
  { letter: 'S', text: 'Smart Investing' },
  { letter: 'T', text: 'Trust' },
  { letter: 'R', text: 'Risk Management' },
  { letter: 'O', text: 'Opportunity' },
  { letter: 'W', text: 'Wealth Creation' },
]

export default function Pillars() {
  return (
    <section id="pillars" className="section-padding relative overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="mb-10">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                Pillars of <span className="text-gradient-blue">Investrow</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                The core values that define our approach to building and protecting your wealth.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pillars.map((pillar, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-secondary/50 smooth-transition group border border-transparent hover:border-border"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent text-white flex items-center justify-center font-bold text-xl shadow-md group-hover:scale-110 smooth-transition">
                    {pillar.letter}
                  </div>
                  <span className="text-foreground font-semibold text-lg">{pillar.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative hidden lg:block"
          >
            {/* Decorative background for the image placeholder */}
            <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-transparent rounded-3xl blur-2xl" />
            
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-border/50 bg-card shadow-2xl flex flex-col items-center justify-center p-8">
               <div className="w-full h-full rounded-2xl bg-secondary/30 border border-border flex items-center justify-center flex-col gap-6 p-8 text-center relative overflow-hidden">
                 <div className="absolute -top-32 -right-32 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
                 <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-[#8B5CF6]/10 rounded-full blur-3xl" />
                 
                 <div className="w-24 h-24 rounded-2xl bg-accent/10 text-accent flex items-center justify-center border border-accent/20 mb-4">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                 </div>
                 <h3 className="text-2xl font-bold font-heading text-foreground">Your Wealth, Our Priority</h3>
                 <p className="text-muted-foreground">Every pillar supports the strong foundation we build for your financial future.</p>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
