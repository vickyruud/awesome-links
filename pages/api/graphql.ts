import { ApolloServer } from "apollo-server-micro";
import { typeDefs } from "../../graphql/schema";
import { resolvers } from "../../graphql/resolvers";
import Cors from "micro-cors";

const cors = Cors();

const client = new ApolloServer({ typeDefs, resolvers });

const startServer = client.start();

export default cors(async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }
  await startServer;
  await client.createHandler({
    path: "/api/graphql",
  })(req, res);
});

export const config = {
  api: {
    bodyParser: false,
  },
};
