import { EmployeeDaoInterface } from "../../src/api/employees/dao";
import { EmployeeDao } from "../../src/api/employees/dao";
import { connect } from "../../src/db";
import { Employee } from "../../src/api/employees/employee";
import { MongoClient, ObjectId } from "mongodb";

let insertedId: ObjectId;
let employeeDao: EmployeeDaoInterface = new EmployeeDao();

export const createEmployee = () => {
  it("should create an empty employee in the db", async () => {
    insertedId = await employeeDao.insertEmployee();
    expect(insertedId).toBeTruthy();
  });
};

export const updateEmployee = () => {
  it(`should update the employee with this id ${insertedId}`, async () => {
    const myEmployee = Employee(
      "simon",
      "simon@gmail.com",
      "Simon",
      "Henry",
      "+123456789",
      "67 Blvd Liberty",
      "CTO"
    );

    await employeeDao.updateEmployee(myEmployee);
    const updatedUser = await employeeDao.getEmployee(insertedId);
    //expect(updatedUser._id).toStrictEqual(insertedId);
    expect(updatedUser.email).toBe("simon@gmail.com");
  });
};
