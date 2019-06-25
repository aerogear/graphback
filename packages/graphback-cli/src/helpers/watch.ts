import * as chokidar from 'chokidar'
import * as execa from 'execa'
import { Stats } from 'fs';
import { logInfo } from '../utils';
import { checkDirectory } from './common';
import { createDBResources } from './db';
import { generateBackend } from './generate';

const modelsPath = `${process.cwd()}/model`

export const watchForChanges = async(): Promise<void> => {
  
  /**
   * watch for changes in models folder
   * ignore files starting with '.'
   */
  const watcher = chokidar.watch(modelsPath, {
    ignored: /(^|[\/\\])\../,
    persistent: true
  });

  logInfo(`Watching ${modelsPath} for changes.`)

  execa('npm', ['run', 'start']).stdout.pipe(process.stdout);
  /**
   * generateBackend - regenerates schema and resolver
   * createDBResources - creates database
   */
  watcher.on('change', async(path: string, stats: Stats) => {
    await Promise.all([generateBackend(),createDBResources()])
    execa('npm', ['run', 'start']).stdout.pipe(process.stdout)
  })
}

export const watch = async(): Promise<void> => {
  checkDirectory()
  await watchForChanges()
}