import _test, { TestInterface } from 'ava';
import { buildSchema, GraphQLObjectType } from 'graphql';
import { RESTDataProvider } from '../../src/data/RESTDataProvider';

// Primary field is renamed as key to test the mapping.
const schema = buildSchema(`
"""
@model
"""
type Users {
 """
 @db.primary
 """     
 key: ID!
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


//test for findAll
test('find all persons', async t => {
    const result = await t.context.provider.findAll();
    t.assert(result['total'] > 0);
});

//test for create
test('create a person',async t => {
    const person = {name:'JBossss',job:'Software engineer'}
    const result = await t.context.provider.create(person)
    // console.log("create",result)
    t.assert(result.name === person.name)
})


//test for delete. (This will fail for this instance, because the API doesnt provide a delete operation)
test('delete a person with id',async t => {
    const person = {key:16};
    const result = await t.context.provider.delete(person)
    console.log('delete',result)
    t.assert(result.key === person.key);
})

//test for update
test('update a person with id',async t => {
    const updated = {key:"1"}
    const result = await t.context.provider.update(updated)
    // console.log(result)
    t.assert(result.key === updated.key);
})

//test for findBy(This will fail because the API doesn't support)
test('find a person by id',async t => {
    const filter = {type:"age",value:"22"}
    const result = await t.context.provider.findBy(filter)
    // console.log(result)
    result.forEach((person)=>{
        t.assert(person['age'] === filter['age']);
    })
    
})

