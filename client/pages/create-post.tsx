import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import InputField from "../components/inputField";
import TextField from "../components/textField";
import SiteLayout from "../components/siteLayout";
import RichTextInput from "../components/richTextInput";
import {
  useCreateImageSignatureMutation,
  useCreatePostMutation,
} from "../generated/graphql";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useIsAuth } from "../utils/useIsAuth";
import { uploadImage } from "../utils/uploadImage";

interface CreatePostProps {
  title: string;
  text: string;
  image: FileList;
}

const CreatePost: React.FC<{}> = ({}) => {
  const router = useRouter();
  useIsAuth();
  const [, createPost] = useCreatePostMutation();
  const [, createImageSignature] = useCreateImageSignatureMutation();
  const { register, handleSubmit, errors, setError } = useForm();
  let imageUrl = "";
  const onSubmit = async (data: CreatePostProps) => {
    const { data: signatureData } = await createImageSignature();
    if (data.image) {
      if (signatureData) {
        const { signature, timestamp } = signatureData.createImageSignature;
        const imageData = await uploadImage(
          data.image[0],
          signature,
          timestamp
        );
        imageUrl = imageData.secure_url;
      }
    }
    const { error } = await createPost({
      input: {
        title: data.title,
        text: data.text,
        image: imageUrl,
      },
    });
    if (!error) {
      router.push("/");
    }
  };

  return (
    <SiteLayout>
      <div className="h-screen flex flex-col items-center bg-gray-50 dark:bg-gray-800">
        <div className="z-10 w-2/3">
          <div className="text-lg mr-auto my-8 uppercase font-bold">
            Create Post
          </div>
          <div className="shadow-md p-4 rounded-md bg-white border border-gray-200 dark:bg-gray-900 dark:border-gray-500">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
              <InputField
                label="Post Picture"
                name="image"
                type="file"
                register={register}
                errorMsg={errors.image}
              ></InputField>
              <InputField
                label="Post Title"
                name="title"
                type="text"
                register={register}
                errorMsg={errors.title}
              ></InputField>
              <TextField
                label="Body"
                name="text"
                register={register}
                errorMsg={errors.text}
              ></TextField>
              <RichTextInput></RichTextInput>
              <button
                className="bg-yellow-400 p-2 rounded-md text-white font-medium my-4 text-lg"
                type="submit"
              >
                Create Post
              </button>
            </form>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
};

export default withUrqlClient(createUrqlClient)(CreatePost);
