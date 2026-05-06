import { db } from '@/lib/db'
import { registrations } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { notFound } from 'next/navigation'
import { Zap, Calendar, Clock, Award } from 'lucide-react'
import QRCode from 'qrcode'

export default async function TicketPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  let reg
  try {
    const rows = await db.select().from(registrations).where(eq(registrations.id, id))
    reg = rows[0]
  } catch {
    notFound()
  }

  if (!reg || reg.status !== 'confirmed') notFound()

  const qrDataUrl = await QRCode.toDataURL(
    `${process.env.NEXT_PUBLIC_BASE_URL}/ticket/${id}`,
    { width: 200, margin: 1, color: { dark: '#0a0a0f', light: '#ffffff' } }
  )

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        {/* Ticket card */}
        <div className="rounded-3xl bg-[#14141f] border border-white/10 overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-cyan-500/20 to-violet-600/20 border-b border-white/8 px-7 py-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-cyan-400/20 border border-cyan-400/30 flex items-center justify-center">
                <Zap className="w-4 h-4 text-cyan-400" />
              </div>
              <div>
                <p className="text-xs text-white/40 font-mono tracking-widest uppercase">Ignit Technical</p>
                <p className="text-white font-semibold text-sm">Engineering the Future</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-white/40 font-mono">SESSION</p>
              <p className="text-cyan-400 font-bold font-mono text-lg">01</p>
            </div>
          </div>

          {/* Body */}
          <div className="px-7 py-6 space-y-5">
            <div>
              <p className="text-xs text-white/30 uppercase tracking-widest font-mono mb-1">Ticket Holder</p>
              <p className="text-white text-xl font-bold">{reg.fullName}</p>
              <p className="text-white/50 text-sm">{reg.email}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <InfoBlock icon={Calendar} label="Event" value="Understanding Aerial Systems" />
              <InfoBlock icon={Clock} label="Time" value="10:00 AM – 5:00 PM" />
              <InfoBlock icon={Award} label="Certificate" value="Yes — upon completion" />
              <div className="p-3 rounded-xl bg-white/3 border border-white/8">
                <p className="text-white/35 text-xs uppercase tracking-widest font-mono mb-1">Category</p>
                <p className="text-white text-sm capitalize font-medium">{reg.category}</p>
              </div>
            </div>

            {/* Perforated divider */}
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 rounded-full bg-[#0a0a0f] -ml-10 border-r border-white/8" />
              <div className="flex-1 border-t border-dashed border-white/10" />
              <div className="w-4 h-4 rounded-full bg-[#0a0a0f] -mr-10 border-l border-white/8" />
            </div>

            {/* QR */}
            <div className="flex flex-col items-center gap-3">
              <div className="p-3 rounded-2xl bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={qrDataUrl} alt="Ticket QR" width={160} height={160} />
              </div>
              <p className="font-mono text-white/30 text-xs">{id.toUpperCase()}</p>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-white/8 px-7 py-4 bg-cyan-400/3">
            <p className="text-center text-xs text-white/30">
              Present this ticket (digital or printed) at the venue.<br />
              Certificate of Participation will be issued on completion.
            </p>
          </div>
        </div>

        <p className="text-center text-white/25 text-xs mt-5">
          Screenshot or bookmark this page to access your ticket anytime.
        </p>
      </div>
    </div>
  )
}

function InfoBlock({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="p-3 rounded-xl bg-white/3 border border-white/8">
      <div className="flex items-center gap-1.5 mb-1">
        <Icon className="w-3 h-3 text-cyan-400/60" />
        <p className="text-white/35 text-xs uppercase tracking-widest font-mono">{label}</p>
      </div>
      <p className="text-white text-sm font-medium leading-snug">{value}</p>
    </div>
  )
}
