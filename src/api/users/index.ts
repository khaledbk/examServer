/**
 *
 * User Module
 *
 */
import { UserDao } from "./dao";
import { UserService, UserServiceInterface } from "./services";

//Module Interface
export interface UserModuleInterface {
  userService: UserServiceInterface; //User Services
}

export const userDao = new UserDao();
export const userService = new UserService(userDao);

export const UserModule: UserModuleInterface = {
  userService,
};
