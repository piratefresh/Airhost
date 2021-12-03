import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToOne,
  TreeParent,
  TreeChildren,
  Tree,
  OneToMany,
} from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";
import { User } from "./User";
import { Post } from "./Post";
import { VoteComment } from "./VoteComment";

@ObjectType()
@Entity()
@Tree("materialized-path")
export class Comment extends BaseEntity {
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
  @Column()
  text!: string;

  @Field()
  @Column({ type: "int", default: 0 })
  points!: number;

  @OneToMany(() => VoteComment, (voteComment) => voteComment.comment)
  votes: VoteComment[];

  @Field(() => Comment, { nullable: true })
  @TreeParent()
  parentComment: Comment;

  @Field(() => ID, { nullable: true })
  @Column({ nullable: true })
  parentCommentId: string | number;

  @Field(() => Comment, { nullable: true })
  @TreeChildren()
  childComments: Comment[];

  @Field()
  @Column()
  postId: number;

  @Field()
  @ManyToOne(() => Post, (post) => post.comments, {
    eager: true,
    onDelete: "CASCADE",
  })
  post: Post;

  @Field()
  @Column()
  authorId: number;

  @Field(() => User)
  @ManyToOne(() => User)
  author: User;
}
