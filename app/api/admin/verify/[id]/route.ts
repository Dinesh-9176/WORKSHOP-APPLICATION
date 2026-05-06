import { NextRequest } from 'next/server'
import { getAdminFromCookie } from '@/lib/auth'
import { db } from '@/lib/db'
import { registrations } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { randomUUID } from 'crypto'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const isAdmin = await getAdminFromCookie()
  if (!isAdmin) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const { action, rejectionReason } = await request.json()

  if (action !== 'approve' && action !== 'reject') {
    return Response.json({ error: 'Invalid action.' }, { status: 400 })
  }

  const rows = await db.select().from(registrations).where(eq(registrations.id, id))
  if (!rows[0]) return Response.json({ error: 'Not found.' }, { status: 404 })

  if (action === 'approve') {
    await db
      .update(registrations)
      .set({
        status: 'confirmed',
        qrToken: randomUUID(),
        verifiedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(registrations.id, id))
  } else {
    await db
      .update(registrations)
      .set({
        status: 'rejected',
        rejectionReason: rejectionReason || null,
        updatedAt: new Date(),
      })
      .where(eq(registrations.id, id))
  }

  return Response.json({ ok: true })
}
