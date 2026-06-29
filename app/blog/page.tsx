'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Calendar, User, ArrowRight, TrendingUp, Lightbulb, Shield, Briefcase } from 'lucide-react'
import Image from 'next/image'

const posts = [
  {
    title: "Understanding Asset Allocation in Volatile Markets",
    category: "Investment Strategy",
    date: "June 12, 2026",
    author: "Rohan Sharma",
    excerpt: "Learn how to protect your portfolio and find opportunities when the stock market experiences high volatility.",
    icon: TrendingUp,
    delay: 0.1
  },
  {
    title: "The Power of Compounding: Start Early, Retire Wealthy",
    category: "Retirement Planning",
    date: "June 05, 2026",
    author: "Priya Desai",
    excerpt: "Discover how starting your SIP just 5 years earlier can double your final retirement corpus.",
    icon: Lightbulb,
    delay: 0.2
  },
  {
    title: "Tax Saving Strategies for FY 2026-27",
    category: "Tax Planning",
    date: "May 28, 2026",
    author: "Amit Patel",
    excerpt: "A comprehensive guide to utilizing Section 80C and beyond to maximize your tax returns this year.",
    icon: Shield,
    delay: 0.3
  },
  {
    title: "Mutual Funds vs. Direct Equity: Which is Right for You?",
    category: "Market Insights",
    date: "May 15, 2026",
    author: "Rohan Sharma",
    excerpt: "Weighing the pros and cons of actively managed mutual funds versus picking your own stocks.",
    icon: Briefcase,
    delay: 0.4
  },
  {
    title: "Planning for Your Child's Higher Education Abroad",
    category: "Goal Planning",
    date: "May 02, 2026",
    author: "Priya Desai",
    excerpt: "With education inflation soaring, here is how you can build a corpus to fund your child's dreams.",
    icon: Lightbulb,
    delay: 0.5
  },
  {
    title: "Why Rebalancing Your Portfolio Annually is Crucial",
    category: "Investment Strategy",
    date: "April 20, 2026",
    author: "Amit Patel",
    excerpt: "Don't let your asset allocation drift. Find out why and how you should rebalance your investments.",
    icon: TrendingUp,
    delay: 0.6
  }
]

export default function BlogPage() {
  return (
    <div className="pt-32 pb-20 min-h-screen bg-background relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-accent uppercase tracking-wider mb-3 block">Insights & Updates</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Our <span className="text-gradient-blue">Blog</span></h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Stay ahead of the curve with expert market analysis, financial tips, and wealth management strategies from the Investrow team.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => {
            const Icon = post.icon
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: post.delay }}
                viewport={{ once: true, margin: "-50px" }}
                className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-accent/5 hover:-translate-y-1 smooth-transition group flex flex-col h-full cursor-pointer"
              >
                {/* Image Placeholder with Gradient */}
                <div className="aspect-[16/10] relative overflow-hidden bg-secondary flex items-center justify-center group-hover:bg-accent/5 smooth-transition">
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20 z-10" />
                  <Icon size={48} className="text-muted-foreground/30 group-hover:scale-110 group-hover:text-accent/40 smooth-transition duration-500" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 z-20 bg-background/90 backdrop-blur-sm border border-border px-3 py-1.5 rounded-full text-xs font-semibold text-foreground">
                    {post.category}
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={14} className="text-accent" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <User size={14} className="text-accent" />
                      {post.author}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 group-hover:text-accent smooth-transition leading-tight">
                    {post.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm mb-6 line-clamp-3 leading-relaxed flex-grow">
                    {post.excerpt}
                  </p>
                  
                  <div className="mt-auto pt-4 border-t border-border/50">
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-foreground group-hover:text-accent smooth-transition">
                      Read Article <ArrowRight size={16} className="group-hover:translate-x-1 smooth-transition" />
                    </span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Load More */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 flex justify-center"
        >
          <button className="px-8 py-3.5 bg-secondary hover:bg-secondary/80 border border-border text-foreground font-semibold rounded-xl smooth-transition">
            Load More Articles
          </button>
        </motion.div>
      </div>
    </div>
  )
}
