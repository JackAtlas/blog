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
  }
]
