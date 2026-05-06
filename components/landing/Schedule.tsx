'use client'

import { motion } from 'framer-motion'

const schedule = [
  { time: '10:00 – 10:30', title: 'Registration & Welcome', type: 'admin' },
  { time: '10:30 – 11:15', title: 'Module 1 — Fundamentals of Aerial Systems', type: 'module' },
  { time: '11:15 – 12:00', title: 'Module 2 — Principles of Flight & Aerodynamics', type: 'module' },
  { time: '12:00 – 12:45', title: 'Module 3 — Anatomy of a UAV + Live Demo', type: 'demo' },
  { time: '12:45 – 13:30', title: 'Lunch Break', type: 'break', sub: 'Optional meal available at ₹100' },
  { time: '13:30 – 14:15', title: 'Module 4 — Component Selection for a UAV Build', type: 'module' },
  { time: '14:15 – 15:00', title: 'Module 5 — Communication, Control & Sensors', type: 'module' },
  { time: '15:00 – 15:45', title: 'Module 6 — Regulations & Safety Standards', type: 'module' },
  { time: '15:45 – 16:30', title: 'Live Flight Demonstration & Q&A', type: 'demo' },
  { time: '16:30 – 17:00', title: 'Certificate Distribution & Networking', type: 'admin' },
]

const typeStyle: Record<string, string> = {
  module: 'bg-cyan-400/10 border-cyan-400/30 text-cyan-400',
  demo: 'bg-violet-500/10 border-violet-500/30 text-violet-400',
  break: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
  admin: 'bg-white/5 border-white/15 text-white/50',
}

const typeDot: Record<string, string> = {
  module: 'bg-cyan-400',
  demo: 'bg-violet-400',
  break: 'bg-amber-400',
  admin: 'bg-white/30',
}

export default function Schedule() {
  return (
    <section id="schedule" className="py-24 section-gradient">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px flex-1 max-w-10 bg-cyan-400/40" />
            <span className="text-cyan-400 text-xs font-mono tracking-widest uppercase">04 · Full-Day Schedule</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            What Your Day{' '}
            <span className="text-cyan-400">Looks Like</span>
          </h2>
        </motion.div>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 mb-10">
          {[
            { type: 'module', label: 'Theory Module' },
            { type: 'demo', label: 'Live Demonstration' },
            { type: 'break', label: 'Break' },
            { type: 'admin', label: 'Registration / Networking' },
          ].map(l => (
            <div key={l.type} className="flex items-center gap-1.5 text-xs text-white/50">
              <span className={`w-2 h-2 rounded-full ${typeDot[l.type]}`} />
              {l.label}
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-[7.5rem] top-0 bottom-0 w-px bg-white/8 hidden sm:block" />
          <div className="space-y-3">
            {schedule.map((item, i) => (
              <motion.div
                key={item.time}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-start gap-4 sm:gap-6 group"
              >
                {/* Time */}
                <div className="hidden sm:block w-28 shrink-0 text-right">
                  <span className="font-mono text-xs text-white/35 group-hover:text-white/60 transition-colors">
                    {item.time}
                  </span>
                </div>

                {/* Dot */}
                <div className="hidden sm:flex items-center justify-center w-4 shrink-0 mt-3">
                  <span className={`w-2 h-2 rounded-full ${typeDot[item.type]}`} />
                </div>

                {/* Card */}
                <div className={`flex-1 flex flex-col sm:flex-row sm:items-center gap-2 p-3.5 rounded-xl border ${typeStyle[item.type]}`}>
                  <span className="sm:hidden font-mono text-xs opacity-60">{item.time}</span>
                  <span className="font-medium text-sm text-white">{item.title}</span>
                  {item.sub && <span className="text-xs opacity-60 sm:ml-auto">{item.sub}</span>}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
