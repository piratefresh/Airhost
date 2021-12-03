import "reflect-metadata";
import { COOKIE_NAME, __prod__ } from "./constants";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { createServer } from "http";
// import redis from "redis";
import Redis from "ioredis";
import { pubSub } from "./pubsub";
import session from "express-session";
import connectRedis from "connect-redis";
import { buildSchema } from "type-graphql";
import path, { resolve } from "path";
import dotenv from "dotenv";
import cors from "cors";
import { createConnection } from "typeorm";
import { CommentResolver } from "./resolvers/comment";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";
import { Post } from "./entities/Post";
import { User } from "./entities/User";
import { Comment } from "./entities/Comment";
import { Vote } from "./entities/Vote";
import { VoteComment } from "./entities/VoteComment";
import { Conversation } from "./entities/Conversation";
import { Message } from "./entities/Message";
import { ConversationResolver } from "./resolvers/conversation";
import { UserConversation } from "./entities/UserToConversation";
import { MessageResolver } from "./resolvers/message";
import { HelloResolver } from "./resolvers/hello";
import { Listing } from "./entities/Listning";

dotenv.config({ path: resolve(__dirname, ".env") });

const main = async () => {
  const conn = await createConnection({
    type: "postgres",
    database: "postgres",
    username: "postgres",
    password: "postgres",
    logging: true,
    synchronize: true,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [
      Post,
      User,
      Comment,
      Vote,
      VoteComment,
      Conversation,
      Message,
      UserConversation,
      Listing,
    ],
  });

  await conn.runMigrations();

  // Delete posts
  // await Message.delete({});
  // await Vote.delete({});
  // await VoteComment.delete({});
  // await Conversation.delete({});
  // await Post.delete({});
  // await Comment.delete({});
  // await User.delete({});

  const PORT = 4000;
  const app = express();
  const RedisStore = connectRedis(session);
  const redis = new Redis();
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  const sessionMiddleware = session({
    name: COOKIE_NAME,
    store: new RedisStore({ client: redis, disableTouch: true }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
      httpOnly: true,
      sameSite: "lax", // csrf
      secure: __prod__, // cookie only works in https
    },
    saveUninitialized: false,
    secret: "keyboard cat",
    resave: false,
  });

  app.use(sessionMiddleware);

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        PostResolver,
        UserResolver,
        CommentResolver,
        ConversationResolver,
        MessageResolver,
        HelloResolver,
      ],
      validate: false,
      pubSub,
    }),
    context: ({ req, res, connection }) => {
      return { req, res, connection, redis };
    },
    subscriptions: {
      path: "/subscriptions",
      onConnect: async (_, ws: any) => {
        return new Promise((res) =>
          sessionMiddleware(ws.upgradeReq, {} as any, () => {
            res({ req: ws.upgradeReq });
          })
        );
      },
      onDisconnect: (_webSocket, _context) => {
        console.log("Client disconnected");
      },
    },
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });
  const httpServer = createServer(app);
  apolloServer.installSubscriptionHandlers(httpServer);

  httpServer.listen(PORT, () => {
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`
    );
    console.log(
      `🚀 Subscriptions ready ws://localhost:${PORT}${apolloServer.subscriptionsPath}`
    );
  });
};

main().catch((err) => {
  console.error(err);
});
