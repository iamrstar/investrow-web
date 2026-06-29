'use client'

import React, { useState, useEffect } from 'react'
import CalculatorLayout from '@/components/ui/CalculatorLayout'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

export default function ChildrenEducationPlanner() {
  const [currentCost, setCurrentCost] = useState(1000000)
  const [childAge, setChildAge] = useState(5)
  const [startAge, setStartAge] = useState(18)
  const [inflation, setInflation] = useState(8)
  const [expectedReturn, setExpectedReturn] = useState(12)

  const [results, setResults] = useState({
    futureCost: 0,
    monthlySip: 0,
    investedAmount: 0,
    growth: 0,
  })

  useEffect(() => {
    const years = startAge - childAge
    if (years <= 0) {
      setResults({
        futureCost: currentCost,
        monthlySip: 0,
        investedAmount: 0,
        growth: 0,
      })
      return
    }

    const infRate = inflation / 100
    const retRate = expectedReturn / 100
    const months = years * 12

    // Future cost of the education adjusted for inflation
    const futureValue = currentCost * Math.pow(1 + infRate, years)

    const r = retRate / 12
    let sipAmount = 0
    let invested = 0

    if (months > 0 && r > 0) {
      sipAmount = futureValue / (((Math.pow(1 + r, months) - 1) / r) * (1 + r))
      invested = sipAmount * months
    } else if (months > 0) {
      sipAmount = futureValue / months
      invested = futureValue
    }

    const growth = futureValue - invested

    setResults({
      futureCost: Math.round(futureValue),
      monthlySip: Math.round(sipAmount),
      investedAmount: Math.round(invested),
      growth: Math.max(0, Math.round(growth)),
    })
  }, [currentCost, childAge, startAge, inflation, expectedReturn])

  const chartData = [
    { name: 'Invested Amount', value: results.investedAmount, color: '#3B82F6' },
    { name: 'Required Growth', value: results.growth, color: '#10B981' },
  ]

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val)

  return (
    <CalculatorLayout title="Children Education Planner">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column: Inputs */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card border border-border p-6 sm:p-8 rounded-2xl shadow-sm space-y-8">
            
            {/* Current Cost */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="font-semibold text-foreground">Current Cost of Education (₹)</label>
                <span className="text-accent font-bold bg-accent/10 px-4 py-1.5 rounded-xl text-lg">
                  {formatCurrency(currentCost)}
                </span>
              </div>
              <input
                type="range"
                min="100000"
                max="50000000"
                step="50000"
                value={currentCost}
                onChange={(e) => setCurrentCost(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-8">
              {/* Child Age */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="font-semibold text-foreground">Child's Current Age</label>
                  <span className="text-accent font-bold bg-accent/10 px-3 py-1 rounded-lg">
                    {childAge} Yr
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="18"
                  step="1"
                  value={childAge}
                  onChange={(e) => {
                    setChildAge(Number(e.target.value))
                    if (Number(e.target.value) >= startAge) {
                      setStartAge(Number(e.target.value) + 1)
                    }
                  }}
                  className="w-full"
                />
              </div>

              {/* Start Age */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="font-semibold text-foreground">Age Education Starts</label>
                  <span className="text-accent font-bold bg-accent/10 px-3 py-1 rounded-lg">
                    {startAge} Yr
                  </span>
                </div>
                <input
                  type="range"
                  min="16"
                  max="25"
                  step="1"
                  value={startAge}
                  onChange={(e) => {
                    setStartAge(Number(e.target.value))
                    if (Number(e.target.value) <= childAge) {
                      setChildAge(Number(e.target.value) - 1)
                    }
                  }}
                  className="w-full"
                />
              </div>

              {/* Inflation */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="font-semibold text-foreground">Education Inflation</label>
                  <span className="text-accent font-bold bg-accent/10 px-3 py-1 rounded-lg">
                    {inflation}%
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="15"
                  step="0.5"
                  value={inflation}
                  onChange={(e) => setInflation(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Expected Return */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="font-semibold text-foreground">Expected Return</label>
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
        </div>

        {/* Right Column: Chart and Results */}
        <div className="space-y-6">
          <div className="bg-card border border-border p-6 rounded-2xl shadow-sm flex flex-col items-center">
            <h3 className="text-lg font-bold mb-4">Target Break-up</h3>
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
                Required Growth
              </div>
            </div>
          </div>

          <div className="bg-card border border-border p-6 rounded-2xl shadow-sm space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Future Cost of Education</p>
              <p className="text-xl font-semibold text-foreground">{formatCurrency(results.futureCost)}</p>
            </div>
            <div className="h-px bg-border w-full" />
            <div>
              <p className="text-sm text-muted-foreground mb-1">Required Monthly SIP</p>
              <p className="text-3xl font-bold text-accent">{formatCurrency(results.monthlySip)}</p>
            </div>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  )
}
