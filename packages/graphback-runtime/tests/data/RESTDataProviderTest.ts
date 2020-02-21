// eslint-disable-next-line @typescript-eslint/tslint/config
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

// eslint-disable-next-line @typescript-eslint/tslint/config
test.beforeEach(async t => {
    const provider = new RESTDataProvider(modelType,'https://reqres.in/api',{'Content-Type': 'application/json'});
    t.context = { provider };
});


//test for findAll
// eslint-disable-next-line @typescript-eslint/tslint/config
test('find all persons', async t => {
    const result = await t.context.provider.findAll();
    // eslint-disable-next-line dot-notation
    t.assert(result['total'] > 0);
});

//test for create
// eslint-disable-next-line @typescript-eslint/tslint/config
test('create a person',async t => {
    const person = {name:'JBossss',job:'Software engineer'}
    const result = await t.context.provider.create(person)
    // console.log("create",result)
    t.assert(result.name === person.name)
})


// eslint-disable-next-line @typescript-eslint/tslint/config
test('update a person with id',async t => {
    const updated = {key:"1"}
    const result = await t.context.provider.update(updated)
    // console.log(result)
    t.assert(result.key === updated.key);
})
