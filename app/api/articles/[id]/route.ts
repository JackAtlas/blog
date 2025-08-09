import { getArticleById } from '@/lib/actions/article/get-article-by-id'
import { updateArticle } from '@/lib/actions/article/update-article'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params
  try {
    const article = await getArticleById(id)

    if (!article) {
      return NextResponse.json('文章不存在', { status: 404 })
    }

    return NextResponse.json(article)
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

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params
  const body = await request.json()

  try {
    const article = await getArticleById(id)

    if (!article) {
      return NextResponse.json('文章不存在', { status: 404 })
    }

    const result = updateArticle(body)

    return NextResponse.json(result)
  } catch (error) {
    console.error('文章更新失败：', error)

    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : '文章更新失败，未知错误'
      },
      { status: 500 }
    )
  }
}
