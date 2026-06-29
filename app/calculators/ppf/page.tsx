'use client'

import React, { useState, useEffect } from 'react'
import CalculatorLayout from '@/components/ui/CalculatorLayout'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

export default function PPFCalculator() {
  const [yearlyInvestment, setYearlyInvestment] = useState(150000)
  const [timePeriod, setTimePeriod] = useState(15)
  const [interestRate, setInterestRate] = useState(7.1)

  const [results, setResults] = useState({
    investedAmount: 0,
    totalInterest: 0,
    maturityValue: 0,
  })

  useEffect(() => {
    const P = yearlyInvestment
    const i = interestRate / 100
    const n = timePeriod

    let maturityValue = 0
    if (i > 0 && n > 0) {
      // Future Value of an Annuity Due formula
      maturityValue = P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i)
    } else if (n > 0) {
      maturityValue = P * n
    }

    const investedAmount = P * n
    const totalInterest = maturityValue - investedAmount

    setResults({
      investedAmount: Math.round(investedAmount),
      totalInterest: Math.round(totalInterest),
      maturityValue: Math.round(maturityValue),
    })
  }, [yearlyInvestment, timePeriod, interestRate])

  const chartData = [
    { name: 'Invested Amount', value: results.investedAmount, color: '#3B82F6' },
    { name: 'Total Interest', value: results.totalInterest, color: '#10B981' },
  ]

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val)

  return (
    <CalculatorLayout title="Public Provident Fund (PPF) Calculator">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column: Inputs */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card border border-border p-6 sm:p-8 rounded-2xl shadow-sm space-y-8">
            
            {/* Yearly Investment */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="font-semibold text-foreground">Yearly Investment (₹)</label>
                <span className="text-accent font-bold bg-accent/10 px-4 py-1.5 rounded-xl text-lg">
                  {formatCurrency(yearlyInvestment)}
                </span>
              </div>
              <input
                type="range"
                min="500"
                max="150000"
                step="500"
                value={yearlyInvestment}
                onChange={(e) => setYearlyInvestment(Number(e.target.value))}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground mt-1">Max allowed under Section 80C is ₹1,50,000.</p>
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
                min="15"
                max="50"
                step="5"
                value={timePeriod}
                onChange={(e) => setTimePeriod(Number(e.target.value))}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground mt-1">PPF matures in 15 years, extendable in blocks of 5 years.</p>
            </div>

            {/* Interest Rate */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="font-semibold text-foreground">Rate of Interest (p.a)</label>
                <span className="text-accent font-bold bg-accent/10 px-4 py-1.5 rounded-xl text-lg">
                  {interestRate}%
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="10"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
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
                Total Interest
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
              <p className="text-sm text-muted-foreground mb-1">Total Interest</p>
              <p className="text-xl font-semibold text-foreground">{formatCurrency(results.totalInterest)}</p>
            </div>
            <div className="h-px bg-border w-full" />
            <div>
              <p className="text-sm text-muted-foreground mb-1">Maturity Value</p>
              <p className="text-3xl font-bold text-accent">{formatCurrency(results.maturityValue)}</p>
            </div>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  )
}
