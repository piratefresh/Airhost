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
exports.HelloResolver = void 0;
const Comment_1 = require("../entities/Comment");
const type_graphql_1 = require("type-graphql");
const topics_1 = require("./topics");
let HelloResolver = class HelloResolver {
    hello(notifyAboutNewComment) {
        return __awaiter(this, void 0, void 0, function* () {
            yield notifyAboutNewComment({
                content: "Hello 🌐",
            });
            return "Hello 🌐";
        });
    }
    welcome() {
        console.log("Welcome 🙇");
        return "Welcome 🙇";
    }
    hollaYee(notifyStuff) {
        return __awaiter(this, void 0, void 0, function* () {
            yield notifyStuff("Hell,o");
            return "lalalala";
        });
    }
    newStuff() {
        return "hello";
    }
};
__decorate([
    type_graphql_1.Query(() => String),
    __param(0, type_graphql_1.PubSub(topics_1.Topic.NewComment)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function]),
    __metadata("design:returntype", Promise)
], HelloResolver.prototype, "hello", null);
__decorate([
    type_graphql_1.Subscription(() => String, {
        topics: topics_1.Topic.NewComment,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HelloResolver.prototype, "welcome", null);
__decorate([
    type_graphql_1.Query(() => String),
    __param(0, type_graphql_1.PubSub("NewStuff")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function]),
    __metadata("design:returntype", Promise)
], HelloResolver.prototype, "hollaYee", null);
__decorate([
    type_graphql_1.Subscription(() => String, {
        topics: "NewStuff",
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HelloResolver.prototype, "newStuff", null);
HelloResolver = __decorate([
    type_graphql_1.Resolver(Comment_1.Comment)
], HelloResolver);
exports.HelloResolver = HelloResolver;
//# sourceMappingURL=hello.js.map