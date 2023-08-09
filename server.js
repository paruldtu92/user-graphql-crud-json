import express from "express";
import http from "http";
import { ApolloServer, gql } from "apollo-server-express";
import typeDefs from "./schema.js";
import resolvers from "./resolvers.js";
const app = express();
// const cors = require('cors');
import cors from 'cors';
const PORT = 4000;

app.use(cors({
  origin: '*'
}));

const server = new ApolloServer({
  typeDefs: gql(typeDefs),
  resolvers,
  subscriptions: {
    onConnect: () => console.log("Connected to websocket"),
  },
  tracing: true,
});

server.applyMiddleware({ app });
const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen({ port: PORT }, () => {
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  );
  console.log(
    `🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`
  );
});
