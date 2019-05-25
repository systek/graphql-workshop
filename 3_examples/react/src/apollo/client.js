import ApolloClient, { InMemoryCache } from 'apollo-boost'

const cache = new InMemoryCache({
  dataIdFromObject: o => o.id,
})

const client = new ApolloClient({
  // For dev with node example running on localhost:4000
  uri: '/',
  // uri: 'https://node.gql.systek.dev',
  cache,
})

export default client
