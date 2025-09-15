'use client'

import { LuCopy, LuExternalLink } from 'react-icons/lu'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import { Button } from './ui'
import Image from 'next/image'
import { cn } from '@/lib/utils'

export default function MarkdownPreviewer({
  className,
  content
}: {
  className?: string
  content: string
}) {
  const copyCode = (code: string) =>
    navigator.clipboard.writeText(code)

  return (
    <article
      className={cn(
        'prose lg:prose-lg xl:prose-xl prose-h2:underline prose-h2:underline-offset-6 prose-a:text-primary prose-a:hover:text-primary/80 prose-ol:marker:text-primary/50 prose-ul:marker:text-primary/50 dark:prose-invert max-w-none',
        className
      )}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeSlug]}
        components={{
          a({ children, href }) {
            return (
              <>
                <a
                  className="underline underline-offset-4"
                  href={href || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {children}
                  <LuExternalLink className="inline-block ml-1" />
                </a>
              </>
            )
          },
          blockquote({ children }) {
            return (
              <blockquote className="not-prose pl-4 border-l-4 md:border-l-5 2xl:border-l-6 border-primary/50 bg-accent text-accent-foreground">
                {children}
              </blockquote>
            )
          },
          code({ children, className }) {
            const match = /language-(\w+)/.exec(className || '')

            if (match) {
              return <code className={className}>{children}</code>
            }
            return (
              <code className="rounded bg-muted px-1.5 py-0.5 text-sm after:content-none before:content-none">
                {children}
              </code>
            )
          },
          pre({ children }) {
            const codeStr = String(children)
            return (
              <pre className="relative not-prose hljs p-4 overflow-x-auto">
                <Button
                  variant="outline"
                  className="absolute top-2 right-2 text-accent-foreground cursor-pointer"
                  size="sm"
                  onClick={() => copyCode(codeStr)}
                >
                  <LuCopy />
                </Button>
                {children}
              </pre>
            )
          },
          img({ alt, src }) {
            if (!src || typeof src !== 'string') return null
            return (
              <Image
                width={400}
                height={400}
                src={src}
                alt={alt || ''}
                className="max-w-full mx-auto"
              />
            )
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  )
}
