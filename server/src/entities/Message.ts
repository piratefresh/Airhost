import {
  Entity,
  Column,
  BaseEntity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { User } from "./User";
import { Conversation } from "./Conversation";

@ObjectType()
@Entity()
export class Message extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @Field()
  @Column()
  body: string;

  @Field()
  @Column({ type: "int" })
  senderId: number;

  @ManyToOne(() => User, (user) => user.conversations)
  sender: User;

  @Field()
  @Column({ type: "int" })
  receiverId: number;

  @ManyToOne(() => User, (user) => user.conversations)
  receiver: User;

  @ManyToOne(() => Conversation, (conversation) => conversation.messages)
  conversation: Conversation;

  @Field()
  @Column({ type: "int" })
  conversationId: number;

  @Field({ nullable: true })
  @Column("timestamp", { default: null })
  readTime: Date;
}
