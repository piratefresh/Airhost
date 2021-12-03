import { withUrqlClient } from "next-urql";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import InputField from "../components/inputField";
import { useRegisterMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

type formData = {
  username: string;
  email: string;
  password: string;
};

const Register: React.FC<{}> = ({}) => {
  const router = useRouter();
  const { register, handleSubmit, errors, setError } = useForm();
  const [RegisterUserResult, registerUser] = useRegisterMutation();
  const onSubmit = async (data: formData) => {
    console.log("REGISTER: ", data);
    const response = await registerUser({ options: data });

    if (response.data?.register.errors) {
      //   toErrorMap(response.data.register.errors, setError);
      response.data.register.errors.forEach((err) => {
        setError(err.field, { message: err.message });
      });
    } else if (response.data?.register.user) {
      // worked
      router.push("/");
    }
  };

  console.log("Errors: ", errors);

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
            label="Username"
            name="username"
            required
            type="text"
            register={register}
            errorMsg={errors.username}
          ></InputField>

          <InputField
            label="Email"
            name="email"
            required
            type="email"
            register={register}
            errorMsg={errors.email}
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
            Register
          </button>
          <div className="flex flex-row">
            <Link href="/login">Login</Link>
            <span className="ml-auto">
              <Link href="/forgot-password">Forgot Password?</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withUrqlClient(createUrqlClient)(Register);
