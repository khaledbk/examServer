/**
 *
 * Employee Routers
 *
 */

import { Router } from "express";
import { EmployeeServiceInterface } from "./services";
import { EmployeeInterface } from "./employee";
import { ObjectId } from "mongodb";
import get from "lodash/get";

export const employeesRouter = (
  service: EmployeeServiceInterface //queries
): Router => {
  //create the router instance
  const router = Router();

  //get
  router.post("/api/employees", async (req, res) => {
    try {
      //request
      const filter = req.body?.filter;
      const employees = await service.getEmployees(filter);
      res.json(employees);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  router.get("/api/employee/:id", async (req, res) => {
    //get one employee with employeeId as params
    try {
      //request
      const employeeId = new ObjectId(req.params.id); // to get employeeId from request
      const employee = await service.getEmployee(employeeId);
      res.json(employee);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  router.post("/api/updateEmployee", async (req, res) => {
    //update a employee into db
    try {
      const employee: EmployeeInterface = req.body; // comes from the req

      await service.updateEmployee(employee);
      res.json(employee);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  router.post("/api/deleteEmployee", async (req, res) => {
    //delete a employee into db
    try {
      const employeeId = get(req.body, "employeeId", ""); // comes from the req
      const result = await service.deleteEmployee(new ObjectId(employeeId));
      res.json(result);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  //get
  router.get("/api/insertEmployee", async (req, res) => {
    try {
      //request
      //this data should come from the request body

      //await dao.insertEmployee(insertedEmployee);
      const employeeId = await service.insertEmployee();

      //const employee = await service.getEmployee(employeeId);
      //to return the inserted Employee object
      res.json(employeeId);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  return router;
};
