import { getMetaData } from '@/lib/actions/get-meta-data'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const stats = await getMetaData()

    return NextResponse.json(stats)
  } catch (error) {
    console.error('统计数据获取失败：', error)

    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : '统计数据获取失败，未知错误'
      },
      { status: 500 }
    )
  }
}
