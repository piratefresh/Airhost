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
exports.UserConversation = void 0;
const typeorm_1 = require("typeorm");
const Conversation_1 = require("./Conversation");
const User_1 = require("./User");
let UserConversation = class UserConversation extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", Number)
], UserConversation.prototype, "userId", void 0);
__decorate([
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", Number)
], UserConversation.prototype, "conversationId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => User_1.User, (user) => user.conversationConnection, {
        primary: true,
    }),
    typeorm_1.JoinColumn({ name: "userId" }),
    __metadata("design:type", Promise)
], UserConversation.prototype, "user", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Conversation_1.Conversation, (conversation) => conversation.userConnection, {
        primary: true,
    }),
    typeorm_1.JoinColumn({ name: "conversationId" }),
    __metadata("design:type", Promise)
], UserConversation.prototype, "conversation", void 0);
UserConversation = __decorate([
    typeorm_1.Entity()
], UserConversation);
exports.UserConversation = UserConversation;
//# sourceMappingURL=UserToConversation.js.map