'use client'

import React, { useState, useEffect } from 'react'
import CalculatorLayout from '@/components/ui/CalculatorLayout'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

export default function EMICalculator() {
  const [loanAmount, setLoanAmount] = useState(2500000)
  const [interestRate, setInterestRate] = useState(8.5)
  const [tenure, setTenure] = useState(15)

  const [results, setResults] = useState({
    emi: 0,
    totalInterest: 0,
    totalPayment: 0,
  })

  useEffect(() => {
    const P = loanAmount
    const R = interestRate / 12 / 100
    const N = tenure * 12

    let emiAmount = 0
    let totalInterest = 0
    let totalPayment = 0

    if (P > 0 && R > 0 && N > 0) {
      emiAmount = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1)
      totalPayment = emiAmount * N
      totalInterest = totalPayment - P
    }

    setResults({
      emi: Math.round(emiAmount),
      totalInterest: Math.round(totalInterest),
      totalPayment: Math.round(totalPayment),
    })
  }, [loanAmount, interestRate, tenure])

  const chartData = [
    { name: 'Principal Amount', value: loanAmount, color: '#3B82F6' },
    { name: 'Total Interest', value: results.totalInterest, color: '#F43F5E' },
  ]

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val)

  return (
    <CalculatorLayout title="Home Loan EMI Calculator">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column: Inputs */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card border border-border p-6 sm:p-8 rounded-2xl shadow-sm space-y-8">
            
            {/* Loan Amount */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="font-semibold text-foreground">Loan Amount (₹)</label>
                <span className="text-accent font-bold bg-accent/10 px-4 py-1.5 rounded-xl text-lg">
                  {formatCurrency(loanAmount)}
                </span>
              </div>
              <input
                type="range"
                min="100000"
                max="50000000"
                step="50000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Interest Rate */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="font-semibold text-foreground">Interest Rate (p.a)</label>
                <span className="text-accent font-bold bg-accent/10 px-4 py-1.5 rounded-xl text-lg">
                  {interestRate}%
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="20"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Tenure */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="font-semibold text-foreground">Loan Tenure (Years)</label>
                <span className="text-accent font-bold bg-accent/10 px-4 py-1.5 rounded-xl text-lg">
                  {tenure} Yr
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                step="1"
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
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
            <div className="flex gap-6 mt-6 text-sm font-medium">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#3B82F6]" />
                Principal Amount
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#F43F5E]" />
                Total Interest
              </div>
            </div>
          </div>

          <div className="bg-card border border-border p-6 rounded-2xl shadow-sm space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Monthly EMI</p>
              <p className="text-3xl font-bold text-accent">{formatCurrency(results.emi)}</p>
            </div>
            <div className="h-px bg-border w-full" />
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Interest</p>
              <p className="text-xl font-semibold text-foreground">{formatCurrency(results.totalInterest)}</p>
            </div>
            <div className="h-px bg-border w-full" />
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Payment (Principal + Interest)</p>
              <p className="text-xl font-semibold text-foreground">{formatCurrency(results.totalPayment)}</p>
            </div>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  )
}
