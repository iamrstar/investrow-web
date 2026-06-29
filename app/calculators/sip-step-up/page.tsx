'use client'

import React, { useState, useEffect } from 'react'
import CalculatorLayout from '@/components/ui/CalculatorLayout'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

export default function SIPStepUpCalculator() {
  const [monthlySip, setMonthlySip] = useState(5000)
  const [stepUpPercent, setStepUpPercent] = useState(10)
  const [expectedReturn, setExpectedReturn] = useState(12)
  const [timePeriod, setTimePeriod] = useState(10)

  const [results, setResults] = useState({
    investedAmount: 0,
    estimatedReturns: 0,
    totalValue: 0,
  })

  useEffect(() => {
    const years = timePeriod
    const r = expectedReturn / 12 / 100 // Monthly return rate
    const stepUp = stepUpPercent / 100

    let totalValue = 0
    let totalInvested = 0
    let currentSip = monthlySip

    for (let year = 1; year <= years; year++) {
      for (let month = 1; month <= 12; month++) {
        // Compound existing total value by 1 month
        totalValue = totalValue * (1 + r)
        // Add current month's SIP
        totalValue += currentSip
        // Keep track of total invested
        totalInvested += currentSip
      }
      // After 12 months, step up the SIP for the next year
      currentSip = currentSip * (1 + stepUp)
    }

    setResults({
      investedAmount: Math.round(totalInvested),
      estimatedReturns: Math.round(totalValue - totalInvested),
      totalValue: Math.round(totalValue),
    })
  }, [monthlySip, stepUpPercent, expectedReturn, timePeriod])

  const chartData = [
    { name: 'Invested Amount', value: results.investedAmount, color: '#3B82F6' },
    { name: 'Estimated Returns', value: results.estimatedReturns, color: '#10B981' },
  ]

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val)

  return (
    <CalculatorLayout title="SIP Step Up Calculator">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column: Inputs */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card border border-border p-6 sm:p-8 rounded-2xl shadow-sm space-y-8">
            
            {/* Monthly SIP */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="font-semibold text-foreground">Initial Monthly Investment (₹)</label>
                <span className="text-accent font-bold bg-accent/10 px-4 py-1.5 rounded-xl text-lg">
                  {formatCurrency(monthlySip)}
                </span>
              </div>
              <input
                type="range"
                min="500"
                max="100000"
                step="500"
                value={monthlySip}
                onChange={(e) => setMonthlySip(Number(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Annual Step Up */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="font-semibold text-foreground">Annual Step Up (%)</label>
                <span className="text-accent font-bold bg-accent/10 px-4 py-1.5 rounded-xl text-lg">
                  {stepUpPercent}%
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                step="1"
                value={stepUpPercent}
                onChange={(e) => setStepUpPercent(Number(e.target.value))}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground mt-1">Increase your SIP amount every year by this percentage.</p>
            </div>

            {/* Expected Return */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="font-semibold text-foreground">Expected Return rate (p.a)</label>
                <span className="text-accent font-bold bg-accent/10 px-4 py-1.5 rounded-xl text-lg">
                  {expectedReturn}%
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                step="0.5"
                value={expectedReturn}
                onChange={(e) => setExpectedReturn(Number(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Time Period */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="font-semibold text-foreground">Time Period (Years)</label>
                <span className="text-accent font-bold bg-accent/10 px-4 py-1.5 rounded-xl text-lg">
                  {timePeriod} Yr
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="40"
                step="1"
                value={timePeriod}
                onChange={(e) => setTimePeriod(Number(e.target.value))}
                className="w-full"
              />
            </div>

          </div>
        </div>

        {/* Right Column: Chart and Results */}
        <div className="space-y-6">
          <div className="bg-card border border-border p-6 rounded-2xl shadow-sm flex flex-col items-center">
            <h3 className="text-lg font-bold mb-4">Investment Break-up</h3>
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
            <div className="flex gap-6 mt-6 text-sm font-medium">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#3B82F6]" />
                Invested Amount
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#10B981]" />
                Est. Returns
              </div>
            </div>
          </div>

          <div className="bg-card border border-border p-6 rounded-2xl shadow-sm space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Invested Amount</p>
              <p className="text-xl font-semibold text-foreground">{formatCurrency(results.investedAmount)}</p>
            </div>
            <div className="h-px bg-border w-full" />
            <div>
              <p className="text-sm text-muted-foreground mb-1">Est. Returns</p>
              <p className="text-xl font-semibold text-foreground">{formatCurrency(results.estimatedReturns)}</p>
            </div>
            <div className="h-px bg-border w-full" />
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Value</p>
              <p className="text-3xl font-bold text-accent">{formatCurrency(results.totalValue)}</p>
            </div>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  )
}
