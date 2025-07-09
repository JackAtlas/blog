import Image from 'next/image'
import Card from '@/components/blog/Card'
import CardContent from '@/components/blog/CardContent'
import CardHeader from '@/components/blog/CardHeader'

export default function ArticlePage({
  params
}: {
  params: { slug: string }
}) {
  const { slug } = params
  console.log(slug)
  return (
    <Card>
      <CardHeader>
        <Image
          className="w-full"
          src="https://picsum.photos/700/300"
          alt="Getting Started with Icarus"
          width={700}
          height={300}
        />
      </CardHeader>
      <CardContent>
        <article>
          <div className="flex text-xs uppercase text-[#7a7a7a]">
            <div>posted 5 years ago</div>
            <div className="ms-3">plugins/comment</div>
            <div className="ms-3">
              3 minutes read (about 495 words)
            </div>
          </div>
          <h1 className="text-3xl mt-2 mb-6 hover:text-[#3273dc]">
            Getting Started with Icarus
          </h1>
          <div>
            <p>
              Welcome to the Icarus documentation site! Icarus is a
              simple, delicate, and modern theme for the static site
              generator Hexo. It strives to be elegant in design while
              simple and straightforward to use. Its versatile and
              flexible configuration system enables power users lay
              out their sites to the finest details. Icarus also
              offers a wide range of plugins and widgets to meet your
              various customization and optimization needs. Moreover,
              its refreshed implementation enables better IDE support
              and third-party integration, which open to a sea of
              improvement possibilities.
            </p>
          </div>
        </article>
      </CardContent>
    </Card>
  )
}
