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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Conversation = void 0;
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const User_1 = require("./User");
const Message_1 = require("./Message");
const UserToConversation_1 = require("./UserToConversation");
let Conversation = class Conversation extends typeorm_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Conversation.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Conversation.prototype, "createdAt", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Conversation.prototype, "updatedAt", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Conversation.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Conversation.prototype, "adminId", void 0);
__decorate([
    type_graphql_1.Field(() => User_1.User),
    typeorm_1.ManyToOne(() => User_1.User),
    __metadata("design:type", User_1.User)
], Conversation.prototype, "admin", void 0);
__decorate([
    type_graphql_1.Field(() => [User_1.User]),
    typeorm_1.ManyToMany(() => User_1.User, (user) => user.conversations, { eager: true }),
    __metadata("design:type", Array)
], Conversation.prototype, "participants", void 0);
__decorate([
    type_graphql_1.Field(() => [Message_1.Message], { nullable: true }),
    typeorm_1.OneToMany(() => Message_1.Message, (message) => message.conversation, {
        nullable: true,
        cascade: true,
    }),
    __metadata("design:type", Array)
], Conversation.prototype, "messages", void 0);
__decorate([
    typeorm_1.OneToMany(() => UserToConversation_1.UserConversation, (uc) => uc.conversation),
    __metadata("design:type", Promise)
], Conversation.prototype, "userConnection", void 0);
__decorate([
    type_graphql_1.Field(() => [User_1.User]),
    __metadata("design:type", Promise)
], Conversation.prototype, "users", void 0);
Conversation = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], Conversation);
exports.Conversation = Conversation;
//# sourceMappingURL=Conversation.js.map