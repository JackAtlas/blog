import updateUserName from '@/lib/actions/user/update-user-name'
import { NextResponse } from 'next/server'

export async function PUT(req: Request) {
  try {
    const body = await req.formData()

    const result = await updateUserName(body)

    const { email, id, name } = result

    return NextResponse.json({
      email,
      id,
      name
    })
  } catch (error) {
    console.error('用户名更改失败：', error)
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : '用户名更改失败，未知错误'
      },
      { status: 500 }
    )
  }
}
