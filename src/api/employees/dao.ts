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
import { ObjectId, UpdateResult } from "mongodb";
import { createFilter } from "../../utils/createFilter";
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
  insertEmployee(): Promise<ObjectId>;
  updateEmployee(employee: EmployeeInterface): Promise<void>;
  deleteEmployee(userId: ObjectId): Promise<boolean>;
  getEmployees(filter: any): Promise<EmployeeInterface[]>;
  getEmployee(userId: ObjectId): Promise<EmployeeInterface>;
}

export class EmployeeDao implements EmployeeDaoInterface {
  async insertEmployee(): Promise<ObjectId> {
    return db
      .collection("users")
      .insertOne({
        name: "",
        surname: "",
        title: "",
        phoneNumber: "",
        address: "",
        email: "",
        username: "",
        credentials: {
          hash: "",
          isAdmin: false,
          loginToken: "",
          googleToken: "",
          createdAt: new Date(),
        },
      })
      .then(({ insertedId }) => {
        return insertedId;
      });
  }

  async updateEmployee(employee: EmployeeInterface): Promise<void> {
    db.collection<EmployeeInterface>("users")
      .updateOne(
        {
          _id: new ObjectId(employee?._id),
        },
        {
          $set: {
            name: employee?.name,
            surname: employee?.surname,
            address: employee?.address,
            phoneNumber: employee?.phoneNumber,
            title: employee?.title,
            email: employee?.email,
            username: employee?.username,
          },
        }
      )
      .then((res: UpdateResult) => {})
      .catch((e: any) => {
        throw new Error("[ERROR]: Cannot update employee");
      });
    return;
  }

  async deleteEmployee(userId: ObjectId): Promise<boolean> {
    return db
      .collection<EmployeeDaoInterface>("users")
      .deleteMany({
        _id: {
          $eq: userId,
        },
      })
      .then((res) => true)
      .catch((e) => {
        console.log("[ERROR - DELETION USER(S)]", e);
        throw new Error("Cannot delete user(s)");
      });
  }

  async getEmployees({ query }: any): Promise<EmployeeInterface[]> {
    const filter = createFilter(query);
    return await db
      .collection<EmployeeInterface>("users")
      .aggregate([{ $match: filter }])
      .toArray()
      .then((res: EmployeeInterface[]) => res);
  }

  async getEmployee(userId: ObjectId): Promise<EmployeeInterface> {
    return await db
      .collection<EmployeeInterface>("users")
      .findOne({ _id: userId })
      .then((res: EmployeeInterface) => res);
  }
}
