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
exports.ConversationResolver = void 0;
const Conversation_1 = require("../entities/Conversation");
const type_graphql_1 = require("type-graphql");
const isAuth_1 = require("../middleware/isAuth");
const typeorm_1 = require("typeorm");
const User_1 = require("../entities/User");
const Message_1 = require("../entities/Message");
let CreateConversationInput = class CreateConversationInput {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], CreateConversationInput.prototype, "receiverId", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], CreateConversationInput.prototype, "body", void 0);
CreateConversationInput = __decorate([
    type_graphql_1.InputType()
], CreateConversationInput);
let ConversationResolver = class ConversationResolver {
    author(user) {
        return User_1.User.findOne(user.id);
    }
    title({ req }, conversation) {
        return __awaiter(this, void 0, void 0, function* () {
            const me = yield User_1.User.findOne(req.session.userId);
            let title;
            if (me) {
                title = conversation.participants.filter((user) => user.username !== (me === null || me === void 0 ? void 0 : me.username));
                console.log("title: ", title[0].username);
                return title[0].username;
            }
            return "";
        });
    }
    createConversation(input, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.session;
            if (userId) {
                const ids = [input.receiverId.toString(), userId.toString()];
                let conversation = yield Conversation_1.Conversation.createQueryBuilder("user")
                    .leftJoinAndSelect("user.participants", "participants")
                    .leftJoinAndSelect("user.messages", "messages")
                    .where("participants.id IN (:...idArr)", { idArr: ids })
                    .getMany();
                let foundConversation = conversation.find((c) => c.participants.length === 2);
                console.log("conv1: ", foundConversation);
                if (!foundConversation) {
                    const users = yield typeorm_1.getManager().getRepository(User_1.User).findByIds(ids);
                    let conversation = yield new Conversation_1.Conversation();
                    conversation.participants = [users[0], users[1]];
                    conversation.adminId = Number(userId);
                    const message = yield Message_1.Message.create({
                        conversationId: conversation.id,
                        body: input.body,
                        receiverId: input.receiverId,
                        senderId: Number(userId),
                    });
                    conversation.messages = [message];
                    let newConversation = yield conversation.save();
                    return newConversation;
                }
                yield Message_1.Message.create({
                    conversationId: foundConversation.id,
                    body: input.body,
                    receiverId: input.receiverId,
                    senderId: Number(userId),
                }).save();
                return yield Conversation_1.Conversation.createQueryBuilder("conversation")
                    .where("conversation.id = :conversationId", {
                    conversationId: foundConversation.id,
                })
                    .leftJoinAndSelect("conversation.participants", "participants")
                    .leftJoinAndSelect("conversation.messages", "messages")
                    .orderBy({
                    "messages.createdAt": "DESC",
                })
                    .getOneOrFail();
            }
            return null;
        });
    }
    getConversations({ req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.session;
            let usersConversations = yield Conversation_1.Conversation.createQueryBuilder("user")
                .leftJoinAndSelect("user.participants", "currentUser")
                .where("currentUser.id = :userId", { userId })
                .leftJoinAndSelect("user.participants", "participants")
                .leftJoinAndSelect("user.messages", "messages")
                .orderBy({
                "messages.createdAt": "DESC",
                "user.updatedAt": "DESC",
            })
                .getMany();
            console.log(usersConversations);
            return usersConversations;
        });
    }
};
__decorate([
    type_graphql_1.FieldResolver(() => User_1.User),
    __param(0, type_graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User_1.User]),
    __metadata("design:returntype", void 0)
], ConversationResolver.prototype, "author", null);
__decorate([
    type_graphql_1.FieldResolver(() => String),
    __param(0, type_graphql_1.Ctx()), __param(1, type_graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Conversation_1.Conversation]),
    __metadata("design:returntype", Promise)
], ConversationResolver.prototype, "title", null);
__decorate([
    type_graphql_1.Mutation(() => Conversation_1.Conversation),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Arg("input")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateConversationInput, Object]),
    __metadata("design:returntype", Promise)
], ConversationResolver.prototype, "createConversation", null);
__decorate([
    type_graphql_1.Query(() => [Conversation_1.Conversation]),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ConversationResolver.prototype, "getConversations", null);
ConversationResolver = __decorate([
    type_graphql_1.Resolver(Conversation_1.Conversation)
], ConversationResolver);
exports.ConversationResolver = ConversationResolver;
//# sourceMappingURL=conversation.js.map