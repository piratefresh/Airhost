import { Entity, PrimaryColumn, Column, BaseEntity, ManyToOne } from "typeorm";
import { ObjectType } from "type-graphql";
import { User } from "./User";
import { Comment } from "./Comment";

@ObjectType()
@Entity()
export class VoteComment extends BaseEntity {
  @Column({ type: "int" })
  value: number;

  @PrimaryColumn()
  userId: number;

  @ManyToOne(() => User, (user) => user.points)
  user: User;

  @PrimaryColumn()
  commentId: number;

  @ManyToOne(() => Comment, (comment) => comment.points)
  comment: Comment;
}
