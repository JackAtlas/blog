import crypto from 'crypto'
import { BUCKET, cos, COS_DOMAIN, REGION } from '@/lib/cos/cos-client'

type Options = {
  width?: number
  height?: number
}

async function uploadToCOS(buffer: Buffer, filename: string) {
  return new Promise((resolve, reject) => {
    cos.putObject(
      {
        Bucket: BUCKET,
        Region: REGION,
        Key: `${filename}`,
        Body: buffer
      },
      (err) => {
        if (err) {
          reject(err)
        } else {
          resolve(`${COS_DOMAIN}/${filename}`)
        }
      }
    )
  })
}

async function getRandomImage(
  width: number,
  height: number
): Promise<Buffer> {
  const sources = [
    `https://api.vvhan.com/api/wallpaper/views?ts=${Date.now()}`
  ]

  for (const url of sources) {
    try {
      const resp = await fetch(url)
      if (resp.ok) return Buffer.from(await resp.arrayBuffer())
    } catch {}
  }

  const fallbackUrl = `https://picsum.photos/${width}/${height}?ts=${Date.now()}`
  const resp = await fetch(fallbackUrl)
  return Buffer.from(await resp.arrayBuffer())
}

export class ArticleCoverCOSFixedManager {
  public async generateCover(articleId: string, options?: Options) {
    const width = options?.width || 800
    const height = options?.height || 800
    const buffer = await getRandomImage(width, height)
    const hash = crypto
      .createHash('md5')
      .update(buffer)
      .digest('hex')
      .slice(0, 5)
    const filename = `blog/article-cover/${articleId}.${hash}.jpg`

    return (await uploadToCOS(buffer, filename)) as string
  }
}

export const articleCoverCOSFixedManager =
  new ArticleCoverCOSFixedManager()
