export interface ArticlesArgs {
  status?: 'DRAFT' | 'PUBLISHED'
  isPinned?: boolean
}

export interface ArticleArgs {
  id: string
}

export interface CommentsArgs {
  articleId: string
}
