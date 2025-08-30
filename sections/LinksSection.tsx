import Card from '@/components/blog/card'
import CardContent from '@/components/blog/card-content'

export default function LinksSection() {
  return (
    <Card>
      <CardContent>
        <div className="mb-2 text-muted-foreground text-xs md:text-sm 2xl:text-base tracking-widest uppercase">
          Links
        </div>
        <ul>
          <li>
            <a
              href="https://chiflow.jackatlas.xyz/"
              className="flex items-center justify-between hover:bg-muted p-2"
              title="Chi-Flow"
            >
              <span className="text-sm md:text-base 2xl:text-lg">
                Chi-Flow
              </span>
              <span className="h-[2em] flex items-center bg-muted text-muted-foreground text-xs md:text-sm 2xl:text-base rounded-sm px-[0.75em]">
                jackatlas.xyz
              </span>
            </a>
          </li>
          <li>
            <a
              href="https://chiform.jackatlas.xyz/"
              className="flex items-center justify-between hover:bg-muted p-2"
              title="Chi-Form"
            >
              <span className="text-sm md:text-base 2xl:text-lg">
                Chi-Form
              </span>
              <span className="h-[2em] flex items-center bg-muted text-muted-foreground text-xs md:text-sm 2xl:text-base rounded-sm px-[0.75em]">
                jackatlas.xyz
              </span>
            </a>
          </li>
        </ul>
      </CardContent>
    </Card>
  )
}
