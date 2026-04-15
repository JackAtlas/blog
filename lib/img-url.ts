const CDN_DOMAIN = process.env.NEXT_PUBLIC_CDN_DOMAIN || '//'

export function imgUrlPrefix(path?: string | null) {
  if (!path) return ''

  if (path.startsWith('http')) return path

  return `${CDN_DOMAIN}/${path.replace(/^\/+/, '')}`
}
