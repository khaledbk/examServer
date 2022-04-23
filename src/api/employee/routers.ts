/**
 *
 * Employee Routers
 *
 */

import { Router } from "express";
import { EmployeeServiceInterface } from "./services";
//import { EmployeeDaoInterface } from "./dao";
import { Employee } from "./employee";

export const userRouter = (
  service: EmployeeServiceInterface //queries
) => {
  //create the router instance
  const router = Router();

  //get
  router.get("/users", async (req, res) => {
    try {
      //request
      const users = await service.getEmployees();
      res.json(users);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  router.get("/employee:userId", async (req, res) => {
    //get one employee with userId as params
    try {
      //request
      const userId = ""; // to get userId from request
      const employee = await service.getEmployee(userId);
      res.json(employee);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  router.post("/updateEmployee", async (req, res) => {
    //update a employee into db
  });

  router.post("/deleteEmployee:userId", async (req, res) => {
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
