import Card from '@/components/ui/Card'
import CardContent from '@/components/ui/CardContent'

export default function LinksSection() {
  return (
    <Card>
      <CardContent>
        <div className="mb-2 text-[#7a7a7a] text-xs tracking-widest uppercase">
          Links
        </div>
        <ul>
          <li>
            <a
              href="https://chiflow.jackatlas.xyz/"
              className="flex items-center justify-between hover:bg-gray-100 h-9 px-2"
              title="Chi-Flow"
            >
              <span className="text-sm">Chi-Flow</span>
              <span className="h-[2em] flex items-center bg-gray-100 text-xs rounded-sm px-[0.75em]">
                jackatlas.xyz
              </span>
            </a>
          </li>
          <li>
            <a
              href="https://chiform.jackatlas.xyz/"
              className="flex items-center justify-between hover:bg-gray-100 h-9 px-2"
              title="Chi-Form"
            >
              <span className="text-sm">Chi-Form</span>
              <span className="h-[2em] flex items-center bg-gray-100 text-xs rounded-sm px-[0.75em]">
                jackatlas.xyz
              </span>
            </a>
          </li>
        </ul>
      </CardContent>
    </Card>
  )
}
