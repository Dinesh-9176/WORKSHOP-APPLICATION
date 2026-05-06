import Link from 'next/link'
import { Zap } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-white/8 bg-[#08080f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Brand */}
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-cyan-400/10 border border-cyan-400/25 flex items-center justify-center">
                <Zap className="w-4 h-4 text-cyan-400" />
              </div>
              <span className="font-semibold">
                <span className="text-cyan-400">Ignit</span>
                <span className="text-white/70"> Technical Solutions</span>
              </span>
            </div>
            <p className="text-white/35 text-xs max-w-xs">
              Engineering the Future · Workshop Series
              <br />
              Session 01 — Understanding Aerial Systems
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/40">
              <Link href="/register" className="hover:text-cyan-400 transition-colors">Register</Link>
              <Link href="/privacy" className="hover:text-white/70 transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white/70 transition-colors">Terms & Conditions</Link>
              <Link href="/refund" className="hover:text-white/70 transition-colors">Refund Policy</Link>
              <Link href="/admin/login" className="hover:text-white/40 transition-colors text-white/20">Admin</Link>
            </div>
            <p className="text-white/25 text-xs">
              © {new Date().getFullYear()} Ignit Technical Solutions Pvt Ltd. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
