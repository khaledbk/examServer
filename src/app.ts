import express from "express";
import { employeeRouter } from "@/api/employee/routers";
import { EmployeeModule, EmployeeModuleInterface } from "@/api/employee";
import { connect } from "@/db";

export const myExamServer = (employeeModule: EmployeeModuleInterface) => {
  const app = express();
  app.use(express.json());
  //Routes
  const employeeRouterInstance = employeeRouter(employeeModule.employeeService);
  app.use(employeeRouterInstance);

  return app;
};

connect("exam");
const port = 3000; //should comes from the .env file
const app = myExamServer(EmployeeModule);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
