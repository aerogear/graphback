function genSchema(length) {
  let result = `
    type Book {
        id: ID!
        name: String!
        numPages: Int!
      } 
    `;

  for (let i = 1; i <= length; i++) {
    result += `
        """ @model """
        type Author${i} {
          id: ID!
          name: String!
          md5: String!
          company: String!
          """
          @db(type: 'string')  
          """
          books: [Book]!
        }
        
        """ @model """
        type Note${i} {
          id: ID!
          name: String!
          md5: String!
          company: String!
          """
          @oneToMany(field: 'note') 
          """
          comments: [Comment${i}]!
        }

        """ @model """
        type Comment${i} {
          id: ID!
          name: String!
          md5: String!
          """
          @oneToOne
          """
          metadata: CommentMetadata${i}
        }
        
        """ @model """
        type CommentMetadata${i} {
          id: ID!
          metadata: String!
        }
        `;
  }
  return result;
}

module.exports.genSchema = genSchema;
