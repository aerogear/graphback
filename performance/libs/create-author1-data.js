const md5 = require("md5");
const { createApolloFetch } = require("apollo-fetch");

async function createAuthor1() {
  const fetch = await createApolloFetch({
    uri: "http://localhost:29128/graphql",
  });

  for (let i = 1; i <= 20; i++) {
    const name = `author-${i}`;
    const bookContainer = [];

    for (let j = 0; j < 3; j++) {
      const book = `{
          id: ${j},
          name: "book-${i}-${j}",
          numPages: ${Math.round(Math.pow(2, j)) + j}
        }`;

      bookContainer.push(book);
    }

    const books = "[" + bookContainer.join(",") + "]";

    await fetch({
      query: `mutation {createAuthor1(
          input:{
            name: "${name}",
            company: "${name}-company}",
            md5: "${md5(name)}",
            books: ${books}
          }){
            id
          }
        }`,
    });
  }
}

module.exports.createAuthor1 = createAuthor1;
