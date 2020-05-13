---
id: plugin-intro
title: Graphback Plugins introduction
sidebar_label: Introduction
---

Graphback generator plugins allow developers to define custom set of transformations 
on top of GraphQL schema and create resources like files or even database tables. 

Graphback plugins are executed in the order they are defined in the configuration.
Each plugin can decorate current schema and also create file resources.

Graphback offers standard suite of plugins that give developers ability to 
generate fully functional server and client.

## Global configuiration for plugins

Each plugin requires globally available configuration for model and crud flags.
Example configuration:

```yaml
  # Graphback configuration
  graphback:
    ##  Input schema
    model: ./model/**/*.graphql
    ## Global configuration for CRUD generator
    crud:
      create: true
      update: true
      findOne: true
      find: true
      delete: true
      subCreate: true
      subUpdate: true
      subDelete: true
```

This configuration should not be replicated by hand. 
Developers should use `graphback config` to initialize configuration for their project.