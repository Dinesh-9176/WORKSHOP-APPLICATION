'use client'

import { motion } from 'framer-motion'

const stats = [
  { value: '7', label: 'Hours', sub: 'Full day session' },
  { value: '6', label: 'Modules', sub: 'Structured learning' },
  { value: '1', label: 'Live Demo', sub: 'Real UAV flight' },
  { value: '₹500', label: 'Entry Fee', sub: 'All inclusive' },
]

export default function Stats() {
  return (
    <section className="border-y border-white/8 bg-[#0d0d17]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center py-6 px-4 text-center"
            >
              <span className="text-3xl sm:text-4xl font-bold text-cyan-400 font-mono">{s.value}</span>
              <span className="text-white font-semibold mt-1">{s.label}</span>
              <span className="text-white/40 text-xs mt-0.5">{s.sub}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
