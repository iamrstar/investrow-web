'use client'

import { motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

/* ─── Social SVG Icons (lucide-react removed brand icons) ─── */
const LinkedinIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

const TwitterIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const InstagramIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
)

const YoutubeIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <path d="m10 15 5-3-5-3z" />
  </svg>
)

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const footerLinks = [
    {
      title: 'Quick Links',
      links: [
        { name: 'Home', href: '#home' },
        { name: 'About Us', href: '#about' },
        { name: 'Services', href: '#services' },
        { name: 'Calculators', href: '#calculators' },
        { name: 'Contact', href: '#contact' },
      ],
    },
    {
      title: 'Services',
      links: [
        { name: 'Mutual Fund Distribution', href: '#services' },
        { name: 'Portfolio Management', href: '#services' },
        { name: 'Financial Planning', href: '#services' },
        { name: 'Wealth Management', href: '#services' },
        { name: 'Risk Assessment', href: '#services' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'Blog', href: '/blog' },
        { name: 'FAQ', href: '/faq' },
        { name: 'Privacy Policy', href: '/privacy-policy' },
      ],
    },
    {
      title: 'Contact',
      links: [
        { name: '+91 9102070777 | +91 9102050555', href: 'tel:+919102070777' },
        { name: 'info@investrow.in', href: 'mailto:info@investrow.in' },
        { name: 'Head Office: Dhanbad, Jharkhand - 828110', href: '#contact' },
        { name: 'Branch: Jharia, Dhanbad - 828201', href: '#contact' },
        { name: 'Mon – Sat, 9:30–6:30', href: '#contact' },
      ],
    },
  ]

  const socialLinks = [
    { icon: LinkedinIcon, href: '#', label: 'LinkedIn' },
    { icon: TwitterIcon, href: '#', label: 'Twitter / X' },
    { icon: InstagramIcon, href: '#', label: 'Instagram' },
    { icon: YoutubeIcon, href: '#', label: 'YouTube' },
  ]

  return (
    <footer className="relative overflow-hidden bg-secondary/50 dark:bg-secondary/30 border-t border-border">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-accent/[0.02] rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10">
        {/* Main Footer */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
            {/* Brand + Newsletter */}
            <div className="sm:col-span-2 space-y-6">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#60A5FA] to-[#2563EB] flex items-center justify-center shadow-lg shadow-[#3B82F6]/10">
                  <span className="text-white font-bold text-lg">I</span>
                </div>
                <div>
                  <span className="text-xl font-bold text-foreground tracking-tight">
                    Invest<span className="text-gradient-blue">row</span>
                  </span>
                </div>
              </Link>

              <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
                Your trusted partner for professional financial advisory, mutual fund distribution,
                and wealth management services. AMFI Registered Distributor.
              </p>

              {/* Newsletter */}
              <div>
                <p className="text-sm font-semibold text-foreground mb-3">Stay Updated</p>
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-1 px-4 py-2.5 rounded-xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground/50 smooth-transition min-w-0"
                  />
                  <button
                    type="submit"
                    disabled={subscribed}
                    className="px-5 py-2.5 bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white rounded-xl text-sm font-semibold smooth-transition hover:scale-[1.02] active:scale-[0.98] flex-shrink-0 disabled:opacity-70"
                  >
                    {subscribed ? '✓' : 'Subscribe'}
                  </button>
                </form>
              </div>
            </div>

            {/* Link sections */}
            {footerLinks.map((section, index) => (
              <div key={index} className="space-y-4">
                <h4 className="text-sm font-semibold text-foreground">{section.title}</h4>
                <ul className="space-y-2.5">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-accent smooth-transition"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8" />

          {/* Legal disclaimer */}
          <div className="mb-8 p-4 rounded-xl bg-card/50 border border-border/50">
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong className="text-foreground/70">Disclaimer:</strong> Mutual Fund investments are subject to market risks. Read all scheme related documents carefully before investing. Past performance is not indicative of future results. Investrow is an AMFI Registered Mutual Fund Distributor. The information provided is for informational purposes only and does not constitute financial advice. Please consult your financial advisor before making any investment decisions.
            </p>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <p className="text-sm text-muted-foreground text-center sm:text-left">
              &copy; {currentYear} Investrow Financial Advisory. All rights reserved.
            </p>

            {/* Social + Back to top */}
            <div className="flex items-center gap-4">
              {/* Social links */}
              <div className="flex items-center gap-2">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={index}
                      href={social.href}
                      aria-label={social.label}
                      className="w-9 h-9 rounded-lg bg-card border border-border hover:border-accent/30 hover:bg-accent/10 flex items-center justify-center smooth-transition group"
                    >
                    <span className="text-muted-foreground group-hover:text-accent smooth-transition">
                        <Icon size={16} />
                      </span>
                    </a>
                  )
                })}
              </div>

              {/* Divider */}
              <div className="w-px h-6 bg-border" />

              {/* Back to top */}
              <button
                onClick={scrollToTop}
                className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 hover:bg-accent/20 flex items-center justify-center smooth-transition group"
                aria-label="Back to top"
              >
                <ArrowUp size={16} className="text-accent" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
