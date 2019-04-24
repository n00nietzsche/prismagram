require('dotenv').config();
import { GraphQLServer } from 'graphql-yoga';
import logger from 'morgan';
import schema from './schema';

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({ schema });
// it contains express server
// we can access to server like this : 'server.express'

server.express.use(logger('dev'));

server.start({ port: PORT }, () =>
  console.log(`😊 Server running on port : http://localhost:${PORT}`)
);
