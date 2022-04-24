/**
 * User Provided Services
 *
 * Those services helps to isolate the db calls
 *
 * @class UserService
 *
 * @method getUsers :
 *
 * @method getUser :
 *
 * @method insertUser :
 *
 * @method updateUser :
 *
 * @method deleteUser :
 *
 *
 */
import { UserInterface, LoginInterface } from "./user";
import { UserDaoInterface } from "./dao";
import { ObjectId } from "mongodb";

export interface UserServiceInterface {
  loginWithPassword(auth: LoginInterface): Promise<UserInterface>; // action to log in
  loginWithToken(auth: LoginInterface): Promise<UserInterface>;
  loginWithGoogle(auth: LoginInterface): Promise<UserInterface>;
  me(auth: LoginInterface): Promise<UserInterface>; //get the current user data
}

export class UserService implements UserServiceInterface {
  private dao: UserDaoInterface;
  constructor(dao: UserDaoInterface) {
    this.dao = dao;
  }
  async loginWithPassword(auth: LoginInterface) {
    return this.dao.loginWithPassword(auth);
  }

  async loginWithToken(auth: LoginInterface) {
    return this.dao.loginWithToken(auth);
  }

  async loginWithGoogle(auth: LoginInterface) {
    return await this.dao.loginWithGoogle(auth);
  }

  async me(auth: LoginInterface) {
    return await this.dao.me(auth);
  }
}
