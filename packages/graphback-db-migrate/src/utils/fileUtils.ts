import { unlinkSync } from 'fs';
import { sync } from 'glob';

export const removeFiles = async (...patterns: string[]) => {
  for (const pattern of patterns) {
    const paths = sync(pattern);
    for (const path of paths) {
      unlinkSync(path);
    }
  }
}
