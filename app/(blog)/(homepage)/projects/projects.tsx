import { LuSquareDashedMousePointer } from 'react-icons/lu'

export const projects = [
  {
    name: 'chi-flow',
    link: 'https://chiflow.jackatlas.xyz',
    code: 'https://github.com/JackAtlas/chi-flow',
    description: '',
    render: () => (
      <div className="text-2xl font-extrabold flex items-center gap-2">
        <div className="rounded-xl bg-gradient-to-r from-violet-500 to-violet-600 p-2">
          <LuSquareDashedMousePointer
            size={20}
            className="stroke-white"
          />
        </div>
        <div className="flex items-center">
          <span className="bg-gradient-to-r from-violet-500 to-violet-600 bg-clip-text text-transparent">
            Chi
          </span>
          <span className="text-stone-700 dark:text-stone-300">
            Flow
          </span>
        </div>
      </div>
    )
  },
  {
    name: 'chi-form',
    link: 'https://chiform.jackatlas.xyz',
    code: 'https://github.com/JackAtlas/chi-form',
    description: '',
    render: () => (
      <div className="font-bold text-3xl bg-gradient-to-r from-violet-400 to-fuchsia-400 text-transparent bg-clip-text hover:scale-110 hover:cursor-pointer">
        ChiForm
      </div>
    )
  }
] as const
