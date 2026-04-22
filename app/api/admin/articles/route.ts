import { getArticles } from '@/lib/actions/admin/article'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl

    const page = Number(searchParams.get('page') || 1)
    const pageSize = Number(searchParams.get('pageSize') || 10)
    const keyword = searchParams.get('keyword') || ''

    const articles = await getArticles({
      page,
      pageSize,
      keyword
    })

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
