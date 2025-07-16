import { NextResponse } from 'next/server'
import { createCategory } from '@/lib/actions/category/create-category'
import { getTopCategories } from '@/lib/actions/category/get-top-categories'

export async function GET() {
  const categories = await getTopCategories()

  return NextResponse.json(categories)
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const newCategory = await createCategory(body)

    return NextResponse.json(newCategory)
  } catch (error) {
    console.error('栏目创建失败:', error)
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : '栏目创建失败，未知错误'
      },
      { status: 400 }
    )
  }
}
