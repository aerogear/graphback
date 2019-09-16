import { join } from 'path';
import { ProjectConfig } from './ProjectConfig';
import { readJsonTemplateConfig } from './readJsonTemplateConfig';


/**
 * Abstraction for Graphback configuration
 */
export class ConfigBuilder {

    public config: ProjectConfig

    constructor(creator: () => ProjectConfig) {
        this.config = creator()
        this.applyAbsolutePaths();
    }

    public isValid() {
        return this.config && this.config.db && this.config.folders;
    }

    private applyAbsolutePaths() {
        // tslint:disable-next-line: no-for-in
        for (const fileType in this.config.folders) {
            if (this.config.folders[fileType]) {
                this.config.folders[fileType] = join(process.cwd(), this.config.folders[fileType]);
            }
        }
    }
}

export const configInstance = new ConfigBuilder(readJsonTemplateConfig);