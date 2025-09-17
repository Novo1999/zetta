'use client'
import { Post } from '@/app/types'
import Card from '@/components/Card'
import { useFetch } from '@/hooks/useFetch'
import { useParams } from 'next/navigation'
import React from 'react'

export default function PostDetail() {
  const params = useParams()
  const id = params?.id
  const { data: post, loading, error } = useFetch<Post>(`https://jsonplaceholder.typicode.com/posts/${id}`)

  return (
    <div>
      <button onClick={() => history.back()} className="text-sm text-slate-500 mb-4">
        ← Back
      </button>
      {loading && <div>Loading post...</div>}
      {error && <div className="text-red-600">Error: {error}</div>}
      {post && (
        <Card title={post.title} className="max-w-2xl">
          <p className="text-sm text-slate-700">{post.body}</p>
          <div className="mt-4 text-xs text-slate-400">Author ID: {post.userId}</div>
        </Card>
      )}
    </div>
  )
}
