import { getLikedNotes } from './getLikedNotes'
import { likeNote } from './likeNote'

export const customResolvers = [getLikedNotes, likeNote]
