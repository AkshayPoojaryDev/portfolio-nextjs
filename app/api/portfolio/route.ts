import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const DATA_PATH = path.join(process.cwd(), 'data', 'portfolio.json')

export async function GET() {
  try {
    const raw = fs.readFileSync(DATA_PATH, 'utf-8')
    return NextResponse.json(JSON.parse(raw))
  } catch {
    return NextResponse.json({ error: 'Failed to read data' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json()
    fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), 'utf-8')
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 })
  }
}
