import fs from 'fs'
import path from 'path'

const dir = path.join(process.cwd(), 'public/themes')

const themes = fs
  .readdirSync(dir)
  .filter((f) => f.endsWith('.css'))
  .map((f) => f.replace('.css', ''))

fs.writeFileSync(
  path.join(process.cwd(), 'public/themes.json'),
  JSON.stringify(themes, null, 2)
)
