import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="flex items-center gap-2 text-white/40 hover:text-white text-sm mb-10 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        <h1 className="text-3xl font-bold text-white mb-8">Terms & Conditions</h1>
        <div className="space-y-4 text-white/55 leading-relaxed text-sm">
          <p>By registering for the Understanding Aerial Systems workshop, you agree to the following terms.</p>
          <p><span className="text-white/80 font-medium">Attendance:</span> Registration confirms a seat. Ignit reserves the right to cancel a registration if payment verification fails or fraudulent information is detected.</p>
          <p><span className="text-white/80 font-medium">Conduct:</span> Participants are expected to maintain professional conduct throughout the session. Ignit reserves the right to remove participants who disrupt the event.</p>
          <p><span className="text-white/80 font-medium">Photography:</span> Ignit may photograph or record the event for promotional purposes. By attending you grant permission for your image to be used in this context.</p>
          <p><span className="text-white/80 font-medium">Liability:</span> Ignit is not responsible for personal injury, loss, or damage to property during the workshop.</p>
          <p><span className="text-white/80 font-medium">Changes:</span> Ignit reserves the right to modify the workshop schedule, venue, or content with reasonable notice to registered participants.</p>
          <p>For queries, contact <span className="text-cyan-400">support@ignit.in</span>.</p>
        </div>
      </div>
    </div>
  )
}
