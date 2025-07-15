import { NextResponse } from 'next/server'
import { getTopCategories } from '@/lib/actions/category/get-top-categories'

export async function GET() {
  const categories = await getTopCategories()

  return NextResponse.json(categories)
}
