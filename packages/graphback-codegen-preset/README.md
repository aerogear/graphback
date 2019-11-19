## Graphback GraphQL Code Generator Preset

Preset for GraphQL-Code-Generator

## Usage

```
$ yarn add @graphql-codegen/import-types-preset
```

## Configuration

Required, should point to the base schema types file. The key of the output is used a the base path for this file.

```
codegen:
  path/to/file.ts:
  preset: import-types
  presetConfig:
    typesPath: types.ts
  plugins:
    - typescript-operations
```