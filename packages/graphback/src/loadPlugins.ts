/* eslint-disable @typescript-eslint/no-var-requires */
import { GraphbackPlugin } from "@graphback/core";

interface PluginDefaultProps {
  packageName?: string
}

interface PluginConfigMap {
  [pluginName: string]: PluginConfig
} 

interface PluginConfig extends PluginDefaultProps {
  [key: string]: any
}

export function loadPlugins(pluginConfigMap: PluginConfigMap): GraphbackPlugin[] {
  if (!pluginConfigMap) {
    return [];
  }

  const pluginInstances = [];
  for (const pluginLabel of Object.keys(pluginConfigMap)) {
    let pluginName = pluginLabel;
    if (pluginLabel.startsWith('graphback-')) {
      // Internal graphback plugins needs rename
      pluginName = pluginLabel.replace('graphback-', '@graphback/codegen-');
    }
    const packageName = pluginConfigMap[pluginLabel].packageName;
    // override package name
    if(packageName){
      pluginName = packageName;
    }
    
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const plugin = require(pluginName);
      if (plugin.Plugin) {
        const config = pluginConfigMap[pluginLabel];
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
