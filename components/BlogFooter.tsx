import { FaGithub } from 'react-icons/fa'

export default function BlogFooter() {
  return (
    <footer className="bg-white shadow shadow-black/5">
      <div className="container min-h-14 flex justify-between">
        <div className="flex items-center">
          &copy; 2025 Built with ❤️ by JackAtlas
        </div>
        <div className="flex">
          <a
            href="https://github.com/jackatlas"
            className="flex items-center px-5 py-3"
            target="_blank"
            title="https://github.com/jackatlas"
          >
            <FaGithub />
          </a>
        </div>
      </div>
    </footer>
  )
}
