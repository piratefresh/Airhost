import { UsernamePasswordInput } from "src/resolvers/UsernamePasswordInput";

export const validateRegister = (options: UsernamePasswordInput) => {
  if (!options.email.includes("@")) {
    return [
      {
        field: "email",
        message: "Invalid email",
      },
    ];
  }

  if (options.username.length <= 2) {
    return [
      {
        field: "username",
        message: "Username must be greater than 2 characthers",
      },
    ];
  }

  if (options.username.includes("@")) {
    return [{ field: "username", message: "Cannot include an @ symbol" }];
  }

  if (options.password.length <= 2) {
    return [
      {
        field: "password",
        message: "Password must be greater than 2 characthers",
      },
    ];
  }

  return null;
};
