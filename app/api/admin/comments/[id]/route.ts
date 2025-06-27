import prisma from '@/lib/prisma'

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { isApproved } = await req.json()

  const updatedComment = await prisma.comment.update({
    where: { id: Number(params.id) },
    data: { isApproved }
  })

  return new Response(JSON.stringify(updatedComment))
}

export async function PUT(req: Request) {
  const { id, type, isPinned } = await req.json()

  if (type === 'comment') {
    await prisma.comment.update({
      where: { id },
      data: { isPinned }
    })
  } else if (type === 'post') {
    await prisma.post.update({
      where: { id },
      data: { isPinned }
    })
  }

  return new Response(JSON.stringify({ success: true }))
}
