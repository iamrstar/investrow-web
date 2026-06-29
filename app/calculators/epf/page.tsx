'use client'

import React, { useState, useEffect } from 'react'
import CalculatorLayout from '@/components/ui/CalculatorLayout'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

export default function EPFCalculator() {
  const [basicSalary, setBasicSalary] = useState(50000)
  const [employeeContribution, setEmployeeContribution] = useState(12)
  const [employerContribution, setEmployerContribution] = useState(3.67)
  const [interestRate, setInterestRate] = useState(8.15)
  const [currentAge, setCurrentAge] = useState(25)
  const [retirementAge, setRetirementAge] = useState(58)
  const [currentBalance, setCurrentBalance] = useState(0)

  const [results, setResults] = useState({
    totalEmployeeContribution: 0,
    totalEmployerContribution: 0,
    totalInterest: 0,
    maturityValue: 0,
  })

  useEffect(() => {
    const years = retirementAge - currentAge
    if (years <= 0) {
      setResults({
        totalEmployeeContribution: 0,
        totalEmployerContribution: 0,
        totalInterest: 0,
        maturityValue: currentBalance,
      })
      return
    }

    const empContribMonthly = (basicSalary * employeeContribution) / 100
    const employerContribMonthly = (basicSalary * employerContribution) / 100
    const totalMonthlyContrib = empContribMonthly + employerContribMonthly
    const r = interestRate / 100

    let balance = currentBalance
    let totalEmpCont = 0
    let totalEmployerCont = 0

    // EPF typically compounds yearly on the opening balance + yearly contributions
    for (let i = 0; i < years; i++) {
      const yearlyContrib = totalMonthlyContrib * 12
      const interestForYear = (balance + yearlyContrib / 2) * r // Approximate interest calculation

      balance += yearlyContrib + interestForYear
      totalEmpCont += empContribMonthly * 12
      totalEmployerCont += employerContribMonthly * 12
    }

    const totalInterest = balance - currentBalance - totalEmpCont - totalEmployerCont

    setResults({
      totalEmployeeContribution: Math.round(totalEmpCont),
      totalEmployerContribution: Math.round(totalEmployerCont),
      totalInterest: Math.round(totalInterest),
      maturityValue: Math.round(balance),
    })
  }, [basicSalary, employeeContribution, employerContribution, interestRate, currentAge, retirementAge, currentBalance])

  const chartData = [
    { name: 'Your Contribution', value: results.totalEmployeeContribution, color: '#3B82F6' },
    { name: 'Employer Contribution', value: results.totalEmployerContribution, color: '#F59E0B' },
    { name: 'Total Interest', value: results.totalInterest, color: '#10B981' },
  ]

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val)

  return (
    <CalculatorLayout title="Employees' Provident Fund (EPF) Calculator">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column: Inputs */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            
            {/* Basic Salary */}
            <div className="bg-card border border-border p-5 rounded-2xl shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <label className="text-sm font-semibold text-foreground">Monthly Basic + DA (₹)</label>
                <span className="text-accent font-bold bg-accent/10 px-3 py-1 rounded-lg">
                  {formatCurrency(basicSalary)}
                </span>
              </div>
              <input
                type="range"
                min="10000"
                max="500000"
                step="5000"
                value={basicSalary}
                onChange={(e) => setBasicSalary(Number(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Current EPF Balance */}
            <div className="bg-card border border-border p-5 rounded-2xl shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <label className="text-sm font-semibold text-foreground">Current EPF Balance (₹)</label>
                <span className="text-accent font-bold bg-accent/10 px-3 py-1 rounded-lg">
                  {formatCurrency(currentBalance)}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="5000000"
                step="10000"
                value={currentBalance}
                onChange={(e) => setCurrentBalance(Number(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Current Age */}
            <div className="bg-card border border-border p-5 rounded-2xl shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <label className="text-sm font-semibold text-foreground">Your Current Age</label>
                <span className="text-accent font-bold bg-accent/10 px-3 py-1 rounded-lg">
                  {currentAge} Years
                </span>
              </div>
              <input
                type="range"
                min="18"
                max="58"
                step="1"
                value={currentAge}
                onChange={(e) => {
                  setCurrentAge(Number(e.target.value))
                  if (Number(e.target.value) >= retirementAge) {
                    setRetirementAge(Number(e.target.value) + 1)
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
                  {retirementAge} Years
                </span>
              </div>
              <input
                type="range"
                min="40"
                max="65"
                step="1"
                value={retirementAge}
                onChange={(e) => {
                  setRetirementAge(Number(e.target.value))
                  if (Number(e.target.value) <= currentAge) {
                    setCurrentAge(Number(e.target.value) - 1)
                  }
                }}
                className="w-full"
              />
            </div>

            {/* Employee Contribution */}
            <div className="bg-card border border-border p-5 rounded-2xl shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <label className="text-sm font-semibold text-foreground">Your Contribution (%)</label>
                <span className="text-accent font-bold bg-accent/10 px-3 py-1 rounded-lg">
                  {employeeContribution}%
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="20"
                step="0.5"
                value={employeeContribution}
                onChange={(e) => setEmployeeContribution(Number(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Employer Contribution */}
            <div className="bg-card border border-border p-5 rounded-2xl shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <label className="text-sm font-semibold text-foreground">Employer Contrib. to EPF (%)</label>
                <span className="text-accent font-bold bg-accent/10 px-3 py-1 rounded-lg">
                  {employerContribution}%
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="12"
                step="0.1"
                value={employerContribution}
                onChange={(e) => setEmployerContribution(Number(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Interest Rate */}
            <div className="bg-card border border-border p-5 rounded-2xl shadow-sm sm:col-span-2">
              <div className="flex justify-between items-center mb-4">
                <label className="text-sm font-semibold text-foreground">Expected Interest Rate (p.a)</label>
                <span className="text-accent font-bold bg-accent/10 px-3 py-1 rounded-lg">
                  {interestRate}%
                </span>
              </div>
              <input
                type="range"
                min="7"
                max="10"
                step="0.05"
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
            <h3 className="text-lg font-bold mb-4">Maturity Break-up</h3>
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
            <div className="flex flex-col gap-3 mt-6 text-sm font-medium w-full">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#3B82F6]" />
                  Your Contribution
                </div>
                <span>{formatCurrency(results.totalEmployeeContribution)}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
                  Employer Contrib.
                </div>
                <span>{formatCurrency(results.totalEmployerContribution)}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#10B981]" />
                  Total Interest
                </div>
                <span>{formatCurrency(results.totalInterest)}</span>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border p-6 rounded-2xl shadow-sm space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Maturity Value at Retirement</p>
              <p className="text-3xl font-bold text-accent">{formatCurrency(results.maturityValue)}</p>
            </div>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  )
}
