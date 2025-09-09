import { NextResponse } from 'next/server'
import { softRecoverArticle } from '@/lib/actions/article/soft-recover-article'

export async function PATCH(req: Request) {
  try {
    const body = await req.json()
    if (!body.id) {
      throw new Error('文章 id 不能为空')
    } else {
      const removedArticle = await softRecoverArticle(body.id)
      return NextResponse.json(removedArticle)
    }
  } catch (error) {
    console.error('文章软恢复失败：', error)

    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : '文章软恢复失败，未知错误'
      },
      { status: 500 }
    )
  }
}
