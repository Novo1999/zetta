'use client'

import Button from '@/components/Button'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    alert(`Login with ${email}`)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-500/10">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        className="bg-white rounded-xl shadow-xl w-full max-w-md p-8"
      >
        <h1 className="text-2xl font-bold text-sky-600 mb-6 text-center">Login</h1>

        <div className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-400 placeholder:text-black"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-400 placeholder:text-black"
          />

          <Button onClick={handleLogin}>Login</Button>
        </div>

        <p className="text-sm text-slate-500 mt-4 text-center">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-sky-600 font-medium hover:underline">
            Sign Up
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
