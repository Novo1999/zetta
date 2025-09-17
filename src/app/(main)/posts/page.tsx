'use client'
import { Post } from '@/app/types'
import { POSTS_URL } from '@/app/utils/constants'
import { default as Button } from '@/components/Button'
import PostCard from '@/components/PostCard'
import Spinner from '@/components/Spinner'
import { useFetch } from '@/hooks/useFetch'
import { motion, Variants } from 'framer-motion'
import { ReactNode, useState } from 'react'

const listVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 8, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 220, damping: 22 } },
}

export default function PostsPage() {
  const [simulateError, setSimulateError] = useState(false)
  const { data, loading, error, refetch } = useFetch<Post[]>(POSTS_URL, { simulateError })

  let content: ReactNode

  if (error) {
    content = <div className="text-red-600 min-h-[90vh] flex justify-center items-center">Failed to load posts: {error}</div>
  } else {
    content = data && !loading && (
      <motion.div initial="hidden" animate="show" variants={listVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.slice(0, 18).map((post) => (
          <motion.div key={post.id} variants={itemVariants}>
            <PostCard post={post} />
          </motion.div>
        ))}
      </motion.div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Posts</h2>
        <div className="flex items-center gap-3 text-black">
          <Button
            onClick={() => {
              setSimulateError((s) => !s)
            }}
            className={`px-3 py-1 rounded ${simulateError ? 'bg-red-100 text-red-700' : 'bg-slate-100'}`}
          >
            {simulateError ? 'Simulating error' : 'Simulate error'}
          </Button>

          <Button onClick={() => refetch(POSTS_URL)}>Refetch</Button>
        </div>
      </div>

      {loading && (
        <div className="text-slate-500 min-h-[90vh] flex justify-center items-center">
          <Spinner />
        </div>
      )}

      {content}
    </div>
  )
}
