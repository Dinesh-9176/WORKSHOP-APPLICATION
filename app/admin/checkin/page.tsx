'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { Search, CheckCircle2, XCircle, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type Result = {
  id: string
  fullName: string
  email: string
  category: string
  organization: string
  lunchOptin: boolean
  status: string
  qrToken: string | null
}

export default function CheckinPage() {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState<Result | null>(null)
  const [notFound, setNotFound] = useState(false)
  const [searching, setSearching] = useState(false)
  const [checkingIn, setCheckingIn] = useState(false)

  const lookup = async () => {
    if (!query.trim()) return
    setSearching(true)
    setResult(null)
    setNotFound(false)
    try {
      const res = await fetch(`/api/admin/checkin?q=${encodeURIComponent(query.trim())}`)
      if (res.status === 404) { setNotFound(true); return }
      const data = await res.json()
      setResult(data)
    } catch {
      toast.error('Lookup failed. Check your connection.')
    } finally {
      setSearching(false)
    }
  }

  const checkIn = async () => {
    if (!result) return
    setCheckingIn(true)
    try {
      const res = await fetch('/api/admin/checkin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: result.id }),
      })
      if (!res.ok) throw new Error()
      toast.success(`${result.fullName} checked in successfully!`)
      setResult(prev => prev ? { ...prev, status: 'attended' } : null)
    } catch {
      toast.error('Check-in failed. Please try again.')
    } finally {
      setCheckingIn(false)
    }
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-white">Check-in</h1>
        <p className="text-white/40 text-sm mt-1">Look up by name, email, phone, or ticket ID.</p>
      </div>

      {/* Search bar */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
          <Input
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && lookup()}
            placeholder="Name, email, phone, or ticket ID…"
            className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-white/25 h-12"
            autoFocus
          />
        </div>
        <Button
          onClick={lookup}
          disabled={searching}
          className="bg-cyan-400 text-[#0a0a0f] hover:bg-cyan-300 font-semibold h-12 px-6"
        >
          {searching ? 'Looking up…' : 'Search'}
        </Button>
      </div>

      {/* Result */}
      {notFound && (
        <div className="rounded-2xl bg-[#14141f] border border-red-500/20 p-6 flex gap-4 items-center">
          <XCircle className="w-8 h-8 text-red-400 shrink-0" />
          <div>
            <p className="text-white font-semibold">Not Found</p>
            <p className="text-white/45 text-sm mt-1">No registration found for "{query}". Check spelling or try a different field.</p>
          </div>
        </div>
      )}

      {result && (
        <div className={`rounded-2xl bg-[#14141f] border overflow-hidden ${
          result.status === 'attended' ? 'border-emerald-500/30' :
          result.status === 'confirmed' ? 'border-cyan-400/30' : 'border-white/8'
        }`}>
          {/* Status banner */}
          <div className={`px-5 py-3 text-sm font-medium flex items-center gap-2 ${
            result.status === 'attended'
              ? 'bg-emerald-400/10 text-emerald-400'
              : result.status === 'confirmed'
              ? 'bg-cyan-400/10 text-cyan-400'
              : 'bg-amber-400/10 text-amber-400'
          }`}>
            {result.status === 'attended' ? (
              <><CheckCircle2 className="w-4 h-4" /> Already Checked In</>
            ) : result.status === 'confirmed' ? (
              <><CheckCircle2 className="w-4 h-4" /> Confirmed — Ready to Check In</>
            ) : (
              <><XCircle className="w-4 h-4" /> Not Confirmed — Status: {result.status}</>
            )}
          </div>

          {/* Details */}
          <div className="p-5 space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/8 flex items-center justify-center shrink-0">
                <User className="w-6 h-6 text-white/30" />
              </div>
              <div>
                <p className="text-white font-bold text-lg">{result.fullName}</p>
                <p className="text-white/50 text-sm">{result.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              {[
                ['Category', result.category],
                ['Organisation', result.organization],
                ['Lunch', result.lunchOptin ? 'Yes — pre-ordered' : 'No'],
                ['Ticket ID', result.id.slice(0, 8).toUpperCase()],
              ].map(([label, value]) => (
                <div key={label} className="p-3 rounded-xl bg-white/3 border border-white/8">
                  <p className="text-white/30 text-xs uppercase tracking-wider font-mono mb-1">{label}</p>
                  <p className="text-white/70 capitalize">{value}</p>
                </div>
              ))}
            </div>

            {result.status === 'confirmed' && (
              <Button
                onClick={checkIn}
                disabled={checkingIn}
                className="w-full bg-cyan-400 text-[#0a0a0f] hover:bg-cyan-300 font-bold h-12 text-base"
              >
                <CheckCircle2 className="w-5 h-5 mr-2" />
                {checkingIn ? 'Checking in…' : 'Mark as Attended'}
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
