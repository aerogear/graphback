# Contributing to the Graphback

First, ensure you have the [latest LTS npm](https://docs.npmjs.com/) installed.
For CLI usage we recommend to use Node version manager - NVM.

## Building

```shell
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

```shell
cd packages/graphback-cli
npm link  
```

> NOTE: if you have graphback installed globally it will need to be uninstalled first

```shell
npm uninstall -g graphback-cli
```

## Debugging command line tool

When using Visual Studio Code developers can use debugger configurations for command line tool.
Each individual command can be executed and it will stop on breakpoints.

## Run benchmark inside docker with limited resources 

The project comes with a performance suite that compares Graphback with other NodeJs GraphQL solutions. 
All the test suites uses the same setup and an in memory data store.

To launc the benchmark, use the command below:

```shell
yarn bench:docker
```

This will launch an interactive shell that asks what type of profile you'd like to run. 

> NOTE: Make sure that the project is already built as indicated in [build section](#build). 