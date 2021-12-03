import React, { ReactNode } from "react";
import {
  useGetCommentsQuery,
  useCreateCommentMutation,
} from "../../generated/graphql";
import { createCommentTree } from "../../utils/unflatten";
import { formatDistanceToNow } from "date-fns";
import TextField from "../textField";
import { useForm } from "react-hook-form";

interface CommentType {
  parentCommentId: number;
  text: string;
  id: number;
  updatedAt: string;
  childComments: CommentType[];
  author: {
    username: string;
  };
}

interface Props {
  comment: CommentType;
  children?: ReactNode;
  isChild: boolean;
  postId?: number;
}

interface MainProps {
  postId: number;
  children?: ReactNode;
}

interface ReplyCommentProps {
  parentCommentId?: string;
  text: string;
  postId: number;
}

const Comments: React.FC<MainProps> = ({ postId }) => {
  const [{ data, fetching }] = useGetCommentsQuery({
    variables: {
      postId,
    },
  });
  let threads;

  if (fetching && !data) {
    return <div>No Comments</div>;
  }
  if (data?.getComments && !fetching) {
    threads = createCommentTree(data.getComments);
  }

  return (
    <>
      {threads &&
        threads.map((comment: CommentType, index: number) => {
          return (
            <CommentsN comment={comment} postId={postId} isChild></CommentsN>
          );
        })}
    </>
  );
};

export default Comments;

const CommentsN = ({ comment, isChild, postId }: Props) => {
  const { register, handleSubmit, errors, reset } = useForm();
  const [showReply, setShowReply] = React.useState<boolean>(false);
  const [, createComment] = useCreateCommentMutation();
  const onReply = async (data: ReplyCommentProps) => {
    const { data: commentData, error } = await createComment({
      input: {
        postId: Number(postId),
        text: data.text,
        parentCommentId: data.parentCommentId
          ? data.parentCommentId.toString()
          : null,
      },
    });
    if (error) {
      console.log(error);
    }
    if (commentData) {
      reset();
      setShowReply(false);
    }
  };
  const classes = `${
    isChild
      ? "border-l-2 border-gray-300 p-4 my-4 flex flex-col"
      : "p-4 flex flex-col"
  }`;
  const nestedComments = (comment.childComments || []).map((comment, index) => {
    return <CommentsN comment={comment} isChild={false} postId={postId} />;
  });
  console.log("comment: ", comment);
  return (
    <div className={classes} key={comment.id}>
      <div className="flex flex-row">
        <img
          className="h-8 w-8 object-cover rounded-full"
          src="https://images.unsplash.com/photo-1491609154219-ffd3ffafd992?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"
          alt=""
        />
        <a className="flex flex-row" href={comment.author.username}>
          <div>{comment.author.username}</div>
          <div className="ml-1 text-gray-500">
            {formatDistanceToNow(new Date(parseInt(comment.updatedAt)))}
          </div>
        </a>
      </div>
      <span className="text-gray-500">{comment.text}</span>
      <div className="flex flex-row text-gray-500">
        <div className="mr-2">Like</div>
        <div
          className="mr-2 cursor-pointer"
          onClick={() => setShowReply(!showReply)}
        >
          Reply
        </div>
      </div>
      {showReply && (
        <form onSubmit={handleSubmit(onReply)} className="flex flex-col w-full">
          <TextField
            label={`Comment as`}
            placeholder="Whats your thoughts?"
            name="text"
            register={register}
            errorMsg={errors.text}
          ></TextField>
          <input
            className="border border-red-300 text-gray-900 hidden"
            ref={register}
            name="parentCommentId"
            defaultValue={comment.id}
          />
          <button
            className="bg-yellow-400 p-2 rounded-md text-white font-medium my-4 text-lg"
            type="submit"
          >
            Comment
          </button>
        </form>
      )}
      {nestedComments}
    </div>
  );
};
