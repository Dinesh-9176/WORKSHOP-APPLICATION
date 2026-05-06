'use client'

import { motion } from 'framer-motion'
import { Zap } from 'lucide-react'

export default function AboutIgnit() {
  return (
    <section id="about" className="py-24 section-gradient">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-10 bg-cyan-400/40" />
            <span className="text-cyan-400 text-xs font-mono tracking-widest uppercase">08 · About Ignit</span>
            <span className="h-px w-10 bg-cyan-400/40" />
          </div>

          <div className="inline-flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-cyan-400/10 border border-cyan-400/25 flex items-center justify-center">
              <Zap className="w-6 h-6 text-cyan-400" />
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Ignit Technical Solutions{' '}
            <span className="text-white/40">Pvt Ltd</span>
          </h2>

          <div className="space-y-4 text-white/55 text-base leading-relaxed max-w-2xl mx-auto">
            <p>
              Ignit Technical Solutions is an engineering-focused organisation dedicated to building technical competencies through training, hands-on workshops, and industry collaboration. From embedded systems and IoT to robotics and aerial technology, Ignit bridges the gap between classroom learning and industry-ready skills.
            </p>
            <p>
              The <span className="text-white/80 font-medium">Engineering the Future Workshop Series</span> is Ignit's flagship skill-development initiative, designed to democratise access to cutting-edge technical knowledge for students, professionals, and innovators across the country.
            </p>
          </div>

          {/* Domains */}
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            {['Embedded Systems', 'IoT', 'Robotics', 'Aerial Technology', 'Industry Training', 'Hands-On Workshops'].map(d => (
              <span
                key={d}
                className="px-4 py-1.5 rounded-full text-sm bg-white/4 border border-white/10 text-white/50"
              >
                {d}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
