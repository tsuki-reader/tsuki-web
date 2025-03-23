export function endpoint (path: string) {
  const protocol = window.location.protocol
  const url = process.env.NODE_ENV === 'development' ? '127.0.0.1:1337' : window.location.host
  return `${protocol}//${url}${path}`
}
