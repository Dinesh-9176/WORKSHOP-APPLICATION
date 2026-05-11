import { NextRequest } from 'next/server'
import { db } from '@/lib/db'
import { registrations } from '@/lib/db/schema'
import { registerSchema } from '@/lib/validations'
import { supabase } from '@/lib/supabase'

// Storage bucket name
const BUCKET = 'proofs'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const raw = {
      fullName: formData.get('fullName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      category: formData.get('category'),
      organization: formData.get('organization'),
      lunchOptin: formData.get('lunchOptin') === 'true',
      upiTxnRef: formData.get('upiTxnRef'),
    }

    const parsed = registerSchema.safeParse(raw)
    if (!parsed.success) {
      return Response.json(
        { error: 'Validation failed', issues: parsed.error.issues },
        { status: 400 }
      )
    }

    const data = parsed.data
    const proof = formData.get('proof') as File | null

    if (!proof || proof.size === 0) {
      return Response.json({ error: 'Payment screenshot is required.' }, { status: 400 })
    }

    if (proof.size > 5 * 1024 * 1024) {
      return Response.json({ error: 'Screenshot too large. Max 5 MB.' }, { status: 400 })
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(proof.type)) {
      return Response.json({ error: 'Invalid file type. JPG/PNG/WebP only.' }, { status: 400 })
    }

    const id = crypto.randomUUID()
    const ext = proof.name.split('.').pop()?.toLowerCase() || 'jpg'
    const filename = `${id}.${ext}`

    const buffer = Buffer.from(await proof.arrayBuffer())
    
    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(filename, buffer, {
        contentType: proof.type,
        upsert: false
      })

    if (uploadError) {
      console.error('Storage error:', uploadError)
      return Response.json({ error: 'Failed to upload proof.' }, { status: 500 })
    }

    const amountPaise = data.lunchOptin ? 60000 : 50000

    await db.insert(registrations).values({
      id,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      category: data.category,
      organization: data.organization,
      lunchOptin: data.lunchOptin,
      amountPaise,
      upiTxnRef: data.upiTxnRef,
      proofPath: filename,
      proofUploadedAt: new Date(),
      status: 'awaiting_verification',
    })

    return Response.json({ id }, { status: 201 })
  } catch (err) {
    console.error('Registration error:', err)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
