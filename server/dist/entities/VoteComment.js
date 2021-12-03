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
exports.VoteComment = void 0;
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const User_1 = require("./User");
const Comment_1 = require("./Comment");
let VoteComment = class VoteComment extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.Column({ type: "int" }),
    __metadata("design:type", Number)
], VoteComment.prototype, "value", void 0);
__decorate([
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", Number)
], VoteComment.prototype, "userId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => User_1.User, (user) => user.points),
    __metadata("design:type", User_1.User)
], VoteComment.prototype, "user", void 0);
__decorate([
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", Number)
], VoteComment.prototype, "commentId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Comment_1.Comment, (comment) => comment.points),
    __metadata("design:type", Comment_1.Comment)
], VoteComment.prototype, "comment", void 0);
VoteComment = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], VoteComment);
exports.VoteComment = VoteComment;
//# sourceMappingURL=VoteComment.js.map