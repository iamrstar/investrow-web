'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Moon, Sun, ArrowRight, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setIsDark(savedTheme ? savedTheme === 'dark' : prefersDark)

    const handleScroll = () => {
      setScrolled(window.scrollY > 20)

      // Only detect active section on homepage
      if (window.location.pathname === '/') {
        const sections = ['home', 'about', 'services', 'contact']
        for (const id of sections.reverse()) {
          const el = document.getElementById(id)
          if (el) {
            const rect = el.getBoundingClientRect()
            if (rect.top <= 120) {
              setActiveSection(id)
              break
            }
          }
        }
      } else {
        setActiveSection('')
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false)
    setActiveDropdown(null)
  }, [pathname])

  const toggleDarkMode = () => {
    const newIsDark = !isDark
    setIsDark(newIsDark)
    localStorage.setItem('theme', newIsDark ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', newIsDark)
  }

  const navItems = [
    { name: 'Home', href: '/#home' },
    { name: 'About', href: '/#about' },
    { name: 'Services', href: '/#services' },
    {
      name: 'Calculators',
      dropdown: [
        { name: 'SIP Return Calculator', href: '/calculators/sip-return' },
        { name: 'Retirement Planning Calculator', href: '/calculators/retirement-planning' },
        { name: 'Asset Allocation Calculator', href: '/calculators/asset-allocation' },
        { name: 'EMI Calculator', href: '/calculators/emi' },
        { name: 'PPF Calculator', href: '/calculators/ppf' },
        { name: 'EPF Calculator', href: '/calculators/epf' },
        { name: 'Goal Setting Calculator', href: '/calculators/goal-setting' },
        { name: 'Children Education Planner', href: '/calculators/children-education' },
        { name: 'SIP Step Up Calculator', href: '/calculators/sip-step-up' },
      ],
    },
    {
      name: 'Goals',
      dropdown: [
        { name: 'Dream Home', href: '/goals/dream-home' },
        { name: 'Wealth Creation', href: '/goals/wealth-creation' },
        { name: 'Retirement', href: '/goals/retirement' },
        { name: "Child's Education", href: '/goals/child-education' },
        { name: "Child's Wedding", href: '/goals/child-wedding' },
      ],
    },
    {
      name: 'Company',
      dropdown: [
        { name: 'Blog', href: '/blog' },
        { name: 'FAQ', href: '/faq' },
        { name: 'Privacy Policy', href: '/privacy-policy' },
      ],
    },
    { name: 'Contact', href: '/#contact' },
  ]

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled || pathname !== '/'
            ? 'bg-background/90 backdrop-blur-xl border-b border-border shadow-sm'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/#home" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#60A5FA] to-[#2563EB] flex items-center justify-center shadow-lg shadow-[#3B82F6]/20">
                  <span className="text-white font-bold text-lg tracking-tight">I</span>
                </div>
                <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-[#60A5FA] to-[#2563EB] opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-500" />
              </div>
              <div className="hidden sm:block">
                <span className="text-xl font-bold text-foreground tracking-tight">
                  Invest<span className="text-gradient-blue">row</span>
                </span>
                <span className="block text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-medium -mt-0.5">
                  Financial Advisory
                </span>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = pathname === '/' ? activeSection === item.href?.slice(2) : false

                if (item.dropdown) {
                  return (
                    <div
                      key={item.name}
                      className="relative group"
                      onMouseEnter={() => setActiveDropdown(item.name)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg text-foreground/70 hover:text-foreground smooth-transition">
                        {item.name}
                        <ChevronDown size={14} className="opacity-70 group-hover:rotate-180 transition-transform duration-300" />
                      </button>

                      <AnimatePresence>
                        {activeDropdown === item.name && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 mt-2 w-64 p-2 bg-card border border-border rounded-xl shadow-xl backdrop-blur-xl z-50"
                          >
                            {item.dropdown.map((dropItem) => (
                              <Link
                                key={dropItem.name}
                                href={dropItem.href}
                                className="block px-4 py-2.5 text-sm font-medium text-foreground/80 hover:text-accent hover:bg-accent/10 rounded-lg smooth-transition"
                              >
                                {dropItem.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                }

                return (
                  <Link
                    key={item.name}
                    href={item.href!}
                    className={`relative px-4 py-2 text-sm font-medium rounded-lg smooth-transition ${
                      isActive
                        ? 'text-accent'
                        : 'text-foreground/70 hover:text-foreground'
                    }`}
                  >
                    {item.name}
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </Link>
                )
              })}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {mounted && (
                <motion.button
                  onClick={toggleDarkMode}
                  className="relative p-2.5 rounded-xl bg-secondary/60 hover:bg-secondary smooth-transition overflow-hidden"
                  whileTap={{ scale: 0.9 }}
                  aria-label="Toggle dark mode"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={isDark ? 'sun' : 'moon'}
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 20, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {isDark ? (
                        <Sun size={18} className="text-amber-400" />
                      ) : (
                        <Moon size={18} className="text-slate-600" />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </motion.button>
              )}

              {/* CTA Button — Desktop */}
              <Link
                href="/#contact"
                className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white rounded-xl text-sm font-semibold shadow-lg shadow-[#3B82F6]/20 hover:shadow-[#3B82F6]/40 smooth-transition hover:scale-[1.02] active:scale-[0.98]"
              >
                Book Consultation
                <ArrowRight size={16} />
              </Link>

              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2.5 rounded-xl bg-secondary/60 hover:bg-secondary smooth-transition"
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={isOpen ? 'close' : 'menu'}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {isOpen ? <X size={22} /> : <Menu size={22} />}
                  </motion.div>
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu — Full Screen Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background/98 backdrop-blur-2xl lg:hidden overflow-y-auto"
          >
            <div className="flex flex-col h-full pt-24 pb-8 px-8">
              {navItems.map((item, index) => {
                if (item.dropdown) {
                  const isDropdownOpen = activeDropdown === item.name
                  return (
                    <div key={item.name} className="py-2 border-b border-border/50">
                      <button 
                        onClick={() => setActiveDropdown(isDropdownOpen ? null : item.name)}
                        className="w-full flex items-center justify-between text-xl font-semibold text-foreground py-3" 
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        {item.name}
                        <ChevronDown size={20} className={`smooth-transition ${isDropdownOpen ? 'rotate-180 text-accent' : 'text-muted-foreground'}`} />
                      </button>
                      <AnimatePresence>
                        {isDropdownOpen && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="flex flex-col gap-2 pl-4 mb-3 border-l-2 border-accent/20">
                              {item.dropdown.map((dropItem) => (
                                <Link
                                  key={dropItem.name}
                                  href={dropItem.href}
                                  className="text-foreground/70 hover:text-accent py-2.5 text-base font-medium block"
                                >
                                  {dropItem.name}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                }

                return (
                  <Link
                    key={item.name}
                    href={item.href!}
                    className="text-xl font-semibold py-4 border-b border-border/50 text-foreground/80 hover:text-foreground"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {item.name}
                  </Link>
                )
              })}
              <Link
                href="/#contact"
                className="mt-8 flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white rounded-xl text-lg font-semibold"
              >
                Book Consultation
                <ArrowRight size={20} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
