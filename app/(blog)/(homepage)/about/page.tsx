import Card from '@/components/blog/card'
import CardContent from '@/components/blog/card-content'

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardContent>
          <div className="lg:prose-lg xl:prose-xl dark:prose-invert">
            <p>
              Hi，我是张，网名 Jack Atlas ——
              致敬了某个我喜欢的动漫人物。
            </p>
            <p>
              我是一个喜欢在网页上“折腾”点东西的人。这个博客算是我的私人后花园，也是我的实验场。这里没什么严格的分类，内容也比较随性：
            </p>
            <ul>
              <li>技术干货：平时钻研的高频产出。</li>
              <li>搬运翻译：看到有意思的外文内容忍不住想分享。</li>
              <li>学习笔记：为了防止大脑遗忘留下的“存盘点”。</li>
              <li>生活碎片：偶尔也会记录一点无关技术的日常。</li>
            </ul>
            <p>
              对我来说，不管是硬核的知识还是生活的瞬间，只要能让我对这个世界多一点理解，或者值得被留住，我都会把它们码在这里。
            </p>
            <p>
              在技术栈方面，我目前主要的精力都花在 TypeScript 和
              Next.js
              上，喜欢倒腾全栈应用，也热衷于把脑子里冒出来的各种小灵感、小系统动手实现出来，看看它们到底能进化成什么样。
              这个网站会跟着我一起成长。
            </p>
            <p>
              既然你已经逛到这儿了，那就随便看看吧，希望你能在这里发现点有用的，或者至少是好玩的东西。
            </p>
          </div>
        </CardContent>
      </Card>
      {/* <Card>
        <CardContent>
          <div className="lg:prose-lg xl:prose-xl dark:prose-invert">
            <p>Hi.</p>
            <p>
              I'm Zhang, also known online as Jack Atlas, named after
              a character in Yu-Gi-Oh! 5d's.
            </p>
            <p>I'm a builder -- I like making things on the web.</p>
            <p>
              This is my personal blog where I write about whatever
              I'm exploring at the moment: sometimes it's technical
              articles, sometimes translations of things I find
              interesting, sometimes just learning notes, and
              occasionally random things from life.
            </p>
            <p>
              I don't really separate everything too strictly. If
              something helps me understand a topic better or captures
              a moment I don't want to forget, it ends up here.
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
              maybe you'll find something useful, or at least
              something interesting.
            </p>
          </div>
        </CardContent>
      </Card> */}
    </div>
  )
}
