'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronRight, Target } from 'lucide-react'

interface GoalLayoutProps {
  title: string
  children: React.ReactNode
}

export default function GoalLayout({ title, children }: GoalLayoutProps) {
  return (
    <div className="min-h-screen bg-background pt-24 pb-12 flex flex-col">
      {/* Decorative Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-accent/[0.03] rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/#home" className="hover:text-accent smooth-transition">
            Home
          </Link>
          <ChevronRight size={14} />
          <span className="text-foreground/60">Goals</span>
          <ChevronRight size={14} />
          <span className="text-foreground font-medium">{title}</span>
        </nav>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
            <Target className="text-accent" size={24} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
            {title}
          </h1>
        </motion.div>

        {/* Content Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex-1"
        >
          {children}
        </motion.div>
      </div>
    </div>
  )
}
