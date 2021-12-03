import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Post } from "./Post";
import { Vote } from "./Vote";
import { Conversation } from "./Conversation";
import { UserConversation } from "./UserToConversation";

@ObjectType()
@Entity()
export class User extends BaseEntity {
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
  username!: string;

  @Field()
  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];

  @OneToMany(() => Vote, (vote) => vote.user)
  points: Vote[];

  @ManyToMany(() => Conversation, (conversation) => conversation.participants)
  @JoinTable()
  conversations: Conversation[];

  @OneToMany(() => Conversation, (conversation) => conversation.admin)
  admin: Conversation;

  // @OneToMany(() => Message, (message) => message.user)
  // user: Message[];

  @OneToMany(() => UserConversation, (uc) => uc.user)
  conversationConnection: Promise<UserConversation[]>;
}
