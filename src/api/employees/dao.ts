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
import { ObjectId } from "mongodb";
import { db } from "../../db";
import { EmployeeInterface } from "./employee";

export enum Provider {
  PASSWORD = "password",
  GOOGLE = "google",
  TOKEN = "token",
}
export interface LoginProviderInterface {
  provider: Provider;
  data: string;
}
export interface LoginInterface {
  username: string;
  provider: LoginProviderInterface;
}

export interface EmployeeDaoInterface {
  insertEmployee(employee: EmployeeInterface): Promise<void>;
  updateEmployee(employee: EmployeeInterface): Promise<void>;
  deleteEmployee(userId: ObjectId): Promise<boolean>;
  getEmployees(): Promise<EmployeeInterface[]>;
  getEmployee(userId: ObjectId): Promise<EmployeeInterface>;
  // loginWithPassword(auth: LoginInterface):Promise <>;// action to log in
  // loginWithToken();
  // loginWithGoole();
  // me(); //get the current user data
}

export class EmployeeDao implements EmployeeDaoInterface {
  async insertEmployee(employee: EmployeeInterface): Promise<void> {
    await db.collection<EmployeeInterface>("users").insertOne(employee);
    return;
  }

  async updateEmployee(employee: EmployeeInterface): Promise<void> {
    return;
  }

  async deleteEmployee(userId: ObjectId): Promise<boolean> {
    return true;
  }

  async getEmployees(): Promise<EmployeeInterface[]> {
    return await db
      .collection<EmployeeInterface>("users")
      .find({
        "credentials.isAdmin": false,
      })
      .toArray()
      .then((res: EmployeeInterface[]) => res);
  }

  async getEmployee(userId: ObjectId): Promise<EmployeeInterface> {
    return await db
      .collection<EmployeeInterface>("users")
      .findOne({ _id: new ObjectId() })
      .then((res: EmployeeInterface) => res);
  }
}
