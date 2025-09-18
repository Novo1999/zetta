import { auth } from '@/auth'
import Dashboard from '@/components/Dashboard'

export default async function Home() {
  const session = await auth()

  return <Dashboard user={session?.user} />
}
