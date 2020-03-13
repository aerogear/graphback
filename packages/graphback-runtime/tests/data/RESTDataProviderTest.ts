// eslint-disable-next-line @typescript-eslint/tslint/config
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

const modelType = schema.getType('Users') as GraphQLObjectType
let context: Context;

// eslint-disable-next-line @typescript-eslint/tslint/config
beforeEach(async () => {
    const provider = new RESTDataProvider(modelType,'https://reqres.in/api',{'Content-Type': 'application/json'});
    context = { provider };
});


//test for findAll
// eslint-disable-next-line @typescript-eslint/tslint/config
test('find all persons', async () => {
    const result = await context.provider.findAll();
    // eslint-disable-next-line dot-notation
    expect(result['total']).toBeGreaterThan(0);
});

//test for create
// eslint-disable-next-line @typescript-eslint/tslint/config
test('create a person',async () => {
    const person = {name:'JBossss',job:'Software engineer'}
    const result = await context.provider.create(person)
    // console.log("create",result)
    expect(result.name).toEqual(person.name);
})


// eslint-disable-next-line @typescript-eslint/tslint/config
test('update a person with id',async () => {
    const updated = {key:"1"}
    const result = await context.provider.update(updated)
    expect(result.key).toEqual(updated.key);
})
