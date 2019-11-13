import { customResolvers } from './custom'
import { commentResolvers } from './generated/comment'
import { noteResolvers } from './generated/note'
import { GraphbackCRUDService } from '@graphback/runtime'

// Generated resolvers
export const resolvers = [noteResolvers, commentResolvers, ...customResolvers]

// List of types
const types = ["Comment", "Note"]

export const createContext = (creator: () => GraphbackCRUDService) => {
    const context = {};
    for (const type of types) {
        context['crud' + type] = creator();
    }
};
