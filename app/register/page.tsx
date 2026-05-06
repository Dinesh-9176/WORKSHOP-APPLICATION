'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, ArrowLeft, ArrowRight, Upload, CheckCircle2, X } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { registerSchema, type RegisterInput } from '@/lib/validations'

const STEPS = ['Details', 'Lunch & Summary', 'Payment']

export default function RegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [proofFile, setProofFile] = useState<File | null>(null)
  const [proofPreview, setProofPreview] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: { lunchOptin: false },
  })

  const lunchOptin = watch('lunchOptin')
  const category = watch('category')
  const totalAmount = lunchOptin ? 600 : 500

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File too large. Maximum 5 MB allowed.')
      return
    }
    setProofFile(file)
    setProofPreview(URL.createObjectURL(file))
  }

  const nextStep = async () => {
    const fieldsToValidate: (keyof RegisterInput)[][] = [
      ['fullName', 'email', 'phone', 'category', 'organization'],
      ['lunchOptin'],
      ['upiTxnRef'],
    ]
    const valid = await trigger(fieldsToValidate[step])
    if (valid) setStep(s => s + 1)
  }

  const onSubmit = async (data: RegisterInput) => {
    if (!proofFile) {
      toast.error('Please upload your payment screenshot.')
      return
    }
    setSubmitting(true)
    try {
      const formData = new FormData()
      Object.entries(data).forEach(([k, v]) => formData.append(k, String(v)))
      formData.append('proof', proofFile)

      const res = await fetch('/api/register', { method: 'POST', body: formData })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Registration failed')
      router.push(`/register/success?id=${json.id}`)
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col">
      {/* Top bar */}
      <div className="border-b border-white/8 bg-[#0a0a0f]/80 backdrop-blur-xl sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-medium text-white/70">Session 01 Registration</span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full px-4 py-10">
        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-10">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border transition-all ${
                  i < step
                    ? 'bg-cyan-400 border-cyan-400 text-[#0a0a0f]'
                    : i === step
                    ? 'border-cyan-400 text-cyan-400'
                    : 'border-white/15 text-white/25'
                }`}
              >
                {i < step ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
              </div>
              <span className={`text-sm ${i === step ? 'text-white' : 'text-white/30'}`}>{s}</span>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-px w-8 mx-1 ${i < step ? 'bg-cyan-400/50' : 'bg-white/10'}`} />
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {step === 0 && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-bold text-white">Your Details</h1>
                  <p className="text-white/50 text-sm mt-1">Tell us a bit about yourself.</p>
                </div>
                <div className="space-y-4">
                  <Field label="Full Name" error={errors.fullName?.message}>
                    <Input {...register('fullName')} placeholder="As on your ID" className="bg-white/5 border-white/10 text-white placeholder:text-white/25 focus:border-cyan-400/50" />
                  </Field>
                  <Field label="Email Address" error={errors.email?.message}>
                    <Input {...register('email')} type="email" placeholder="you@email.com" className="bg-white/5 border-white/10 text-white placeholder:text-white/25 focus:border-cyan-400/50" />
                  </Field>
                  <Field label="Mobile Number" error={errors.phone?.message}>
                    <Input {...register('phone')} type="tel" placeholder="10-digit Indian number" className="bg-white/5 border-white/10 text-white placeholder:text-white/25 focus:border-cyan-400/50" />
                  </Field>
                  <Field label="I am a…" error={errors.category?.message}>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {['student', 'professional', 'hobbyist', 'entrepreneur', 'other'].map(c => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => setValue('category', c as RegisterInput['category'])}
                          className={`px-3 py-2 rounded-xl text-sm border capitalize transition-all ${
                            category === c
                              ? 'bg-cyan-400/15 border-cyan-400/50 text-cyan-400'
                              : 'bg-white/3 border-white/10 text-white/50 hover:border-white/25'
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </Field>
                  <Field label="College / Organisation" error={errors.organization?.message}>
                    <Input {...register('organization')} placeholder="Where do you study or work?" className="bg-white/5 border-white/10 text-white placeholder:text-white/25 focus:border-cyan-400/50" />
                  </Field>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-bold text-white">Lunch & Summary</h1>
                  <p className="text-white/50 text-sm mt-1">Optional add-on before you pay.</p>
                </div>

                {/* Lunch opt-in */}
                <div
                  onClick={() => setValue('lunchOptin', !lunchOptin)}
                  className={`flex items-center justify-between p-5 rounded-2xl border cursor-pointer transition-all ${
                    lunchOptin ? 'bg-cyan-400/8 border-cyan-400/30' : 'bg-white/3 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div>
                    <p className="text-white font-medium">Add Lunch — ₹100</p>
                    <p className="text-white/45 text-sm mt-0.5">Pre-order a meal for the lunch break</p>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    lunchOptin ? 'bg-cyan-400 border-cyan-400' : 'border-white/25'
                  }`}>
                    {lunchOptin && <CheckCircle2 className="w-4 h-4 text-[#0a0a0f]" />}
                  </div>
                </div>

                {/* Summary */}
                <div className="rounded-2xl bg-[#14141f] border border-white/8 overflow-hidden">
                  <div className="px-5 py-4 border-b border-white/8">
                    <h3 className="text-white font-semibold">Order Summary</h3>
                  </div>
                  <div className="px-5 py-4 space-y-3">
                    <SummaryRow label="Session 01 — Understanding Aerial Systems" value="₹500" />
                    {lunchOptin && <SummaryRow label="Lunch (pre-order)" value="₹100" />}
                    <SummaryRow label="Refreshments" value="Free" accent />
                    <SummaryRow label="Certificate of Participation" value="Included" accent />
                    <div className="h-px bg-white/8" />
                    <div className="flex justify-between items-center">
                      <span className="text-white font-semibold">Total Payable</span>
                      <span className="text-cyan-400 font-bold font-mono text-xl">₹{totalAmount}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-bold text-white">Payment</h1>
                  <p className="text-white/50 text-sm mt-1">Scan the QR, pay, then upload your screenshot.</p>
                </div>

                {/* GPay QR */}
                <div className="rounded-2xl bg-[#14141f] border border-white/8 p-6 text-center space-y-4">
                  <p className="text-white/40 text-xs font-mono uppercase tracking-widest">Pay via Google Pay / UPI</p>

                  {/* QR placeholder — replace with <Image src="/gpay-qr.png"> when ready */}
                  <div className="mx-auto w-52 h-52 rounded-2xl border-2 border-dashed border-white/15 bg-white/3 flex flex-col items-center justify-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-cyan-400" />
                    </div>
                    <p className="text-white/40 text-xs text-center px-4">
                      Drop your GPay QR image at<br />
                      <code className="text-cyan-400/70 text-[10px]">public/gpay-qr.png</code>
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-white font-semibold text-lg font-mono">UPI ID: <span className="text-cyan-400">your-upi@bank</span></p>
                    <p className="text-white/40 text-sm">Payee: Ignit Technical Solutions</p>
                  </div>

                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-400/10 border border-cyan-400/20">
                    <span className="text-cyan-400 font-bold font-mono text-lg">₹{totalAmount}</span>
                    <span className="text-white/40 text-sm">— exact amount only</span>
                  </div>
                </div>

                {/* Upload proof */}
                <div className="space-y-3">
                  <Field label="Upload Payment Screenshot" error={undefined}>
                    {proofPreview ? (
                      <div className="relative rounded-xl overflow-hidden border border-cyan-400/30">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={proofPreview} alt="Payment proof" className="w-full max-h-52 object-contain bg-black/20" />
                        <button
                          type="button"
                          onClick={() => { setProofFile(null); setProofPreview(null) }}
                          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 flex items-center justify-center hover:bg-black/80 transition-colors"
                        >
                          <X className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center gap-3 p-8 rounded-xl border-2 border-dashed border-white/15 bg-white/3 cursor-pointer hover:border-cyan-400/30 hover:bg-cyan-400/3 transition-all">
                        <Upload className="w-8 h-8 text-white/30" />
                        <div className="text-center">
                          <p className="text-white/60 text-sm">Click to upload screenshot</p>
                          <p className="text-white/30 text-xs mt-1">JPG, PNG or WebP · Max 5 MB</p>
                        </div>
                        <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                      </label>
                    )}
                  </Field>

                  <Field label="UPI Transaction ID" error={errors.upiTxnRef?.message}>
                    <Input
                      {...register('upiTxnRef')}
                      placeholder="12-digit reference from your GPay confirmation"
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/25 focus:border-cyan-400/50 font-mono"
                    />
                  </Field>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/8">
          {step > 0 ? (
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep(s => s - 1)}
              className="border-white/15 text-white/60 hover:bg-white/5 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          ) : (
            <div />
          )}

          {step < STEPS.length - 1 ? (
            <Button
              type="button"
              onClick={nextStep}
              className="bg-cyan-400 text-[#0a0a0f] hover:bg-cyan-300 font-semibold"
            >
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={submitting}
              className="bg-cyan-400 text-[#0a0a0f] hover:bg-cyan-300 font-bold px-8 disabled:opacity-60"
            >
              {submitting ? 'Submitting…' : 'Submit Registration'}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-white/70 text-sm">{label}</Label>
      {children}
      {error && <p className="text-red-400 text-xs">{error}</p>}
    </div>
  )
}

function SummaryRow({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-white/50">{label}</span>
      <span className={accent ? 'text-cyan-400' : 'text-white'}>{value}</span>
    </div>
  )
}
