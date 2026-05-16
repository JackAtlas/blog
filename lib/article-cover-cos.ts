import crypto from 'crypto'
import { BUCKET, cos, REGION } from '@/lib/cos/cos-client'

type Options = {
  width?: number
  height?: number
}

async function uploadToCOS(buffer: Buffer, filename: string) {
  console.log('@@BUCKET', BUCKET)
  console.log('@@cos', cos)
  console.log('@@REGION', REGION)
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
          resolve(`/${filename}`)
        }
      }
    )
  })
}

async function getRandomImage(
  width: number,
  height: number
): Promise<Buffer> {
  const headers = {
    'User-Agent': 'Mozilla/5.0'
  }

  const sources = [
    `https://api.vvhan.com/api/wallpaper/views?ts=${Date.now()}`
  ]

  for (const url of sources) {
    try {
      console.log('fetching:', url)
      const resp = await fetch(url, {
        headers,
        cache: 'no-store'
      })
      console.log('status', resp.status)
      if (resp.ok) return Buffer.from(await resp.arrayBuffer())
    } catch (err) {
      console.error('fetch error', err)
    }
  }

  const fallbackUrl = `https://picsum.photos/${width}/${height}?ts=${Date.now()}`
  try {
    console.log('fallback fetching:', fallbackUrl)
    const resp = await fetch(fallbackUrl, {
      headers,
      cache: 'no-store'
    })
    console.log('fallback status', resp.status)
    return Buffer.from(await resp.arrayBuffer())
  } catch (err) {
    console.error('fallback error', err)
    throw err
  }
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
    console.log('@@filename', filename)

    return (await uploadToCOS(buffer, filename)) as string
  }
}

export const articleCoverCOSFixedManager =
  new ArticleCoverCOSFixedManager()
