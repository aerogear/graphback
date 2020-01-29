import ApolloClient from "apollo-boost";
import { expect } from "chai";
import gql from "graphql-tag";
import fetch from "node-fetch";
import { TestxServer } from "../../../dist/src";
import { readFileSync } from "fs";
import { resolve } from "path";

// Broken because of: https://github.com/aerogear/graphql-testx/issues/82
describe.skip("test relations", () => {
  let server: TestxServer;

  const CREATE_BAR = gql`
    mutation createBar($description: String!, $fooId: ID!) {
      createBar(input: { description: $description, fooId: $fooId }) {
        id
        description
        foo {
          id
          title
        }
      }
    }
  `;

  const FIND_FOO_WITH_BAR = gql`
    query findFooWithBar($id: ID!) {
      findFoos(fields: { id: $id }) {
        id
        title
        bars {
          id
          description
        }
      }
    }
  `;

  before("start graphql server", async () => {
    const schema = readFileSync(
      resolve(__dirname, "../fixtures/relations-schema.graphql"),
      "utf8"
    );
    server = new TestxServer({ schema });

    await server.start();
    console.log(`Running on ${await server.httpUrl()}`);
  });

  after("close graphql server", () => {
    server.close();
    console.log(`Connection with server closed`);
  });

  beforeEach("reset serer database to know state", async () => {
    await server.setData({
      foo: [{ id: 1, title: "one" }],
      bar: [{ id: 1, description: "stuff", fooId: 1 }]
    });
  });

  it("should add a new bar to existing foo", async () => {
    const client = new ApolloClient({ uri: await server.httpUrl(), fetch });

    const createBarResult = await client.mutate({
      mutation: CREATE_BAR,
      variables: { description: "things", fooId: 1 }
    });
    const bar = createBarResult.data.createBar;
    expect(bar.id).to.not.be.null;

    const findFooWithBarResult = await client.query({
      query: FIND_FOO_WITH_BAR,
      variables: { id: 1 }
    });
    const foo = findFooWithBarResult.data.findFoos[0];
    expect(foo).to.not.be.null;
    expect(foo.bars).to.have.lengthOf(2);
  });
});
