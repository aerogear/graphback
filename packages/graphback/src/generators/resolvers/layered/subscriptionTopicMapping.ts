import { ResolverType } from "../ResolverType"


/**
 * Provides way to map runtime topics for subscriptions for specific types and object names
 */
export const subscriptionTopicMapping = (tiggerType: ResolverType, objectName: string) => {
    return `${tiggerType}_${objectName}`
}