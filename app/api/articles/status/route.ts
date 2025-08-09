import { NextResponse } from 'next/server'
import { toggleArticleStatus } from '@/lib/actions/article/toggle-article-status'

export async function PATCH(req: Request) {
  try {
    const body = await req.json()
    if (!body.id) {
      throw new Error('文章 id 不能为空')
    } else {
      const article = await toggleArticleStatus(body.id)
      return NextResponse.json(article)
    }
  } catch (error) {
    console.error('更改文章状态失败：', error)

    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : '更改文章状态失败，未知错误'
      },
      { status: 500 }
    )
  }
}
