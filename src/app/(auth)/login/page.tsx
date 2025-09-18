import { auth } from '@/auth'
import SignIn from '@/components/SignIn'
import { redirect } from 'next/navigation'

export default async function LoginPage() {
  const session = await auth()

  if (session?.user?.email) redirect('/')

  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-500/10">
      <SignIn />
    </div>
  )
}
