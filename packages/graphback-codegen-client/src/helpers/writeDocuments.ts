import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { ClientTemplates } from '../templates/ClientTemplates';

export function writeDocumentsToFilesystem(clientPath: string, generatedClient: ClientTemplates, extension: 'ts' | 'graphql') {
    if (!existsSync(clientPath)) {
        mkdirSync(clientPath, { recursive: true })
    }

    const implementations: string[] = [];
    Object.keys(generatedClient).forEach((folder: string) => {
        //tslint:disable-next-line: no-any
        generatedClient[folder].forEach((c: any) => implementations.push(c.implementation));
    })

    writeFileSync(`${clientPath}/graphback.${extension}`, implementations.join('\n\n'));
}
