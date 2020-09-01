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

*Defined in [graphback-codegen-schema/src/SchemaCRUDPlugin.ts:42](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-codegen-schema/src/SchemaCRUDPlugin.ts#L42)*

**Parameters:**

Name | Type |
------ | ------ |
`pluginConfig?` | [SchemaCRUDPluginConfig](../interfaces/_schemacrudplugin_.schemacrudpluginconfig.md) |

**Returns:** *[SchemaCRUDPlugin](_schemacrudplugin_.schemacrudplugin.md)*

## Properties

### `Private` pluginConfig

• **pluginConfig**: *[SchemaCRUDPluginConfig](../interfaces/_schemacrudplugin_.schemacrudpluginconfig.md)*

*Defined in [graphback-codegen-schema/src/SchemaCRUDPlugin.ts:42](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-codegen-schema/src/SchemaCRUDPlugin.ts#L42)*

## Methods

### `Protected` addCreateMutationResolver

▸ **addCreateMutationResolver**(`model`: ModelDefinition, `mutationObj`: IObjectTypeResolver): *void*

*Defined in [graphback-codegen-schema/src/SchemaCRUDPlugin.ts:501](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-codegen-schema/src/SchemaCRUDPlugin.ts#L501)*

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

*Defined in [graphback-codegen-schema/src/SchemaCRUDPlugin.ts:596](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-codegen-schema/src/SchemaCRUDPlugin.ts#L596)*

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

*Defined in [graphback-codegen-schema/src/SchemaCRUDPlugin.ts:540](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-codegen-schema/src/SchemaCRUDPlugin.ts#L540)*

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

*Defined in [graphback-codegen-schema/src/SchemaCRUDPlugin.ts:638](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-codegen-schema/src/SchemaCRUDPlugin.ts#L638)*

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

*Defined in [graphback-codegen-schema/src/SchemaCRUDPlugin.ts:575](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-codegen-schema/src/SchemaCRUDPlugin.ts#L575)*

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

*Defined in [graphback-codegen-schema/src/SchemaCRUDPlugin.ts:559](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-codegen-schema/src/SchemaCRUDPlugin.ts#L559)*

Creates a Find Query resolver field

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`model` | ModelDefinition | Model definition object |
`queryObj` | IObjectTypeResolver | - |

**Returns:** *void*

___

### `Protected` addMutationResolvers

▸ **addMutationResolvers**(`model`: ModelDefinition, `mutationObj`: IObjectTypeResolver): *void*

*Defined in [graphback-codegen-schema/src/SchemaCRUDPlugin.ts:441](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-codegen-schema/src/SchemaCRUDPlugin.ts#L441)*

Create Mutation resolver fields

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`model` | ModelDefinition | The model definition with CRUD config and GraphQL typr |
`mutationObj` | IObjectTypeResolver | Mutation resolver object  |

**Returns:** *void*

___

### `Protected` addOneToManyResolver

▸ **addOneToManyResolver**(`relationship`: FieldRelationshipMetadata, `resolverObj`: IResolvers, `modelNameToModelDefinition`: any): *void*

*Defined in [graphback-codegen-schema/src/SchemaCRUDPlugin.ts:660](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-codegen-schema/src/SchemaCRUDPlugin.ts#L660)*

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

*Defined in [graphback-codegen-schema/src/SchemaCRUDPlugin.ts:691](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-codegen-schema/src/SchemaCRUDPlugin.ts#L691)*

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

▸ **addQueryResolvers**(`model`: ModelDefinition, `queryObj`: IObjectTypeResolver): *void*

*Defined in [graphback-codegen-schema/src/SchemaCRUDPlugin.ts:426](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-codegen-schema/src/SchemaCRUDPlugin.ts#L426)*

Create Query resolver fields

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`model` | ModelDefinition | The model definition with CRUD config and GraphQL typr |
`queryObj` | IObjectTypeResolver | Query resolver object  |

**Returns:** *void*

___

### `Protected` addRelationshipResolvers

▸ **addRelationshipResolvers**(`model`: ModelDefinition, `resolversObj`: IResolvers, `modelNameToModelDefinition`: any): *void*

*Defined in [graphback-codegen-schema/src/SchemaCRUDPlugin.ts:480](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-codegen-schema/src/SchemaCRUDPlugin.ts#L480)*

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

▸ **addSubscriptionResolvers**(`model`: ModelDefinition, `subscriptionObj`: IObjectTypeResolver): *void*

*Defined in [graphback-codegen-schema/src/SchemaCRUDPlugin.ts:459](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-codegen-schema/src/SchemaCRUDPlugin.ts#L459)*

Create Subscription resolver fields

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`model` | ModelDefinition | The model definition with CRUD config and GraphQL typr |
`subscriptionObj` | IObjectTypeResolver | Subscription resolver object  |

**Returns:** *void*

___

### `Protected` addUpdateMutationResolver

▸ **addUpdateMutationResolver**(`model`: ModelDefinition, `mutationObj`: IObjectTypeResolver): *void*

*Defined in [graphback-codegen-schema/src/SchemaCRUDPlugin.ts:521](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-codegen-schema/src/SchemaCRUDPlugin.ts#L521)*

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

*Defined in [graphback-codegen-schema/src/SchemaCRUDPlugin.ts:617](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-codegen-schema/src/SchemaCRUDPlugin.ts#L617)*

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

*Defined in [graphback-codegen-schema/src/SchemaCRUDPlugin.ts:350](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-codegen-schema/src/SchemaCRUDPlugin.ts#L350)*

**Parameters:**

Name | Type |
------ | ------ |
`schemaComposer` | SchemaComposer‹any› |
`models` | ModelDefinition[] |

**Returns:** *void*

___

### `Protected` buildSchemaForModels

▸ **buildSchemaForModels**(`schemaComposer`: SchemaComposer‹any›, `models`: ModelDefinition[]): *void*

*Defined in [graphback-codegen-schema/src/SchemaCRUDPlugin.ts:145](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-codegen-schema/src/SchemaCRUDPlugin.ts#L145)*

**Parameters:**

Name | Type |
------ | ------ |
`schemaComposer` | SchemaComposer‹any› |
`models` | ModelDefinition[] |

**Returns:** *void*

___

### `Private` buildSchemaModelRelationships

▸ **buildSchemaModelRelationships**(`schemaComposer`: SchemaComposer‹any›, `models`: ModelDefinition[]): *void*

*Defined in [graphback-codegen-schema/src/SchemaCRUDPlugin.ts:769](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-codegen-schema/src/SchemaCRUDPlugin.ts#L769)*

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

*Defined in [graphback-codegen-schema/src/SchemaCRUDPlugin.ts:246](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-codegen-schema/src/SchemaCRUDPlugin.ts#L246)*

**Parameters:**

Name | Type |
------ | ------ |
`model` | ModelDefinition |
`schemaComposer` | SchemaComposer‹any› |

**Returns:** *void*

___

### `Protected` createQueries

▸ **createQueries**(`model`: ModelDefinition, `schemaComposer`: SchemaComposer‹any›): *void*

*Defined in [graphback-codegen-schema/src/SchemaCRUDPlugin.ts:308](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-codegen-schema/src/SchemaCRUDPlugin.ts#L308)*

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

*Defined in [graphback-codegen-schema/src/SchemaCRUDPlugin.ts:75](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-codegen-schema/src/SchemaCRUDPlugin.ts#L75)*

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

*Defined in [graphback-codegen-schema/src/SchemaCRUDPlugin.ts:114](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-codegen-schema/src/SchemaCRUDPlugin.ts#L114)*

**Parameters:**

Name | Type |
------ | ------ |
`metadata` | GraphbackCoreMetadata |

**Returns:** *void*

___

### `Protected` createSchema

▸ **createSchema**(`queryTypes`: any, `mutationTypes`: any, `subscriptionTypes`: any): *GraphQLSchema‹›*

*Defined in [graphback-codegen-schema/src/SchemaCRUDPlugin.ts:217](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-codegen-schema/src/SchemaCRUDPlugin.ts#L217)*

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

*Defined in [graphback-codegen-schema/src/SchemaCRUDPlugin.ts:738](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-codegen-schema/src/SchemaCRUDPlugin.ts#L738)*

**Parameters:**

Name | Type |
------ | ------ |
`schemaComposer` | SchemaComposer‹any› |

**Returns:** *void*

___

### `Protected` createSubscriptions

▸ **createSubscriptions**(`model`: ModelDefinition, `schemaComposer`: SchemaComposer‹any›): *void*

*Defined in [graphback-codegen-schema/src/SchemaCRUDPlugin.ts:160](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-codegen-schema/src/SchemaCRUDPlugin.ts#L160)*

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

*Defined in [graphback-codegen-schema/src/SchemaCRUDPlugin.ts:141](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-codegen-schema/src/SchemaCRUDPlugin.ts#L141)*

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

*Defined in [graphback-codegen-schema/src/SchemaCRUDPlugin.ts:51](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-codegen-schema/src/SchemaCRUDPlugin.ts#L51)*

**Parameters:**

Name | Type |
------ | ------ |
`metadata` | GraphbackCoreMetadata |

**Returns:** *GraphQLSchema*

___

### `Protected` transformSchemaToString

▸ **transformSchemaToString**(`schema`: GraphQLSchema, `fileExtension`: string): *string*

*Defined in [graphback-codegen-schema/src/SchemaCRUDPlugin.ts:404](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-codegen-schema/src/SchemaCRUDPlugin.ts#L404)*

Print schema as a string and format in one of the available languages

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`schema` | GraphQLSchema | - |
`fileExtension` | string |   |

**Returns:** *string*
