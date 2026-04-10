import fs from 'fs'
import path from 'path'

export function getThemes() {
  const dirPath = path.join(process.cwd(), 'themes')
  const files = fs.readdirSync(dirPath)
  return files.map((file) => file.replace('.css', ''))
}
