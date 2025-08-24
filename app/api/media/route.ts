import { getAllMediaData } from '@/lib/actions/media/get-all-media'
import { handleMediaUpload } from '@/lib/actions/media/media-upload'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  try {
    const form = await req.formData()
    const files = form.getAll('files') as File[]
    if (!files.length)
      return NextResponse.json(
        { error: 'files required' },
        { status: 400 }
      )

    const results = []
    for (const file of files) {
    const { record, reused } = await handleMediaUpload(file)
      results.push(record)
    }

    return NextResponse.json({ ok: true, data: results })
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
