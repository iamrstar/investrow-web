'use client'

import React, { useState, useEffect } from 'react'
import CalculatorLayout from '@/components/ui/CalculatorLayout'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

export default function AssetAllocationCalculator() {
  const [amount, setAmount] = useState(1000000)
  const [age, setAge] = useState(30)
  const [riskProfile, setRiskProfile] = useState<'conservative' | 'moderate' | 'aggressive'>('moderate')

  const [results, setResults] = useState({
    equity: 0,
    debt: 0,
    gold: 0,
  })

  useEffect(() => {
    let equityPct = 0
    let debtPct = 0
    let goldPct = 10 // Constant 10% for gold in standard allocations

    if (riskProfile === 'conservative') {
      equityPct = 20
      debtPct = 70
    } else if (riskProfile === 'moderate') {
      equityPct = 50
      debtPct = 40
    } else if (riskProfile === 'aggressive') {
      equityPct = 70
      debtPct = 20
    }

    setResults({
      equity: Math.round((amount * equityPct) / 100),
      debt: Math.round((amount * debtPct) / 100),
      gold: Math.round((amount * goldPct) / 100),
    })
  }, [amount, age, riskProfile])

  const chartData = [
    { name: 'Equity', value: results.equity, color: '#3B82F6' },
    { name: 'Debt', value: results.debt, color: '#10B981' },
    { name: 'Gold', value: results.gold, color: '#F59E0B' },
  ]

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val)

  return (
    <CalculatorLayout title="Asset Allocation Calculator">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column: Inputs */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card border border-border p-6 sm:p-8 rounded-2xl shadow-sm space-y-8">
            
            {/* Total Investable Amount */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="font-semibold text-foreground">Total Investable Amount (₹)</label>
                <span className="text-accent font-bold bg-accent/10 px-4 py-1.5 rounded-xl text-lg">
                  {formatCurrency(amount)}
                </span>
              </div>
              <input
                type="range"
                min="100000"
                max="50000000"
                step="100000"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Current Age */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="font-semibold text-foreground">Current Age</label>
                <span className="text-accent font-bold bg-accent/10 px-4 py-1.5 rounded-xl text-lg">
                  {age} Years
                </span>
              </div>
              <input
                type="range"
                min="18"
                max="80"
                step="1"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Risk Profile Selection */}
            <div className="space-y-4">
              <label className="font-semibold text-foreground block">Risk Profile</label>
              <div className="grid grid-cols-3 gap-4">
                {(['conservative', 'moderate', 'aggressive'] as const).map((profile) => (
                  <button
                    key={profile}
                    onClick={() => setRiskProfile(profile)}
                    className={`py-3 px-4 rounded-xl font-medium capitalize smooth-transition ${
                      riskProfile === profile
                        ? 'bg-accent text-white shadow-lg shadow-accent/20'
                        : 'bg-secondary text-foreground hover:bg-secondary/80 border border-transparent hover:border-border'
                    }`}
                  >
                    {profile}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Chart and Results */}
        <div className="space-y-6">
          <div className="bg-card border border-border p-6 rounded-2xl shadow-sm flex flex-col items-center">
            <h3 className="text-lg font-bold mb-4">Recommended Allocation</h3>
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
            <div className="flex gap-4 mt-6 text-sm font-medium flex-wrap justify-center">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#3B82F6]" />
                Equity
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#10B981]" />
                Debt
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
                Gold
              </div>
            </div>
          </div>

          <div className="bg-card border border-border p-6 rounded-2xl shadow-sm space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Equity</p>
              <p className="text-xl font-semibold text-[#3B82F6]">{formatCurrency(results.equity)}</p>
            </div>
            <div className="h-px bg-border w-full" />
            <div>
              <p className="text-sm text-muted-foreground mb-1">Debt</p>
              <p className="text-xl font-semibold text-[#10B981]">{formatCurrency(results.debt)}</p>
            </div>
            <div className="h-px bg-border w-full" />
            <div>
              <p className="text-sm text-muted-foreground mb-1">Gold</p>
              <p className="text-xl font-semibold text-[#F59E0B]">{formatCurrency(results.gold)}</p>
            </div>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  )
}
