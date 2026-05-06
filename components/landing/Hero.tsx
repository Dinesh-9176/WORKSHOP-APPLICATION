'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Clock, MapPin, Award } from 'lucide-react'

const fade = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }
const stagger = { show: { transition: { staggerChildren: 0.1 } } }

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center hero-gradient grid-overlay overflow-hidden">
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-cyan-400/5 blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-violet-600/8 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-24 pb-16">
        <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-6">

          {/* Series badge */}
          <motion.div variants={fade} className="flex items-center justify-center gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-400/25 bg-cyan-400/8 text-cyan-400 text-xs font-medium tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Engineering the Future · Workshop Series
            </div>
          </motion.div>

          {/* Session badge */}
          <motion.div variants={fade}>
            <span className="font-mono text-white/30 text-sm tracking-[0.3em] uppercase">Session 01</span>
          </motion.div>

          {/* Title */}
          <motion.h1 variants={fade} className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.05]">
            <span className="text-white">Understanding</span>
            <br />
            <span className="text-cyan-400 text-glow">Aerial Systems</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p variants={fade} className="text-lg sm:text-xl text-white/55 max-w-2xl mx-auto leading-relaxed">
            A comprehensive hands-on workshop on UAV technology & aerial engineering —
            from first principles to a live flight demonstration.
          </motion.p>

          {/* Info chips */}
          <motion.div variants={fade} className="flex flex-wrap items-center justify-center gap-3 text-sm">
            {[
              { icon: Clock, text: '10 AM – 5 PM · 7 Hours' },
              { icon: MapPin, text: 'Venue TBA' },
              { icon: Award, text: 'Certificate Provided' },
            ].map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70"
              >
                <Icon className="w-3.5 h-3.5 text-cyan-400" />
                {text}
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div variants={fade} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link href="/register">
              <Button
                size="lg"
                className="bg-cyan-400 text-[#0a0a0f] hover:bg-cyan-300 font-bold px-8 h-13 text-base shadow-[0_0_30px_rgba(34,211,238,0.35)] hover:shadow-[0_0_50px_rgba(34,211,238,0.55)] transition-all group"
              >
                Register Now — ₹500
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <a href="#overview">
              <Button
                size="lg"
                variant="outline"
                className="border-white/15 text-white/70 hover:bg-white/5 hover:text-white hover:border-white/30 h-13 px-8 text-base"
              >
                Learn More
              </Button>
            </a>
          </motion.div>

          {/* Trust note */}
          <motion.p variants={fade} className="text-xs text-white/30">
            Open to all · No prior experience required · Complimentary refreshments included
          </motion.p>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0f] to-transparent pointer-events-none" />
    </section>
  )
}
