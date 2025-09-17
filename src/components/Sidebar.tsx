'use client'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { MdArticle, MdChevronLeft, MdChevronRight, MdClose, MdDashboard, MdMenu, MdPeople } from 'react-icons/md'

const items = [
  { href: '/', label: 'Dashboard', icon: MdDashboard },
  { href: '/posts', label: 'Posts', icon: MdArticle },
  { href: '/users', label: 'Users', icon: MdPeople },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false) // Initially closed on mobile
  const [isMobile, setIsMobile] = useState(false)

  // Detect screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      // Reset mobile state when switching to desktop
      if (window.innerWidth >= 768) {
        setMobileOpen(false) // Reset mobile state on desktop
      }
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <>
      {/* Mobile toggle button */}
      <button onClick={() => setMobileOpen(true)} className="md:hidden fixed top-4 left-4 z-50 p-2 bg-sky-500 text-white rounded-md" aria-label="open sidebar">
        <MdMenu size={20} />
      </button>

      {/* Overlay (for mobile when sidebar is open) */}
      <AnimatePresence>
        {isMobile && mobileOpen && (
          <motion.div className="fixed inset-0 bg-black/40 z-40 md:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobileOpen(false)} />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          width: collapsed ? 72 : 240,
          x: isMobile ? (mobileOpen ? 0 : -260) : 0, // Only slide on mobile
        }}
        transition={{ type: 'spring', stiffness: 240, damping: 30 }}
        className="fixed md:static top-0 left-0 h-screen bg-white border-r p-4 flex flex-col z-50"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-sky-500 rounded-lg flex items-center justify-center text-white font-bold">Z</div>
            {!collapsed && <p className="font-semibold text-black">Zetta Dash</p>}
          </div>
          <div className="flex gap-2">
            {/* Collapse button (desktop only) */}
            <button onClick={() => setCollapsed((s) => !s)} className="hidden md:block p-1 rounded-md hover:bg-slate-100 text-black" aria-label="toggle sidebar">
              {collapsed ? <MdChevronRight size={16} /> : <MdChevronLeft size={16} />}
            </button>
            {/* Close button (mobile only) */}
            <button onClick={() => setMobileOpen(false)} className="md:hidden p-1 rounded-md hover:bg-slate-100" aria-label="close sidebar">
              <MdClose size={16} />
            </button>
          </div>
        </div>

        <nav className="flex-1">
          {items.map((it) => {
            const isActive = pathname === it.href
            const IconComponent = it.icon
            return (
              <Link
                key={it.href}
                href={it.href}
                className="group block mb-1"
                onClick={() => setMobileOpen(false)} // Close mobile sidebar on link click
              >
                <motion.div whileHover={{ x: 6 }} className={`flex items-center gap-3 p-2 rounded-md ${isActive ? 'bg-sky-500 text-white' : 'hover:bg-slate-50 text-black'}`}>
                  <div className={`w-8 h-8 rounded-md flex items-center justify-center ${isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}`}>
                    <IconComponent size={16} />
                  </div>
                  {!collapsed && <span className="text-sm">{it.label}</span>}
                </motion.div>
              </Link>
            )
          })}
        </nav>

        <div className="mt-auto text-xs text-slate-400">{!collapsed && 'Made with ❤️ • UI Test'}</div>
      </motion.aside>
    </>
  )
}
