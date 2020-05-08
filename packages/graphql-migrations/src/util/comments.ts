export function escapeComment(comment: string | undefined) {
  return comment ? comment.replace(/'/g, `''`).replace(/\n\s*/g, '\n').trim() : undefined
}
