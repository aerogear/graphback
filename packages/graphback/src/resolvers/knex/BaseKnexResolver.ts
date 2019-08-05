/**
 * Base resolver class for knex implementation with implementations that
 * doesn't differ across various relation database like sqlite3 or postgresql
 */

export class BaseKnexResolver {
  protected knexContext: string = `context.db`
  protected pubsub: string = `context.pubsub`

  public deleteTemplate = (subscription: boolean, fieldName: string, tableName: string, typeName: string): string => {
    if(subscription) {  
      return `${fieldName}: (_: any, args: any, context: GraphQLContext) => {
      return ${this.knexContext}('${tableName}').where('id', '=' , args.id).del().then( () => {
        ${this.pubsub}.publish(Subscriptions.DELETED_${typeName.toUpperCase()}, {
          deleted${typeName}: args.id
        })
        return args.id;
    })}`
    } else {
      return `${fieldName}: (_: any, args: any, context: GraphQLContext) => {
      return ${this.knexContext}('${tableName}').where('id', '=' , args.id).del().then( () => {
        return args.id;
    })}`
    }
}

public findAllTemplate = (fieldName: string, tableName: string): string => {
    return `${fieldName}: (_: any, __: any, context: GraphQLContext) => {
      return ${this.knexContext}.select().from('${tableName}')
    }`
  }

public findTemplate = (fieldName: string, tableName: string): string => {
    return `${fieldName}: (_: any, args: any, context: GraphQLContext) => {
      return ${this.knexContext}.select().from('${tableName}').where(args.fields)
    }`
}

public updateTemplate = (subscription: boolean, fieldName: string, tableName: string, typeName: string): string => {
    if(subscription) {
      return `${fieldName}: (_: any, args: any, context: GraphQLContext) => {
      return ${this.knexContext}('${tableName}').where('id', '=' , args.id).update(args.input).then( async () => {
        const result = await ${this.knexContext}.select().from('${tableName}').where('id', '=' , args.id);
        ${this.pubsub}.publish(Subscriptions.UPDATED_${typeName.toUpperCase()}, {
          updated${typeName}: result[0]
        })
        return result[0]
    })}`  
    } else {
      return `${fieldName}: (_: any, args: any, context: GraphQLContext) => {
      return ${this.knexContext}('${tableName}').where('id', '=' , args.id).update(args.input).then( async () => {
        const result = await ${this.knexContext}.select().from('${tableName}').where('id', '=' , args.id);
        return result[0]
    })}`
    }
}

public newSub = (typeName: string): string => {
    return `new${typeName}: {
      subscribe: (_: any, __: any, context: GraphQLContext) => {
        return ${this.pubsub}.asyncIterator(Subscriptions.NEW_${typeName.toUpperCase()})
      }
    }`
}

public updatedSub = (typeName: string): string => {
    return `updated${typeName}: {
      subscribe: (_: any, __: any, context: GraphQLContext) => {
        return ${this.pubsub}.asyncIterator(Subscriptions.UPDATED_${typeName.toUpperCase()})
      }
    }`
}

public deletedSub = (typeName: string): string => {
    return `deleted${typeName}: {
      subscribe: (_: any, __: any, context: GraphQLContext) => {
        return ${this.pubsub}.asyncIterator(Subscriptions.DELETED_${typeName.toUpperCase()})
      }
    }`
}

public typeRelation = (relation: string, columnName: string, fieldName: string, tableName: string): string => {
  if(relation === 'OneToOne') {
    return `${fieldName}: (parent: any, _: any, context: GraphQLContext) => {
      return context.db.select().from('${tableName}').where('${columnName}', '=', parent.id)
                                .then((result) => result[0])
    }`
  } else if(relation === 'OneToMany') {
    return `${fieldName}: (parent: any, _: any, context: GraphQLContext) => {
      return context.db.select().from('${tableName}').where('${columnName}', '=', parent.id)
    }`
  } else {
    return undefined
  }
}

public blankQueryResolver = (name: string) => {
  return `Query: {
    ${name}: (_: any, args: any, context: GraphQLContext) => {
        // Implementation here
      }
    }`
}

public blankMutationResolver = (name: string) => {
  return `Mutation: {
    ${name}: (_: any, args: any, context: GraphQLContext) => {
        // Implementation here
      }
    }`
}

public blankSubscription = (name: string) => {
  return `Subscription: {
    ${name}: {
        subscribe: (_: any, __: any, context: GraphQLContext) => {
          // Implementation here
        }
      }
  }`
}
}