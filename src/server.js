import "./env";
import "./passport";
import logger from "morgan";
import schema from "./schema";
import { GraphQLServer } from "graphql-yoga";
import { authenticateJwt } from "./passport";
import { isAuthenticated } from "./middlewares";

const PORT = process.env.PORT || 7777;

const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request, isAuthenticated})
});
server.express.use(logger("dev"));
server.express.use(authenticateJwt);

server.start({ port: PORT }, () =>
  console.log(`✅ Server running on port http://localhost:${PORT}`)
);
