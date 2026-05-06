import { NextRequest } from 'next/server'
import { getAdminFromCookie } from '@/lib/auth'
import { db } from '@/lib/db'
import { registrations } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { readFile } from 'fs/promises'
import path from 'path'

const UPLOAD_DIR = process.env.UPLOAD_DIR
  ? path.resolve(process.env.UPLOAD_DIR)
  : path.resolve('./uploads')

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const isAdmin = await getAdminFromCookie()
  if (!isAdmin) {
    return new Response('Unauthorized', { status: 401 })
  }

  const { id } = await params
  if (!/^[0-9a-f-]{36}$/i.test(id)) {
    return new Response('Invalid ID', { status: 400 })
  }

  const rows = await db.select().from(registrations).where(eq(registrations.id, id))
  const reg = rows[0]

  if (!reg?.proofPath) {
    return new Response('Not found', { status: 404 })
  }

  const safeName = path.basename(reg.proofPath)
  const filePath = path.join(UPLOAD_DIR, safeName)

  try {
    const buffer = await readFile(filePath)
    const ext = safeName.split('.').pop()?.toLowerCase()
    const mimeMap: Record<string, string> = {
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      png: 'image/png',
      webp: 'image/webp',
    }
    const contentType = mimeMap[ext || ''] || 'application/octet-stream'
    return new Response(buffer, {
      headers: { 'Content-Type': contentType, 'Cache-Control': 'private, max-age=3600' },
    })
  } catch {
    return new Response('File not found', { status: 404 })
  }
}
