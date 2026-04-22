export const adminArticleInclude = {
  author: {
    select: { name: true }
  },
  category: {
    select: { name: true }
  },
  tags: {
    select: { name: true }
  }
}
