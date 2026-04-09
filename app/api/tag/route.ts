import { getTag } from '@/lib/actions/tag/get-tag'
import { NextResponse } from 'next/server'

export async function GET(context: {
  params: Promise<{ id: number }>
}) {
  const { id } = await context.params
  const tag = await getTag({ id })

  return NextResponse.json(tag)
}
