import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import InputField from "../components/inputField";
import { useLoginMutation } from "../generated/graphql";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";

type FormData = {
  usernameOrEmail: string;
  password: string;
};

const Login: React.FC<{}> = ({}) => {
  const router = useRouter();
  const { register, handleSubmit, errors, setError } = useForm();
  const [RegisterUserResult, registerUser] = useLoginMutation();
  const onSubmit = async (data: FormData) => {
    console.log("Login: ", data);
    const response = await registerUser(data);

    if (response.data?.login.errors) {
      response.data.login.errors.forEach((err) => {
        setError(err.field, { message: err.message });
      });
    } else if (response.data?.login.user) {
      if (typeof router.query.next === "string") {
        router.push(router.query.next);
      } else {
        router.push("/");
      }
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
          <InputField
            label="Username Or Email"
            name="usernameOrEmail"
            required
            type="text"
            register={register}
            errorMsg={errors.usernameOrEmail}
          ></InputField>
          <InputField
            label="Password"
            name="password"
            required
            type="password"
            register={register}
            errorMsg={errors.password}
          ></InputField>
          <button
            className="bg-yellow-400 p-2 rounded-md text-white font-medium my-4 text-lg"
            type="submit"
          >
            Login
          </button>
          <div className="flex flex-row">
            <Link href="/register">Register</Link>
            <span className="ml-auto">
              <Link href="/forgot-password">Forgot Password?</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withUrqlClient(createUrqlClient)(Login);
