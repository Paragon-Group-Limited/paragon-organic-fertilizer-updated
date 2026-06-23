import { Pool } from 'pg'
import { NextResponse } from 'next/server'

export async function GET() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL })
  try {
    const result = await pool.query(`
      ALTER TABLE dealers
        ADD COLUMN IF NOT EXISTS org text,
        ADD COLUMN IF NOT EXISTS upazila text,
        ADD COLUMN IF NOT EXISTS address text,
        ADD COLUMN IF NOT EXISTS alternate_phone text,
        ADD COLUMN IF NOT EXISTS experience text,
        ADD COLUMN IF NOT EXISTS trade_license_id integer,
        ADD COLUMN IF NOT EXISTS status text DEFAULT 'pending',
        ADD COLUMN IF NOT EXISTS type text DEFAULT 'sub',
        ADD COLUMN IF NOT EXISTS coordinates_lat numeric,
        ADD COLUMN IF NOT EXISTS coordinates_lng numeric;
    `)
    return NextResponse.json({ success: true, message: 'Migration complete', result: result.command })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  } finally {
    await pool.end()
  }
}
