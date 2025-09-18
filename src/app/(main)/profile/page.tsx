'use client'

import Button from '@/components/Button'
import Spinner from '@/components/Spinner'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'

export default function ProfilePage() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return (
      <div className="text-slate-500 min-h-[90vh] flex justify-center items-center">
        <Spinner />
      </div>
    )
  }

  if (!session) {
    return <p className="text-center mt-10">You are not signed in.</p>
  }

  const { user } = session

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 w-full max-w-md text-center">
        {user?.image && <Image src={user.image} alt={user.name ?? 'Profile'} width={80} height={80} className="rounded-full mx-auto mb-4" />}
        <h1 className="text-2xl font-semibold">{user?.name ?? 'No Name'}</h1>
        <p className="text-gray-600 dark:text-gray-300">{user?.email ?? 'No Email'}</p>

        <Button onClick={signOut}>Log Out</Button>
      </div>
    </div>
  )
}
