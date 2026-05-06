'use client'

import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const details = [
  { label: 'Organiser', value: 'Ignit Technical Solutions Pvt Ltd' },
  { label: 'Session', value: 'Session 01 — Understanding Aerial Systems' },
  { label: 'Date / Time', value: '10:00 AM to 5:00 PM' },
  { label: 'Duration', value: '7 Hours (including breaks)' },
  { label: 'Format', value: 'Theory + Live UAV Demonstration + Q&A' },
  { label: 'Who Can Attend', value: 'Engineering Students, Professionals, Enthusiasts' },
  { label: 'Registration Fee', value: '₹500 per participant' },
  { label: 'Refreshments', value: 'Complimentary refreshments provided' },
  { label: 'Lunch', value: '₹100 optional — pre-order at registration' },
  { label: 'Certificate', value: 'Certificate of Participation for all attendees' },
]

const inclusions = [
  'Registration is mandatory. Seats are limited.',
  'All workshop materials shared digitally.',
  'Carry a notebook and pen — optional but useful.',
  'Certificate issued on completion of the session.',
]

export default function Logistics() {
  return (
    <section id="logistics" className="py-24 bg-[#0d0d17]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px flex-1 max-w-10 bg-cyan-400/40" />
            <span className="text-cyan-400 text-xs font-mono tracking-widest uppercase">07 · Registration & Logistics</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Everything You Need to{' '}
            <span className="text-cyan-400">Know Before You Register</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Session details table */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl bg-[#14141f] border border-white/8 overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-white/8">
              <h3 className="text-white font-semibold">Session Details</h3>
            </div>
            <div className="divide-y divide-white/5">
              {details.map(d => (
                <div key={d.label} className="flex gap-4 px-6 py-3 hover:bg-white/3 transition-colors">
                  <span className="text-white/40 text-sm w-32 shrink-0">{d.label}</span>
                  <span className="text-white/80 text-sm">{d.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Important notes + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            <div className="rounded-2xl bg-cyan-400/5 border border-cyan-400/20 p-6">
              <h3 className="text-white font-semibold mb-4">Important Notes</h3>
              <div className="space-y-3">
                {inclusions.map(note => (
                  <div key={note} className="flex gap-3 items-start">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                    <span className="text-white/60 text-sm leading-relaxed">{note}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Fee card */}
            <div className="rounded-2xl bg-[#14141f] border border-white/8 p-6">
              <h3 className="text-white font-semibold mb-4">Fee Breakdown</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Workshop fee</span>
                  <span className="text-white font-mono">₹500</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Lunch (optional)</span>
                  <span className="text-white font-mono">₹100</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Refreshments</span>
                  <span className="text-cyan-400 font-mono">Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Certificate</span>
                  <span className="text-cyan-400 font-mono">Included</span>
                </div>
                <div className="h-px bg-white/8 my-3" />
                <div className="flex justify-between">
                  <span className="text-white font-semibold">Total (without lunch)</span>
                  <span className="text-cyan-400 font-bold font-mono text-lg">₹500</span>
                </div>
              </div>
            </div>

            <Link href="/register" className="w-full">
              <Button className="w-full bg-cyan-400 text-[#0a0a0f] hover:bg-cyan-300 font-bold h-12 text-base shadow-[0_0_20px_rgba(34,211,238,0.25)] hover:shadow-[0_0_40px_rgba(34,211,238,0.45)] transition-all">
                Secure Your Seat — Register Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
