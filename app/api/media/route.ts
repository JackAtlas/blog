import { handleMediaUpload } from '@/lib/media'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  try {
    const form = await req.formData()
    const file = form.get('file') as File | null
    if (!file)
      return NextResponse.json(
        { error: 'file required' },
        { status: 400 }
      )

    const { record, reused } = await handleMediaUpload(file)

    return NextResponse.json({ ok: true, data: record, reused })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : '上传失败，未知错误'
      },
      { status: 500 }
    )
  }
}
