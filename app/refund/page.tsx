import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="flex items-center gap-2 text-white/40 hover:text-white text-sm mb-10 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        <h1 className="text-3xl font-bold text-white mb-8">Refund Policy</h1>
        <div className="space-y-4 text-white/55 leading-relaxed text-sm">
          <p>Registration fees for Ignit workshops are non-refundable once payment has been verified and the registration confirmed.</p>
          <p>If your payment was deducted but your registration was rejected (e.g. due to an incorrect screenshot), a full refund will be processed within 5–7 working days via the original UPI payment method.</p>
          <p>In the unlikely event that Ignit cancels the workshop, all registered participants will receive a full refund within 7 working days.</p>
          <p>For refund requests or disputes, contact us at <span className="text-cyan-400">support@ignit.in</span> with your registration reference ID.</p>
        </div>
      </div>
    </div>
  )
}
