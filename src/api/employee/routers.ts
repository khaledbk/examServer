/**
 *
 * Employee Routers
 *
 */

import { Router } from "express";
import { EmployeeServiceInterface } from "./services";
//import { EmployeeDaoInterface } from "./dao";
import { Employee } from "./employee";

export const employeeRouter = (
  service: EmployeeServiceInterface //queries
) => {
  //create the router instance
  const router = Router();

  //get
  router.get("/employees", async (req, res) => {
    try {
      //request
      const employees = await service.getEmployees();
      res.json(employees);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  router.get("/employee:employeeId", async (req, res) => {
    //get one employee with employeeId as params
    try {
      //request
      const employeeId = ""; // to get employeeId from request
      const employee = await service.getEmployee(employeeId);
      res.json(employee);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  router.post("/updateEmployee", async (req, res) => {
    //update a employee into db
  });

  router.post("/deleteEmployee:employeeId", async (req, res) => {
    //delete a employee into db
  });

  //post
  router.post("/insertEmployee", async (req, res) => {
    try {
      //request
      const insertedEmployee = Employee(
        "khaled",
        "benkhaled",
        "819-328-2743",
        "46 Rue Bedard",
        "F S W D"
      );
      //await dao.insertEmployee(insertedEmployee);
      await service.insertEmployee(insertedEmployee);

      const employee = await service.getEmployee(insertedEmployee._id);
      res.json(employee);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  return router;
};
