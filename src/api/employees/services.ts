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
import { EmployeeInterface } from "./employee";
import { EmployeeDaoInterface } from "./dao";
import { ObjectId } from "mongodb";

export interface EmployeeServiceInterface {
  getEmployees(): Promise<EmployeeInterface[]>;
  getEmployee(userId: ObjectId): Promise<EmployeeInterface>;
  insertEmployee(): Promise<ObjectId>;
  updateEmployee(employee: EmployeeInterface): Promise<void>;
  deleteEmployee(userId: ObjectId): Promise<boolean>;
}

export class EmployeeService implements EmployeeServiceInterface {
  private dao: EmployeeDaoInterface;
  constructor(dao: EmployeeDaoInterface) {
    this.dao = dao;
  }

  async getEmployees() {
    return this.dao.getEmployees();
  }

  async getEmployee(userId: ObjectId) {
    return this.dao.getEmployee(userId);
  }

  async insertEmployee() {
    const insertedId = await this.dao.insertEmployee();
    return insertedId;
  }

  async updateEmployee(employee: any) {
    await this.dao.updateEmployee(employee);
    return;
  }

  async deleteEmployee(userId: ObjectId) {
    return await this.dao.deleteEmployee(userId);
  }
}
