import { Comment } from "../entities/Comment";
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Ctx,
  UseMiddleware,
  Field,
  InputType,
  FieldResolver,
  Root,
  Int,
} from "type-graphql";
import { getConnection } from "typeorm";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "../types";
import { User } from "../entities/User";
import { Post } from "../entities/Post";
import { VoteComment } from "../entities/VoteComment";

@InputType()
class CommentInput {
  @Field()
  text!: string;
  @Field(() => Int)
  postId!: number;
  @Field({ nullable: true })
  parentCommentId?: string;
}

@Resolver(Comment)
export class CommentResolver {
  @FieldResolver(() => User)
  author(@Root() comment: Comment) {
    return User.findOne(comment.authorId);
  }

  @FieldResolver(() => Post)
  post(@Root() comment: Comment) {
    return Post.findOne(comment.postId);
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async voteComment(
    @Arg("commentId", () => Int) commentId: number,
    @Arg("value", () => Int) value: number,
    @Ctx() { req }: MyContext
  ) {
    const isUpVote = value !== -1;
    const realValue = isUpVote ? 1 : -1;
    const { userId } = req.session;
    const voted = await VoteComment.findOne({ where: { commentId, userId } });

    // if the user has voted on the post before
    // and they are changing their vote
    if (voted && voted.value !== realValue) {
      await getConnection().transaction(async (tm) => {
        await tm.query(
          `
          update vote_comment
          set value = $1
          where "commentId" = $2 and "userId" = $3
        `,
          [realValue, commentId, userId]
        );

        await tm.query(
          `
          update comment
          set points = points + $1
          where id = $2
        `,
          [2 * realValue, commentId]
        );
      });
    } else if (!voted) {
      // has never voted before
      await getConnection().transaction(async (tm) => {
        await tm.query(
          `
          insert into vote_comment ("userId", "commentId", value)
          values ($1, $2, $3)
        `,
          [userId, commentId, realValue]
        );

        await tm.query(
          `
          update comment
          set points = points + $1
          where id = $2
      `,
          [realValue, commentId]
        );
      });
    }
    return true;
  }

  @Query(() => [Comment])
  async getComments(
    @Arg("postId", () => Int) postId: number,
    @Ctx() {}: MyContext
  ) {
    const threads = await getConnection().query(
      `
    select c.*
    from comment c
    where c."postId" = ${postId}
    order by c."createdAt" DESC
    `
    );

    return threads;
  }

  @Mutation(() => Comment)
  @UseMiddleware(isAuth)
  async createComment(
    @Arg("input") input: CommentInput,
    @Ctx() { req }: MyContext
  ): Promise<Comment> {
    const comment = await Comment.create({
      ...input,
      authorId: req.session.userId,
    }).save();

    return comment;
  }
}

export function flat(r: any, a: any) {
  const b = {} as any;
  Object.keys(a).forEach(function (k) {
    if (k !== "childComments") {
      b[k] = a[k];
    }
  });
  r.push(b);
  if (Array.isArray(a.childComments)) {
    b.childComments = a.childComments.map(function (a: any) {
      return a.id;
    });
    return a.childComments.reduce(flat, r);
  }
  return r;
}
