import { EmployeeServiceInterface } from "@/api/employees/services";
import { EmployeeDaoInterface } from "@/api/employees/dao";
import { EmployeeModuleInterface } from "@/api/employees";

export const mockEmployeeService: EmployeeServiceInterface = {
  getEmployee: jest.fn(),
  getEmployees: jest.fn(),
  insertEmployee: jest.fn(),
  updateEmployee: jest.fn(),
  deleteEmployee: jest.fn(),
};

export const mockDao: EmployeeDaoInterface = {
  getEmployee: jest.fn(),
  getEmployees: jest.fn(),
  insertEmployee: jest.fn(),
  updateEmployee: jest.fn(),
  deleteEmployee: jest.fn(),
};

export const mockEmployeeModule: EmployeeModuleInterface = {
  employeeService: mockEmployeeService,
};

export const employeeModule = () => {
  it("should mock the employee services and data access objects", () => {
    expect(mockEmployeeService).toBeDefined;
    expect(mockDao).toBeDefined;
    expect(mockEmployeeModule).toBeDefined;
  });
};
