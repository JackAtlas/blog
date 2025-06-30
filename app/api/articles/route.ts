import prisma from '@/lib/prisma'

const articles = await prisma.article.findMany({
  where: {
    status: 'PUBLISHED',
    deletedAt: null
  },
  include: {
    author: true,
    category: true,
    tags: true
  }
})
