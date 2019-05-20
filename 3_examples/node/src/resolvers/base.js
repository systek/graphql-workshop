const QueryResolver = require("./query");
const ObjectResolvers = require("./object");
const MutationResolver = require("./mutation");

const resolvers = {
  Query: QueryResolver,
  Mutation: MutationResolver,
  ...ObjectResolvers
};

module.exports = resolvers;
