import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="flex items-center gap-2 text-white/40 hover:text-white text-sm mb-10 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        <h1 className="text-3xl font-bold text-white mb-8">Privacy Policy</h1>
        <div className="prose prose-invert prose-sm max-w-none space-y-4 text-white/55 leading-relaxed">
          <p>Ignit Technical Solutions Pvt Ltd ("Ignit", "we", "us") collects personal information (name, email, phone number, and organisation) solely for the purpose of registering participants for the Understanding Aerial Systems workshop (Session 01).</p>
          <p>Information collected during registration is used only to manage attendance, issue certificates, and communicate workshop-related updates. We do not sell or share your data with third parties.</p>
          <p>Payment screenshots uploaded during registration are stored securely and accessed only by authorised Ignit staff for verification purposes. They are deleted after the event.</p>
          <p>By registering you consent to us contacting you at the email and phone number provided for workshop-related communications.</p>
          <p>For any data-related queries, contact us at <span className="text-cyan-400">support@ignit.in</span>.</p>
        </div>
      </div>
    </div>
  )
}
