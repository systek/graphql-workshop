const { ApolloServer, gql } = require("apollo-server");
const { importSchema } = require("graphql-import");

const resolvers = require("./resolvers/base");
const typeDefs = importSchema("schema/root.graphql");

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
