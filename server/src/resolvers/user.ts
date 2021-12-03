import { User } from "../entities/User";
import { MyContext } from "src/types";
import {
  Resolver,
  Mutation,
  Field,
  Arg,
  Ctx,
  ObjectType,
  Query,
  FieldResolver,
  Root,
} from "type-graphql";
import argon2 from "argon2";
import { COOKIE_NAME, FORGET_PASSWORD_PREFIX } from "../constants";
import { UsernamePasswordInput } from "./UsernamePasswordInput";
import { validateRegister } from "../utils/validateRegister";
import { sendEmail } from "../utils/sendEmail";
import { v4 } from "uuid";
import { getConnection, getRepository } from "typeorm";

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@ObjectType()
class SearchUserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => [User], { nullable: true })
  users?: User[];
}

@Resolver(User)
export class UserResolver {
  @FieldResolver(() => String)
  email(@Root() user: User, @Ctx() { req }: MyContext) {
    // This is the current user, show them their own email
    if (req.session.userId === user.id) {
      return user.email;
    }
    // Current user is not allowed to see other email
    return "";
  }

  @Mutation(() => UserResponse)
  async changePassword(
    @Arg("token") token: string,
    @Arg("newPassword") newPassword: string,
    @Ctx() { redis, req }: MyContext
  ): Promise<UserResponse> {
    const key = FORGET_PASSWORD_PREFIX + token;
    if (newPassword.length <= 2) {
      return {
        errors: [
          {
            field: "newPassword",
            message: "Password must be greater than 2 characthers",
          },
        ],
      };
    }

    const userId = await redis.get(key);
    if (!userId) {
      return {
        errors: [
          {
            field: "newPassword",
            message: "Token has expired",
          },
        ],
      };
    }
    const userIdNum = parseInt(userId);
    const user = await User.findOne(userIdNum);

    if (!user) {
      return {
        errors: [
          {
            field: "token",
            message: "User no longer exists",
          },
        ],
      };
    }

    const hashedPassword = await argon2.hash(newPassword);
    await User.update(
      { id: userIdNum },
      {
        password: hashedPassword,
      }
    );
    await redis.del(key);

    // login user after password
    req.session.userId = user.id;

    return { user };
  }

  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg("email") email: string,
    @Ctx() { redis }: MyContext
  ) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      // email does not exists
      return true;
    }
    const token = v4();
    const emailBody = `<a href="http://localhost:3000/change-password/${token}">Reset Password</a>`;

    await redis.set(
      FORGET_PASSWORD_PREFIX + token,
      user.id,
      "ex",
      1000 * 60 * 60 * 24 * 3
    ); // 3 days

    sendEmail(email, emailBody, "Forgot Password");

    return true;
  }

  @Query(() => User, { nullable: true })
  // Gets current user based on cookie session
  me(@Ctx() { req }: MyContext) {
    if (!req.session.userId) {
      // Your Not logged in
      return null;
    }

    return User.findOne(req.session.userId);
  }

  @Query(() => SearchUserResponse, { nullable: true })
  // Gets current user based on cookie session
  async getUsers(
    // @Ctx() { req }: MyContext,
    @Arg("searchTerm") searchTerm: String
  ) {
    let users: User[] = [];

    if (searchTerm.length < 2) {
      console.log("searchterm less than 2");
      return {
        errors: [
          {
            field: "Searchterm not long enough",
            message: "Searchterm must be greater than 2 characthers",
          },
        ],
      };
    }
    if (searchTerm.length > 2) {
      users = await getRepository(User)
        .createQueryBuilder("user")
        .where("user.username ILIKE :searchTerm", {
          searchTerm: `%${searchTerm}%`,
        })
        .getMany();
      console.log("users: ", users);

      return {
        users,
      };
    }

    return users;
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const errors = validateRegister(options);
    if (errors) {
      return { errors };
    }

    const hashedPassword = await argon2.hash(options.password);
    let user;
    try {
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
          username: options.username,
          email: options.email,
          password: hashedPassword,
        })
        .returning("*")
        .execute();
      user = result.raw[0];
    } catch (err) {
      if (err.code === "23505") {
        // err.detail.includes('already exists')
        // duplicated username error
        return {
          errors: [
            {
              field: "username",
              message: "username already taken",
            },
          ],
        };
      }
      console.log("Message: ", err.message);
    }
    // store user id session
    // auto login user after register
    // keeps them logged in
    req.session.userId = user.id;
    return { user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("usernameOrEmail") usernameOrEmail: string,
    @Arg("password") password: string,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const user = await User.findOne(
      usernameOrEmail.includes("@")
        ? { where: { email: usernameOrEmail } }
        : { where: { username: usernameOrEmail } }
    );
    if (!user) {
      return {
        errors: [
          {
            field: "usernameOrEmail",
            message: "Username dosen't exists",
          },
        ],
      };
    }
    const valid = await argon2.verify(user.password, password);
    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "Incorrect Password",
          },
        ],
      };
    }

    req.session.userId = user.id;

    return {
      user,
    };
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve) =>
      req.session.destroy((err) => {
        res.clearCookie(COOKIE_NAME);
        if (err) {
          console.log(err);
          resolve(false);
          return;
        }

        resolve(true);
      })
    );
  }
}
