// tslint:disable-next-line: match-default-export-name no-implicit-dependencies
import ava, { ExecutionContext } from 'ava';
import { readFileSync } from 'fs';
import { getFieldName, getSubscriptionName, GraphbackOperationType } from '../src'


ava('Test plugin engine', async (t: ExecutionContext) => {

    const fieldName = getFieldName('unicorn', GraphbackOperationType.FIND_ALL);

    t.deepEqual(fieldName, 'findAllUnicorns');

    const sub = getSubscriptionName('unicorn', GraphbackOperationType.CREATE);

    t.deepEqual(sub, 'newUnicorn');
});
