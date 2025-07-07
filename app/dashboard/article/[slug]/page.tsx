export default async function ArticlePage({
  params
}: {
  params: { slug: string }
}) {
  const { slug } = await params

  console.log(slug)

  return <div>ArticlePage</div>
}
