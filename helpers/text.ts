import sanitize from 'sanitize-html'

export function sanitizeText (text: string): string {
  const defaultOptions: sanitize.IOptions = {
    allowedTags: ['br']
  }
  return sanitize(text, defaultOptions)
}

export function capitalizeText (text: string): string {
  const lower = text.toLowerCase()
  const words = lower.split(' ')
  const processedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1)
  })
  return processedWords.join(' ')
}
