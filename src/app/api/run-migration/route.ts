import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const payload = await getPayload({ config })
    const db = (payload.db as any).drizzle ?? (payload.db as any).pool ?? (payload.db as any).client

    // Use raw SQL via Payload's db pool
    const pool = (payload.db as any).pool
    if (!pool) {
      return NextResponse.json({ error: 'No pool found' }, { status: 500 })
    }

    const sql = `
      ALTER TABLE dealers
        ADD COLUMN IF NOT EXISTS org text,
        ADD COLUMN IF NOT EXISTS upazila text,
        ADD COLUMN IF NOT EXISTS address text,
        ADD COLUMN IF NOT EXISTS alternate_phone text,
        ADD COLUMN IF NOT EXISTS experience text,
        ADD COLUMN IF NOT EXISTS trade_license_id integer,
        ADD COLUMN IF NOT EXISTS type text DEFAULT 'sub',
        ADD COLUMN IF NOT EXISTS coordinates_lat numeric,
        ADD COLUMN IF NOT EXISTS coordinates_lng numeric;
    `

    await pool.query(sql)

    return NextResponse.json({ success: true, message: 'Migration complete' })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    const cause = (err as any)?.cause?.message ?? null
    return NextResponse.json({ error: message, cause }, { status: 500 })
  }
}
