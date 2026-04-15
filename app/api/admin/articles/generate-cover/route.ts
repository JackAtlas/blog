import { updateArticleCover } from '@/lib/actions/article/update-article-cover'
import { articleCoverCOSFixedManager } from '@/lib/article-cover-cos'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { articleId: id } = await req.json()
    if (!id) {
      return NextResponse.json(
        { message: 'articleId is required' },
        { status: 400 }
      )
    }
    const imgUrl = await articleCoverCOSFixedManager.generateCover(id)

    await updateArticleCover({
      id,
      imgUrl
    })

    return NextResponse.json({ data: imgUrl })
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : '生成题图失败，未知原因'
      },
      { status: 500 }
    )
  }
}
