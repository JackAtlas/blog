import prisma from '@/lib/prisma'

export async function POST(req: Request) {
  const {
    title,
    englishTitle,
    slug,
    content,
    categoryId,
    tags,
    status,
    userId
  } = await req.json()

  const post = await prisma.article.create({
    data: {
      title,
      englishTitle,
      slug,
      content,
      status,
      authorId: userId,
      categoryId,
      tags: {
        connect: tags.map((tagId: number) => ({ id: tagId }))
      }
    }
  })

  return new Response(JSON.stringify(post))
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const includeDeleted = searchParams.get('deleted') === 'true'

  const posts = await prisma.article.findMany({
    where: {
      OR: [
        { deleted: false },
        { deleted: includeDeleted ? undefined : false }
      ]
    },
    include: {
      category: true,
      tags: true
    }
  })

  return new Response(JSON.stringify(posts))
}
