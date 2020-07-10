import { writeFileSync } from 'fs';
import { ClientTemplates } from '../templates/ClientTemplates';

export function writeDocumentsToFilesystem(outputFile: string, generatedClient: ClientTemplates) {
  const implementations: string[] = [];
  Object.keys(generatedClient).forEach((folder: string) => {
    //tslint:disable-next-line: no-any
    generatedClient[folder].forEach((c: any) => implementations.push(c.implementation));
  })

  writeFileSync(outputFile, implementations.join('\n\n'));
}
