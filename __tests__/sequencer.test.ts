import { connect } from "../src/db";
import { MongoClient } from "mongodb";
import { createEmployee, updateEmployee } from "../utils/employees/employeeDao";
import { employeeModule } from "../utils/employees/mockEmployeeModule.mock";
import { login } from "../utils/users/userDao";
import { userModules } from "../utils/users/mockUserModule.mock";
import { userRouter } from "../utils/users/userRouter";
import { myExamServer } from "../src/app";

export const examTestapp = myExamServer();

describe("Testing backend started ...", () => {
  let db: MongoClient;

  //before All we should create the connection to the real data base
  beforeAll(async () => {
    db = await connect("exam");
  });

  afterEach(() => {
    //examTestapp.close()
  });

  //we do not want to keep the connection so we need to be sure that we close
  //the connection once we finish
  afterAll((done) => {
    db.close();
    done();
  });

  describe("Mocking user interfaces and testing modules", userModules);

  describe("Mocking employee interfaces and testing modules", employeeModule);

  describe("testing user route POST /api/auth", userRouter);

  describe("to test the login with password", login);

  describe("to test the employee insertion ", createEmployee);

  describe("to test the update of the created employee", updateEmployee);
});
