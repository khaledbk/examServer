/**
 * Data Access Object
 * Where all native calls to the mongodb driver triggered
 * @class UserDao
 * @method loginWithPassword:
 * @method loginWithToken:
 * @method loginWithGoole:
 * @method me:
 */
import { ObjectId } from "mongodb";
import { db } from "../../db";
import { LoginInterface, UserInterface } from "./user";
import { hashedPassword } from "../../utils/validatePassword";
import { signJwt } from "../../utils/jwt";
import assign from "lodash/assign";
export interface UserDaoInterface {
  loginWithPassword(auth: LoginInterface): Promise<UserInterface>; // action to log in
  loginWithToken(auth: LoginInterface): Promise<UserInterface>; // for refresh purposes
  loginWithGoole(auth: LoginInterface): Promise<UserInterface>; // to log in using google provider
  me(auth: LoginInterface): Promise<UserInterface>; //get the current user data
}

export class UserDao implements UserDaoInterface {
  async loginWithPassword(auth: LoginInterface): Promise<UserInterface> {
    // get the password has it compare it and return the result
    const {
      username,
      provider: { data }, // to gert the password from the request
    } = auth;

    //try to find the user with his username or his password
    const foundUser = await db.collection<UserInterface>("users").findOne({
      $or: [
        { email: { $regex: `^${username}$`, $options: "i" } },
        { username: { $regex: `^${username}$`, $options: "i" } },
      ],
    });

    if (!foundUser)
      throw new Error("[Error]: Invalid Username / Email ! Please try again!");

    if (foundUser?.credentials?.hash === hashedPassword(data)) {
      //to log the user in and generate token
      const token = signJwt({
        _id: foundUser?._id.toString(),
        email: foundUser?.email,
      });
      //update db with the new generated token
      await db.collection<UserInterface>("users").updateOne(
        { _id: foundUser?._id },
        {
          $set: {
            "credentials.loginToken": token,
          },
        }
      );
      //get and return the login signed user
      const signedUser = await db
        .collection<UserInterface>("users")
        .findOne({ _id: foundUser?._id });
      return signedUser;
    } else {
      throw new Error("[Error]: Invalid password! Please try again!");
    }
  }

  async loginWithToken(auth: LoginInterface): Promise<UserInterface> {
    // get the user then validate token then return data user
    return;
  }

  async loginWithGoole(auth: LoginInterface): Promise<UserInterface> {
    // validate the token from google oauth2 service
    //then look for the user and return user data result
    return;
  }

  async me(auth: LoginInterface): Promise<UserInterface> {
    return await db
      .collection<UserInterface>("users")
      .findOne({ _id: new ObjectId() })
      .then((res: UserInterface) => res);
  }
}
