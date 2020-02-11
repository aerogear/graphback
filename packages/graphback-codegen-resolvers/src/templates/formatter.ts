import * as prettier from 'prettier';

export function formatDocumentJS(contents: string) {
    try {
        return prettier.format(contents, { semi: false, parser: 'babel' });
    } catch (e) {
        // tslint:disable-next-line: no-console
        console.log("Cannot format resolvers document", e)

        return contents;
    }
}

export function formatDocumentTs(contents: string) {
    try {
        return prettier.format(contents, { semi: false, parser: 'typescript' });
    } catch (e) {
        // tslint:disable-next-line: no-console
        console.log("Cannot format resolvers implementation", e)

        return contents;
    }
}