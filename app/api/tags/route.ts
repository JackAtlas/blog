import { NextResponse } from 'next/server'
import { getTags } from '@/lib/actions/tag/get-tags'
import { createTag } from '@/lib/actions/tag/create-tag'

export async function GET() {
  const tags = await getTags()

  return NextResponse.json(tags)
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const newTag = await createTag(body)

    return NextResponse.json(newTag)
  } catch (error) {
    console.error('标签创建失败:', error)
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : '标签创建失败，未知错误'
      },
      { status: 400 }
    )
  }
}
