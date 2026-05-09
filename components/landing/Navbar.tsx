'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'


export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [logoError, setLogoError] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200'
        : 'bg-gradient-to-b from-white via-slate-100/90 to-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          {logoError ? (
            <>
              <span className="text-cyan-400 font-bold text-2xl tracking-tight">Ignit</span>
              <span className="text-white/70 font-bold text-2xl tracking-tight">Technical</span>
            </>
          ) : (
            <img
              src="/logo.png"
              alt="Ignit Technical"
              className="h-30 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              onError={() => setLogoError(true)}
            />
          )}
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-700">
          <a href="#overview" className="hover:text-blue-600 transition-colors">Overview</a>
          <a href="#outcomes" className="hover:text-blue-600 transition-colors">Outcomes</a>
          <a href="#schedule" className="hover:text-blue-600 transition-colors">Schedule</a>
          <a href="#about" className="hover:text-blue-600 transition-colors">About</a>
        </nav>

        {/* CTA */}
        <Link href="/register">
          <Button
            size="sm"
            className="bg-cyan-400 text-[#0a0a0f] hover:bg-cyan-300 font-semibold shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all hover:shadow-[0_0_30px_rgba(34,211,238,0.5)]"
          >
            Register — ₹500
          </Button>
        </Link>
      </div>
    </header>
  )
}
