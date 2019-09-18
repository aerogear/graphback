import { readFileSync } from 'fs';
import { join } from 'path';
import { ProjectConfig } from './ProjectConfig';

/**
 * Read template configuration (based on current working directory)
 */
export const readJsonTemplateConfig = (): ProjectConfig | undefined => {
    const configPath = `${process.cwd()}/graphback.json`
    try {
        return JSON.parse(readFileSync(configPath, "utf8"))
       
    } catch (e) {
        return undefined;
    }

}


