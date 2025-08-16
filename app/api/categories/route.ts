import { NextResponse } from 'next/server'
import { createCategory } from '@/lib/actions/category/create-category'
import { getTopCategories } from '@/lib/actions/category/get-top-categories'
import { removeCategory } from '@/lib/actions/category/remove-category'
import { getCategories } from '@/lib/actions/category/get-categories'

export async function GET({ top }: { top?: boolean }) {
  if (top) {
    return NextResponse.json(await getTopCategories())
  } else {
    return NextResponse.json(await getCategories())
  }
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

export async function DELETE(req: Request) {
  try {
    const body = await req.json()
    if (!body.id || isNaN(body.id)) {
      throw new Error('栏目 id 不合法')
    } else {
      const removedCategory = await removeCategory(body.id)
      return NextResponse.json(removedCategory)
    }
  } catch (error) {
    console.error('栏目删除失败:', error)
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : '栏目删除失败，未知错误'
      },
      { status: 400 }
    )
  }
}
