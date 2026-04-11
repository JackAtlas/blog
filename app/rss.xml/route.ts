import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

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
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function cdata(s: string) {
  return `<![CDATA[${s.replace(/]]>/g, ']]]]><![CDATA[>')}]]>`
}

export async function GET() {
  const articles = await prisma.article.findMany({
    where: {
      status: 'PUBLISHED',
      deletedAt: null
    },
    orderBy: { createdAt: 'desc' },
    take: 20,
    select: {
      title: true,
      slug: true,
      createdAt: true,
      excerpt: true,
      category: {
        select: {
          name: true
        }
      },
      tags: {
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
      const pubDate = a.createdAt.toUTCString()

      const categories = new Set<string>()
      if (a.category) {
        categories.add(a.category.name)
      }
      a.tags.forEach((t) => categories.add(t.name))
      const categoryXml = Array.from(categories)
        .map((name) => `<category>${esc(name)}</category>`)
        .join('')

      return `
      <item>
        <title>${esc(a.title)}</title>
        <link>${url}</link>
        <guid>${url}</guid>
        <pubDate>${pubDate}</pubDate>
        ${
          a.excerpt
            ? `<description>${cdata(String(a.excerpt))}</description>`
            : ''
        }
        ${categoryXml}
      </item>
    `.trim()
    })
    .join('\n')

  const xml = `
    <?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
        <atom:link href="${SITE}/rss.xml" rel="self" type="application/rss+xml" />
        <title>${esc(SITE_TITLE)}</title>
        <link>${SITE}</link>
        <description>${esc(SITE_DESC)}</description>
        <language>${SITE_LANG}</language>
        <lastBuildDate>${lastBuildDate.toUTCString()}</lastBuildDate>
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
