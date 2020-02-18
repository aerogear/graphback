import _test, { TestInterface } from 'ava';

import { RESTDataProvider } from '../../src/data/RESTDataProvider';

interface Context {
    provider: RESTDataProvider;
}

interface Unicorn {
    id: string;
    name: string;
    age: number;
    color:string;
}

const test = _test as TestInterface<Context>;

test.beforeEach(async t => {
    const provider = new RESTDataProvider();
  
    t.context = { provider };
});

test('find all Todos', async t => {
    const unicorns = await t.context.provider.findAll();
  
    t.assert(unicorns.length === 2);
});