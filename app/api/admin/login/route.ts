import { NextRequest } from 'next/server'
import { signAdminToken, COOKIE_NAME } from '@/lib/auth'

export async function POST(request: NextRequest) {
  const { email, password } = await request.json()

  const adminEmail = process.env.ADMIN_EMAIL
  const adminPassword = process.env.ADMIN_PASSWORD

  if (!adminEmail || !adminPassword) {
    return Response.json({ error: 'Admin credentials not configured.' }, { status: 500 })
  }

  if (email !== adminEmail || password !== adminPassword) {
    return Response.json({ error: 'Invalid credentials.' }, { status: 401 })
  }

  const token = await signAdminToken()

  const response = Response.json({ ok: true })
  response.headers.set(
    'Set-Cookie',
    `${COOKIE_NAME}=${token}; HttpOnly; Path=/; Max-Age=43200; SameSite=Lax`
  )
  return response
}
