import { redirect } from 'next/navigation'
import { getAdminFromCookie } from '@/lib/auth'
import AdminNav from '@/components/admin/AdminNav'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const isAdmin = await getAdminFromCookie()
  if (!isAdmin) redirect('/admin/login')

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <AdminNav />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  )
}
