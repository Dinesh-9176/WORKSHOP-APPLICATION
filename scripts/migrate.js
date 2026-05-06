// Runs at container startup — creates tables if they don't exist.
// Uses pg directly so no drizzle-kit needed in the production image.
const { Client } = require('pg')

async function migrate() {
  const client = new Client({ connectionString: process.env.DATABASE_URL })
  await client.connect()
  console.log('[migrate] Connected to Postgres.')

  try {
    await client.query(`
      DO $$ BEGIN
        CREATE TYPE category AS ENUM (
          'student', 'professional', 'hobbyist', 'entrepreneur', 'other'
        );
      EXCEPTION WHEN duplicate_object THEN NULL;
      END $$;

      DO $$ BEGIN
        CREATE TYPE reg_status AS ENUM (
          'awaiting_verification', 'confirmed', 'rejected', 'attended', 'cancelled'
        );
      EXCEPTION WHEN duplicate_object THEN NULL;
      END $$;

      CREATE TABLE IF NOT EXISTS registrations (
        id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        full_name           TEXT NOT NULL,
        email               TEXT NOT NULL,
        phone               TEXT NOT NULL,
        category            category NOT NULL,
        organization        TEXT NOT NULL,
        lunch_optin         BOOLEAN NOT NULL DEFAULT false,
        amount_paise        INTEGER NOT NULL,
        status              reg_status NOT NULL DEFAULT 'awaiting_verification',
        qr_token            TEXT UNIQUE,
        upi_txn_ref         TEXT,
        proof_path          TEXT,
        proof_uploaded_at   TIMESTAMPTZ,
        verified_at         TIMESTAMPTZ,
        rejection_reason    TEXT,
        created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `)
    console.log('[migrate] Schema ready.')
  } finally {
    await client.end()
  }
}

migrate().catch(err => {
  console.error('[migrate] FAILED:', err.message)
  process.exit(1)
})
