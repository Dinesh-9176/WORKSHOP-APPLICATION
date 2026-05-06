'use client'

import { motion } from 'framer-motion'

const outcomes = [
  {
    num: '01',
    title: 'Fundamentals of Aerial Systems',
    desc: 'Gain a solid grounding in what aerial systems are, their classifications, and real-world applications across industries.',
  },
  {
    num: '02',
    title: 'Principles of Flight & Aerodynamics',
    desc: 'Understand the physics of flight — lift, thrust, drag, and weight — and how these govern UAV behaviour in the air.',
  },
  {
    num: '03',
    title: 'Anatomy of a UAV',
    desc: 'Dissect the architecture of an unmanned aerial vehicle: frames, propulsion units, flight controllers, and power systems.',
  },
  {
    num: '04',
    title: 'Component Selection for a UAV Build',
    desc: 'Learn how to evaluate and choose the right motors, ESCs, batteries, propellers, and frames for a specific mission.',
  },
  {
    num: '05',
    title: 'Communication, Control & Sensors',
    desc: 'Explore how data flows between pilot and aircraft — radio links, telemetry, GPS, IMUs, and onboard sensing systems.',
  },
  {
    num: '06',
    title: 'Regulations & Safety Standards',
    desc: 'Navigate DGCA guidelines, airspace classifications, no-fly zones, and the safety protocols every operator must follow.',
  },
]

export default function Outcomes() {
  return (
    <section id="outcomes" className="py-24 bg-[#0d0d17]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mb-14"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px flex-1 max-w-10 bg-cyan-400/40" />
            <span className="text-cyan-400 text-xs font-mono tracking-widest uppercase">03 · Session Outcomes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
            Six Areas of Mastery You Will{' '}
            <span className="text-cyan-400">Walk Away With</span>
          </h2>
          <p className="text-white/50 mt-4 leading-relaxed">
            A progressive learning arc — from concept to components to compliance.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {outcomes.map((o, i) => (
            <motion.div
              key={o.num}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="group relative p-6 rounded-2xl bg-[#14141f] border border-white/8 hover:border-cyan-400/30 hover:-translate-y-1 transition-all duration-300"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity bg-cyan-400/3 pointer-events-none" />

              <span className="font-mono text-4xl font-bold text-cyan-400/20 group-hover:text-cyan-400/35 transition-colors leading-none">
                {o.num}
              </span>
              <h3 className="text-white font-semibold mt-3 mb-2 leading-snug">{o.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{o.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
