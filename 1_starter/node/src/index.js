const { ApolloServer, gql } = require("apollo-server");

const exampleData = [
  {
    name: "Karl",
    title: "Frontend Developer"
  },
  {
    name: "Aage",
    title: "Software Architech"
  },
  {
    name: "Ole",
    title: ".NET Developer"
  }
];

const typeDefs = gql`
  type Person {
    name: String
    title: String
  }

  type Query {
    developers: [Person]
  }
`;

const resolvers = {
  Query: {
    developers: () => exampleData
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
