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
exports.Listing = exports.ListingType = void 0;
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const Comment_1 = require("./Comment");
var ListingType;
(function (ListingType) {
    ListingType["ENTIRE"] = "entire";
    ListingType["PRIVATE"] = "private";
    ListingType["HOTEL"] = "hotel";
    ListingType["SHARED"] = "shared";
})(ListingType = exports.ListingType || (exports.ListingType = {}));
let Listing = class Listing extends typeorm_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Listing.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Listing.prototype, "createdAt", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Listing.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.OneToMany(() => Comment_1.Comment, (comment) => comment.listing),
    __metadata("design:type", Array)
], Listing.prototype, "comments", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Listing.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Listing.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Listing.prototype, "image", void 0);
__decorate([
    type_graphql_1.Field(() => [String]),
    typeorm_1.Column("simple-array", { nullable: true }),
    __metadata("design:type", Array)
], Listing.prototype, "gallery", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({
        type: "enum",
        enum: ListingType,
        default: ListingType.ENTIRE,
    }),
    __metadata("design:type", String)
], Listing.prototype, "role", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Listing.prototype, "address", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Listing.prototype, "city", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ type: "double precision", name: "lat" }),
    __metadata("design:type", Number)
], Listing.prototype, "lat", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ type: "double precision", name: "lng" }),
    __metadata("design:type", Number)
], Listing.prototype, "lng", void 0);
__decorate([
    typeorm_1.Column({
        type: "point",
        nullable: true,
        spatialFeatureType: "Point",
        srid: 4326,
    }),
    __metadata("design:type", Object)
], Listing.prototype, "location", void 0);
__decorate([
    type_graphql_1.Field(() => [Number]),
    typeorm_1.Column("int", { array: true }),
    __metadata("design:type", Array)
], Listing.prototype, "bookings", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Listing.prototype, "price", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Listing.prototype, "numberOfGuests", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], Listing.prototype, "authorized", void 0);
Listing = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], Listing);
exports.Listing = Listing;
//# sourceMappingURL=Listning.js.map