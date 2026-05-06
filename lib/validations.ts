import { z } from 'zod'

export const registerSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Enter a valid email'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'),
  category: z.enum(['student', 'professional', 'hobbyist', 'entrepreneur', 'other']),
  organization: z.string().min(1, 'College / organisation is required'),
  lunchOptin: z.boolean(),
  upiTxnRef: z.string().min(6, 'Enter your UPI transaction ID'),
})

export type RegisterInput = z.infer<typeof registerSchema>
