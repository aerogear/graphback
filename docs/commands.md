---
id: commands
title: CLI commands
---

## Commands

CLI offers help prompt. 
Execute `graphback` in your shell for more information

### Config 

```bash
graphback config
```

Create sample configuration in existing project to support Graphback resolver and schema generation.
Config will allow you to generate existing configuration that uses default Graphback plugins and one of the 
databases we support out of the box. Additionally data migrations configuration will be initialized that will
help you to manage data migrations by specifying GraphQL queries.

> **Note** When creating configuration please review all paths as they might not reflect your project stucture

### Generate

  ```bash
  graphback generate
  ```

  Generate command will execute generation process that will gener GraphQL server based on your data model.