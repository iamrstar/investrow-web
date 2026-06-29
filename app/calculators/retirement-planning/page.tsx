'use client'

import React, { useState, useEffect } from 'react'
import CalculatorLayout from '@/components/ui/CalculatorLayout'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

export default function RetirementPlanningCalculator() {
  const [target, setTarget] = useState(5000000)
  const [age, setAge] = useState(30)
  const [retireAge, setRetireAge] = useState(60)
  const [inflation, setInflation] = useState(5)
  const [expectedReturn, setExpectedReturn] = useState(12.5)
  const [currentSavings, setCurrentSavings] = useState(100)

  const [results, setResults] = useState({
    monthlySip: 0,
    totalGrowth: 0,
    futureTarget: 0,
    yearsToInvest: 0,
    invested: 0,
  })

  useEffect(() => {
    // Calculation Logic
    const years = retireAge - age
    const months = years * 12

    const inflationRate = inflation / 100
    const returnRate = expectedReturn / 100

    const futureTargetAmount = target * Math.pow(1 + inflationRate, years)

    const r = returnRate / 12
    let sipAmount = 0
    let totalInvested = 0
    let growthAmount = 0

    if (months > 0 && r > 0) {
      sipAmount =
        (futureTargetAmount - currentSavings * Math.pow(1 + r, months)) /
        (((Math.pow(1 + r, months) - 1) / r) * (1 + r))

      // If SIP is negative, it means current savings are enough
      if (sipAmount < 0) sipAmount = 0

      totalInvested = sipAmount * months + currentSavings
      growthAmount = futureTargetAmount - totalInvested
    } else if (months > 0) {
        sipAmount = (futureTargetAmount - currentSavings) / months
        totalInvested = sipAmount * months + currentSavings
        growthAmount = 0
    }

    setResults({
      monthlySip: Math.max(0, Math.round(sipAmount)),
      totalGrowth: Math.max(0, Math.round(growthAmount)),
      futureTarget: Math.round(futureTargetAmount),
      yearsToInvest: Math.max(0, years),
      invested: Math.max(0, Math.round(totalInvested)),
    })
  }, [target, age, retireAge, inflation, expectedReturn, currentSavings])

  const chartData = [
    { name: 'Invested', value: results.invested, color: '#ff6922' },
    { name: 'Growth', value: results.totalGrowth, color: '#0595ce' },
  ]

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val)

  return (
    <CalculatorLayout title="Retirement Planning Calculator">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column: Inputs */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            {/* Target Retirement Amount */}
            <div className="bg-card border border-border p-5 rounded-2xl shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <label className="text-sm font-semibold text-foreground">Target Retirement Amount (₹)</label>
                <span className="text-accent font-bold bg-accent/10 px-3 py-1 rounded-lg">
                  {formatCurrency(target)}
                </span>
              </div>
              <input
                type="range"
                min="1000000"
                max="100000000"
                step="500000"
                value={target}
                onChange={(e) => setTarget(Number(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Current Savings */}
            <div className="bg-card border border-border p-5 rounded-2xl shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <label className="text-sm font-semibold text-foreground">Current Savings (₹)</label>
                <span className="text-accent font-bold bg-accent/10 px-3 py-1 rounded-lg">
                  {formatCurrency(currentSavings)}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100000"
                step="500"
                value={currentSavings}
                onChange={(e) => setCurrentSavings(Number(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Current Age */}
            <div className="bg-card border border-border p-5 rounded-2xl shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <label className="text-sm font-semibold text-foreground">Your Current Age</label>
                <span className="text-accent font-bold bg-accent/10 px-3 py-1 rounded-lg">
                  {age} Years
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="60"
                value={age}
                onChange={(e) => {
                  setAge(Number(e.target.value))
                  if (Number(e.target.value) >= retireAge) {
                    setRetireAge(Number(e.target.value) + 1)
                  }
                }}
                className="w-full"
              />
            </div>

            {/* Retirement Age */}
            <div className="bg-card border border-border p-5 rounded-2xl shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <label className="text-sm font-semibold text-foreground">Retirement Age</label>
                <span className="text-accent font-bold bg-accent/10 px-3 py-1 rounded-lg">
                  {retireAge} Years
                </span>
              </div>
              <input
                type="range"
                min="40"
                max="80"
                value={retireAge}
                onChange={(e) => {
                  setRetireAge(Number(e.target.value))
                  if (Number(e.target.value) <= age) {
                    setAge(Number(e.target.value) - 1)
                  }
                }}
                className="w-full"
              />
            </div>

            {/* Inflation Rate */}
            <div className="bg-card border border-border p-5 rounded-2xl shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <label className="text-sm font-semibold text-foreground">Inflation Rate (%)</label>
                <span className="text-accent font-bold bg-accent/10 px-3 py-1 rounded-lg">
                  {inflation}%
                </span>
              </div>
              <input
                type="range"
                min="3"
                max="10"
                step="0.5"
                value={inflation}
                onChange={(e) => setInflation(Number(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Expected Return */}
            <div className="bg-card border border-border p-5 rounded-2xl shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <label className="text-sm font-semibold text-foreground">Expected Return (%)</label>
                <span className="text-accent font-bold bg-accent/10 px-3 py-1 rounded-lg">
                  {expectedReturn}%
                </span>
              </div>
              <input
                type="range"
                min="8"
                max="18"
                step="0.5"
                value={expectedReturn}
                onChange={(e) => setExpectedReturn(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Chart and Results */}
        <div className="space-y-6">
          <div className="bg-card border border-border p-6 rounded-2xl shadow-sm flex flex-col items-center">
            <h3 className="text-lg font-bold mb-4">Break-up of Total Payment</h3>
            <div className="w-full h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => formatCurrency(value)}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            {/* Custom Legend */}
            <div className="flex gap-4 mt-4 text-sm font-medium">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff6922]" />
                Invested
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#0595ce]" />
                Growth
              </div>
            </div>
          </div>

          <div className="bg-card border border-border p-6 rounded-2xl shadow-sm space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Monthly SIP Amount</p>
              <p className="text-2xl font-bold text-accent">{formatCurrency(results.monthlySip)}</p>
            </div>
            <div className="h-px bg-border w-full" />
            <div>
              <p className="text-sm text-muted-foreground">Total Growth</p>
              <p className="text-xl font-bold text-foreground">{formatCurrency(results.totalGrowth)}</p>
            </div>
            <div className="h-px bg-border w-full" />
            <div>
              <p className="text-sm text-muted-foreground">Retirement Amount (Inflation Adjusted)</p>
              <p className="text-xl font-bold text-foreground">{formatCurrency(results.futureTarget)}</p>
            </div>
            <div className="h-px bg-border w-full" />
            <div>
              <p className="text-sm text-muted-foreground">Years to Invest</p>
              <p className="text-xl font-bold text-foreground">{results.yearsToInvest} Years</p>
            </div>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  )
}
