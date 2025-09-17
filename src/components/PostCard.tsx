'use client'
import { Post } from '@/app/types'
import Link from 'next/link'
import React from 'react'
import Card from './Card'

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/posts/${post.id}`}>
      <Card title={post.title} className="cursor-pointer text-black">
        <p className="text-sm text-slate-600 line-clamp-3">{post.body}</p>
      </Card>
    </Link>
  )
}
