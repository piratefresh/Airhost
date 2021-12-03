import { Conversation } from "../entities/Conversation";
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
} from "type-graphql";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "../types";
import { getManager } from "typeorm";
import { User } from "../entities/User";
import { Message } from "../entities/Message";

@InputType()
class CreateConversationInput {
  @Field(() => Int)
  receiverId!: number;
  @Field(() => String)
  body!: string;
}

// @ObjectType()
// class PaginatedCovnersation {
//   @Field(() => [Conversation])
//   conversations: Conversation[];
// }

@Resolver(Conversation)
export class ConversationResolver {
  @FieldResolver(() => User)
  author(@Root() user: User) {
    return User.findOne(user.id);
  }

  @FieldResolver(() => String)
  async title(@Ctx() { req }: MyContext, @Root() conversation: Conversation) {
    const me = await User.findOne(req.session.userId);
    let title;

    if (me) {
      title = conversation.participants.filter(
        (user) => user.username !== me?.username
      );
      console.log("title: ", title[0].username);

      return title[0].username;
    }
    return "";
  }

  @Mutation(() => Conversation)
  @UseMiddleware(isAuth)
  async createConversation(
    @Arg("input") input: CreateConversationInput,
    @Ctx() { req }: MyContext
  ): Promise<Conversation | null> {
    const { userId } = req.session;
    if (userId) {
      const ids: string[] = [input.receiverId.toString(), userId.toString()];

      let conversation = await Conversation.createQueryBuilder("user")
        .leftJoinAndSelect("user.participants", "participants")
        .leftJoinAndSelect("user.messages", "messages")
        .where("participants.id IN (:...idArr)", { idArr: ids })
        .getMany();

      let foundConversation = conversation.find(
        (c) => c.participants.length === 2
      );
      console.log("conv1: ", foundConversation);

      if (!foundConversation) {
        const users = await getManager().getRepository(User).findByIds(ids);
        let conversation = await new Conversation();
        conversation.participants = [users[0], users[1]];
        conversation.adminId = Number(userId);

        const message = await Message.create({
          conversationId: conversation.id,
          body: input.body,
          receiverId: input.receiverId,
          senderId: Number(userId),
        });

        conversation.messages = [message];
        let newConversation = await conversation.save();

        return newConversation;
      }

      await Message.create({
        conversationId: foundConversation.id,
        body: input.body,
        receiverId: input.receiverId,
        senderId: Number(userId),
      }).save();

      return await Conversation.createQueryBuilder("conversation")
        // Look for the users conversations
        .where("conversation.id = :conversationId", {
          conversationId: foundConversation.id,
        })
        // Join relations again after finding users conversations
        .leftJoinAndSelect("conversation.participants", "participants")
        .leftJoinAndSelect("conversation.messages", "messages")
        .orderBy({
          "messages.createdAt": "DESC",
        })
        .getOneOrFail();
    }
    return null;
  }

  @Query(() => [Conversation])
  @UseMiddleware(isAuth)
  async getConversations(@Ctx() { req }: MyContext): Promise<Conversation[]> {
    const { userId } = req.session;

    let usersConversations = await Conversation.createQueryBuilder("user")
      // Get the relation
      .leftJoinAndSelect("user.participants", "currentUser")
      // Look for the users conversations
      .where("currentUser.id = :userId", { userId })
      // Join relations again after finding users conversations
      .leftJoinAndSelect("user.participants", "participants")
      .leftJoinAndSelect("user.messages", "messages")
      .orderBy({
        "messages.createdAt": "DESC",
        "user.updatedAt": "DESC",
      })
      .getMany();
    console.log(usersConversations);
    return usersConversations;
  }
}

//https://github.com/RGPosadas/Mull/blob/67c449de4efbc1000a20a564ff0d854fc50d144c/apps/mull-api/src/app/channel/channel.service.ts
//https://github.com/BinaryStudioAcademy/bsa-2020-chatito/blob/f41d615e76bb10966921e85881b75434124aabb0/backend/src/data/repositories/chatRepository.ts
