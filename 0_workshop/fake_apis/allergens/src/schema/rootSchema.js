const {gql} = require('apollo-server');

const typeDefs = gql`
    type Query {
        allergens(ingredient: String!): [String]
    }
`;

module.exports = typeDefs;
