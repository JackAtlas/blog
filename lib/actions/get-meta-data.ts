import prisma from '../prisma'

export async function getMetaData() {
  const [totalArticles, totalCategories, totalTags] =
    await prisma.$transaction([
      prisma.article.count(),
      prisma.category.count(),
      prisma.tag.count()
    ])

  return {
    articles: totalArticles,
    categories: totalCategories,
    tags: totalTags
  }
}
