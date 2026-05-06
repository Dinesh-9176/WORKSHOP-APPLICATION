'use client'

import { motion } from 'framer-motion'
import { BookOpen, Plane } from 'lucide-react'

export default function Format() {
  return (
    <section className="py-24 section-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px flex-1 max-w-10 bg-cyan-400/40" />
            <span className="text-cyan-400 text-xs font-mono tracking-widest uppercase">06 · Workshop Format</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Two Modes.{' '}
            <span className="text-cyan-400">One Seamless Day.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Theory */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative p-8 rounded-2xl bg-[#14141f] border border-white/8 overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-cyan-400/5 blur-[60px] pointer-events-none" />
            <div className="w-12 h-12 rounded-2xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center mb-6">
              <BookOpen className="w-6 h-6 text-cyan-400" />
            </div>
            <h3 className="text-white text-xl font-bold mb-3">Theory Sessions</h3>
            <p className="text-white/55 leading-relaxed text-sm">
              Concept-focused modules delivered by experienced facilitators from Ignit Technical Solutions. Each module is designed with clear visuals, real-world case studies, and structured discussion to ensure{' '}
              <span className="text-white/80">conceptual clarity, not just information delivery.</span>
            </p>
            <div className="mt-6 space-y-2">
              {['6 structured modules', 'Visual aids & case studies', 'Interactive Q&A within each module'].map(f => (
                <div key={f} className="flex items-center gap-2 text-sm text-white/50">
                  <span className="w-1 h-1 rounded-full bg-cyan-400 shrink-0" />
                  {f}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Demo */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative p-8 rounded-2xl bg-[#14141f] border border-violet-500/20 overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-violet-500/8 blur-[60px] pointer-events-none" />
            <div className="w-12 h-12 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-6">
              <Plane className="w-6 h-6 text-violet-400" />
            </div>
            <h3 className="text-white text-xl font-bold mb-3">Live Demonstration</h3>
            <p className="text-white/55 leading-relaxed text-sm">
              A hands-on UAV flight demonstration conducted by trained operators. Participants will observe components in action, flight control in real time, and sensor integration —{' '}
              <span className="text-white/80">bringing every theory module to life.</span>
            </p>
            <div className="mt-6 space-y-2">
              {['Real UAV in flight', 'Component interaction sessions', 'Live sensor & telemetry display'].map(f => (
                <div key={f} className="flex items-center gap-2 text-sm text-white/50">
                  <span className="w-1 h-1 rounded-full bg-violet-400 shrink-0" />
                  {f}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
