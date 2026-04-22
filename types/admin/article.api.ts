import { PaginationResponse } from '../shared/pagination'
import { AdminArticle } from './article.action'

export type AdminArticleListResponse =
  PaginationResponse<AdminArticle>
