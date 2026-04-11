import { NextRequest, NextResponse } from 'next/server'
import { toggleArticlePin } from '@/lib/actions/article/pin-article'
import { getArticlesPinned } from '@/lib/actions/article/get-articles-pinned'

export async function GET() {
  try {
    const articles = await getArticlesPinned()

    return NextResponse.json(articles)
  } catch (error) {
    console.error('文章获取失败：', error)

    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : '文章获取失败，未知错误'
      },
      { status: 500 }
    )
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json()
    if (!body.id) {
      throw new Error('文章 id 不能为空')
    } else {
      const article = await toggleArticlePin(body.id)
      return NextResponse.json(article)
    }
  } catch (error) {
    console.error('更改文章置顶失败：', error)

    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : '更改文章置顶失败，未知错误'
      },
      { status: 500 }
    )
  }
}
