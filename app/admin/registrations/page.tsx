'use client'

import { useEffect, useState, useCallback } from 'react'
import { toast } from 'sonner'
import { Download, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

type Reg = {
  id: string
  fullName: string
  email: string
  phone: string
  category: string
  organization: string
  lunchOptin: boolean
  amountPaise: number
  status: string
  createdAt: string
}

const STATUS_OPTIONS = ['all', 'awaiting_verification', 'confirmed', 'rejected', 'attended', 'cancelled']

const statusLabel: Record<string, string> = {
  awaiting_verification: 'Pending',
  confirmed: 'Confirmed',
  attended: 'Attended',
  rejected: 'Rejected',
  cancelled: 'Cancelled',
}

const statusStyle: Record<string, string> = {
  awaiting_verification: 'bg-amber-400/10 text-amber-400 border-amber-400/20',
  confirmed: 'bg-cyan-400/10 text-cyan-400 border-cyan-400/20',
  attended: 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20',
  rejected: 'bg-red-400/10 text-red-400 border-red-400/20',
  cancelled: 'bg-white/5 text-white/30 border-white/10',
}

export default function RegistrationsPage() {
  const [items, setItems] = useState<Reg[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (statusFilter !== 'all') params.set('status', statusFilter)
      if (search) params.set('search', search)
      const res = await fetch(`/api/admin/registrations?${params}`)
      const data = await res.json()
      setItems(data.registrations || [])
    } catch {
      toast.error('Failed to load registrations.')
    } finally {
      setLoading(false)
    }
  }, [statusFilter, search])

  useEffect(() => { load() }, [load])

  const exportCSV = () => {
    const rows = [
      ['Name', 'Email', 'Phone', 'Category', 'Organisation', 'Lunch', 'Amount', 'Status', 'Registered At'],
      ...items.map(r => [
        r.fullName, r.email, r.phone, r.category, r.organization,
        r.lunchOptin ? 'Yes' : 'No',
        `₹${r.amountPaise / 100}`, r.status,
        new Date(r.createdAt).toLocaleString('en-IN'),
      ]),
    ]
    const csv = rows.map(r => r.map(c => `"${c}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `registrations-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">All Registrations</h1>
          <p className="text-white/40 text-sm mt-1">{items.length} records shown</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={exportCSV}
          className="border-white/15 text-white/50 hover:bg-white/5"
        >
          <Download className="w-3.5 h-3.5 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
          <Input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search name, email…"
            className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-white/25"
          />
        </div>
        <div className="flex gap-1">
          {STATUS_OPTIONS.map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs transition-all capitalize ${
                statusFilter === s
                  ? 'bg-cyan-400/15 text-cyan-400 border border-cyan-400/30'
                  : 'text-white/40 border border-white/8 hover:border-white/20 hover:text-white/60'
              }`}
            >
              {s === 'all' ? 'All' : statusLabel[s] || s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-[#14141f] border border-white/8 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/8 text-white/30 text-xs uppercase tracking-wider font-mono">
                <th className="text-left px-5 py-3">Name</th>
                <th className="text-left px-5 py-3">Email</th>
                <th className="text-left px-5 py-3">Phone</th>
                <th className="text-left px-5 py-3">Organisation</th>
                <th className="text-left px-5 py-3">Lunch</th>
                <th className="text-left px-5 py-3">Amount</th>
                <th className="text-left px-5 py-3">Status</th>
                <th className="text-left px-5 py-3">Ticket</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {items.map(r => (
                <tr key={r.id} className="hover:bg-white/2 transition-colors">
                  <td className="px-5 py-3 text-white font-medium">{r.fullName}</td>
                  <td className="px-5 py-3 text-white/50 text-xs">{r.email}</td>
                  <td className="px-5 py-3 text-white/50 text-xs font-mono">{r.phone}</td>
                  <td className="px-5 py-3 text-white/50 text-xs max-w-32 truncate">{r.organization}</td>
                  <td className="px-5 py-3 text-white/50">{r.lunchOptin ? '✓' : '—'}</td>
                  <td className="px-5 py-3 font-mono text-white/70">₹{r.amountPaise / 100}</td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs border font-medium ${statusStyle[r.status] || 'text-white/30'}`}>
                      {statusLabel[r.status] || r.status}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    {r.status === 'confirmed' || r.status === 'attended' ? (
                      <Link
                        href={`/ticket/${r.id}`}
                        target="_blank"
                        className="text-cyan-400 text-xs hover:underline"
                      >
                        View
                      </Link>
                    ) : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!loading && items.length === 0 && (
            <div className="py-12 text-center text-white/25 text-sm">No registrations match this filter.</div>
          )}
          {loading && (
            <div className="py-12 text-center text-white/25 text-sm">Loading…</div>
          )}
        </div>
      </div>
    </div>
  )
}
