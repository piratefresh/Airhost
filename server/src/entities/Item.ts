import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Quality } from "./Quality";
import { Comment } from "./Comment";

@ObjectType()
@Entity()
export class Item extends BaseEntity {
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
  @Column({ unique: true })
  rarity: number;

  @Field()
  @Column()
  rarityText: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  damage: string;

  @Field(() => [Quality])
  @OneToMany(() => Quality, (quality) => quality.item)
  specials: Quality[];

  @OneToMany(() => Comment, (comment) => comment.item)
  comments: Comment[];

  @Field({ nullable: true })
  @Column({ nullable: true })
  crit: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  range: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  hp: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  skill: string;

  @Field()
  @Column()
  source!: string;

  @Field()
  @Column()
  type: string;

  @Field()
  @Column()
  price: number;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  encumbrance: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  image: string;
}
