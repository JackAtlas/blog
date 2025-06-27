import prisma from '@/lib/prisma'

export async function POST(req: Request) {
  const { postId, content, parentId, authorName, authorEmail } =
    await req.json()

  const comment = await prisma.comment.create({
    data: {
      content,
      postId,
      parentId,
      authorName,
      authorEmail,
      isApproved: false
    }
  })

  return new Response(JSON.stringify(comment))
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const postId = searchParams.get('postId')

  const comments = await prisma.comment.findMany({
    where: {
      postId: Number(postId),
      parentId: null,
      deleted: false
    },
    include: {
      replies: {
        include: {
          replies: true
        }
      }
    }
  })

  return new Response(JSON.stringify(comments))
}
