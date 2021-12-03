import {
  Entity,
  BaseEntity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { User } from "./User";
import { Message } from "./Message";
import { UserConversation } from "./UserToConversation";

@ObjectType()
@Entity()
export class Conversation extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  title: String;

  @Field()
  @Column()
  adminId: number;

  @Field(() => User)
  @ManyToOne(() => User)
  admin: User;

  //   @Column("simple-array")
  //   participantsId: number[];
  @Field(() => [User])
  @ManyToMany(() => User, (user) => user.conversations, { eager: true })
  participants: User[];

  @Field(() => [Message], { nullable: true })
  @OneToMany(() => Message, (message) => message.conversation, {
    nullable: true,
    cascade: true,
  })
  messages: Message[];

  @OneToMany(() => UserConversation, (uc) => uc.conversation)
  userConnection: Promise<UserConversation[]>;

  @Field(() => [User])
  users: Promise<User[]>;
}
