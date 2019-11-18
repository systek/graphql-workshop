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
    name: "Mikael",
    title: "Typer of Code"
  }
];

const typeDefs = gql`
  type Person {
    name: String
    title: String
    description: String
  }

  type Query {
    developers: [Person]
  }
`;
 
const resolvers = {
  Query: {
    developers: () => exampleData
  },
  Person: {
    description: (person) => `${person.name}, ${person.title}`
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
