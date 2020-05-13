//eslint-disable-next-line @typescript-eslint/tslint/config
import { getFieldName, getSubscriptionName, GraphbackOperationType } from '../src';


test('Test plugin engine', async () => {

    const fieldName = getFieldName('unicorn', GraphbackOperationType.FIND_ONE);

    expect(fieldName).toEqual('getUnicorn');

    const sub = getSubscriptionName('unicorn', GraphbackOperationType.CREATE);

    expect(sub).toEqual('newUnicorn');
});
