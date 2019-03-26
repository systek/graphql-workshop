const QueryResolver = require("./query");
const ObjectResolvers = require('./object')
//import MutationResolver from './mutation'

const resolvers = {
  Query: QueryResolver,
  ...ObjectResolvers,
};

module.exports = resolvers;
