import _test, { TestInterface } from 'ava';
import { buildSchema, GraphQLObjectType } from 'graphql';
import { RESTDataProvider } from '../../src/data/RESTDataProvider';


const schema = buildSchema(`
"""
@model
"""
type Users {
 name: String!
 job: String!

}
`);

interface Context {
    provider: RESTDataProvider;
}

const test = _test as TestInterface<Context>;
const modelType = schema.getType('Users') as GraphQLObjectType

test.beforeEach(async t => {
    const provider = new RESTDataProvider(modelType,'https://reqres.in/api',{'Content-Type': 'application/json'});
    t.context = { provider };
});

/**
 * 
 * Currently I just have 3 endpoints in my hosted server. So I tested only 
 * create, findAll and delete. However tests for other endpoints also can
 * be implemented similarly.
 */


//test for findAll
test('find all persons', async t => {
    const result = await t.context.provider.findAll();
    console.log("findALL",result)
    t.assert(result['total'] > 0);
});

//test for create
test('create a person',async t => {
    const person = {name:'JBossss',job:'Software engineer'}
    const result = await t.context.provider.create(person)
    console.log("create",result)
    t.assert(result.name === person.name)
})


//test for delete.
// test('delete a person with id',async t => {
//     const person = {id:16};
//     const result = await t.context.provider.delete(person)
//     console.log('delete',result)
//     t.assert(result.id === person.id);
// })

//test for update
test('update a person with id',async t => {
    const updated = {id:"1",name:"updated",job:"updated"}
    const result = await t.context.provider.update(updated)
    console.log(result)
    t.assert(result['id'] === updated['id']);
})

//test for findBy
test('find a person by id',async t => {
    const updated = {id:"1"}
    const result = await t.context.provider.update(updated)
    console.log(result)
    t.assert(result['id'] === updated['id']);
})

