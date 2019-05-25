import ApolloClient, { InMemoryCache } from 'apollo-boost'

const cache = new InMemoryCache({
  dataIdFromObject: o => o.id,
})

const client = new ApolloClient({
  uri: '/',
  cache,
})

export default client
