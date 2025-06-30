import { PrismaClient } from '@/generated/prisma'
import type { GraphQLResolveInfo } from 'graphql'
import {
  ArticleArgs,
  ArticlesArgs,
  CommentsArgs
} from '@/types/graphql'

const prisma = new PrismaClient()

export const resolvers = {
  Query: {
    articles: async (
      _parent: any,
      args: ArticlesArgs,
      _context: unknown,
      _info: GraphQLResolveInfo
    ) => {
      return prisma.article.findMany({
        where: {
          status: args.status,
          isPinned: args.isPinned ?? undefined,
          deletedAt: null
        },
        include: { author: true, category: true, tags: true }
      })
    },
    article: async (
      _parent: any,
      args: ArticleArgs,
      _context: unknown,
      _info: GraphQLResolveInfo
    ) => {
      return prisma.article.findUnique({
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
    comments: async (
      _parent: any,
      args: CommentsArgs,
      _context: unknown,
      _info: GraphQLResolveInfo
    ) => {
      return prisma.comment.findMany({
        where: {
          articleId: Number(args.articleId),
          parentId: null,
          status: 'APPROVED',
          deletedAt: null
        },
        include: {
          replies: {
            where: { deletedAt: null, status: 'APPROVED' }
          }
        }
      })
    }
  }
}
