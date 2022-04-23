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
  employeeService: EmployeeServiceInterface; //Employee Services
}

export const employeeDao = new EmployeeDao();
export const employeeService = new EmployeeService(employeeDao);

export const EmployeeModule: EmployeeModuleInterface = {
  employeeService,
};
