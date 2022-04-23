/**
 * Data Access Object
 *
 * Where all native calls to the mongodb driver triggered
 *
 * @class UserDao
 *
 * @method insertUser:
 *
 * @method updateUser:
 *
 * @method deleteUser:
 *
 * @method getUsers:
 *
 * @method getUser:
 *
 */
import { db } from "../../db";
import { UserInterface } from "./user";

export interface UserDaoInterface {
  insertUser(user: UserInterface): Promise<void>;
  updateUser(user: UserInterface): Promise<void>;
  deleteUser(userId: string): Promise<boolean>;
  getUsers(): Promise<UserInterface[]>;
  getUser(userId: string): Promise<UserInterface>;
}

export class UserDao implements UserDaoInterface {
  async insertUser(user: UserInterface): Promise<void> {
    await db.collection<UserInterface>("users").insertOne(user);
    return;
  }

  async updateUser(user: UserInterface): Promise<void> {}

  async deleteUser(userId: string): Promise<boolean> {
    return true;
  }

  async getUsers(): Promise<UserInterface[]> {
    return await db
      .collection<UserInterface>("users")
      .find({})
      .toArray()
      .then((res: UserInterface[]) => res);
  }

  async getUser(userId: string): Promise<UserInterface> {
    return await db
      .collection<UserInterface>("users")
      .findOne({ _id: "new object id mongo of userId" })
      .then((res: UserInterface) => res);
  }
}
