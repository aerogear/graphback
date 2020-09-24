---
id: "_schemacrudplugin_.schemacrudplugin"
title: "SchemaCRUDPlugin"
sidebar_label: "SchemaCRUDPlugin"
---

Graphback CRUD operations plugin

Plugins adds additional Queries, Mutations and Subscriptions into the Schema along
with required input types and scalars. Plugin can be used automatically define best
patterns for CRUD operations on top of GraphQL Schema
Plugin checkes all types annotated with model

Used graphql metadata:

- model: marks type to be processed by CRUD generator
- crud: controls what types of operations can be generated.
For example crud.update: false will disable updates for type

## Hierarchy

* GraphbackPlugin

  ↳ **SchemaCRUDPlugin**

## Index

### Constructors

* [constructor](_schemacrudplugin_.schemacrudplugin.md#constructor)

### Properties

* [pluginConfig](_schemacrudplugin_.schemacrudplugin.md#private-pluginconfig)

### Methods

* [addCreateMutationResolver](_schemacrudplugin_.schemacrudplugin.md#protected-addcreatemutationresolver)
* [addCreateSubscriptionResolver](_schemacrudplugin_.schemacrudplugin.md#protected-addcreatesubscriptionresolver)
* [addDeleteMutationResolver](_schemacrudplugin_.schemacrudplugin.md#protected-adddeletemutationresolver)
* [addDeleteSubscriptionResolver](_schemacrudplugin_.schemacrudplugin.md#protected-adddeletesubscriptionresolver)
* [addFindOneQueryResolver](_schemacrudplugin_.schemacrudplugin.md#protected-addfindonequeryresolver)
* [addFindQueryResolver](_schemacrudplugin_.schemacrudplugin.md#protected-addfindqueryresolver)
* [addMutationResolvers](_schemacrudplugin_.schemacrudplugin.md#protected-addmutationresolvers)
* [addOneToManyResolver](_schemacrudplugin_.schemacrudplugin.md#protected-addonetomanyresolver)
* [addOneToOneResolver](_schemacrudplugin_.schemacrudplugin.md#protected-addonetooneresolver)
* [addQueryResolvers](_schemacrudplugin_.schemacrudplugin.md#protected-addqueryresolvers)
* [addRelationshipResolvers](_schemacrudplugin_.schemacrudplugin.md#protected-addrelationshipresolvers)
* [addSubscriptionResolvers](_schemacrudplugin_.schemacrudplugin.md#protected-addsubscriptionresolvers)
* [addUpdateMutationResolver](_schemacrudplugin_.schemacrudplugin.md#protected-addupdatemutationresolver)
* [addUpdateSubscriptionResolver](_schemacrudplugin_.schemacrudplugin.md#protected-addupdatesubscriptionresolver)
* [addVersionedMetadataFields](_schemacrudplugin_.schemacrudplugin.md#protected-addversionedmetadatafields)
* [buildSchemaForModels](_schemacrudplugin_.schemacrudplugin.md#protected-buildschemaformodels)
* [buildSchemaModelRelationships](_schemacrudplugin_.schemacrudplugin.md#private-buildschemamodelrelationships)
* [createMutations](_schemacrudplugin_.schemacrudplugin.md#protected-createmutations)
* [createQueries](_schemacrudplugin_.schemacrudplugin.md#protected-createqueries)
* [createResolvers](_schemacrudplugin_.schemacrudplugin.md#createresolvers)
* [createResources](_schemacrudplugin_.schemacrudplugin.md#createresources)
* [createSchema](_schemacrudplugin_.schemacrudplugin.md#protected-createschema)
* [createSchemaCRUDTypes](_schemacrudplugin_.schemacrudplugin.md#private-createschemacrudtypes)
* [createSubscriptions](_schemacrudplugin_.schemacrudplugin.md#protected-createsubscriptions)
* [getPluginName](_schemacrudplugin_.schemacrudplugin.md#getpluginname)
* [logError](_schemacrudplugin_.schemacrudplugin.md#protected-logerror)
* [logWarning](_schemacrudplugin_.schemacrudplugin.md#protected-logwarning)
* [transformSchema](_schemacrudplugin_.schemacrudplugin.md#transformschema)
* [transformSchemaToString](_schemacrudplugin_.schemacrudplugin.md#protected-transformschematostring)

## Constructors

###  constructor

\+ **new SchemaCRUDPlugin**(`pluginConfig?`: [SchemaCRUDPluginConfig](../interfaces/_schemacrudplugin_.schemacrudpluginconfig.md)): *[SchemaCRUDPlugin](_schemacrudplugin_.schemacrudplugin.md)*

*Defined in [graphback-codegen-schema/src/SchemaCRUDPlugin.ts:42](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-codegen-schema/src/SchemaCRUDPlugin.ts#L42)*

**Parameters:**

Name | Type |
------ | ------ |
`pluginConfig?` | [SchemaCRUDPluginConfig](../interfaces/_schemacrudplugin_.schemacrudpluginconfig.md) |

**Returns:** *[SchemaCRUDPlugin](_schemacrudplugin_.schemacrudplugin.md)*

## Properties

### `Private` pluginConfig

• **pluginConfig**: *[SchemaCRUDPluginConfig](../interfaces/_schemacrudplugin_.schemacrudpluginconfig.md)*

*Defined in [graphback-codegen-schema/src/SchemaCRUDPlugin.ts:42](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-codegen-schema/src/SchemaCRUDPlugin.ts#L42)*

## Methods

### `Protected` addCreateMutationResolver

▸ **addCreateMutationResolver**(`model`: ModelDefinition, `mutationObj`: IObjectTypeResolver): *void*

*Defined in [graphback-codegen-schema/src/SchemaCRUDPlugin.ts:510](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-codegen-schema/src/SchemaCRUDPlugin.ts#L510)*

Creates a Create mutation resolver field

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`model` | ModelDefinition | Model GraphQL object type |
`mutationObj` | IObjectTypeResolver | Mutation resolver object  |

**Returns:** *void*

___

### `Protected` addCreateSubscriptionResolver

▸ **addCreateSubscriptionResolver**(`modelType`: GraphQLObjectType, `subscriptionObj`: IObjectTypeResolver): *void*

*Defined in [graphback-codegen-schema/src/SchemaCRUDPlugin.ts:605](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-codegen-schema/src/SchemaCRUDPlugin.ts#L605)*

Creates a Create Subscription resolver field

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`modelType` | GraphQLObjectType | Model GraphQL object type |
`subscriptionObj` | IObjectTypeResolver | - |

**Returns:** *void*

___

### `Protected` addDeleteMutationResolver

▸ **addDeleteMutationResolver**(`model`: ModelDefinition, `mutationObj`: IObjectTypeResolver): *void*

*Defined in [graphback-codegen-schema/src/SchemaCRUDPlugin.ts:549](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-codegen-schema/src/SchemaCRUDPlugin.ts#L549)*

Creates a Delete Mutation resolver field

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`model` | ModelDefinition | Model definition object |
`mutationObj` | IObjectTypeResolver | Mutation resolver object  |

**Returns:** *void*

___

### `Protected` addDeleteSubscriptionResolver

▸ **addDeleteSubscriptionResolver**(`modelType`: GraphQLObjectType, `subscriptionObj`: IObjectTypeResolver): *void*

*Defined in [graphback-codegen-schema/src/SchemaCRUDPlugin.ts:647](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-codegen-schema/src/SchemaCRUDPlugin.ts#L647)*

Creates a Delete Subscription resolver field

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`modelType` | GraphQLObjectType | Model GraphQL object type |
`subscriptionObj` | IObjectTypeResolver | - |

**Returns:** *void*

___

### `Protected` addFindOneQueryResolver

▸ **addFindOneQueryResolver**(`model`: ModelDefinition, `queryObj`: IObjectTypeResolver): *void*

*Defined in [graphback-codegen-schema/src/SchemaCRUDPlugin.ts:584](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-codegen-schema/src/SchemaCRUDPlugin.ts#L584)*

Creates a FindOne Query resolver

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`model` | ModelDefinition | Model definition object |
`queryObj` | IObjectTypeResolver | - |

**Returns:** *void*

___

### `Protected` addFindQueryResolver

▸ **addFindQueryResolver**(`model`: ModelDefinition, `queryObj`: IObjectTypeResolver): *void*

*Defined in [graphback-codegen-schema/src/SchemaCRUDPlugin.ts:568](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-codegen-schema/src/SchemaCRUDPlugin.ts#L568)*

Creates a Find Query resolver field

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`model` | ModelDefinition | Model definition object |
`queryObj` | IObjectTypeResolver | - |

**Returns:** *void*

___

### `Protected` addMutationResolvers

▸ **addMutationResolvers**(`model`: ModelDefinition, `resolvers`: IResolvers): *void*

*Defined in [graphback-codegen-schema/src/SchemaCRUDPlugin.ts:441](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-codegen-schema/src/SchemaCRUDPlugin.ts#L441)*

Create Mutation resolver fields

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`model` | ModelDefinition | The model definition with CRUD config and GraphQL typr |
`resolvers` | IResolvers | root resolver object  |

**Returns:** *void*

___

### `Protected` addOneToManyResolver

▸ **addOneToManyResolver**(`relationship`: FieldRelationshipMetadata, `resolverObj`: IResolvers, `modelNameToModelDefinition`: any): *void*

*Defined in [graphback-codegen-schema/src/SchemaCRUDPlugin.ts:669](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-codegen-schema/src/SchemaCRUDPlugin.ts#L669)*

Creates a OneToMany Relationship resolver field

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`relationship` | FieldRelationshipMetadata | - |
`resolverObj` | IResolvers | Resolvers object |
`modelNameToModelDefinition` | any | model type name to its definition for quick search  |

**Returns:** *void*

___

### `Protected` addOneToOneResolver

▸ **addOneToOneResolver**(`relationship`: FieldRelationshipMetadata, `resolverObj`: IResolvers, `modelNameToModelDefinition`: any): *void*

*Defined in [graphback-codegen-schema/src/SchemaCRUDPlugin.ts:700](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-codegen-schema/src/SchemaCRUDPlugin.ts#L700)*

Creates a OneToOne/ManyToOne Relationship resolver field

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`relationship` | FieldRelationshipMetadata | - |
`resolverObj` | IResolvers | Resolvers object |
`modelNameToModelDefinition` | any | model type name to its definition for quick search  |

**Returns:** *void*

___

### `Protected` addQueryResolvers

▸ **addQueryResolvers**(`model`: ModelDefinition, `resolvers`: IResolvers): *void*

*Defined in [graphback-codegen-schema/src/SchemaCRUDPlugin.ts:422](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-codegen-schema/src/SchemaCRUDPlugin.ts#L422)*

Create Query resolver fields

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`model` | ModelDefinition | The model definition with CRUD config and GraphQL typr |
`resolvers` | IResolvers | root resolver object  |

**Returns:** *void*

___

### `Protected` addRelationshipResolvers

▸ **addRelationshipResolvers**(`model`: ModelDefinition, `resolversObj`: IResolvers, `modelNameToModelDefinition`: any): *void*

*Defined in [graphback-codegen-schema/src/SchemaCRUDPlugin.ts:489](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-codegen-schema/src/SchemaCRUDPlugin.ts#L489)*

Create relationship resolver fields

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`model` | ModelDefinition | Model definition with relationship metadata |
`resolversObj` | IResolvers | Resolvers object |
`modelNameToModelDefinition` | any | model type name to its definition for quick search  |

**Returns:** *void*

___

### `Protected` addSubscriptionResolvers

▸ **addSubscriptionResolvers**(`model`: ModelDefinition, `resolvers`: IResolvers): *void*

*Defined in [graphback-codegen-schema/src/SchemaCRUDPlugin.ts:463](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-codegen-schema/src/SchemaCRUDPlugin.ts#L463)*

Create Subscription resolver fields

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`model` | ModelDefinition | The model definition with CRUD config and GraphQL typr |
`resolvers` | IResolvers | root resolver object  |

**Returns:** *void*

___

### `Protected` addUpdateMutationResolver

▸ **addUpdateMutationResolver**(`model`: ModelDefinition, `mutationObj`: IObjectTypeResolver): *void*

*Defined in [graphback-codegen-schema/src/SchemaCRUDPlugin.ts:530](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-codegen-schema/src/SchemaCRUDPlugin.ts#L530)*

Creates an Update mutation resolver

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`model` | ModelDefinition | Model definition object |
`mutationObj` | IObjectTypeResolver | Mutation resolver object  |

**Returns:** *void*

___

### `Protected` addUpdateSubscriptionResolver

▸ **addUpdateSubscriptionResolver**(`modelType`: GraphQLObjectType, `subscriptionObj`: IObjectTypeResolver): *void*

*Defined in [graphback-codegen-schema/src/SchemaCRUDPlugin.ts:626](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-codegen-schema/src/SchemaCRUDPlugin.ts#L626)*

Creates an Update Subscription resolver field

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`modelType` | GraphQLObjectType | Model GraphQL object type |
`subscriptionObj` | IObjectTypeResolver | - |

**Returns:** *void*

___

### `Protected` addVersionedMetadataFields

▸ **addVersionedMetadataFields**(`schemaComposer`: SchemaComposer‹any›, `models`: ModelDefinition[]): *void*

*Defined in [graphback-codegen-schema/src/SchemaCRUDPlugin.ts:346](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-codegen-schema/src/SchemaCRUDPlugin.ts#L346)*

**Parameters:**

Name | Type |
------ | ------ |
`schemaComposer` | SchemaComposer‹any› |
`models` | ModelDefinition[] |

**Returns:** *void*

___

### `Protected` buildSchemaForModels

▸ **buildSchemaForModels**(`schemaComposer`: SchemaComposer‹any›, `models`: ModelDefinition[]): *void*

*Defined in [graphback-codegen-schema/src/SchemaCRUDPlugin.ts:141](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-codegen-schema/src/SchemaCRUDPlugin.ts#L141)*

**Parameters:**

Name | Type |
------ | ------ |
`schemaComposer` | SchemaComposer‹any› |
`models` | ModelDefinition[] |

**Returns:** *void*

___

### `Private` buildSchemaModelRelationships

▸ **buildSchemaModelRelationships**(`schemaComposer`: SchemaComposer‹any›, `models`: ModelDefinition[]): *void*

*Defined in [graphback-codegen-schema/src/SchemaCRUDPlugin.ts:778](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-codegen-schema/src/SchemaCRUDPlugin.ts#L778)*

Add relationship fields to GraphQL model types

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`schemaComposer` | SchemaComposer‹any› | - |
`models` | ModelDefinition[] |   |

**Returns:** *void*

___

### `Protected` createMutations

▸ **createMutations**(`model`: ModelDefinition, `schemaComposer`: SchemaComposer‹any›): *void*

*Defined in [graphback-codegen-schema/src/SchemaCRUDPlugin.ts:242](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-codegen-schema/src/SchemaCRUDPlugin.ts#L242)*

**Parameters:**

Name | Type |
------ | ------ |
`model` | ModelDefinition |
`schemaComposer` | SchemaComposer‹any› |

**Returns:** *void*

___

### `Protected` createQueries

▸ **createQueries**(`model`: ModelDefinition, `schemaComposer`: SchemaComposer‹any›): *void*

*Defined in [graphback-codegen-schema/src/SchemaCRUDPlugin.ts:304](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-codegen-schema/src/SchemaCRUDPlugin.ts#L304)*

**Parameters:**

Name | Type |
------ | ------ |
`model` | ModelDefinition |
`schemaComposer` | SchemaComposer‹any› |

**Returns:** *void*

___

###  createResolvers

▸ **createResolvers**(`metadata`: GraphbackCoreMetadata): *IResolvers*

*Overrides void*

*Defined in [graphback-codegen-schema/src/SchemaCRUDPlugin.ts:75](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-codegen-schema/src/SchemaCRUDPlugin.ts#L75)*

Creates CRUD resolvers

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`metadata` | GraphbackCoreMetadata | Core metatata containing all model information  |

**Returns:** *IResolvers*

___

###  createResources

▸ **createResources**(`metadata`: GraphbackCoreMetadata): *void*

*Overrides void*

*Defined in [graphback-codegen-schema/src/SchemaCRUDPlugin.ts:110](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-codegen-schema/src/SchemaCRUDPlugin.ts#L110)*

**Parameters:**

Name | Type |
------ | ------ |
`metadata` | GraphbackCoreMetadata |

**Returns:** *void*

___

### `Protected` createSchema

▸ **createSchema**(`queryTypes`: any, `mutationTypes`: any, `subscriptionTypes`: any): *GraphQLSchema‹›*

*Defined in [graphback-codegen-schema/src/SchemaCRUDPlugin.ts:213](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-codegen-schema/src/SchemaCRUDPlugin.ts#L213)*

**Parameters:**

Name | Type |
------ | ------ |
`queryTypes` | any |
`mutationTypes` | any |
`subscriptionTypes` | any |

**Returns:** *GraphQLSchema‹›*

___

### `Private` createSchemaCRUDTypes

▸ **createSchemaCRUDTypes**(`schemaComposer`: SchemaComposer‹any›): *void*

*Defined in [graphback-codegen-schema/src/SchemaCRUDPlugin.ts:747](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-codegen-schema/src/SchemaCRUDPlugin.ts#L747)*

**Parameters:**

Name | Type |
------ | ------ |
`schemaComposer` | SchemaComposer‹any› |

**Returns:** *void*

___

### `Protected` createSubscriptions

▸ **createSubscriptions**(`model`: ModelDefinition, `schemaComposer`: SchemaComposer‹any›): *void*

*Defined in [graphback-codegen-schema/src/SchemaCRUDPlugin.ts:156](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-codegen-schema/src/SchemaCRUDPlugin.ts#L156)*

**Parameters:**

Name | Type |
------ | ------ |
`model` | ModelDefinition |
`schemaComposer` | SchemaComposer‹any› |

**Returns:** *void*

___

###  getPluginName

▸ **getPluginName**(): *string*

*Overrides void*

*Defined in [graphback-codegen-schema/src/SchemaCRUDPlugin.ts:137](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-codegen-schema/src/SchemaCRUDPlugin.ts#L137)*

**Returns:** *string*

___

### `Protected` logError

▸ **logError**(`message`: string): *void*

*Inherited from [SchemaCRUDPlugin](_schemacrudplugin_.schemacrudplugin.md).[logError](_schemacrudplugin_.schemacrudplugin.md#protected-logerror)*

Defined in graphback-core/types/plugin/GraphbackPlugin.d.ts:37

**Parameters:**

Name | Type |
------ | ------ |
`message` | string |

**Returns:** *void*

___

### `Protected` logWarning

▸ **logWarning**(`message`: string): *void*

*Inherited from [SchemaCRUDPlugin](_schemacrudplugin_.schemacrudplugin.md).[logWarning](_schemacrudplugin_.schemacrudplugin.md#protected-logwarning)*

Defined in graphback-core/types/plugin/GraphbackPlugin.d.ts:36

**Parameters:**

Name | Type |
------ | ------ |
`message` | string |

**Returns:** *void*

___

###  transformSchema

▸ **transformSchema**(`metadata`: GraphbackCoreMetadata): *GraphQLSchema*

*Overrides void*

*Defined in [graphback-codegen-schema/src/SchemaCRUDPlugin.ts:51](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-codegen-schema/src/SchemaCRUDPlugin.ts#L51)*

**Parameters:**

Name | Type |
------ | ------ |
`metadata` | GraphbackCoreMetadata |

**Returns:** *GraphQLSchema*

___

### `Protected` transformSchemaToString

▸ **transformSchemaToString**(`schema`: GraphQLSchema, `fileExtension`: string): *string*

*Defined in [graphback-codegen-schema/src/SchemaCRUDPlugin.ts:400](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-codegen-schema/src/SchemaCRUDPlugin.ts#L400)*

Print schema as a string and format in one of the available languages

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`schema` | GraphQLSchema | - |
`fileExtension` | string |   |

**Returns:** *string*
