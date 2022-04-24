import { employeesRouter } from "../api/employees/routers";
import { usersRouter } from "../api/users/routers";
import { EmployeeModule } from "../api/employees";
import { UserModule } from "../api/users";

const employeesRouterInstance = employeesRouter(EmployeeModule.employeeService);

const usersRouterInstance = usersRouter(UserModule.userService);

export const routes = [employeesRouterInstance, usersRouterInstance];
