# Contributing to the Graphback

First, ensure you have the [latest LTS npm](https://docs.npmjs.com/) installed.
For CLI usage we recommend to use Node version manager - NVM.

## Building

```bash
yarn install
yarn build
```

## Project Structure

The SDK is made by a group of modules, each one implemented in a different NPM package and all placed under `/packages`.

### Run tests with coverage

`yarn test`

### Run linter

`yarn lint`

### Build

`yarn build`

## Using command line tool from local machine

When developing locally we need to link local cmd to be available globally.

```bash
cd packages/graphback-cli
npm link  
```

> NOTE: if you have graphback installed globally it will need to be uninstalled first

```bash
npm uninstall -g graphback-cli
```

## Debugging command line tool

When using Visual Studio Code developers can use debugger configurations for command line tool.
Each individual command can be executed and it will stop on breakpoints.
