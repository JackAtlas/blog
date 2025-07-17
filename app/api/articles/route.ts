import { getArticles } from '@/lib/actions/article/get-articles'
import { NextResponse } from 'next/server'

export async function GET() {
  const articles = await getArticles()

  return NextResponse.json(articles)
}
