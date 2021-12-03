import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToMany,
  Index,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Geometry, Point } from "geojson";
import { Comment } from "./Comment";

export enum ListingType {
  ENTIRE = "entire",
  PRIVATE = "private",
  HOTEL = "hotel",
  SHARED = "shared",
}

@ObjectType()
@Entity()
export class Listing extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Comment, (comment) => comment.listing)
  comments: Comment[];

  @Field()
  @Column()
  title!: string;

  @Field()
  @Column()
  description!: string;

  @Field()
  @Column()
  image!: string;

  @Field(() => [String])
  @Column("simple-array", { nullable: true })
  gallery: string[];

  @Field()
  @Column({
    type: "enum",
    enum: ListingType,
    default: ListingType.ENTIRE,
  })
  role: ListingType;

  @Field()
  @Column()
  address!: string;

  @Field()
  @Column()
  city!: string;

  @Field()
  @Column({ type: "double precision", name: "lat" })
  lat: number;

  @Field()
  @Column({ type: "double precision", name: "lng" })
  lng: number;

  @Column({
    type: "point",
    nullable: true,
    spatialFeatureType: "Point",
    srid: 4326,
  })
  location: Geometry;

  @Field(() => [Number])
  @Column("int", { array: true })
  bookings!: number[];

  @Field()
  @Column()
  price!: number;

  @Field()
  @Column()
  numberOfGuests!: number;

  @Field()
  @Column()
  authorized!: boolean;
}

//  _id: ObjectId;
//     title: string;
//     description: string;
//     image: string;
//     host: string;
//     type: ListingType;
//     address: string;
//     country: string;
//     admin: string;
//     city: string;
//     bookings: ObjectId[];
//     bookingsIndex: BookingsIndexYear;
//     price: number;
//     numOfGuests: number;
//     authorized?: boolean;
