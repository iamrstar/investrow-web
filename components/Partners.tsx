'use client'

import { motion } from 'framer-motion'

export default function Partners() {
  return (
    <section id="partners" className="py-20 relative overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">Our Partners</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            Some of the Biggest & Trusted AMCs we are associated with
          </h2>
        </motion.div>
      </div>

      <div className="relative w-full overflow-hidden flex flex-col items-center justify-center h-64 md:h-80 lg:h-96">
        {/* Gradient overlays for smooth fading edges */}
        <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-background to-transparent z-10" />
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-background to-transparent z-10" />
        
        {/* Infinite vertical scroll container */}
        <div className="flex flex-col items-center gap-8 animate-marquee-vertical">
          {/* We duplicate the image to create a seamless scrolling effect */}
          <img 
            src="https://www.investrow.in/web-assets/img/client_logos_new.png" 
            alt="Trusted AMCs" 
            className="w-auto h-[800px] object-contain opacity-80"
          />
          <img 
            src="https://www.investrow.in/web-assets/img/client_logos_new.png" 
            alt="Trusted AMCs" 
            className="w-auto h-[800px] object-contain opacity-80"
          />
        </div>
      </div>
    </section>
  )
}
