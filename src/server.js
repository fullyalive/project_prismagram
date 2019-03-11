import dotenv from "dotenv";
import path from "path";
import logger from "morgan";
import schema from "./schema";
import { GraphQLServer } from "graphql-yoga";

dotenv.config({ path: path.resolve(__dirname, ".env") });

const PORT = process.env.PORT || 7777;

const server = new GraphQLServer({ schema });

server.express.use(logger("dev"));

server.start({ port: PORT }, () =>
  console.log(`✅ Server running on port http://localhost:${PORT}`)
);
