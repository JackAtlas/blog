import { getBinArticles } from '@/lib/actions/article/get-bin-articles'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const articles = await getBinArticles()

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
