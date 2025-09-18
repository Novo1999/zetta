'use client'
import Card from '@/components/Card'
import { motion } from 'framer-motion'
import React from 'react'
const Dashboard = () => {
  const stats = [
    { label: 'Posts', value: 120 },
    { label: 'Users', value: 10 },
    { label: 'Active', value: 8 },
  ]
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Welcome back — Nova</h1>
          <p className="text-sm text-slate-500">Here&apos;s a quick look at the project.</p>
        </div>
        <motion.div initial={{ rotate: 0 }} animate={{ rotate: [0, 5, -5, 0] }} transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }} className="p-3 rounded-lg bg-white card-shadow">
          <div className="text-sm text-black">Animated Header Element</div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((s) => (
          <Card key={s.label} className="p-4 text-black">
            <div className="text-xs text-slate-500">{s.label}</div>
            <div className="text-2xl font-bold">{s.value}</div>
          </Card>
        ))}
      </div>

      <Card title="Live Activity" className="text-black">
        <div className="flex items-end gap-2 h-24">
          {/* simple animated bars using framer */}
          {Array.from({ length: 7 }).map((_, i) => (
            <motion.div key={i} animate={{ height: ['20%', `${30 + i * 8}%`, '20%'] }} transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.15 }} className="w-3 bg-sky-400 rounded" />
          ))}
        </div>
      </Card>
    </div>
  )
}
export default Dashboard
