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
var Comment_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const User_1 = require("./User");
const Post_1 = require("./Post");
const VoteComment_1 = require("./VoteComment");
let Comment = Comment_1 = class Comment extends typeorm_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Comment.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Comment.prototype, "createdAt", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Comment.prototype, "updatedAt", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Comment.prototype, "text", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ type: "int", default: 0 }),
    __metadata("design:type", Number)
], Comment.prototype, "points", void 0);
__decorate([
    typeorm_1.OneToMany(() => VoteComment_1.VoteComment, (voteComment) => voteComment.comment),
    __metadata("design:type", Array)
], Comment.prototype, "votes", void 0);
__decorate([
    type_graphql_1.Field(() => Comment_1, { nullable: true }),
    typeorm_1.TreeParent(),
    __metadata("design:type", Comment)
], Comment.prototype, "parentComment", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.ID, { nullable: true }),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Object)
], Comment.prototype, "parentCommentId", void 0);
__decorate([
    type_graphql_1.Field(() => Comment_1, { nullable: true }),
    typeorm_1.TreeChildren(),
    __metadata("design:type", Array)
], Comment.prototype, "childComments", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Comment.prototype, "postId", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.ManyToOne(() => Post_1.Post, (post) => post.comments, {
        eager: true,
        onDelete: "CASCADE",
    }),
    __metadata("design:type", Post_1.Post)
], Comment.prototype, "post", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Comment.prototype, "authorId", void 0);
__decorate([
    type_graphql_1.Field(() => User_1.User),
    typeorm_1.ManyToOne(() => User_1.User),
    __metadata("design:type", User_1.User)
], Comment.prototype, "author", void 0);
Comment = Comment_1 = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity(),
    typeorm_1.Tree("materialized-path")
], Comment);
exports.Comment = Comment;
//# sourceMappingURL=Class.js.map