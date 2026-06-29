'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useMemo } from 'react'
import { Calculator, TrendingUp } from 'lucide-react'

/* ─── Doughnut Chart (SVG) ─── */
function DoughnutChart({
  invested,
  returns,
  size = 180,
}: {
  invested: number
  returns: number
  size?: number
}) {
  const total = invested + returns
  const investedPct = total > 0 ? invested / total : 0.5
  const returnsPct = total > 0 ? returns / total : 0.5

  const r = (size - 24) / 2
  const cx = size / 2
  const cy = size / 2
  const circumference = 2 * Math.PI * r

  const investedDash = circumference * investedPct
  const returnsDash = circumference * returnsPct

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Invested arc */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth="14"
          strokeDasharray={`${investedDash} ${circumference - investedDash}`}
          strokeDashoffset="0"
          strokeLinecap="round"
          className="text-muted/60"
        />
        {/* Returns arc */}
        <motion.circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="url(#blueGrad)"
          strokeWidth="14"
          strokeDasharray={`${returnsDash} ${circumference - returnsDash}`}
          strokeDashoffset={`${-investedDash}`}
          strokeLinecap="round"
          initial={{ strokeDasharray: `0 ${circumference}` }}
          animate={{ strokeDasharray: `${returnsDash} ${circumference - returnsDash}` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
        <defs>
          <linearGradient id="blueGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
        </defs>
      </svg>
      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Total</p>
        <p className="text-base sm:text-lg font-bold text-foreground whitespace-nowrap" style={{ fontFamily: 'var(--font-sans)' }}>
          ₹{formatCompact(total)}
        </p>
      </div>
    </div>
  )
}

function formatCompact(num: number): string {
  if (num >= 10000000) return `${(num / 10000000).toFixed(1)}Cr`
  if (num >= 100000) return `${(num / 100000).toFixed(1)}L`
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
  return num.toLocaleString('en-IN')
}

function formatINR(num: number): string {
  return `₹${Math.round(num).toLocaleString('en-IN')}`
}

/* ─── SIP Calculator Panel ─── */
function SIPCalculator() {
  const [amount, setAmount] = useState(10000)
  const [years, setYears] = useState(10)
  const [rate, setRate] = useState(12)

  const result = useMemo(() => {
    const months = years * 12
    const monthlyRate = rate / 100 / 12
    const futureValue = amount * (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate))
    const totalInvested = amount * months
    const totalReturns = futureValue - totalInvested
    return { futureValue, totalInvested, totalReturns }
  }, [amount, years, rate])

  return (
    <div className="space-y-8">
      {/* Inputs */}
      <div className="space-y-6">
        <SliderInput
          label="Monthly Investment"
          value={amount}
          onChange={setAmount}
          min={1000}
          max={100000}
          step={1000}
          format={(v) => formatINR(v)}
        />
        <SliderInput
          label="Time Period"
          value={years}
          onChange={setYears}
          min={1}
          max={40}
          step={1}
          format={(v) => `${v} years`}
        />
        <SliderInput
          label="Expected Return"
          value={rate}
          onChange={setRate}
          min={5}
          max={30}
          step={0.5}
          format={(v) => `${v}% p.a.`}
        />
      </div>

      {/* Results */}
      <div className="flex flex-col sm:flex-row items-center gap-8">
        <DoughnutChart invested={result.totalInvested} returns={result.totalReturns} />

        <div className="flex-1 space-y-4 w-full">
          <ResultRow label="Invested Amount" value={formatINR(result.totalInvested)} color="text-muted-foreground" dot="bg-muted" />
          <ResultRow label="Est. Returns" value={formatINR(result.totalReturns)} color="text-accent" dot="bg-accent" />
          <div className="h-px bg-border" />
          <ResultRow label="Total Wealth" value={formatINR(result.futureValue)} color="text-foreground" dot="bg-emerald-500" large />
        </div>
      </div>
    </div>
  )
}

/* ─── Lumpsum Calculator Panel ─── */
function LumpsumCalculator() {
  const [amount, setAmount] = useState(500000)
  const [years, setYears] = useState(10)
  const [rate, setRate] = useState(12)

  const result = useMemo(() => {
    const futureValue = amount * Math.pow(1 + rate / 100, years)
    const totalReturns = futureValue - amount
    return { futureValue, totalInvested: amount, totalReturns }
  }, [amount, years, rate])

  return (
    <div className="space-y-8">
      {/* Inputs */}
      <div className="space-y-6">
        <SliderInput
          label="Investment Amount"
          value={amount}
          onChange={setAmount}
          min={10000}
          max={10000000}
          step={10000}
          format={(v) => formatINR(v)}
        />
        <SliderInput
          label="Time Period"
          value={years}
          onChange={setYears}
          min={1}
          max={40}
          step={1}
          format={(v) => `${v} years`}
        />
        <SliderInput
          label="Expected Return"
          value={rate}
          onChange={setRate}
          min={5}
          max={30}
          step={0.5}
          format={(v) => `${v}% p.a.`}
        />
      </div>

      {/* Results */}
      <div className="flex flex-col sm:flex-row items-center gap-8">
        <DoughnutChart invested={result.totalInvested} returns={result.totalReturns} />

        <div className="flex-1 space-y-4 w-full">
          <ResultRow label="Invested Amount" value={formatINR(result.totalInvested)} color="text-muted-foreground" dot="bg-muted" />
          <ResultRow label="Est. Returns" value={formatINR(result.totalReturns)} color="text-accent" dot="bg-accent" />
          <div className="h-px bg-border" />
          <ResultRow label="Total Wealth" value={formatINR(result.futureValue)} color="text-foreground" dot="bg-emerald-500" large />
        </div>
      </div>
    </div>
  )
}

/* ─── Slider Input ─── */
function SliderInput({
  label,
  value,
  onChange,
  min,
  max,
  step,
  format,
}: {
  label: string
  value: number
  onChange: (v: number) => void
  min: number
  max: number
  step: number
  format: (v: number) => string
}) {
  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <label className="text-sm font-medium text-muted-foreground">{label}</label>
        <span className="text-sm font-bold text-foreground tabular-nums" style={{ fontFamily: 'var(--font-sans)' }}>
          {format(value)}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
      />
    </div>
  )
}

/* ─── Result Row ─── */
function ResultRow({
  label,
  value,
  color,
  dot,
  large,
}: {
  label: string
  value: string
  color: string
  dot: string
  large?: boolean
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className={`w-2.5 h-2.5 rounded-full ${dot}`} />
        <span className="text-sm text-muted-foreground">{label}</span>
      </div>
      <motion.span
        key={value}
        initial={{ opacity: 0.5, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`font-bold tabular-nums ${color} ${large ? 'text-lg' : 'text-sm'}`}
        style={{ fontFamily: 'var(--font-sans)' }}
      >
        {value}
      </motion.span>
    </div>
  )
}

/* ─── Main Section ─── */
export default function Calculators() {
  const [activeTab, setActiveTab] = useState<'sip' | 'lumpsum'>('sip')

  return (
    <section id="calculators" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 right-10 w-80 h-80 bg-accent/[0.03] rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-10 w-80 h-80 bg-accent/[0.02] rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">Plan Your Future</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Investment <span className="text-gradient-blue">Calculators</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto" style={{ fontFamily: 'var(--font-sans)' }}>
            Calculate your potential investment returns and plan your financial future.
          </p>
        </motion.div>

        {/* Calculator Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="p-6 sm:p-10 rounded-2xl bg-card border border-border shadow-card"
        >
          {/* Tab Switcher */}
          <div className="relative flex bg-secondary/70 rounded-xl p-1 mb-10">
            <button
              onClick={() => setActiveTab('sip')}
              className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold smooth-transition ${
                activeTab === 'sip' ? 'text-foreground' : 'text-muted-foreground'
              }`}
            >
              <Calculator size={16} />
              SIP Calculator
            </button>
            <button
              onClick={() => setActiveTab('lumpsum')}
              className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold smooth-transition ${
                activeTab === 'lumpsum' ? 'text-foreground' : 'text-muted-foreground'
              }`}
            >
              <TrendingUp size={16} />
              Lumpsum Calculator
            </button>

            {/* Animated tab indicator */}
            <motion.div
              layoutId="calcTab"
              className="absolute top-1 bottom-1 rounded-lg bg-card border border-border shadow-sm"
              style={{ width: 'calc(50% - 4px)' }}
              animate={{ left: activeTab === 'sip' ? 4 : 'calc(50% + 0px)' }}
              transition={{ type: 'spring', stiffness: 400, damping: 35 }}
            />
          </div>

          {/* Calculator content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'sip' ? <SIPCalculator /> : <LumpsumCalculator />}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
