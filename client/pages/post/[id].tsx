import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import {
  useCreateCommentMutation,
  usePostQuery,
} from "../../generated/graphql";
import Comments from "../../components/comments/comments";
import TextField from "../../components/textField";
import { useForm } from "react-hook-form";
import SiteLayout from "../../components/siteLayout";
import { motion } from "framer-motion";

interface CreateCommentProps {
  parentCommentId?: string;
  text: string;
  postId: number;
}

const Post = () => {
  const { register, handleSubmit, errors, reset } = useForm();
  const router = useRouter();
  const [{ data: postData, fetching }] = usePostQuery({
    variables: {
      id: Number(router.query.id),
    },
  });
  const [, createComment] = useCreateCommentMutation();
  const onSubmit = async (data: CreateCommentProps) => {
    const { data: commentData, error } = await createComment({
      input: {
        postId: Number(router.query.id),
        text: data.text,
        parentCommentId: data.parentCommentId ? data.parentCommentId : null,
      },
    });
    if (error) {
      console.log(error);
    }
    commentData && reset();
  };

  if (!postData?.post) {
    return <h2>Could not find Post</h2>;
  }

  return (
    <SiteLayout>
      <motion.img
        className="h-64 w-full object-cover imagePost"
        src={postData.post.image ? postData.post.image : ""}
        alt={postData.post.title}
        layoutId={`imagePost-${postData.post.id}`}
      />
      {/* <motion.figure
        className="imagePost"
        layoutId={`imagePost-${postData.post.id}`}
      >
        <Image
          src={postData.post.image ? postData.post.image : ""}
          className="h-32 w-full object-cover"
          layout="responsive"
          alt={postData.post.title}
          width={849}
          height={564}
        />
      </motion.figure> */}
      {/* <motion.img
        className="h-32 w-full object-cover"
        src={postData.post.image ? postData.post.image : ""}
        alt={postData.post.title}
      /> */}
      <div className="w-1/2 mx-auto">
        <h2 className="font-bold text-lg my-4">{postData.post.title}</h2>
        <div>{postData.post.text}</div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full"
        >
          <TextField
            label={`Comment as ${postData.post.author.username}`}
            placeholder="Whats your thoughts?"
            name="text"
            register={register}
            errorMsg={errors.text}
          ></TextField>
          <button
            className="bg-yellow-400 p-2 rounded-md text-white font-medium my-4 text-lg"
            type="submit"
          >
            Comment
          </button>
        </form>
        <Comments postId={Number(router.query.id)}></Comments>
      </div>
    </SiteLayout>
  );
};

export default Post;
