---
id: subintro
title: Live Updates for Graphback
sidebar_label: Live Updates
---

Graphback provides out of the box subscriptions support by providing one of the `PubSubEngines` 
from https://github.com/apollographql/graphql-subscriptions library. 
Thanks to that developers can connect to any publish subscribe mechanism they have available.
Our templates target to be minimal and unopiniated are using `InMemoryPubSubEngine`

We recomend following engines:

- AMQ (MQTT) using https://github.com/aerogear/graphql-mqtt-subscriptions
- Redis - using https://github.com/davidyaha/graphql-redis-subscriptions

## Subscriptions explained

Graphback provides subscriptions for every type of the operation that is happening on the server. 
This means that developers can explicitly subscribe to create, update and delete operations for particular resource.

Subscriptions can be also suppressed by developers by enabling or disabling subscription CRUD flags when initializing Graphback server 

```js
    {
        ...
        subCreate: true
        subUpdate: true
        subDelete: true
    }
```

## Changing Subscription Topics

Some of the pub sub mechanism will require different format of the topic. 
Graphback CRUD services expose method that can be used to override how topics are build.
For example for AMQ we can create extension of the CRUD service as follows

```ts
export class AMQCRUDService extends CrudService {
    protected subscriptionTopicMapping(triggerType: GraphbackOperationType, objectName: string) {
        // Support AMQ topic creation format
        return `graphql/${objectName}_${triggerType}`
    }
}
```