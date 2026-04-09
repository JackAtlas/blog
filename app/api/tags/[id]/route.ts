import { getTag } from '@/lib/actions/tag/get-tag'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const tag = await getTag({ id: Number(id) })

  return NextResponse.json(tag)
}
