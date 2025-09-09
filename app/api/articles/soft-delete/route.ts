import { NextResponse } from 'next/server'
import { softRemoveArticle } from '@/lib/actions/article/soft-remove-article'

export async function PATCH(req: Request) {
  try {
    const body = await req.json()
    if (!body.id) {
      throw new Error('文章 id 不能为空')
    } else {
      const removedArticle = await softRemoveArticle(body.id)
      return NextResponse.json(removedArticle)
    }
  } catch (error) {
    console.error('文章软删除失败：', error)

    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : '文章软删除失败，未知错误'
      },
      { status: 500 }
    )
  }
}
