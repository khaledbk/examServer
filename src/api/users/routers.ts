/**
 *
 * User Routers
 *
 */

import { Router } from "express";
import { UserServiceInterface } from "./services";
//import { UserDaoInterface } from "./dao";
import { User } from "./user";

export const userRouter = (
  service: UserServiceInterface //queries
) => {
  //create the router instance
  const router = Router();

  //get
  router.get("/users", async (req, res) => {
    try {
      //request
      const users = await service.getUsers();
      res.json(users);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  router.get("/user:userId", async (req, res) => {
    //get one user with userId as params
    try {
      //request
      const userId = ""; // to get userId from request
      const user = await service.getUser(userId);
      res.json(user);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  router.post("/updateUser", async (req, res) => {
    //update a user into db
  });

  router.post("/deleteUser:userId", async (req, res) => {
    //delete a user into db
  });

  //post
  router.post("/insertUser", async (req, res) => {
    try {
      //request
      const insertedUser = User(
        "khaled",
        "benkhaled",
        "819-328-2743",
        "46 Rue Bedard",
        "F S W D"
      );
      //await dao.insertUser(insertedUser);
      await service.insertUser(insertedUser);

      const user = await service.getUser(insertedUser._id);
      res.json(user);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  return router;
};
