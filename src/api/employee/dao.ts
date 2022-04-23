/**
 * Data Access Object
 *
 * Where all native calls to the mongodb driver triggered
 *
 * @class EmployeeDao
 *
 * @method insertEmployee:
 *
 * @method updateEmployee:
 *
 * @method deleteEmployee:
 *
 * @method getEmployees:
 *
 * @method getEmployee:
 *
 */
import { db } from "../../db";
import { EmployeeInterface } from "./employee";

export interface EmployeeDaoInterface {
  insertEmployee(employee: EmployeeInterface): Promise<void>;
  updateEmployee(employee: EmployeeInterface): Promise<void>;
  deleteEmployee(userId: string): Promise<boolean>;
  getEmployees(): Promise<EmployeeInterface[]>;
  getEmployee(userId: string): Promise<EmployeeInterface>;
}

export class EmployeeDao implements EmployeeDaoInterface {
  async insertEmployee(employee: EmployeeInterface): Promise<void> {
    await db.collection<EmployeeInterface>("users").insertOne(employee);
    return;
  }

  async updateEmployee(employee: EmployeeInterface): Promise<void> {
    return;
  }

  async deleteEmployee(userId: string): Promise<boolean> {
    return true;
  }

  async getEmployees(): Promise<EmployeeInterface[]> {
    return await db
      .collection<EmployeeInterface>("users")
      .find({})
      .toArray()
      .then((res: EmployeeInterface[]) => res);
  }

  async getEmployee(userId: string): Promise<EmployeeInterface> {
    return await db
      .collection<EmployeeInterface>("users")
      .findOne({ _id: "new object id mongo of userId" })
      .then((res: EmployeeInterface) => res);
  }
}
