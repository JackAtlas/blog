import fs from 'fs'
import path from 'path'

export function getThemes() {
  const dirPath = path.join(process.cwd(), 'themes')

  if (!fs.existsSync(dirPath)) return []

  const files = fs.readdirSync(dirPath)

  return files
    .filter((f) => f.endsWith('.css'))
    .map((file) => file.replace('.css', ''))
}
