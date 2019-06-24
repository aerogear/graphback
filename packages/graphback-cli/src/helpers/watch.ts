import * as chokidar from 'chokidar'
import * as execa from 'execa'
import { Stats } from 'fs';
import { checkDirectory } from './common';
import { createResources } from './db';
import { generateBackend } from './generate';

const modelsPath = `${process.cwd()}/model`

const watcher = chokidar.watch(modelsPath, {
  ignored: /(^|[\/\\])\../,
  persistent: true
});

export const watch = async(): Promise<void> => {
  checkDirectory()
  execa('npm', ['run', 'start']).stdout.pipe(process.stdout);
  watcher.on('change', async(path: string, stats: Stats) => {
    await generateBackend()
    await createResources()
    execa('npm', ['run', 'start']).stdout.pipe(process.stdout);
  })
}