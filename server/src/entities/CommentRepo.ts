import { EntityRepository, TreeRepository } from "typeorm";
import { Comment } from "./Comment";

@EntityRepository(Comment)
export default class CommentGroupRepository extends TreeRepository<Comment> {}
