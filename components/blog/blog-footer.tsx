import { FaGithub } from 'react-icons/fa'

export default function BlogFooter() {
  return (
    <footer className="blog-container flex flex-col items-center justify-between md:flex-row shadow shadow-black/5">
      <div className="flex items-center min-h-14">
        &copy; 2025 Built with ❤️ by JackAtlas
      </div>
      <div className="flex items-center min-h-14">
        <a
          href="https://beian.miit.gov.cn/"
          className="hover:text-primary"
        >
          粤ICP备2025385262号
        </a>
      </div>
      <div className="flex min-h-14">
        <a
          href="https://github.com/jackatlas"
          className="flex items-center px-5 py-3 hover:text-primary"
          target="_blank"
          title="https://github.com/jackatlas"
        >
          <FaGithub />
        </a>
      </div>
    </footer>
  )
}
