import { EmployeeDaoInterface } from "../../src/api/employees/dao";
import { EmployeeDao } from "../../src/api/employees/dao";
import { connect } from "../../src/db";
import { Employee } from "../../src/api/employees/employee";
import { MongoClient, ObjectId } from "mongodb";
import { createEmployee, updateEmployee } from "./employeeDao";

describe("Testing Data Access Object for employees", () => {
  let db: MongoClient;

  //before All we should create the connection to the real data base
  beforeAll(async () => {
    db = await connect("exam");
  });

  //we do not want to keep the connection so we need to be sure that we close
  //the connection once we finish
  afterAll(async () => {
    await db.close();
  });

  describe("to test the employee insertion ", createEmployee);

  describe("to test the update of the created employee", updateEmployee);
});
