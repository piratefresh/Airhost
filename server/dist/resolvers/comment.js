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
exports.flat = exports.CommentResolver = void 0;
const Comment_1 = require("../entities/Comment");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const isAuth_1 = require("../middleware/isAuth");
const User_1 = require("../entities/User");
const Post_1 = require("../entities/Post");
const VoteComment_1 = require("../entities/VoteComment");
let CommentInput = class CommentInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CommentInput.prototype, "text", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], CommentInput.prototype, "postId", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], CommentInput.prototype, "parentCommentId", void 0);
CommentInput = __decorate([
    type_graphql_1.InputType()
], CommentInput);
let CommentResolver = class CommentResolver {
    author(comment) {
        return User_1.User.findOne(comment.authorId);
    }
    post(comment) {
        return Post_1.Post.findOne(comment.postId);
    }
    voteComment(commentId, value, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const isUpVote = value !== -1;
            const realValue = isUpVote ? 1 : -1;
            const { userId } = req.session;
            const voted = yield VoteComment_1.VoteComment.findOne({ where: { commentId, userId } });
            if (voted && voted.value !== realValue) {
                yield typeorm_1.getConnection().transaction((tm) => __awaiter(this, void 0, void 0, function* () {
                    yield tm.query(`
          update vote_comment
          set value = $1
          where "commentId" = $2 and "userId" = $3
        `, [realValue, commentId, userId]);
                    yield tm.query(`
          update comment
          set points = points + $1
          where id = $2
        `, [2 * realValue, commentId]);
                }));
            }
            else if (!voted) {
                yield typeorm_1.getConnection().transaction((tm) => __awaiter(this, void 0, void 0, function* () {
                    yield tm.query(`
          insert into vote_comment ("userId", "commentId", value)
          values ($1, $2, $3)
        `, [userId, commentId, realValue]);
                    yield tm.query(`
          update comment
          set points = points + $1
          where id = $2
      `, [realValue, commentId]);
                }));
            }
            return true;
        });
    }
    getComments(postId, {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const threads = yield typeorm_1.getConnection().query(`
    select c.*
    from comment c
    where c."postId" = ${postId}
    order by c."createdAt" DESC
    `);
            return threads;
        });
    }
    createComment(input, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield Comment_1.Comment.create(Object.assign(Object.assign({}, input), { authorId: req.session.userId })).save();
            return comment;
        });
    }
};
__decorate([
    type_graphql_1.FieldResolver(() => User_1.User),
    __param(0, type_graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Comment_1.Comment]),
    __metadata("design:returntype", void 0)
], CommentResolver.prototype, "author", null);
__decorate([
    type_graphql_1.FieldResolver(() => Post_1.Post),
    __param(0, type_graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Comment_1.Comment]),
    __metadata("design:returntype", void 0)
], CommentResolver.prototype, "post", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Arg("commentId", () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Arg("value", () => type_graphql_1.Int)),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], CommentResolver.prototype, "voteComment", null);
__decorate([
    type_graphql_1.Query(() => [Comment_1.Comment]),
    __param(0, type_graphql_1.Arg("postId", () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], CommentResolver.prototype, "getComments", null);
__decorate([
    type_graphql_1.Mutation(() => Comment_1.Comment),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Arg("input")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CommentInput, Object]),
    __metadata("design:returntype", Promise)
], CommentResolver.prototype, "createComment", null);
CommentResolver = __decorate([
    type_graphql_1.Resolver(Comment_1.Comment)
], CommentResolver);
exports.CommentResolver = CommentResolver;
function flat(r, a) {
    const b = {};
    Object.keys(a).forEach(function (k) {
        if (k !== "childComments") {
            b[k] = a[k];
        }
    });
    r.push(b);
    if (Array.isArray(a.childComments)) {
        b.childComments = a.childComments.map(function (a) {
            return a.id;
        });
        return a.childComments.reduce(flat, r);
    }
    return r;
}
exports.flat = flat;
//# sourceMappingURL=comment.js.map