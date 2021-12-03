"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageResolver = void 0;
const type_graphql_1 = require("type-graphql");
const isAuth_1 = require("../middleware/isAuth");
const Message_1 = require("../entities/Message");
const User_1 = require("../entities/User");
const topics_1 = require("./topics");
const Conversation_1 = require("../entities/Conversation");
let CreateMessageInput = class CreateMessageInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CreateMessageInput.prototype, "body", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], CreateMessageInput.prototype, "conversationId", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], CreateMessageInput.prototype, "receiverId", void 0);
CreateMessageInput = __decorate([
    type_graphql_1.InputType()
], CreateMessageInput);
let MessageResolver = class MessageResolver {
    sender(sender) {
        return User_1.User.findOne(sender.senderId);
    }
    createMessage(input, { req }, notifyAboutNewMessage, notifyAboutReceivedMessage, notifyAboutUpdateConversation) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.session;
            const message = yield Message_1.Message.create(Object.assign(Object.assign({}, input), { receiverId: input.receiverId, senderId: Number(userId) })).save();
            const convo = yield Conversation_1.Conversation.createQueryBuilder("conversation")
                .leftJoinAndSelect("conversation.participants", "currentUser")
                .where("conversation.id = :conversationId", {
                conversationId: input.conversationId,
            })
                .leftJoinAndSelect("conversation.participants", "participants")
                .leftJoinAndSelect("conversation.messages", "messages")
                .orderBy({
                "messages.createdAt": "DESC",
                "conversation.updatedAt": "DESC",
            })
                .getOne();
            yield notifyAboutNewMessage(message);
            yield notifyAboutReceivedMessage({ receiverId: input.receiverId });
            if (convo) {
                convo === null || convo === void 0 ? void 0 : convo.save();
                yield notifyAboutUpdateConversation(convo);
            }
            return message;
        });
    }
    getMessages(conversationId, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.session;
            let messages = yield Message_1.Message.find({ where: { conversationId } });
            if (!messages) {
                return [];
            }
            messages.map((message) => {
                const isMeReceving = message.receiverId === userId;
                const isUnRead = !message.readTime;
                if (isUnRead && isMeReceving) {
                    message.readTime = new Date();
                    message.save();
                }
            });
            messages.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
            return messages;
        });
    }
    newMessageReceived(newMessage) {
        return {
            __typename: "Message",
            id: newMessage.id,
            body: newMessage.body,
            senderId: newMessage.senderId,
            receiverId: newMessage.receiverId,
            conversationId: newMessage.conversationId,
            createdAt: new Date(newMessage.createdAt),
            updatedAt: new Date(newMessage.updatedAt),
        };
    }
    getUnreadCount({ req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.session;
            let unreadCount = yield Message_1.Message.createQueryBuilder("message")
                .where('message."receiverId" = :receiverId', { receiverId: userId })
                .andWhere("message.readTime is null")
                .getCount();
            if (!unreadCount) {
                return unreadCount;
            }
            return unreadCount;
        });
    }
    newUnreadMessage(newMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            let unreadCount = yield Message_1.Message.createQueryBuilder("message")
                .where('message."receiverId" = :receiverId', {
                receiverId: newMessage.receiverId,
            })
                .andWhere("message.readTime is null")
                .getCount();
            console.log("Count Subscription: ", unreadCount);
            return unreadCount;
        });
    }
    updatedConversations(updatedConversation) {
        return __awaiter(this, void 0, void 0, function* () {
            const messagesUpdatedDate = updatedConversation.messages.map((x) => {
                return Object.assign(Object.assign({}, x), { createdAt: new Date(x.createdAt), updatedAt: new Date(x.updatedAt) });
            });
            const obj = {
                id: updatedConversation.id,
                updatedAt: new Date(updatedConversation.updatedAt),
                createdAt: new Date(updatedConversation.createdAt),
                messages: [...messagesUpdatedDate],
                participants: [...updatedConversation.participants],
            };
            console.log("Up[dted Obj", obj);
            return obj;
        });
    }
};
__decorate([
    type_graphql_1.FieldResolver(() => User_1.User),
    __param(0, type_graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Message_1.Message]),
    __metadata("design:returntype", void 0)
], MessageResolver.prototype, "sender", null);
__decorate([
    type_graphql_1.Mutation(() => Message_1.Message),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Arg("input")),
    __param(1, type_graphql_1.Ctx()),
    __param(2, type_graphql_1.PubSub(topics_1.Topic.NewMessage)),
    __param(3, type_graphql_1.PubSub(topics_1.Topic.NewUnreadMessage)),
    __param(4, type_graphql_1.PubSub(topics_1.Topic.UpdateConversation)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateMessageInput, Object, Function, Function, Function]),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "createMessage", null);
__decorate([
    type_graphql_1.Query(() => [Message_1.Message]),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Arg("conversationId", () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "getMessages", null);
__decorate([
    type_graphql_1.Subscription(() => Message_1.Message, {
        topics: topics_1.Topic.NewMessage,
        filter: ({ context, payload, args, }) => {
            const userId = context.connection.context.req.session.userId;
            return payload.senderId === userId || payload.receiverId === userId;
        },
    }),
    __param(0, type_graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], MessageResolver.prototype, "newMessageReceived", null);
__decorate([
    type_graphql_1.Query(() => Number),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "getUnreadCount", null);
__decorate([
    type_graphql_1.Subscription(() => Number, {
        topics: topics_1.Topic.NewUnreadMessage,
        filter: ({ context, payload, }) => {
            const userId = context.connection.context.req.session.userId;
            console.log("payload: ", payload, "userId: ", userId);
            return payload.receiverId === userId;
        },
    }),
    __param(0, type_graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "newUnreadMessage", null);
__decorate([
    type_graphql_1.Subscription(() => Conversation_1.Conversation, {
        topics: topics_1.Topic.UpdateConversation,
        filter: ({ context, payload }) => {
            const userId = context.connection.context.req.session.userId;
            return (payload.participants[0].id === userId ||
                payload.participants[1].id === userId);
        },
    }),
    __param(0, type_graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Conversation_1.Conversation]),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "updatedConversations", null);
MessageResolver = __decorate([
    type_graphql_1.Resolver(Message_1.Message)
], MessageResolver);
exports.MessageResolver = MessageResolver;
//# sourceMappingURL=message.js.map