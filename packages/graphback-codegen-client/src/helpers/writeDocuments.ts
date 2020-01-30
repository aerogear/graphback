import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { ClientTemplates } from '../templates/ClientTemplates';

export const writeDocumentsToFilesystem = (clientPath: string, generatedClient: ClientTemplates, extension: 'ts' | 'gql') => {
    if (!existsSync(clientPath)) {
        mkdirSync(clientPath, { recursive: true })
    }
    Object.keys(generatedClient).forEach((folder: string) => {
        const currentFolder = `${clientPath}/${folder}`
        if (!existsSync(currentFolder)) {
            mkdirSync(currentFolder)
        }
        // tslint:disable-next-line: no-any
        generatedClient[folder].forEach((c: any) => writeFileSync(`${currentFolder}/${c.name}.${extension}`, c.implementation))
    })

}