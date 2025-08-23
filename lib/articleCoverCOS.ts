import { Article } from '@/generated/prisma'
import { BUCKET, cos, COS_DOMAIN, REGION } from './cos/cosClient'

interface ExtendedArticle extends Article {
  author: { name: string }
  category: { name: string; id?: number } | null
  tags: { name: string; id?: number }[]
}

export interface ExtendedArticleWithCovers extends ExtendedArticle {
  coverUrl: string
  thumbnail: string
}

type Options = {
  width?: number
  height?: number
}

async function checkCOSExists(filename: string): Promise<boolean> {
  return new Promise((resolve) => {
    cos.headObject(
      { Bucket: BUCKET, Region: REGION, Key: filename },
      (err) => {
        resolve(!err)
      }
    )
  })
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
  public async getCoverUrl(
    article: ExtendedArticle,
    options?: Options
  ): Promise<string> {
    const width = options?.width || 800
    const height = options?.height || 800
    const filename = `blog/article-cover/${article.id}.jpg`

    const exists = await checkCOSExists(filename)
    if (exists) return `${COS_DOMAIN}/${filename}`

    const buffer = await getRandomImage(width, height)

    return (await uploadToCOS(buffer, filename)) as string
  }

  public async addCoverUrl(
    article: ExtendedArticle,
    options?: Options
  ): Promise<ExtendedArticleWithCovers> {
    return {
      ...article,
      coverUrl: await this.getCoverUrl(article, options),
      thumbnail: await this.getCoverUrl(article, options)
    }
  }

  public async addCoverUrls(
    articles: ExtendedArticle[],
    options?: Options
  ): Promise<ExtendedArticleWithCovers[]> {
    return Promise.all(
      articles.map(async (article) => ({
        ...article,
        coverUrl: await this.getCoverUrl(article, options),
        thumbnail: await this.getCoverUrl(article, options)
      }))
    )
  }
}

export const articleCoverCOSFixedManager =
  new ArticleCoverCOSFixedManager()
