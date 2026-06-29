'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Play, TrendingUp, Shield, Users } from 'lucide-react'

/* ─── Animated Mini Chart (SVG) ─── */
function MiniChart() {
  const points = [40, 55, 35, 60, 45, 70, 50, 80, 65, 90, 75, 95]
  const width = 200
  const height = 80
  const stepX = width / (points.length - 1)

  const pathD = points
    .map((y, i) => {
      const x = i * stepX
      const cy = height - (y / 100) * height
      return `${i === 0 ? 'M' : 'L'} ${x} ${cy}`
    })
    .join(' ')

  const areaD = `${pathD} L ${width} ${height} L 0 ${height} Z`

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full" fill="none">
      <defs>
        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
      </defs>
      <motion.path
        d={areaD}
        fill="url(#chartGrad)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.8 }}
      />
      <motion.path
        d={pathD}
        stroke="url(#lineGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, delay: 0.5, ease: 'easeOut' }}
      />
      <motion.circle
        cx={width}
        cy={height - (points[points.length - 1] / 100) * height}
        r="4"
        fill="#3B82F6"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2.5, type: 'spring' }}
      />
      <motion.circle
        cx={width}
        cy={height - (points[points.length - 1] / 100) * height}
        r="8"
        fill="#3B82F6"
        opacity="0.3"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.5, 1] }}
        transition={{ delay: 2.5, duration: 0.6 }}
      />
    </svg>
  )
}

/* ─── Dashboard Stat Card ─── */
function DashboardCard({
  label,
  value,
  change,
  delay,
  icon: Icon,
}: {
  label: string
  value: string
  change: string
  delay: number
  icon: React.ElementType
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="p-4 rounded-xl bg-card/80 border border-border/60 shadow-card group hover:shadow-card-hover smooth-transition"
    >
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
          <Icon size={18} className="text-accent" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground font-medium">{label}</p>
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-foreground">{value}</span>
            <span className="text-xs font-semibold text-emerald-500">{change}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Hero Section ─── */
export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    },
  }

  return (
    <section id="home" className="relative min-h-screen pt-28 pb-16 overflow-hidden">
      {/* Background — Mesh gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-accent/[0.04] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/[0.03] rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/[0.02] rounded-full blur-[150px]" />
        {/* Dot grid */}
        <div className="absolute inset-0 dot-grid opacity-40 dark:opacity-20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center min-h-[calc(100vh-7rem)]">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-16 items-center w-full"
        >
          {/* Left Content */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="space-y-6">
              {/* Badge */}
              <motion.div variants={itemVariants} className="inline-block">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-semibold">
                  <Shield size={14} />
                  AMFI Registered Distributor
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                </span>
              </motion.div>

              {/* Heading */}
              <motion.h1
                variants={itemVariants}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight"
              >
                Your Wealth,
                <br />
                <span className="text-gradient-blue">Our Priority</span>
              </motion.h1>

              {/* Subtext */}
              <motion.p
                variants={itemVariants}
                className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                Expert financial advisory, mutual fund distribution, and wealth management
                — built on 15+ years of trust and ₹50Cr+ in assets managed.
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white rounded-xl font-semibold shadow-lg shadow-[#3B82F6]/20 hover:shadow-[#3B82F6]/40 smooth-transition hover:scale-[1.02] active:scale-[0.98] text-sm sm:text-base"
              >
                Start Investing
                <ArrowRight size={18} />
              </a>

              <a
                href="#about"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-secondary/70 border border-border text-foreground rounded-xl font-semibold smooth-transition hover:bg-secondary hover:scale-[1.02] active:scale-[0.98] text-sm sm:text-base"
              >
                <Play size={16} className="text-accent" />
                Learn How It Works
              </a>
            </motion.div>

            {/* Trust strip */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-6 pt-4"
            >
              <div className="flex -space-x-2">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full border-2 border-background bg-gradient-to-br from-accent/40 to-accent/20 flex items-center justify-center text-[10px] font-bold text-accent"
                  >
                    {['AK', 'RP', 'SM', 'VD'][i]}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Trusted by <span className="text-foreground font-semibold">5,000+</span> investors
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right — Dashboard Mockup */}
          <motion.div
            variants={itemVariants}
            className="relative mt-12 lg:mt-0"
          >
            <div className="relative">
              {/* Main dashboard card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative p-6 rounded-2xl bg-card border border-border shadow-card-hover overflow-hidden"
              >
                {/* Dashboard header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Portfolio Overview</p>
                    <p className="text-2xl font-bold text-foreground mt-1">₹24,58,300</p>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-500 text-sm font-semibold">
                    <TrendingUp size={14} />
                    +18.4%
                  </div>
                </div>

                {/* Chart */}
                <div className="h-24 mb-6">
                  <MiniChart />
                </div>

                {/* Stat cards grid */}
                <div className="grid grid-cols-2 gap-3">
                  <DashboardCard icon={TrendingUp} label="This Month" value="+₹1.2L" change="+8.2%" delay={1.2} />
                  <DashboardCard icon={Shield} label="Total Invested" value="₹15L" change="Active" delay={1.4} />
                  <DashboardCard icon={Users} label="SIPs Active" value="12" change="Monthly" delay={1.6} />
                  <DashboardCard icon={TrendingUp} label="Returns" value="₹9.5L" change="+63%" delay={1.8} />
                </div>
              </motion.div>

              {/* Decorative floating elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -right-4 w-20 h-20 rounded-2xl bg-accent/10 border border-accent/20 blur-sm"
              />
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 blur-sm"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1.5"
        >
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4], y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-2 rounded-full bg-accent"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
