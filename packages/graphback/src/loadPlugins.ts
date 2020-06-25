/* eslint-disable @typescript-eslint/no-var-requires */
import { GraphbackPlugin } from "@graphback/core";

export function loadPlugins(pluginConfig: any): GraphbackPlugin[] {
  if (!pluginConfig) {
    return [];
  }

  const pluginInstances = [];
  for (const pluginLabel of Object.keys(pluginConfig)) {
    let pluginName = pluginLabel;
    if (pluginLabel.startsWith('graphback-')) {
      // Internal graphback plugins needs rename
      pluginName = pluginLabel.replace('graphback-', '@graphback/codegen-');
    }
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const plugin = require(pluginName);
      if (plugin.Plugin) {
        const config = pluginConfig[pluginLabel];
        pluginInstances.push(new plugin.Plugin(config));
      }
      else {
        // eslint-disable-next-line no-console
        console.log(`${pluginName} plugin is not exporting 'Plugin' class`);
      }
    }
    catch (e) {
      // eslint-disable-next-line no-console
      console.log(`${pluginName} plugin missing in package.json`, e);
    }
  }

  return pluginInstances;
}
