import { NextRequest } from 'next/server'
import { db } from '@/lib/db'
import { registrations } from '@/lib/db/schema'
import { registerSchema } from '@/lib/validations'
import { getSupabase } from '@/lib/supabase'
import crypto from 'crypto'

// Storage bucket name
const BUCKET = 'proofs'

export async function POST(request: NextRequest) {
  let step = 'starting'
  try {
    const supabase = getSupabase()
    const formData = await request.formData()
    step = 'parsing_formdata'

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

    step = 'preparing_upload'
    const id = crypto.randomUUID()
    const ext = proof.name.split('.').pop()?.toLowerCase() || 'jpg'
    const filename = `${id}.${ext}`
    const buffer = Buffer.from(await proof.arrayBuffer())
    
    step = 'uploading_to_storage'
    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(filename, buffer, {
        contentType: proof.type,
        upsert: false
      })

    if (uploadError) {
      console.error('Storage error:', uploadError)
      return Response.json({ 
        error: 'Failed to upload proof.', 
        details: uploadError.message,
        step 
      }, { status: 500 })
    }

    step = 'inserting_to_db'
    const amountPaise = data.lunchOptin ? 60000 : 50000

    try {
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
    } catch (dbErr) {
      console.error('Database error:', dbErr)
      return Response.json({ 
        error: 'Failed to save to database.', 
        details: dbErr instanceof Error ? dbErr.message : String(dbErr),
        step
      }, { status: 500 })
    }

    return Response.json({ id }, { status: 201 })
  } catch (err) {
    console.error('Unexpected error at step ' + step + ':', err)
    return Response.json({ 
      error: 'Internal server error', 
      details: err instanceof Error ? err.message : String(err),
      step
    }, { status: 500 })
  }
}
