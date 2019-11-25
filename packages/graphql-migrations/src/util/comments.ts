export function escapeComment (comment: string | null) {
  return comment ? comment.replace(/'/g, `''`).replace(/\n\s*/g, '\n').trim() : null
}
