/**
 * Employee Provided Services
 *
 * Those services helps to isolate the db calls
 *
 * @class EmployeeService
 *
 * @method getEmployees :
 *
 * @method getEmployee :
 *
 * @method insertEmployee :
 *
 * @method updateEmployee :
 *
 * @method deleteEmployee :
 *
 *
 */
import { EmployeeInterface } from "@/api/employee/employee";
import { EmployeeDaoInterface } from "@/api/employee/dao";

export interface EmployeeServiceInterface {
  getEmployees(): Promise<EmployeeInterface[]>;
  getEmployee(userId: string): Promise<EmployeeInterface>;
  insertEmployee(employee: EmployeeInterface): Promise<void>;
  updateEmployee(employee: EmployeeInterface): Promise<void>;
  deleteEmployee(userId: string): Promise<boolean>;
}

export class EmployeeService implements EmployeeServiceInterface {
  private dao: EmployeeDaoInterface;
  constructor(dao: EmployeeDaoInterface) {
    this.dao = dao;
  }

  async getEmployees() {
    return this.dao.getEmployees();
  }

  async getEmployee(userId: string) {
    return this.dao.getEmployee(userId);
  }

  async insertEmployee(employee: any) {
    await this.dao.insertEmployee(employee);
    return;
  }

  async updateEmployee(employee: any) {
    await this.dao.insertEmployee(employee);
    return;
  }

  async deleteEmployee(userId: string) {
    return await this.dao.deleteEmployee(userId);
  }
}
