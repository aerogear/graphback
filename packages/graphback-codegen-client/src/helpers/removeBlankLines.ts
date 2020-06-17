export function removeBlankLines(text: string = ''): string {
  return text.replace(/^\s*\n/gm, "")
}