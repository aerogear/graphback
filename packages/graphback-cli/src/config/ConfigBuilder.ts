import { join } from 'path';
import { FolderConfig } from './FolderConfig';
import { ProjectConfig } from './ProjectConfig';
import { readJsonTemplateConfig } from './readJsonTemplateConfig';


export const getDefaultFoldersLocations = (): FolderConfig => {
  return {
    "model": "./model",
    "resolvers": "./src/resolvers/",
    "schema": "./src/schema",
    "client": "./client/src/graphql",
    "migrations": "./migrations"
  };
}

/**
 * Abstraction for Graphback configuration
 */
export class ConfigBuilder {

  public config: ProjectConfig

  constructor() {
    this.config = readJsonTemplateConfig();
    if (this.isValid()) {
      this.applyAbsolutePaths();
    }
  }

  public isValid() {
    return this.config && this.config.db &&
      this.config.folders;
  }

  private applyAbsolutePaths() {
    this.config.folders = Object.assign(getDefaultFoldersLocations(), this.config.folders)

    // tslint:disable-next-line: no-for-in
    for (const fileType in this.config.folders) {
      if (this.config.folders[fileType]) {
        this.config.folders[fileType] = join(process.cwd(), this.config.folders[fileType]);
      }
    }
  }
}


