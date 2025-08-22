import { Button, Card, CardContent, Separator } from '@/components/ui'
import Link from 'next/link'
import { LuExternalLink, LuGithub } from 'react-icons/lu'
import { projects } from './projects'

export default async function ProjectsPage() {
  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      <Card>
        <CardContent>
          <div className="text-muted-foreground text-xs tracking-widest uppercase">
            项目 projects
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-2 gap-4 lg:gap-6">
        {projects.map((project) => (
          <Card key={project.name} className="col-span-1">
            <CardContent>
              <Link
                href={project.link}
                title={project.link}
                target="_blank"
                className="flex items-center justify-center min-h-60 hover:scale-110 hover:cursor-pointer"
              >
                {project.render()}
              </Link>
              <Separator className="my-4" />
              <div className="flex items-center justify-between">
                <p>{project.name}</p>
                <div className="flex gap-2">
                  <Button asChild>
                    <Link
                      href={project.code}
                      title={project.code}
                      target="_blank"
                    >
                      <LuGithub />
                    </Link>
                  </Button>
                  <Button asChild>
                    <Link
                      href={project.link}
                      title={project.link}
                      target="_blank"
                    >
                      <LuExternalLink />
                    </Link>
                  </Button>
                </div>
              </div>
              {project.description && <p>{project.description}</p>}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
