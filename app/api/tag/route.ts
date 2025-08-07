import { getTag } from '@/lib/actions/tag/get-tag'
import { NextResponse } from 'next/server'

export async function GET({ id }: { id: number }) {
  const tag = await getTag({ id })

  return NextResponse.json(tag)
}
