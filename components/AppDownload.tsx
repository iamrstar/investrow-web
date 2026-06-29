'use client'

import { motion } from 'framer-motion'
import { Smartphone, Apple, PlayCircle } from 'lucide-react'

export default function AppDownload() {
  return (
    <section id="app-download" className="section-padding relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/[0.03] rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-2xl relative">
          
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-bl-full blur-3xl pointer-events-none" />

          <div className="grid lg:grid-cols-2 gap-12 items-center p-8 sm:p-12 lg:p-16">
            
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-bold mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                </span>
                Coming Soon
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Do More With <br />
                <span className="text-gradient-blue">Investrow App</span>
              </h2>
              
              <p className="text-lg text-muted-foreground mb-8" style={{ fontFamily: 'var(--font-sans)' }}>
                The financial world is moving at a fast pace. We are building the Investrow mobile app to bring our premium financial services directly to your fingertips. Stay ahead of the curve.
              </p>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-3 px-6 py-3 rounded-xl bg-secondary/50 border border-border opacity-60 grayscale cursor-not-allowed select-none">
                  <PlayCircle size={24} />
                  <div className="text-left">
                    <div className="text-[10px] uppercase tracking-wider font-semibold opacity-80">Get it on</div>
                    <div className="text-sm font-bold">Google Play</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 px-6 py-3 rounded-xl bg-secondary/50 border border-border opacity-60 grayscale cursor-not-allowed select-none">
                  <Apple size={24} />
                  <div className="text-left">
                    <div className="text-[10px] uppercase tracking-wider font-semibold opacity-80">Download on the</div>
                    <div className="text-sm font-bold">App Store</div>
                  </div>
                </div>
              </div>
              
              <p className="mt-4 text-sm text-muted-foreground italic">
                * We are working hard to launch our mobile application. Stay tuned!
              </p>
            </motion.div>

            {/* Right Content - Phone Mockup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative flex justify-center lg:justify-end"
            >
              <div className="relative w-[280px] h-[580px] bg-background border-[8px] border-secondary-foreground/10 rounded-[3rem] shadow-2xl overflow-hidden flex flex-col">
                {/* Notch */}
                <div className="absolute top-0 inset-x-0 h-6 bg-secondary-foreground/10 rounded-b-2xl w-32 mx-auto z-20" />
                
                {/* Screen Content placeholder */}
                <div className="flex-1 bg-gradient-to-b from-accent/5 to-background p-6 flex flex-col relative">
                  
                  {/* Decorative UI elements */}
                  <div className="w-full flex justify-between items-center mt-6 mb-8">
                    <div className="w-10 h-10 rounded-full bg-secondary animate-pulse" />
                    <div className="w-8 h-8 rounded-full bg-secondary animate-pulse" />
                  </div>

                  <div className="w-3/4 h-8 rounded-lg bg-secondary mb-4 animate-pulse" />
                  <div className="w-1/2 h-4 rounded-lg bg-secondary mb-8 animate-pulse" />

                  <div className="w-full h-40 rounded-2xl bg-gradient-to-tr from-accent/20 to-accent/5 border border-accent/10 mb-6 flex items-center justify-center relative overflow-hidden">
                    <Smartphone size={48} className="text-accent/30" />
                    <div className="absolute inset-0 bg-background/20 backdrop-blur-sm flex items-center justify-center">
                       <span className="text-xl font-bold font-heading text-foreground/80 tracking-widest drop-shadow-md">COMING SOON</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="w-full h-16 rounded-xl bg-secondary animate-pulse" />
                    <div className="w-full h-16 rounded-xl bg-secondary animate-pulse" />
                  </div>
                </div>
              </div>
              
              {/* Floating element */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-6 bg-card border border-border p-4 rounded-2xl shadow-xl backdrop-blur-md hidden sm:block"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">Development</p>
                    <p className="text-xs text-muted-foreground">In Progress</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
            
          </div>
        </div>
      </div>
    </section>
  )
}
