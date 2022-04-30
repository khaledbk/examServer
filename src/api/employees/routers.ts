/**
 *
 * Employee Routers
 *
 */

import { Router } from "express";
import { EmployeeServiceInterface } from "./services";
import { Employee } from "./employee";
import { ObjectId } from "mongodb";

export const employeesRouter = (
  service: EmployeeServiceInterface //queries
): Router => {
  //create the router instance
  const router = Router();

  //get
  router.get("/api/employees", async (req, res) => {
    try {
      //request
      const employees = await service.getEmployees();
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
      const employee = {
        _id: new ObjectId(),
        username: "",
        email: "",
        name: "",
        surname: "",
        address: "",
        title: "",
        phoneNumber: "",
      }; // comes from the req

      await service.updateEmployee(employee);
      res.json(employee);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  router.post("/api/deleteEmployee:employeeId", async (req, res) => {
    //delete a employee into db
    try {
      const employeeId = new ObjectId(); // comes from the req

      const result = await service.deleteEmployee(employeeId);
      res.json(result);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  //post
  router.post("/api/insertEmployee", async (req, res) => {
    try {
      //request
      //this data should come from the request body
      const insertedEmployee = Employee(
        "username",
        "email",
        "khaled",
        "benkhaled",
        "819-328-2743",
        "46 Rue Bedard",
        "F S W D"
      );
      //await dao.insertEmployee(insertedEmployee);
      await service.insertEmployee(insertedEmployee);

      const employee = await service.getEmployee(insertedEmployee._id);
      //to return the inserted Employee object
      res.json(employee);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  return router;
};
