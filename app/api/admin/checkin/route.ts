import { NextRequest } from 'next/server'
import { getAdminFromCookie } from '@/lib/auth'
import { db } from '@/lib/db'
import { registrations } from '@/lib/db/schema'
import { eq, or, ilike } from 'drizzle-orm'

export async function GET(request: NextRequest) {
  const isAdmin = await getAdminFromCookie()
  if (!isAdmin) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const q = new URL(request.url).searchParams.get('q') || ''
  if (!q) return Response.json({ error: 'Query required.' }, { status: 400 })

  const rows = await db
    .select()
    .from(registrations)
    .where(
      or(
        ilike(registrations.fullName, `%${q}%`),
        ilike(registrations.email, `%${q}%`),
        ilike(registrations.phone, `%${q}%`),
        ilike(registrations.id, `%${q}%`)
      )
    )
    .limit(1)

  if (!rows[0]) return Response.json({ error: 'Not found.' }, { status: 404 })
  return Response.json(rows[0])
}

export async function POST(request: NextRequest) {
  const isAdmin = await getAdminFromCookie()
  if (!isAdmin) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await request.json()
  const rows = await db.select().from(registrations).where(eq(registrations.id, id))
  const reg = rows[0]

  if (!reg) return Response.json({ error: 'Not found.' }, { status: 404 })
  if (reg.status === 'attended') return Response.json({ error: 'Already checked in.' }, { status: 409 })
  if (reg.status !== 'confirmed') return Response.json({ error: 'Registration not confirmed.' }, { status: 400 })

  await db
    .update(registrations)
    .set({ status: 'attended', updatedAt: new Date() })
    .where(eq(registrations.id, id))

  return Response.json({ ok: true })
}
