import ApolloClient, { InMemoryCache } from 'apollo-boost'

const uri =
  process.env.NODE_ENV !== 'production' ? '/' : 'https://node.gql.systek.dev'

const cache = new InMemoryCache({
  dataIdFromObject: o => o.id,
  freezeResults: true
})

const client = new ApolloClient({
  // For dev with node example running on localhost:4000
  uri,
  // For use during workshop
  //uri: 'https://node.gql.systek.dev',
  cache,
})

export default client
