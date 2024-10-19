import sanitize from "sanitize-html";

export function sanitizeText(text: string): string {
  const defaultOptions: sanitize.IOptions = {
    allowedTags: ['br' ]
  }
  return sanitize(text, defaultOptions)
}
