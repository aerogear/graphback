import { writeFileSync } from 'fs';
import { parse, format } from 'path';
import { ClientTemplates } from '../templates/ClientTemplates';

export function writeDocumentsToFilesystem(outputFile: string, generatedClient: ClientTemplates, extension: 'ts' | 'graphql') {
  const implementations: string[] = [];
  Object.keys(generatedClient).forEach((folder: string) => {
    //tslint:disable-next-line: no-any
    generatedClient[folder].forEach((c: any) => implementations.push(c.implementation));
  })

  const outputFileAsPath = parse(outputFile);
  if (outputFileAsPath.ext === '') {
    outputFile = format({
      ...outputFileAsPath,
      base: `${outputFileAsPath.name}.${extension}`,
      ext: `.${extension}`
    });
  }

  writeFileSync(outputFile, implementations.join('\n\n'));
}
