import { CheckCircle2, Clock, Mail } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>
}) {
  const { id } = await searchParams

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full text-center space-y-8">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-cyan-400/10 border border-cyan-400/25 flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-cyan-400" />
          </div>
        </div>

        {/* Text */}
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-white">Registration Submitted!</h1>
          <p className="text-white/55 leading-relaxed">
            Your registration is under review. Once we verify your payment screenshot, you will receive a confirmation with your ticket.
          </p>
        </div>

        {/* Status card */}
        <div className="rounded-2xl bg-[#14141f] border border-white/8 p-6 text-left space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-amber-400 font-medium text-sm">Awaiting Payment Verification</span>
          </div>
          <div className="h-px bg-white/8" />
          <div className="flex gap-3 items-start text-sm text-white/50">
            <Clock className="w-4 h-4 mt-0.5 shrink-0 text-white/25" />
            <p>Verification is typically completed within 24 hours. You may save or screenshot this page.</p>
          </div>
          {id && (
            <div className="flex gap-3 items-start text-sm text-white/50">
              <Mail className="w-4 h-4 mt-0.5 shrink-0 text-white/25" />
              <p>
                Reference ID:{' '}
                <span className="font-mono text-white/70 text-xs bg-white/5 px-2 py-0.5 rounded">
                  {id}
                </span>
              </p>
            </div>
          )}
        </div>

        {/* What's next */}
        <div className="rounded-2xl bg-cyan-400/5 border border-cyan-400/15 p-5 text-left space-y-3">
          <h3 className="text-white font-semibold text-sm">What Happens Next?</h3>
          {[
            'Our team verifies your payment screenshot.',
            'Your registration is confirmed and a ticket QR is generated.',
            'Bring this ticket (digital or printed) on the day of the workshop.',
          ].map((s, i) => (
            <div key={i} className="flex gap-3 text-sm text-white/50">
              <span className="font-mono text-cyan-400/60 shrink-0">{String(i + 1).padStart(2, '0')}.</span>
              {s}
            </div>
          ))}
        </div>

        <Link href="/">
          <Button variant="outline" className="border-white/15 text-white/60 hover:bg-white/5 hover:text-white">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  )
}
