import { readFileSync, unlinkSync, writeFileSync } from 'fs';
import { sync } from 'glob';
import { basename, join } from 'path';

export const removeFiles = async (...patterns: string[]) => {
  for (const pattern of patterns) {
    const paths = sync(pattern);
    for (const path of paths) {
      unlinkSync(path);
    }
  }
}

export const copyFiles = async (patterns: string[], toDir: string) => {
  for (const pattern of patterns) {
    const paths = sync(pattern);
    for (const path of paths) {
      const contents = readFileSync(path);
      const fileName = basename(path);
      writeFileSync(join(toDir, fileName), contents);
    }
  }
}
