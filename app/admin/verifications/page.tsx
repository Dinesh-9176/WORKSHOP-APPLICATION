'use client'

import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { CheckCircle2, XCircle, ExternalLink, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'

type Reg = {
  id: string
  fullName: string
  email: string
  phone: string
  category: string
  organization: string
  lunchOptin: boolean
  amountPaise: number
  upiTxnRef: string | null
  proofPath: string | null
  createdAt: string
}

export default function VerificationsPage() {
  const [items, setItems] = useState<Reg[]>([])
  const [loading, setLoading] = useState(true)
  const [rejectId, setRejectId] = useState<string | null>(null)
  const [rejectReason, setRejectReason] = useState('')
  const [processing, setProcessing] = useState<string | null>(null)

  const load = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/registrations?status=awaiting_verification')
      const data = await res.json()
      setItems(data.registrations || [])
    } catch {
      toast.error('Failed to load pending verifications.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const verify = async (id: string, action: 'approve' | 'reject') => {
    setProcessing(id)
    try {
      const res = await fetch(`/api/admin/verify/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, rejectionReason: action === 'reject' ? rejectReason : undefined }),
      })
      if (!res.ok) throw new Error('Action failed')
      toast.success(action === 'approve' ? 'Registration confirmed!' : 'Registration rejected.')
      setRejectId(null)
      setRejectReason('')
      load()
    } catch {
      toast.error('Action failed. Please try again.')
    } finally {
      setProcessing(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Pending Verifications</h1>
          <p className="text-white/40 text-sm mt-1">Review payment screenshots and confirm or reject.</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={load}
          className="border-white/15 text-white/50 hover:bg-white/5"
        >
          <RefreshCw className="w-3.5 h-3.5 mr-2" />
          Refresh
        </Button>
      </div>

      {loading ? (
        <div className="py-20 text-center text-white/25">Loading…</div>
      ) : items.length === 0 ? (
        <div className="py-20 text-center rounded-2xl bg-[#14141f] border border-white/8">
          <CheckCircle2 className="w-10 h-10 text-cyan-400/30 mx-auto mb-3" />
          <p className="text-white/40">No pending verifications. You're all caught up.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map(item => (
            <div key={item.id} className="rounded-2xl bg-[#14141f] border border-white/8 overflow-hidden">
              <div className="flex flex-col lg:flex-row">
                {/* Proof image */}
                <div className="lg:w-64 shrink-0 bg-black/20 flex items-center justify-center p-4 min-h-40">
                  {item.proofPath ? (
                    <a
                      href={`/api/proof/${item.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative block"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`/api/proof/${item.id}`}
                        alt="Payment proof"
                        className="max-h-52 rounded-xl object-contain"
                      />
                      <div className="absolute inset-0 rounded-xl bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <ExternalLink className="w-6 h-6 text-white" />
                      </div>
                    </a>
                  ) : (
                    <p className="text-white/25 text-sm text-center">No screenshot uploaded</p>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 p-5 flex flex-col justify-between gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-white font-bold text-lg">{item.fullName}</p>
                        <p className="text-white/50 text-sm">{item.email} · {item.phone}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-cyan-400 font-bold font-mono text-xl">₹{(item.amountPaise / 100)}</p>
                        {item.lunchOptin && <p className="text-white/30 text-xs">+ Lunch</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-white/30 text-xs uppercase tracking-wider font-mono">Category</span>
                        <p className="text-white/70 capitalize">{item.category}</p>
                      </div>
                      <div>
                        <span className="text-white/30 text-xs uppercase tracking-wider font-mono">Organisation</span>
                        <p className="text-white/70">{item.organization}</p>
                      </div>
                      <div>
                        <span className="text-white/30 text-xs uppercase tracking-wider font-mono">UPI Txn Ref</span>
                        <p className="text-white/70 font-mono text-xs">{item.upiTxnRef || '—'}</p>
                      </div>
                      <div>
                        <span className="text-white/30 text-xs uppercase tracking-wider font-mono">Submitted</span>
                        <p className="text-white/70 text-xs">{new Date(item.createdAt).toLocaleString('en-IN')}</p>
                      </div>
                    </div>
                  </div>

                  {/* Reject form */}
                  {rejectId === item.id && (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={rejectReason}
                        onChange={e => setRejectReason(e.target.value)}
                        placeholder="Reason for rejection (optional)"
                        className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/25 outline-none focus:border-red-400/40"
                      />
                      <Button
                        size="sm"
                        onClick={() => verify(item.id, 'reject')}
                        disabled={processing === item.id}
                        className="bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30"
                      >
                        Confirm Reject
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setRejectId(null)}
                        className="text-white/30"
                      >
                        Cancel
                      </Button>
                    </div>
                  )}

                  {/* Action buttons */}
                  {rejectId !== item.id && (
                    <div className="flex gap-3">
                      <Button
                        size="sm"
                        onClick={() => verify(item.id, 'approve')}
                        disabled={processing === item.id}
                        className="bg-cyan-400 text-[#0a0a0f] hover:bg-cyan-300 font-semibold"
                      >
                        <CheckCircle2 className="w-4 h-4 mr-1.5" />
                        {processing === item.id ? 'Processing…' : 'Approve'}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setRejectId(item.id)}
                        disabled={processing === item.id}
                        className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                      >
                        <XCircle className="w-4 h-4 mr-1.5" />
                        Reject
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
