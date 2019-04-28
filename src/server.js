import './env';
import { GraphQLServer } from 'graphql-yoga';
import logger from 'morgan';
import schema from './schema';
import './passport';
import { authenticateJwt } from './passport';

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({
  schema,
  context: ({request}) => {
    return ({request})
  }
});
// it contains express server
// we can access to server like this : 'server.express'

server.express.use(logger('dev'));
server.express.use(authenticateJwt);

server.start({ port: PORT }, () =>
  console.log(`😊 Server running on port : http://localhost:${PORT}`)
);
