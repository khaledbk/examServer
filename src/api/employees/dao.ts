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
  insertEmployee(): Promise<ObjectId>;
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
    await db.collection<EmployeeInterface>("users").updateOne(
      {
        _id: new ObjectId(employee?._id),
      },
      {
        $set: employee,
      }
    );
    return;
  }

  async deleteEmployee(userId: ObjectId): Promise<boolean> {
    return db
      .collection<EmployeeDaoInterface>("users")
      .deleteMany({
        _id: {
          $in: [],
        },
      })
      .then((res) => true)
      .catch((e) => {
        console.log("[ERROR - DELETION USER(S)]", e);
        throw new Error("Cannot delete user(s)");
      });
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
      .findOne({ _id: userId })
      .then((res: EmployeeInterface) => res);
  }
}
