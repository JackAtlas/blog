import { getArchiveStats } from '@/lib/actions/article/get-archive-stats'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const stats = await getArchiveStats()
    return NextResponse.json(stats)
  } catch (error) {
    console.error('归档信息获取失败：', error)

    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : '归档信息获取失败，未知错误'
      },
      { status: 500 }
    )
  }
}
