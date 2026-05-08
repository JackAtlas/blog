export async function getThemes() {
  const res = await fetch('/themes.json')
  return res.json()
}

export function applyTheme(theme: string) {
  const id = 'theme-css'

  let link = document.getElementById(id) as HTMLLinkElement | null

  if (!link) {
    link = document.createElement('link')
    link.id = id
    link.rel = 'stylesheet'
    document.head.appendChild(link)
  }

  document.documentElement.setAttribute('data-theme', theme)
  link.href = `/themes/${theme}.css`
}
