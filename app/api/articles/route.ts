import { createArticle } from '@/lib/actions/article/create-article'
import { getArticles } from '@/lib/actions/article/get-articles'
import { NextResponse } from 'next/server'

export async function GET() {
  const articles = await getArticles()

  return NextResponse.json(articles)
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const newArticle = await createArticle(body)

    return NextResponse.json(newArticle)
  } catch (error) {
    console.error('文章创建失败：', error)

    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : '文章创建失败，未知错误'
      },
      { status: 400 }
    )
  }
}
