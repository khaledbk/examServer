/**
 *
 * Employee Module
 *
 */
import { EmployeeDao } from "@/api/employee/dao";
import {
  EmployeeService,
  EmployeeServiceInterface,
} from "@/api/employee/services";

//Module Interface
export interface EmployeeModuleInterface {
  userService: EmployeeServiceInterface; //Employee Services
}

export const userDao = new EmployeeDao();
export const userService = new EmployeeService(userDao);

export const EmployeeModule: EmployeeModuleInterface = {
  userService,
};
