import Image from 'next/image'

export const examples = [
  {
    name: 'solitaire',
    link: 'https://jackatlas.xyz/games/solitaire/',
    code: 'https://gitee.com/jackatlas8864/solitaire',
    description: '',
    render: () => (
      <Image
        src="/solitaire-screenshot.png"
        alt="solitaire"
        width={639}
        height={360}
      />
    )
  },
  {
    name: 'necromancer',
    link: 'https://jackatlas.xyz/games/necromancer/',
    code: 'https://gitee.com/jackatlas/necromancer',
    description: '',
    render: () => (
      <Image
        src="/necromancer-screenshot.png"
        alt="necromancer"
        width={657}
        height={348}
      />
    )
  }
]
