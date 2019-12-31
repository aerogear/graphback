[![TypeScript version][ts-badge]][typescript-30]
[![Node.js version][nodejs-badge]][nodejs]
[![APLv2][license-badge]][LICENSE]
[![PRs Welcome][prs-badge]][prs]
[![Discord Chat](https://img.shields.io/discord/632220458137419776)](https://discord.gg/mJ7j84m)

## Graphback

<p align="center">
  <img width="400" src="https://github.com/aerogear/graphback/raw/master/website/static/img/graphback.png">
  <br/>
  Auto generate database structure, <br/>
  GraphQL Resolvers and Queries from GraphQL types 🚀
</p>

## Motivation

Graphback helps you to kickstart your experience with any existing GraphQL implementation
by generating a Node.js server using your data model.

## What it does

- Generates required queries and mutations automatically using proven GraphQL patterns
- Generates an unopiniated resolver layer
- Generates database DDL statements that can be used to store data (optional)

## Why use it

- Plain and most canonical GraphQL implementation. Generated resolvers will work with plain GraphQL solutions.

- Works out of the box with Apollo GraphQL and GraphQL JS

- Full freedom - generated resources can be edited and reconfigured later

- Custom directives out of the box. Provides a set of useful directives and input types that resolve standard use cases

- Auto generated schema based on best GraphQL patterns

- Pick your own server framework and clients (works with Apollo Express and Hapi)

- Pick your own database. The solution abstracts from database storage and allows you to support any existing storage, by
implementing available interfaces.

## Documentation

 See [Graphback.dev](https://graphback.dev) for usage and more.

## Contributing

See [contribution guidelines](./CONTRIBUTING.md) file for more information

## License

Licensed under the APLv2.

[ts-badge]: https://img.shields.io/badge/TypeScript-3.0-blue.svg
[nodejs-badge]: https://img.shields.io/badge/Node.js->=%208.9-blue.svg
[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg
[license-badge]: https://img.shields.io/badge/license-APLv2-blue.svg
[typescript-30]: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-0.html
[nodejs]: https://nodejs.org/dist/latest-v8.x/docs/api/
[license]: ./LICENSE
[prs]: ./CONTRIBUTING.md
