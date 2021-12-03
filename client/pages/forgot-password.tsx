import { withUrqlClient } from "next-urql";
import { useForm } from "react-hook-form";
import Link from "next/link";
import React from "react";
import InputField from "../components/inputField";
import { useForgotPasswordMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

interface ForgotPasswordProps {
  email: string;
}

const ForgotPassword: React.FC<{}> = ({}) => {
  const [complete, setComplete] = React.useState(false);
  const { register, handleSubmit, errors, setError } = useForm();
  const [, forgotPassword] = useForgotPasswordMutation();
  const onSubmit = async (data: ForgotPasswordProps) => {
    console.log("Login: ", data);
    const response = await forgotPassword(data);
    setComplete(true);
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
        {complete ? (
          <h2>If account with that email exists, we sent you an email</h2>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col"
            style={{ width: "400px" }}
          >
            <InputField
              label="Email"
              name="email"
              required
              type="text"
              register={register}
              errorMsg={errors.email}
            ></InputField>
            <button
              className="bg-yellow-400 p-2 rounded-md text-white font-medium my-4 text-lg"
              type="submit"
            >
              Forgot Password
            </button>
            <div className="flex flex-row">
              <Link href="/register">Register</Link>
              <span className="ml-auto">
                <Link href="/forgot-password">Forgot Password?</Link>
              </span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default withUrqlClient(createUrqlClient)(ForgotPassword);
