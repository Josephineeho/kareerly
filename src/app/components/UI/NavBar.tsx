"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Menu, User2, X } from 'lucide-react'
import Button from './Button'
import { createClient } from '@/utils/supabase/client'
import { User } from '@supabase/supabase-js'

interface NavItems {
  name: string
  to: string
  active: boolean
}

function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const supabase = createClient()
    
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
      }
    )

    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      subscription.unsubscribe()
    }
  }, [])

  const navitems: NavItems[] = [
    { name: 'Home', to: '/', active: true },
    { name: 'Jobs', to: '/jobs', active: false },
    { name: 'Companies', to: '/companies', active: false },
    { name: 'FAQs', to: '/faqs', active: false },
    { name: 'About', to: '/about-us', active: false },
  ]

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/80 backdrop-blur-md shadow-[0_2px_20px_rgba(0,64,161,0.08)] border-b border-slate-100'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <span className="text-white font-black text-sm">K</span>
            </div>
            <span className="font-black tracking-tighter text-xl text-on-surface">
              Kare<span className="text-primary">erly</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-1">
            {navitems.map((item) => (
              <li key={item.to}>
                <Link
                  href={item.to}
                  className={`relative px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                    item.active
                      ? 'text-primary bg-primary/8'
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
                  }`}
                >
                  {item.name}
                  {item.active && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <Link href="/dashboard">
                <Button variant="primary">Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link href="/signup">
                  <Button variant="primary">Get Started</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Drawer */}
        {mobileOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-slate-100 px-6 pb-6 pt-2 space-y-1">
            {navitems.map((item) => (
              <Link
                key={item.to}
                href={item.to}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                  item.active
                    ? 'text-primary bg-primary/8'
                    : 'text-on-surface-variant hover:bg-surface-container-low'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 flex gap-3">
              {user ? (
                <Link href="/dashboard" className="flex-1 w-full">
                  <Button variant="primary" fullWidth>Dashboard</Button>
                </Link>
              ) : (
                <>
                  <Link href="/login" className="flex-1">
                    <Button variant="ghost" fullWidth>Login</Button>
                  </Link>
                  <Link href="/signup" className="flex-1">
                    <Button variant="primary" fullWidth>Get Started</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
      {/* Spacer so content doesn't hide under fixed nav */}
      <div className="h-[72px]" />
    </>
  )
}

export default NavBar
