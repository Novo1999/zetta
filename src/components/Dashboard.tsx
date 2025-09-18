'use client'
import { Post } from '@/app/types'
import { POSTS_URL, USERS_URL } from '@/app/utils/constants'
import Card from '@/components/Card'
import Spinner from '@/components/Spinner'
import { useFetch } from '@/hooks/useFetch'
import { motion } from 'framer-motion'
import { Session, User } from 'next-auth'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
const Dashboard = ({ user }: { user: Session['user'] }) => {
  const { data: postsData, loading: loadingPosts } = useFetch<Post[]>(POSTS_URL)
  const { data: usersData, loading: loadingUsers } = useFetch<User[]>(USERS_URL)

  const stats = [
    { label: 'Posts', value: postsData?.length },
    { label: 'Users', value: usersData?.length },
    { label: 'Active', value: 8 },
  ]

  const isLoading = loadingPosts || loadingUsers

  if (isLoading) {
    return (
      <div className="text-slate-500 min-h-[90vh] flex justify-center items-center">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href={'/profile'}>
            <Image width={500} className="size-12 rounded-full border border-sky-500 p-1" height={500} src={user?.image || ''} alt={user?.name || ''} />
          </Link>
          <h1 className="text-2xl font-bold">Welcome back — {user?.name}</h1>
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
