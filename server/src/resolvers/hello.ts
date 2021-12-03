import { Comment } from "../entities/Comment";
import { Resolver, Query, Subscription, PubSub, Publisher } from "type-graphql";
import { Topic } from "./topics";

interface HelloPayload {
  content: string;
}

@Resolver(Comment)
export class HelloResolver {
  @Query(() => String)
  async hello(
    @PubSub(Topic.NewComment)
    notifyAboutNewComment: Publisher<HelloPayload>
  ) {
    await notifyAboutNewComment({
      content: "Hello 🌐",
    });
    return "Hello 🌐";
  }

  @Subscription(() => String, {
    topics: Topic.NewComment,
  })
  welcome() {
    console.log("Welcome 🙇");
    return "Welcome 🙇";
  }

  @Query(() => String)
  async hollaYee(@PubSub("NewStuff") notifyStuff: Publisher<string>) {
    await notifyStuff("Hell,o");
    return "lalalala";
  }

  @Subscription(() => String, {
    topics: "NewStuff",
  })
  newStuff() {
    return "hello";
  }

  // @Subscription((returns) => Comment, {
  //   topics: Topic.NewComment,
  //   filter: ({
  //     payload,
  //     args,
  //   }: ResolverFilterData<HelloPayload, NewCommentsArgs>) => {
  //     return payload.recipeId === args.recipeId;
  //   },
  // })
  // newComments(
  //   @Root() newComment: NewCommentPayload,
  //   @Args() { recipeId }: NewCommentsArgs
  // ): Comment {
  //   return {
  //     content: newComment.content,
  //     date: new Date(newComment.dateString), // limitation of Redis payload serialization
  //     nickname: newComment.nickname,
  //   };
  // }
}
