import Card from '@/components/blog/card'
import CardContent from '@/components/blog/card-content'

export default function AboutPage() {
  return (
    <Card>
      <CardContent>
        <div className="lg:prose-lg xl:prose-xl dark:prose-invert">
          <p>Hi.</p>
          <p>
            I'm Zhang, also known online as Jack Atlas, named after a
            character in Yu-Gi-Oh! 5d's.
          </p>
          <p>I'm a builder -- I like making things on the web.</p>
          <p>
            This is my personal blog where I write about whatever I'm
            exploring at the moment: sometimes it's technical
            articles, sometimes translations of things I find
            interesting, sometimes just learning notes, and
            occasionally random things from life.
          </p>
          <p>
            I don't really separate everything too strictly. If
            something helps me understand a topic better or captures a
            moment I don't want to forget, it ends up here.
          </p>
          <p>
            Most of my work revolves around web development -
            especially TypeScript, Next.js, and building full-stack
            applications. I also enjoy experimenting with ideas,
            systems, and small projects just to see how far they can
            go.
          </p>
          <p>
            This site is both a blog and a workspace. It grows as I
            learn.
          </p>
          <p>
            If you're reading this, feel free to explore around -
            maybe you'll find something useful, or at least something
            interesting.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
