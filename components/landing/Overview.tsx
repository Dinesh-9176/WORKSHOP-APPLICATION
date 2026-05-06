'use client'

import { motion } from 'framer-motion'

export default function Overview() {
  return (
    <section id="overview" className="py-24 section-gradient">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div className="flex items-center gap-3">
            <span className="h-px flex-1 max-w-10 bg-cyan-400/40" />
            <span className="text-cyan-400 text-xs font-mono tracking-widest uppercase">01 · Workshop Overview</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
            From First Principles to{' '}
            <span className="text-cyan-400">Live Aerial Demo</span>
          </h2>

          <div className="space-y-4 text-white/60 text-base leading-relaxed">
            <p>
              <span className="text-white font-medium">"Understanding Aerial Systems"</span> is the inaugural session of Ignit Technical Solutions'{' '}
              <span className="text-white/80">Engineering the Future Workshop Series</span> — a structured learning journey designed to bridge the gap between academic foundations and the rapidly evolving world of embedded systems, robotics, and autonomous technology.
            </p>
            <p>
              This full-day, hands-on workshop takes participants from first principles all the way to a live aerial demonstration, covering the science, engineering, and regulatory landscape that governs modern unmanned aerial vehicles (UAVs).
            </p>
            <p>
              Whether you are a student exploring career paths, a working professional looking to upskill, or simply a technology enthusiast, this session will give you a structured, practical understanding of how aerial systems are designed, built, controlled, and operated responsibly.
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-2">
            {['Theory + Live Demo', 'Certificate Provided', 'Open to All', 'Complimentary Refreshments'].map(tag => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-white/60"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
