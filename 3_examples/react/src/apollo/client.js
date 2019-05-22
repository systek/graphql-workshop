import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: "https://node.gql.systek.dev/"
});

export default client;
