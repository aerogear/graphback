---
id: "_buildgraphbackapi_.graphbackapiconfig"
title: "GraphbackAPIConfig"
sidebar_label: "GraphbackAPIConfig"
---

## Hierarchy

* **GraphbackAPIConfig**

## Index

### Properties

* [crud](_buildgraphbackapi_.graphbackapiconfig.md#optional-crud)
* [dataProviderCreator](_buildgraphbackapi_.graphbackapiconfig.md#dataprovidercreator)
* [plugins](_buildgraphbackapi_.graphbackapiconfig.md#optional-plugins)
* [serviceCreator](_buildgraphbackapi_.graphbackapiconfig.md#optional-servicecreator)

## Properties

### `Optional` crud

• **crud**? : *GraphbackCRUDGeneratorConfig*

*Defined in [buildGraphbackAPI.ts:12](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback/src/buildGraphbackAPI.ts#L12)*

Global CRUD configuration

___

###  dataProviderCreator

• **dataProviderCreator**: *[DataProviderCreator](../modules/_index_.md#dataprovidercreator)*

*Defined in [buildGraphbackAPI.ts:26](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback/src/buildGraphbackAPI.ts#L26)*

Function which creates a default data provicer for every data model

___

### `Optional` plugins

• **plugins**? : *GraphbackPlugin[]*

*Defined in [buildGraphbackAPI.ts:16](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback/src/buildGraphbackAPI.ts#L16)*

Schema plugins to perform automatic changes to the schema

___

### `Optional` serviceCreator

• **serviceCreator**? : *[ServiceCreator](../modules/_index_.md#servicecreator)*

*Defined in [buildGraphbackAPI.ts:21](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback/src/buildGraphbackAPI.ts#L21)*

Function which creates a default CRUD Service for every data model
