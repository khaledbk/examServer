/**
 * Data Access Object
 *
 * Where all native calls to the mongodb driver triggered
 *
 * @class UserDao
 *
 * @method loginWithPassword:
 *
 * @method loginWithToken:
 *
 * @method loginWithGoole:
 *
 * @method me:
 *
 */
import { ObjectId } from "mongodb";
import { db } from "../../db";
import { LoginInterface, UserInterface } from "./user";

export interface UserDaoInterface {
  loginWithPassword(auth: LoginInterface): Promise<UserInterface>; // action to log in
  loginWithToken(auth: LoginInterface): Promise<UserInterface>; // for refresh purposes
  loginWithGoole(auth: LoginInterface): Promise<UserInterface>; // to log in using google provider
  me(auth: LoginInterface): Promise<UserInterface>; //get the current user data
}

export class UserDao implements UserDaoInterface {
  async loginWithPassword(auth: LoginInterface): Promise<UserInterface> {
    // get the password has it compare it and return the result
    const login = await db
      .collection<UserInterface>("users")
      .findOne({ email: auth.username });
    return login;
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
