import {
  pgTable,
  uuid,
  text,
  boolean,
  integer,
  timestamp,
  pgEnum,
} from 'drizzle-orm/pg-core'

export const categoryEnum = pgEnum('category', [
  'student',
  'professional',
  'hobbyist',
  'entrepreneur',
  'other',
])

export const statusEnum = pgEnum('reg_status', [
  'awaiting_verification',
  'confirmed',
  'rejected',
  'attended',
  'cancelled',
])

export const registrations = pgTable('registrations', {
  id: uuid('id').primaryKey().defaultRandom(),
  fullName: text('full_name').notNull(),
  email: text('email').notNull(),
  phone: text('phone').notNull(),
  category: categoryEnum('category').notNull(),
  organization: text('organization').notNull(),
  lunchOptin: boolean('lunch_optin').notNull().default(false),
  amountPaise: integer('amount_paise').notNull(),
  status: statusEnum('status').notNull().default('awaiting_verification'),
  qrToken: text('qr_token').unique(),
  upiTxnRef: text('upi_txn_ref'),
  proofPath: text('proof_path'),
  proofUploadedAt: timestamp('proof_uploaded_at', { withTimezone: true }),
  verifiedAt: timestamp('verified_at', { withTimezone: true }),
  rejectionReason: text('rejection_reason'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})

export type Registration = typeof registrations.$inferSelect
export type NewRegistration = typeof registrations.$inferInsert
