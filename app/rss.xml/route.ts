import prisma from '@/lib/prisma'
import { format } from 'date-fns'
import { NextResponse } from 'next/server'

export const revalidate = 3600

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://jackatlas.xyz'
const SITE_TITLE = 'Jack Atlas 我的前端小站'
const SITE_DESC = 'Jack Atlas 的个人博客'
const SITE_LANG = 'zh-CN'

function esc(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

export async function GET() {
  const articles = await prisma.article.findMany({
    where: {
      status: 'PUBLISHED',
      deletedAt: null
    },
    orderBy: { createdAt: 'desc' },
    take: 50,
    include: {
      tags: {
        select: {
          name: true
        }
      },
      category: {
        select: {
          name: true
        }
      }
    }
  })

  const lastBuildDate = articles[0]?.createdAt ?? new Date()

  const items = articles
    .map((a) => {
      const url = `${SITE}/articles/${a.slug}`
      const pubDate = format(
        a.createdAt,
        'EEE, dd MMM yyyy HH:mm:ss xx'
      )

      return `
      <item>
        <title>${esc(a.title)}</title>
        <link>${url}</link>
        <guid isPermaLink="true">${url}</guid>
        <pubDate>${pubDate}</pubDate>
        ${
          a.excerpt
            ? `<description><![CDATA[${a.excerpt}]]></description>`
            : ''
        }
        ${
          a.category
            ? `<category>${esc(a.category.name)}</category>`
            : ''
        }
      </item>
    `.trim()
    })
    .join('\n')

  const xml = `
    <?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0">
      <channel>
        <title>${esc(SITE_TITLE)}</title>
        <link>${SITE}</link>
        <description>${esc(SITE_DESC)}</description>
        <language>${SITE_LANG}</language>
        <lastBuildDate>${format(
          lastBuildDate,
          'EEE, dd MMM yyyy HH:mm:ss xx'
        )}</lastBuildDate>
        ${items}
      </channel>
    </rss>
  `.trim()

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control':
        'public, max-age=0, s-maxage=3600, stale-while-revalidate=60'
    }
  })
}
