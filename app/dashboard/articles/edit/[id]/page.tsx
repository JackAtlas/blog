import ArticleEditor from '@/components/dashboard/article-editor'

export default async function EditArticlePage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <ArticleEditor articleId={id} />
}
