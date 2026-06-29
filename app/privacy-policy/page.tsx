'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, Lock, Eye, FileText } from 'lucide-react'

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-background relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
            <ShieldCheck size={32} className="text-accent" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Privacy <span className="text-gradient-blue">Policy</span></h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your trust is our top priority. Learn how we collect, protect, and use your data to provide exceptional financial services.
          </p>
          <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-sm font-medium text-foreground border border-border">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-card border border-border rounded-3xl p-8 sm:p-12 shadow-sm"
        >
          <div className="prose prose-lg dark:prose-invert max-w-none space-y-12">
            
            {/* Section 1 */}
            <section className="relative">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <FileText size={20} className="text-accent" />
                </div>
                <h2 className="text-2xl font-bold text-foreground m-0">1. Introduction</h2>
              </div>
              <div className="pl-14 text-muted-foreground leading-relaxed space-y-4">
                <p>
                  At Investrow Financial Advisory, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our financial distribution services.
                </p>
                <p>
                  By using our services, you agree to the collection and use of information in accordance with this policy. We will not use or share your information with anyone except as described in this Privacy Policy.
                </p>
              </div>
            </section>

            <hr className="border-border/50" />

            {/* Section 2 */}
            <section className="relative">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Eye size={20} className="text-accent" />
                </div>
                <h2 className="text-2xl font-bold text-foreground m-0">2. Information We Collect</h2>
              </div>
              <div className="pl-14 text-muted-foreground leading-relaxed space-y-4">
                <p>We collect information to provide better services to all our users. The types of personal information we collect include:</p>
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <span className="text-accent mt-1">•</span>
                    <div>
                      <strong className="text-foreground block mb-1">Personal & Financial Data:</strong> 
                      Information such as your name, email address, phone number, PAN card details, bank account details, and financial goals that you voluntarily provide during the KYC or consultation process.
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent mt-1">•</span>
                    <div>
                      <strong className="text-foreground block mb-1">Usage Data:</strong> 
                      Information on how you access and use the website, including your IP address, browser type, and interaction with our calculators.
                    </div>
                  </li>
                </ul>
              </div>
            </section>

            <hr className="border-border/50" />

            {/* Section 3 */}
            <section className="relative">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Lock size={20} className="text-accent" />
                </div>
                <h2 className="text-2xl font-bold text-foreground m-0">3. How We Protect Your Data</h2>
              </div>
              <div className="pl-14 text-muted-foreground leading-relaxed space-y-4">
                <p>
                  We implement a variety of security measures to maintain the safety of your personal information. All sensitive/credit information you supply is transmitted via Secure Socket Layer (SSL) technology and then encrypted into our databases.
                </p>
                <div className="bg-secondary/50 border border-border rounded-xl p-6 mt-6">
                  <h4 className="text-foreground font-semibold mb-2">Our Security Promise</h4>
                  <p className="text-sm">We strictly comply with SEBI and AMFI regulations regarding client data confidentiality. Your financial data is never sold to third-party marketing agencies.</p>
                </div>
              </div>
            </section>

            <hr className="border-border/50" />

            {/* Section 4 */}
            <section className="relative">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck size={20} className="text-accent" />
                </div>
                <h2 className="text-2xl font-bold text-foreground m-0">4. Contact Us</h2>
              </div>
              <div className="pl-14 text-muted-foreground leading-relaxed">
                <p className="mb-4">
                  If you have questions or concerns about this Privacy Policy or how we handle your data, please contact our Grievance Officer at:
                </p>
                <div className="bg-secondary/30 rounded-xl p-6 border border-border">
                  <p className="mb-2"><strong className="text-foreground">Email:</strong> <a href="mailto:info@investrow.in" className="text-accent hover:underline">info@investrow.in</a></p>
                  <p><strong className="text-foreground">Phone:</strong> +91 9102070777</p>
                </div>
              </div>
            </section>

          </div>
        </motion.div>
      </div>
    </div>
  )
}
