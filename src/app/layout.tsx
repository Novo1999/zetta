import Sidebar from '@/components/Sidebar'
import './globals.css'

export const metadata = {
  title: 'Mini Dashboard',
  description: 'UI test: Next.js + Tailwind + Framer Motion',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="flex h-screen">
          <Sidebar />
          <main className="flex-1 p-6 overflow-auto">{children}</main>
        </div>
      </body>
    </html>
  )
}
