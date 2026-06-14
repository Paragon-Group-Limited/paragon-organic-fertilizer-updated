import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { texts } = await req.json() as { texts: string[] }
    if (!Array.isArray(texts)) {
      return NextResponse.json({ error: 'texts must be an array' }, { status: 400 })
    }

    const translations = await Promise.all(
      texts.map(async (text: string) => {
        if (!text?.trim()) return text
        try {
          const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=bn&tl=en&dt=t&q=${encodeURIComponent(text)}`
          const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } })
          if (!res.ok) return text
          const data = await res.json()
          return data?.[0]?.map((x: [string]) => x[0]).join('') || text
        } catch {
          return text
        }
      })
    )

    return NextResponse.json({ translations })
  } catch {
    return NextResponse.json({ error: 'Translation failed' }, { status: 500 })
  }
}
