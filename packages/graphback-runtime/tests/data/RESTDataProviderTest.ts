import _test, { TestInterface } from 'ava';

import { RESTDataProvider } from '../../src/data/RESTDataProvider';

interface Context {
    provider: RESTDataProvider;
}

interface Project {
    category_id: number;
    name: string;
}

const test = _test as TestInterface<Context>;

test.beforeEach(async t => {
    const provider = new RESTDataProvider('http://64.225.124.94:7000/api');
  
    t.context = { provider };
});



/**
 * 
 * Currently I just have 3 endpoints in my hosted server. So I tested only 
 * create, findAll and delete. However tests for other endpoints also can
 * be implemented similarly.
 */


// test for findAll
test('find all Project categories', async t => {
    const projectCategories = await t.context.provider.findAll('category_manage/category');
    console.log("findALL",projectCategories)
    t.assert(projectCategories['data'].length > 0);
});

// test for create
test('create Project category',async t => {
    const project_category = {name:'JBoss'}
    const result = await t.context.provider.create(project_category,'category_manage/category')
    console.log("create",result)
    t.assert(result['data']['affectedRows'] === 1)
})


// test for delete.
test('delete a project category',async t => {
    const data = {category_id:16};
    const result = await t.context.provider.delete(data,'category_manage/category')
    console.log('delete',result)
    t.assert(result['data']['affectedRows'] ===1);
})


// test('update a project category',async t => {
//     const updated = {id:"1",name:"updated"}
//     const result = await t.context.provider.update(updated,'unicorns')
//     t.assert(result['data']['affectedRows'] === 1);
// })

