'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Zap } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-white/8'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-cyan-400/10 border border-cyan-400/25 flex items-center justify-center">
            <Zap className="w-4 h-4 text-cyan-400" />
          </div>
          <span className="font-semibold text-sm tracking-tight">
            <span className="text-cyan-400">Ignit</span>
            <span className="text-white/70"> Technical</span>
          </span>
        </div>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-white/60">
          <a href="#overview" className="hover:text-white transition-colors">Overview</a>
          <a href="#outcomes" className="hover:text-white transition-colors">Outcomes</a>
          <a href="#schedule" className="hover:text-white transition-colors">Schedule</a>
          <a href="#about" className="hover:text-white transition-colors">About</a>
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
