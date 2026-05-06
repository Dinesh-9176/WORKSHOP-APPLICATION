'use client'

import { motion } from 'framer-motion'
import { GraduationCap, Briefcase, Cpu, Lightbulb, Sparkles } from 'lucide-react'

const audiences = [
  {
    icon: GraduationCap,
    title: 'Engineering Students',
    desc: 'ECE, EEE, Mechanical, Aerospace, Computer Science, and related disciplines seeking industry-relevant exposure.',
  },
  {
    icon: Briefcase,
    title: 'Working Professionals',
    desc: 'Manufacturing, defence, logistics, agriculture, or tech sectors looking to understand aerial automation.',
  },
  {
    icon: Cpu,
    title: 'Hobbyists & Enthusiasts',
    desc: 'A keen interest in drones, robotics, or autonomous systems — come learn the engineering behind it.',
  },
  {
    icon: Lightbulb,
    title: 'Entrepreneurs & Innovators',
    desc: 'Exploring UAV-based product or service opportunities and want to understand the technology stack.',
  },
  {
    icon: Sparkles,
    title: 'The Curious',
    desc: "Anyone curious about how things fly and how technology makes it possible. No prior experience required.",
  },
]

export default function WhoAttends() {
  return (
    <section id="who" className="py-24 bg-[#0d0d17]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px flex-1 max-w-10 bg-cyan-400/40" />
            <span className="text-cyan-400 text-xs font-mono tracking-widest uppercase">05 · Who Should Attend</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            This Workshop Is For{' '}
            <span className="text-cyan-400">You</span>
          </h2>
          <p className="text-white/50 mt-4 max-w-xl leading-relaxed">
            No prior experience with drones or electronics is required. A basic curiosity for engineering and technology is all you need.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {audiences.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex gap-4 p-5 rounded-2xl bg-[#14141f] border border-white/8 hover:border-cyan-400/20 transition-colors group"
            >
              <div className="shrink-0 w-10 h-10 rounded-xl bg-cyan-400/8 border border-cyan-400/15 flex items-center justify-center group-hover:bg-cyan-400/15 transition-colors">
                <a.icon className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm mb-1">{a.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{a.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
