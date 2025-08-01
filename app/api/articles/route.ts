import { createArticle } from '@/lib/actions/article/create-article'
import { getArticles } from '@/lib/actions/article/get-articles'
import { removeArticle } from '@/lib/actions/article/remove-article'
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

export async function DELETE(req: Request) {
  try {
    const body = await req.json()
    if (!body.id) {
      throw new Error('文章 id 不能为空')
    } else {
      const removedArticle = await removeArticle(body.id)
      return NextResponse.json(removedArticle)
    }
  } catch (error) {
    console.error('文章删除失败：', error)

    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : '文章删除失败，未知错误'
      },
      { status: 400 }
    )
  }
}
