import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToOne,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Item } from "./Item";

@ObjectType()
@Entity()
export class Quality extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  @Field()
  @Column({ unique: true })
  name!: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  source: string;

  @Field(() => Item)
  @ManyToOne(() => Item, (item) => item.specials, {
    eager: true,
    onDelete: "CASCADE",
  })
  item: Item;
}
