'use client'

type MediaDoc = { id?: string | number; url?: string; mimeType?: string; filename?: string }

type Props = {
  cellData?: MediaDoc | string | number | null
  rowData?: Record<string, unknown>
}

export default function DealerLicenseCell({ cellData, rowData }: Props) {
  // TEMP DEBUG: always show something to confirm component renders on live
  return <span style={{ color: 'red', fontWeight: 700, fontSize: 12 }}>CELL-OK</span>
}
