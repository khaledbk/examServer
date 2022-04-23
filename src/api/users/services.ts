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
import { UserInterface } from "./user";
import { UserDaoInterface } from "./dao";

export interface UserServiceInterface {
  getUsers(): Promise<UserInterface[]>;
  getUser(userId: string): Promise<UserInterface>;
  insertUser(user: UserInterface): Promise<void>;
  updateUser(user: UserInterface): Promise<void>;
  deleteUser(userId: string): Promise<boolean>;
}

export class UserService implements UserServiceInterface {
  private dao: UserDaoInterface;
  constructor(dao: UserDaoInterface) {
    this.dao = dao;
  }

  async getUsers() {
    return this.dao.getUsers();
  }

  async getUser(userId: string) {
    return this.dao.getUser(userId);
  }

  async insertUser(user: any) {
    await this.dao.insertUser(user);
    return;
  }

  async updateUser(user: any) {
    await this.dao.insertUser(user);
    return;
  }

  async deleteUser(userId: string) {
    return await this.dao.deleteUser(userId);
  }
}
