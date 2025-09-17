import Sidebar from '@/components/Sidebar'

export const metadata = {
  title: 'Mini Dashboard',
  description: 'UI test: Next.js + Tailwind + Framer Motion',
}

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="flex h-screen">
        <Sidebar />
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
