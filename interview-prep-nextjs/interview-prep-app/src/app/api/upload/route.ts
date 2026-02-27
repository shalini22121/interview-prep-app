import { NextRequest, NextResponse } from 'next/server'
export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData()
    const file = form.get('file') as File | null
    const questionId = form.get('questionId') as string | null
    if (!file) return NextResponse.json({ ok: false, error: 'No file' }, { status: 400 })

    // TODO: upload file to S3/Azure/GCS from here
    return NextResponse.json({
      ok: true,
      id: `${questionId || 'all'}-${Date.now()}`,
      fileName: file.name,
      type: file.type,
      size: file.size,
    })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ ok: false, error: 'Upload failed' }, { status: 500 })
  }
}