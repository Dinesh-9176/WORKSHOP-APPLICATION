import { db } from '@/lib/db'
import { registrations } from '@/lib/db/schema'
import { eq, count, sql } from 'drizzle-orm'
import { Users, CheckCircle2, Clock, IndianRupee } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  const [total, confirmed, pending, attended, lunchCount, revenue] = await Promise.all([
    db.select({ c: count() }).from(registrations),
    db.select({ c: count() }).from(registrations).where(eq(registrations.status, 'confirmed')),
    db.select({ c: count() }).from(registrations).where(eq(registrations.status, 'awaiting_verification')),
    db.select({ c: count() }).from(registrations).where(eq(registrations.status, 'attended')),
    db.select({ c: count() }).from(registrations).where(eq(registrations.lunchOptin, true)),
    db.select({ total: sql<number>`sum(amount_paise)` }).from(registrations).where(
      sql`status IN ('confirmed','attended')`
    ),
  ])

  const stats = [
    { label: 'Total Registrations', value: total[0].c, icon: Users, color: 'text-white' },
    { label: 'Confirmed', value: confirmed[0].c, icon: CheckCircle2, color: 'text-cyan-400' },
    { label: 'Pending Verification', value: pending[0].c, icon: Clock, color: 'text-amber-400' },
    { label: 'Revenue (confirmed)', value: `₹${((revenue[0].total || 0) / 100).toLocaleString('en-IN')}`, icon: IndianRupee, color: 'text-emerald-400' },
  ]

  const recent = await db.select().from(registrations).orderBy(sql`created_at desc`).limit(10)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-white/40 text-sm mt-1">Session 01 — Understanding Aerial Systems</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => (
          <div key={s.label} className="rounded-2xl bg-[#14141f] border border-white/8 p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-white/40 text-xs uppercase tracking-widest font-mono">{s.label}</span>
              <s.icon className={`w-4 h-4 ${s.color}`} />
            </div>
            <p className={`text-3xl font-bold font-mono ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Extra stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="rounded-2xl bg-[#14141f] border border-white/8 p-5">
          <span className="text-white/40 text-xs uppercase tracking-widest font-mono">Attended</span>
          <p className="text-3xl font-bold font-mono text-violet-400 mt-2">{attended[0].c}</p>
        </div>
        <div className="rounded-2xl bg-[#14141f] border border-white/8 p-5">
          <span className="text-white/40 text-xs uppercase tracking-widest font-mono">Lunch Pre-orders</span>
          <p className="text-3xl font-bold font-mono text-amber-400 mt-2">{lunchCount[0].c}</p>
        </div>
      </div>

      {/* Recent registrations */}
      <div className="rounded-2xl bg-[#14141f] border border-white/8 overflow-hidden">
        <div className="px-5 py-4 border-b border-white/8 flex items-center justify-between">
          <h2 className="text-white font-semibold">Recent Registrations</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/8 text-white/35 text-xs uppercase tracking-wider font-mono">
                <th className="text-left px-5 py-3">Name</th>
                <th className="text-left px-5 py-3">Email</th>
                <th className="text-left px-5 py-3">Category</th>
                <th className="text-left px-5 py-3">Status</th>
                <th className="text-left px-5 py-3">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {recent.map(r => (
                <tr key={r.id} className="hover:bg-white/2 transition-colors">
                  <td className="px-5 py-3 text-white font-medium">{r.fullName}</td>
                  <td className="px-5 py-3 text-white/50">{r.email}</td>
                  <td className="px-5 py-3 text-white/50 capitalize">{r.category}</td>
                  <td className="px-5 py-3">
                    <StatusBadge status={r.status} />
                  </td>
                  <td className="px-5 py-3 font-mono text-white/70">₹{(r.amountPaise / 100).toLocaleString('en-IN')}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {recent.length === 0 && (
            <div className="py-12 text-center text-white/25 text-sm">No registrations yet.</div>
          )}
        </div>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    awaiting_verification: 'bg-amber-400/10 text-amber-400 border-amber-400/20',
    confirmed: 'bg-cyan-400/10 text-cyan-400 border-cyan-400/20',
    attended: 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20',
    rejected: 'bg-red-400/10 text-red-400 border-red-400/20',
    cancelled: 'bg-white/5 text-white/30 border-white/10',
  }
  const label: Record<string, string> = {
    awaiting_verification: 'Pending',
    confirmed: 'Confirmed',
    attended: 'Attended',
    rejected: 'Rejected',
    cancelled: 'Cancelled',
  }
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs border font-medium ${map[status] || 'text-white/40'}`}>
      {label[status] || status}
    </span>
  )
}
