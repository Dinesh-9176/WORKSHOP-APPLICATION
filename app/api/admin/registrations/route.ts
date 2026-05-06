import { NextRequest } from 'next/server'
import { getAdminFromCookie } from '@/lib/auth'
import { db } from '@/lib/db'
import { registrations } from '@/lib/db/schema'
import { eq, or, ilike, sql } from 'drizzle-orm'
import type { Registration } from '@/lib/db/schema'

export async function GET(request: NextRequest) {
  const isAdmin = await getAdminFromCookie()
  if (!isAdmin) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status')
  const search = searchParams.get('search')

  let query = db.select().from(registrations).$dynamic()

  if (status) {
    query = query.where(eq(registrations.status, status as Registration['status']))
  }

  if (search) {
    query = query.where(
      or(
        ilike(registrations.fullName, `%${search}%`),
        ilike(registrations.email, `%${search}%`),
        ilike(registrations.phone, `%${search}%`)
      )
    )
  }

  const rows = await query.orderBy(sql`created_at desc`)

  return Response.json({ registrations: rows })
}
