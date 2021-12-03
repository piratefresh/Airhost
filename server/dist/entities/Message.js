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
exports.Message = void 0;
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const User_1 = require("./User");
const Conversation_1 = require("./Conversation");
let Message = class Message extends typeorm_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Message.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Message.prototype, "createdAt", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Message.prototype, "updatedAt", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Message.prototype, "body", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ type: "int" }),
    __metadata("design:type", Number)
], Message.prototype, "senderId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => User_1.User, (user) => user.conversations),
    __metadata("design:type", User_1.User)
], Message.prototype, "sender", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ type: "int" }),
    __metadata("design:type", Number)
], Message.prototype, "receiverId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => User_1.User, (user) => user.conversations),
    __metadata("design:type", User_1.User)
], Message.prototype, "receiver", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Conversation_1.Conversation, (conversation) => conversation.messages),
    __metadata("design:type", Conversation_1.Conversation)
], Message.prototype, "conversation", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ type: "int" }),
    __metadata("design:type", Number)
], Message.prototype, "conversationId", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typeorm_1.Column("timestamp", { default: null }),
    __metadata("design:type", Date)
], Message.prototype, "readTime", void 0);
Message = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], Message);
exports.Message = Message;
//# sourceMappingURL=Message.js.map