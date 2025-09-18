import { auth } from '@/auth'
import Sidebar from '@/components/Sidebar'
import { SessionProvider } from 'next-auth/react'
import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Mini Dashboard',
  description: 'UI test: Next.js + Tailwind + Framer Motion',
}

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  if (!session?.user?.email) redirect('/login')
  return (
    <SessionProvider>
      <div className="flex h-screen">
        <Sidebar />
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </SessionProvider>
  )
}
