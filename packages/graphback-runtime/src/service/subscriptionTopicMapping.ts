import { GraphbackOperationType } from "@graphback/core"
/**
 * Provides way to map runtime topics for subscriptions for specific types and object names
 */
export const subscriptionTopicMapping = (tiggerType: GraphbackOperationType, objectName: string) => {
    return `${tiggerType}_${objectName}`.toUpperCase();
}
