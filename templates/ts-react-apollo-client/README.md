# Graphback React Sample application

Starter React template using one of the Graphback backend templates

## Usage

This project has been created using Graphback. 
Run the project using the following steps:

- Install

```bash
yarn install
```

- Start React App

```bash
yarn start:client
```

## Development and adjustment to schema changes

Client is designed to work only with the sample schema.
When changing graphback schema you will need to recompile all the changes.

- Generate client side queries
```
yarn graphback generate
```

- Generate React components
```
yarn codegen
```

