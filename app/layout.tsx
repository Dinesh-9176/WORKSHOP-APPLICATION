import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const geistSans = Geist({
  variable: '--font-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Understanding Aerial Systems — Session 01 | Ignit Technical Solutions',
  description:
    'A comprehensive hands-on workshop on UAV technology & aerial engineering. 10 AM – 5 PM · ₹500 · Certificate provided. Organised by Ignit Technical Solutions Pvt Ltd.',
  openGraph: {
    title: 'Understanding Aerial Systems — Session 01',
    description: 'Hands-on UAV & aerial engineering workshop by Ignit Technical Solutions.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#0a0a0f] text-white">
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  )
}
