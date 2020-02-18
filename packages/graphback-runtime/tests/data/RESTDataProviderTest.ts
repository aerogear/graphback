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
    const provider = new RESTDataProvider('https://crudcrud.com/api/2e1c242b1f6943a9b2b16455b79e04ab');
  
    t.context = { provider };
});

// test('find all Unicorns', async t => {
//     const unicorns = await t.context.provider.findAll('unicorns');
  
//     t.assert(unicorns.length === 3);
// });

// test('create unicorn',async t => {
//     const unicorn = {id:12345666,name:"Lahiru",age:23,color:"brown"}
//     const result = await t.context.provider.create(unicorn,'unicorns')
//     t.assert(result.name === unicorn.name && result.age === unicorn.age && result.color === unicorn.color)
// })


test('update the unicorn',async t => {
    const unicorn = {id:"5e4b76ece6280703e8ec18b1",name:"XXXXXXXXXXX",age:56,color:"green"}
    const result = await t.context.provider.update(unicorn,'unicorns')
    t.assert(result.id === unicorn.id)
})