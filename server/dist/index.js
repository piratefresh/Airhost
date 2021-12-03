"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const constants_1 = require("./constants");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const http_1 = require("http");
const ioredis_1 = __importDefault(require("ioredis"));
const pubsub_1 = require("./pubsub");
const express_session_1 = __importDefault(require("express-session"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const type_graphql_1 = require("type-graphql");
const path_1 = __importStar(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const typeorm_1 = require("typeorm");
const comment_1 = require("./resolvers/comment");
const post_1 = require("./resolvers/post");
const user_1 = require("./resolvers/user");
const Post_1 = require("./entities/Post");
const User_1 = require("./entities/User");
const Comment_1 = require("./entities/Comment");
const Vote_1 = require("./entities/Vote");
const VoteComment_1 = require("./entities/VoteComment");
const Conversation_1 = require("./entities/Conversation");
const Message_1 = require("./entities/Message");
const conversation_1 = require("./resolvers/conversation");
const UserToConversation_1 = require("./entities/UserToConversation");
const message_1 = require("./resolvers/message");
const hello_1 = require("./resolvers/hello");
const Listning_1 = require("./entities/Listning");
dotenv_1.default.config({ path: path_1.resolve(__dirname, ".env") });
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const conn = yield typeorm_1.createConnection({
        type: "postgres",
        database: "postgres",
        username: "postgres",
        password: "postgres",
        logging: true,
        synchronize: true,
        migrations: [path_1.default.join(__dirname, "./migrations/*")],
        entities: [
            Post_1.Post,
            User_1.User,
            Comment_1.Comment,
            Vote_1.Vote,
            VoteComment_1.VoteComment,
            Conversation_1.Conversation,
            Message_1.Message,
            UserToConversation_1.UserConversation,
            Listning_1.Listing,
        ],
    });
    yield conn.runMigrations();
    const PORT = 4000;
    const app = express_1.default();
    const RedisStore = connect_redis_1.default(express_session_1.default);
    const redis = new ioredis_1.default();
    app.use(cors_1.default({
        origin: "http://localhost:3000",
        credentials: true,
    }));
    const sessionMiddleware = express_session_1.default({
        name: constants_1.COOKIE_NAME,
        store: new RedisStore({ client: redis, disableTouch: true }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
            httpOnly: true,
            sameSite: "lax",
            secure: constants_1.__prod__,
        },
        saveUninitialized: false,
        secret: "keyboard cat",
        resave: false,
    });
    app.use(sessionMiddleware);
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: yield type_graphql_1.buildSchema({
            resolvers: [
                post_1.PostResolver,
                user_1.UserResolver,
                comment_1.CommentResolver,
                conversation_1.ConversationResolver,
                message_1.MessageResolver,
                hello_1.HelloResolver,
            ],
            validate: false,
            pubSub: pubsub_1.pubSub,
        }),
        context: ({ req, res, connection }) => {
            return { req, res, connection, redis };
        },
        subscriptions: {
            path: "/subscriptions",
            onConnect: (_, ws) => __awaiter(void 0, void 0, void 0, function* () {
                return new Promise((res) => sessionMiddleware(ws.upgradeReq, {}, () => {
                    res({ req: ws.upgradeReq });
                }));
            }),
            onDisconnect: (_webSocket, _context) => {
                console.log("Client disconnected");
            },
        },
    });
    apolloServer.applyMiddleware({
        app,
        cors: false,
    });
    const httpServer = http_1.createServer(app);
    apolloServer.installSubscriptionHandlers(httpServer);
    httpServer.listen(PORT, () => {
        console.log(`🚀 Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`);
        console.log(`🚀 Subscriptions ready ws://localhost:${PORT}${apolloServer.subscriptionsPath}`);
    });
});
main().catch((err) => {
    console.error(err);
});
//# sourceMappingURL=index.js.map