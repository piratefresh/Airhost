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
exports.ItemResolver = void 0;
const Item_1 = require("../entities/Item");
const isAuth_1 = require("../middleware/isAuth");
const type_graphql_1 = require("type-graphql");
let ItemInput = class ItemInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ItemInput.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ItemInput.prototype, "rarityText", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], ItemInput.prototype, "rarity", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ItemInput.prototype, "source", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ItemInput.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], ItemInput.prototype, "price", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ItemInput.prototype, "type", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], ItemInput.prototype, "encumbrance", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ItemInput.prototype, "image", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ItemInput.prototype, "damage", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ItemInput.prototype, "crit", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ItemInput.prototype, "range", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ItemInput.prototype, "hp", void 0);
ItemInput = __decorate([
    type_graphql_1.InputType()
], ItemInput);
let ItemResolver = class ItemResolver {
    createItem(input, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            return Item_1.Item.create(Object.assign({}, input)).save();
        });
    }
    getItems({ req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const items = yield Item_1.Item.find({});
            return items;
        });
    }
};
__decorate([
    type_graphql_1.Mutation(() => Item_1.Item),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Arg("input")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ItemInput, Object]),
    __metadata("design:returntype", Promise)
], ItemResolver.prototype, "createItem", null);
__decorate([
    type_graphql_1.Query(() => [Item_1.Item]),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ItemResolver.prototype, "getItems", null);
ItemResolver = __decorate([
    type_graphql_1.Resolver(Item_1.Item)
], ItemResolver);
exports.ItemResolver = ItemResolver;
//# sourceMappingURL=item.js.map