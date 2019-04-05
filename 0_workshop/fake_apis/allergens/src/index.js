const { ApolloServer } = require('apollo-server')

const resolvers = require('./resolvers/base')
const typeDefs = require('./schema/rootSchema')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
})

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
