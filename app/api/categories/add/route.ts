import { createCategory } from '@/lib/actions/category/create-category'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()

  console.log(body)

  const newCategory = await createCategory(body)

  return NextResponse.json(newCategory)
}
