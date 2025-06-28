import { PrismaClient } from '@/generated/prisma'

const prisma = new PrismaClient()

export const resolvers = {
  Query: {
    posts: async (_parent, args) => {
      return prisma.post.findMany({
        where: {
          status: args.status,
          isPinned: args.isPinned ?? undefined,
          deletedAt: null
        },
        include: { author: true, category: true, tags: true }
      })
    },
    post: async (_parent, args) => {
      return prisma.post.findUnique({
        where: { id: Number(args.id), deletedAt: null },
        include: { author: true, category: true, tags: true }
      })
    },
    categories: async () => {
      return prisma.category.findMany({
        where: {},
        include: { children: true }
      })
    },
    tags: async () => {
      return prisma.tag.findMany()
    },
    comments: async (_parent, args) => {
      return prisma.comment.findMany({
        where: {
          postId: Number(args.postId),
          parentId: null,
          status: 'APPROVED',
          deletedAt: null
        }
      })
    }
  }
}
