// in api directory, there, a lot of graphql files will be added and in the same place, resolver files will be also added.
// combine all files.
import path from 'path';
import { makeExecutableSchema } from 'graphql-tools';
import { fileLoader, mergeResolvers, mergeTypes } from 'merge-graphql-schemas';

const allTypes = fileLoader(path.join(__dirname, '/api/**/*.graphql'));
const allResolvers = fileLoader(path.join(__dirname, '/api/**/*.js'));
// there must be no js not for resolvers
// if so, it vaccume all the js files and emit an error

const schemas = makeExecutableSchema({
  typeDefs: mergeTypes(allTypes),
  resolvers: mergeResolvers(allResolvers)
});

export default schemas;
