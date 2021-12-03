import {
  BaseEntity,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { Conversation } from "./Conversation";
import { User } from "./User";

@Entity()
export class UserConversation extends BaseEntity {
  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  conversationId: number;

  @ManyToOne(() => User, (user) => user.conversationConnection, {
    primary: true,
  })
  @JoinColumn({ name: "userId" })
  user: Promise<User>;

  @ManyToOne(
    () => Conversation,
    (conversation) => conversation.userConnection,
    {
      primary: true,
    }
  )
  @JoinColumn({ name: "conversationId" })
  conversation: Promise<Conversation>;
}
