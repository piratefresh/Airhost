import {
  Resolver,
  Query,
  Field,
  InputType,
  Arg,
  Ctx,
  Mutation,
  UseMiddleware,
  FieldResolver,
  Root,
  Int,
  Subscription,
  PubSub,
  Publisher,
  ResolverFilterData,
} from "type-graphql";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "../types";
import { Message } from "../entities/Message";
import { User } from "../entities/User";
import { Topic } from "./topics";
import { Conversation } from "../entities/Conversation";

interface IUpdateConversationPayload {
  __typename?: string;
  updatedAt: Date;
  messages: NewMessagePayload[];
  participants: User[];
}

interface NewMessagePayload {
  __typename?: string;
  body: string;
  senderId: number;
  receiverId: number;
  conversationId: number;
  updatedAt: Date;
  createdAt: Date;
  id: number;
}

interface UpdateConversationPayload {
  __typename?: string;
  updatedAt: Date;
  createdAt: Date;
  id: number;
  messages: NewMessagePayload[];
  participants: User[];
}

interface INewUnreadMessagePayload {
  receiverId: number;
}

@InputType()
class CreateMessageInput {
  @Field()
  body: string;
  @Field()
  conversationId: number;
  @Field()
  receiverId: number;
}

@Resolver(Message)
export class MessageResolver {
  @FieldResolver(() => User)
  sender(@Root() sender: Message) {
    return User.findOne(sender.senderId);
  }

  @Mutation(() => Message)
  @UseMiddleware(isAuth)
  async createMessage(
    @Arg("input") input: CreateMessageInput,
    @Ctx() { req }: MyContext,
    @PubSub(Topic.NewMessage)
    notifyAboutNewMessage: Publisher<NewMessagePayload>,
    @PubSub(Topic.NewUnreadMessage)
    notifyAboutReceivedMessage: Publisher<INewUnreadMessagePayload>,
    @PubSub(Topic.UpdateConversation)
    notifyAboutUpdateConversation: Publisher<Conversation>
  ): Promise<Message> {
    const { userId } = req.session;
    //
    const message = await Message.create({
      ...input,
      receiverId: input.receiverId,
      senderId: Number(userId),
    }).save();

    // Have to update our conversation row with new date inside updatedAt
    // const conversation = await Conversation.findOneOrFail(
    //   input.conversationId,
    //   { relations: ["messages", "participants"] }
    // );
    // conversation.save();

    const convo = await Conversation.createQueryBuilder("conversation")
      // Get the relation
      .leftJoinAndSelect("conversation.participants", "currentUser")
      // Look for the users conversations
      .where("conversation.id = :conversationId", {
        conversationId: input.conversationId,
      })
      // Join relations again after finding users conversations
      .leftJoinAndSelect("conversation.participants", "participants")
      .leftJoinAndSelect("conversation.messages", "messages")
      .orderBy({
        "messages.createdAt": "DESC",
        "conversation.updatedAt": "DESC",
      })
      .getOne();

    await notifyAboutNewMessage(message);
    await notifyAboutReceivedMessage({ receiverId: input.receiverId });

    if (convo) {
      convo?.save();
      await notifyAboutUpdateConversation(convo);
    }

    return message;
  }

  @Query(() => [Message])
  @UseMiddleware(isAuth)
  async getMessages(
    @Arg("conversationId", () => Int) conversationId: number,
    @Ctx() { req }: MyContext
  ): Promise<Message[]> {
    const { userId } = req.session;
    let messages = await Message.find({ where: { conversationId } });

    if (!messages) {
      return [];
    }

    // Find messages which are unread
    messages.map((message) => {
      const isMeReceving = message.receiverId === userId;
      const isUnRead = !message.readTime;
      // Checks if message has been read
      // and user is not receiver
      if (isUnRead && isMeReceving) {
        // Changes the read time to now date
        // so we can query for messages on date
        // instead of read boolean
        message.readTime = new Date();
        message.save();
      }
    });

    // sort messages so that the latest are last (on the bottom)
    messages.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

    return messages;
  }

  @Subscription(() => Message, {
    topics: Topic.NewMessage,
    filter: ({
      context,
      payload,
      args,
    }: ResolverFilterData<NewMessagePayload>) => {
      const userId = context.connection.context.req.session.userId;
      return payload.senderId === userId || payload.receiverId === userId;
    },
  })
  newMessageReceived(@Root() newMessage: NewMessagePayload): NewMessagePayload {
    return {
      __typename: "Message",
      id: newMessage.id,
      body: newMessage.body,
      senderId: newMessage.senderId,
      receiverId: newMessage.receiverId,
      conversationId: newMessage.conversationId,
      createdAt: new Date(newMessage.createdAt),
      updatedAt: new Date(newMessage.updatedAt),
    };
  }

  @Query(() => Number)
  @UseMiddleware(isAuth)
  async getUnreadCount(@Ctx() { req }: MyContext): Promise<Number> {
    const { userId } = req.session;

    let unreadCount = await Message.createQueryBuilder("message")
      .where('message."receiverId" = :receiverId', { receiverId: userId })
      .andWhere("message.readTime is null")
      .getCount();

    if (!unreadCount) {
      return unreadCount;
    }

    return unreadCount;
  }

  @Subscription(() => Number, {
    topics: Topic.NewUnreadMessage,
    filter: ({
      context,
      payload,
    }: ResolverFilterData<INewUnreadMessagePayload>) => {
      const userId = context.connection.context.req.session.userId;
      console.log("payload: ", payload, "userId: ", userId);
      return payload.receiverId === userId;
    },
  })
  async newUnreadMessage(
    @Root() newMessage: INewUnreadMessagePayload
  ): Promise<Number> {
    let unreadCount = await Message.createQueryBuilder("message")
      .where('message."receiverId" = :receiverId', {
        receiverId: newMessage.receiverId,
      })
      .andWhere("message.readTime is null")
      .getCount();

    console.log("Count Subscription: ", unreadCount);
    return unreadCount;
  }

  @Subscription(() => Conversation, {
    topics: Topic.UpdateConversation,
    filter: ({ context, payload }: ResolverFilterData<Conversation>) => {
      const userId = context.connection.context.req.session.userId;
      return (
        payload.participants[0].id === userId ||
        payload.participants[1].id === userId
      );
    },
  })
  async updatedConversations(
    @Root() updatedConversation: Conversation
  ): Promise<UpdateConversationPayload> {
    const messagesUpdatedDate = updatedConversation.messages.map(
      (x: Message) => {
        return {
          ...x,
          createdAt: new Date(x.createdAt),
          updatedAt: new Date(x.updatedAt),
        };
      }
    );
    const obj = {
      id: updatedConversation.id,
      updatedAt: new Date(updatedConversation.updatedAt),
      createdAt: new Date(updatedConversation.createdAt),
      messages: [...messagesUpdatedDate],
      participants: [...updatedConversation.participants],
    };
    console.log("Up[dted Obj", obj);
    return obj;
  }
}

//https://github.com/elliotcho/E-Talk-3.0/blob/1895a0d21a9f0bda006a4b4b062fbdc5ab0c5426/server/src/index.ts
//https://github.com/coderosh/gqlchat/blob/32f3ea1f08f22927bc2b255e7378e42112d63e92/server/Context.ts
