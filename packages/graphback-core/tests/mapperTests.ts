//eslint-disable-next-line @typescript-eslint/tslint/config
import { getFieldName, getSubscriptionName, GraphbackOperationType } from '../src';


test('Test plugin engine', async () => {

    const fieldName = getFieldName('unicorn', GraphbackOperationType.FIND_ALL);

    expect(fieldName).toEqual('findAllUnicorns');

    const sub = getSubscriptionName('unicorn', GraphbackOperationType.CREATE);

    expect(sub).toEqual('newUnicorn');
});
