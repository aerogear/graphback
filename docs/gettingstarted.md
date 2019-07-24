---
id: gettingstarted
title: What is Graphback
sidebar_label: What is Graphback
---

Graphback is a CLI tool that can help you bootstrap a GraphQL server and client for you including GraphQL schema, resolvers and generating database structure. Graphback addresses the difficulty in configuring a GraphQL server from scratch.

<div style="width:100%;height:0;padding-bottom:50%;position:relative;"><iframe src="https://giphy.com/embed/Uov4EC4W3G74TtWZKf" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div>

## Installation
```bash
npm i -g graphback-cli
```

## Usage
To start with Graphback run
```bash
graphback init <project-name>
```

Change directory into your project folder. Edit your [`datamodel`](/docs/datamodel) file inside the `model` folder. To generate schema and resolvers run 
```bash
graphback generate
``` 

To setup database resources
```bash
docker-compose up -d
graphback db
```

To start the server and watch for changes in your datamodel run
```bash
graphback watch
```