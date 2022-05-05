/* istanbul ignore file */
import { EmployeeDaoInterface } from "../../src/api/employees/dao";
import { EmployeeDao } from "../../src/api/employees/dao";
import { Employee } from "../../src/api/employees/employee";
import { ObjectId } from "mongodb";

let insertedId: ObjectId;
let employeeDao: EmployeeDaoInterface = new EmployeeDao();

export const createEmployee = () => {
  it("should create an empty employee in the db", async () => {
    insertedId = await employeeDao.insertEmployee();
    expect(insertedId).toBeTruthy();
  });
};

export const updateEmployee = () => {
  it(`should update the employee `, async () => {
    //creating new employee to be passed to the dao

    await employeeDao.updateEmployee({
      _id: insertedId,
      username: "simon",
      email: "simon@gmail.com",
      name: "Simon",
      surname: "Henry",
      phoneNumber: "+123456789",
      address: "67 Blvd Liberty",
      title: "CTO",
    });
    const updatedUser = await employeeDao.getEmployee(insertedId);
    expect(updatedUser._id).toStrictEqual(insertedId);
    expect(updatedUser.email).toBe("simon@gmail.com");
  });
};
