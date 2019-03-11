import "./env";
import "./passport";
import logger from "morgan";
import schema from "./schema";
import passport from "passport";
import { GraphQLServer } from "graphql-yoga";
import { authenticateJwt } from "./passport";

const PORT = process.env.PORT || 7777;

const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request })
});
server.express.use(logger("dev"));
server.express.use(authenticateJwt);

server.start({ port: PORT }, () =>
  console.log(`✅ Server running on port http://localhost:${PORT}`)
);
