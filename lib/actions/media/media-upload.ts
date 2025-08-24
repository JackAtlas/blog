import { createHash, randomUUID } from 'crypto'
import prisma from '@/lib/prisma'
import sharp from 'sharp'
import { uploadToCOS } from '../../cos/cosClient'

export function extFromMime(mime: string) {
  return mime.split('/')[1]
}

export async function handleMediaUpload(file: File) {
  const buf = Buffer.from(await file.arrayBuffer())
  const mime = file.type || 'image/jpeg'

  const hash = createHash('sha256').update(buf).digest('hex')
  const exist = await prisma.media.findUnique({ where: { hash } })
  if (exist) {
    return { record: exist, reused: true }
  }

  const meta = await sharp(buf).metadata()

  const now = new Date()
  const yyyy = now.getUTCFullYear()
  const mm = String(now.getUTCMonth() + 1).padStart(2, '0')
  const dd = String(now.getUTCDate()).padStart(2, '0')
  const id = randomUUID()
  const ext = extFromMime(mime)
  const cosKey = `blog/figure/${yyyy}/${mm}${dd}${id}.${ext}`

  const url = await uploadToCOS(buf, cosKey, { contentType: mime })

  const record = await prisma.media.create({
    data: {
      title: file.name,
      filename: id,
      mimeType: mime,
      size: buf.byteLength,
      width: meta.width ?? null,
      height: meta.height ?? null,
      url,
      cosKey,
      hash
    }
  })

  return { record, reused: false }
}
