import { getTopCategories } from '@/lib/actions/category/get-top-categories'
import CategoriesSection from '@/sections/CategoriesSection'

export default async function CategoriesPage() {
  const topCategories = await getTopCategories()
  return <CategoriesSection topCategories={topCategories} />
}
