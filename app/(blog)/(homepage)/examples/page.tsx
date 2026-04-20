import { Button, Card, CardContent, Separator } from '@/components/ui'
import { examples } from './_data/examples'
import Link from 'next/link'
import { LuExternalLink, LuGithub } from 'react-icons/lu'

export default function ExamplesPage() {
  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      <Card>
        <CardContent>
          <div className="text-muted-foreground text-xs md:text-sm 2xl:text-base tracking-widest uppercase">
            examples
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-2 gap-4 lg:gap-6">
        {examples.map((example) => (
          <Card key={example.name} className="col-span-1">
            <CardContent>
              <Link
                href={example.link}
                title={example.link}
                target="_blank"
                referrerPolicy="no-referrer"
                className="flex items-center justify-center min-h-60 hover:cursor-pointer"
              >
                {example.render()}
              </Link>
              <Separator className="my-4" />
              <div className="flex items-center justify-between">
                <p className="text-xs md:text-sm 2xl:text-base 3xl:text-lg">
                  {example.name}
                </p>
                <div className="flex gap-2">
                  <Button asChild>
                    <Link
                      href={example.code}
                      title={example.code}
                      target="_blank"
                    >
                      <LuGithub />
                    </Link>
                  </Button>
                  <Button asChild>
                    <Link
                      href={example.link}
                      title={example.link}
                      target="_blank"
                    >
                      <LuExternalLink />
                    </Link>
                  </Button>
                </div>
              </div>
              {example.description && <p>{example.description}</p>}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
