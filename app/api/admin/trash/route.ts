import prisma from '@/lib/prisma'

export async function GET() {
  const [deletedPosts, deletedComments] = await Promise.all([
    prisma.post.findMany({ where: { deleted: true } }),
    prisma.comment.findMany({ where: { deleted: true } })
  ])

  return new Response(
    JSON.stringify({ posts: deletedPosts, comments: deletedComments })
  )
}

export async function POST(req: Request) {
  const { type, id, action } = await req.json()

  if (type === 'post') {
    if (action === 'restore') {
      await prisma.post.update({
        where: { id },
        data: { deleted: false, deletedAt: null }
      })
    } else {
      await prisma.post.delete({ where: { id } })
    }
  }

  if (type === 'comment') {
    if (action === 'restore') {
      await prisma.comment.update({
        where: { id },
        data: { deleted: false, deletedAt: null }
      })
    } else {
      await prisma.comment.delete({ where: { id } })
    }
  }
}
