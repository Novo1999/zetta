'use client'
import { Post } from '@/app/types'
import BackButton from '@/components/BackButton'
import Card from '@/components/Card'
import Spinner from '@/components/Spinner'
import { useFetch } from '@/hooks/useFetch'
import { useParams } from 'next/navigation'

export default function PostDetail() {
  const params = useParams()
  const id = params?.id
  const { data: post, loading, error } = useFetch<Post>(`https://jsonplaceholder.typicode.com/posts/${id}`)

  return (
    <div>
      <BackButton />
      {loading && (
        <div className="text-slate-500 min-h-[90vh] flex justify-center items-center">
          <Spinner />
        </div>
      )}
      {error && <div className="text-red-600">Error: {error}</div>}
      {post && (
        <Card title={post.title} className="max-w-2xl text-black">
          <p className="text-sm text-slate-700">{post.body}</p>
        </Card>
      )}
    </div>
  )
}
