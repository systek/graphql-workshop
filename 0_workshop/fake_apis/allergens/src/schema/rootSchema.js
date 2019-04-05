const { gql } = require('apollo-server');

const typeDefs = gql`
    type Food {
      name: String!
      allergens: [String]!
    }

    type Query {
        allergens(ingredient: String!): [String]!
        foods: [Food!]!
    }
`;

module.exports = typeDefs;
