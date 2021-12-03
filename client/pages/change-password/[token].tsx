import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import InputField from "../../components/inputField";
import { useForm } from "react-hook-form";
import { useChangePasswordMutation } from "../../generated/graphql";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";

type FormData = {
  newPassword: string;
  token: string;
};

const ChangePassword = () => {
  const [, changePassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = React.useState("");
  const router = useRouter();
  const { register, handleSubmit, errors, setError } = useForm();

  const onSubmit = async (data: FormData) => {
    console.log("Login: ", data);
    const response = await changePassword({
      token: typeof router.query.token === "string" ? router.query.token : "",
      newPassword: data.newPassword,
    });

    if (response.data?.changePassword.errors) {
      response.data.changePassword.errors.forEach((err) => {
        console.log(err);
        if (err.field.includes("token")) {
          setTokenError(err.message);
        }
        setError(err.field, { message: err.message });
      });
    } else if (response.data?.changePassword.user) {
      // worked
      router.push("/");
    }
  };
  console.log(errors);
  return (
    <div className="h-screen flex justify-center items-center bg-gray-50">
      <img
        src="/handsbeer.png"
        alt=""
        className="absolute transform rotate-12"
        style={{ left: "400px" }}
      />
      <img
        src="/handsbeer.png"
        alt=""
        className="absolute transform -rotate-12"
        style={{ right: "400px" }}
      />
      <div
        className="shadow-md p-4 rounded-md h-2/3 bg-white border border-gray-200 z-10"
        style={{ maxWidth: "475px" }}
      >
        <h2 className="text-yellow-400 my-8 text-4xl uppercase font-bold text-center">
          Beer Mate
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col"
          style={{ width: "400px" }}
        >
          {tokenError ? (
            <span className="text-red-400 my-2">{tokenError}</span>
          ) : null}

          <InputField
            label="New Password"
            name="newPassword"
            type="password"
            register={register}
            errorMsg={errors.newPassword}
          ></InputField>
          <button
            className="bg-yellow-400 p-2 rounded-md text-white font-medium my-4 text-lg"
            type="submit"
          >
            Change Password
          </button>
          <span>
            <Link href="/register">Change Password</Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default withUrqlClient(createUrqlClient)(ChangePassword);
