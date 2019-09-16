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
        return this.config && this.config.db && this.config.files;
    }

    private applyAbsolutePaths() {
        // tslint:disable-next-line: no-for-in
        for (const fileType in this.config.files) {
            if (this.config.files[fileType]) {
                this.config.files[fileType] = join(process.cwd(), this.config.files[fileType]);
            }
        }
    }
}

export const configInstance = new ConfigBuilder(readJsonTemplateConfig);