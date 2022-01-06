import { PubSub, GraphQLServer } from "graphql-yoga";
import Query from "./resolvers/Query";
import Mutation from "./resolvers/Mutation";
// import Subscription from "./resolvers/Subscription";

//db
// import UserModel from "./models/UserSchema";
import ChatBoxModel from "./models/ChatBoxSchema";
import MessageModel from "./models/MessageSchema";

const pubSub = new PubSub();
const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers: {
    Query,
    Mutation,
  },
  context: {
		ChatBoxModel,
		MessageModel,
    pubSub,
  },
});

export default server;
