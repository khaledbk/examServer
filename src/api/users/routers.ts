/**
 *
 * User Routers
 *
 */
import { Router } from "express";
import { UserServiceInterface } from "./services";
import { Provider, User } from "./user";
import get from "lodash/get";
export const usersRouter = (
  service: UserServiceInterface //queries
): Router => {
  //create the router instance
  const router = Router();

  //get
  router.post("/api/auth", async (req, res) => {
    try {
      //request
      const credentials = get(req, "body.data.auth", {
        username: "",
        provider: {
          provider: Provider.PASSWORD,
          data: "",
        },
      });
      switch (credentials.provider.provider) {
        case Provider.PASSWORD:
          let userPassword = await service.loginWithPassword(credentials);
          res.json(userPassword);
          return;
        case Provider.TOKEN:
          let userToken = await service.loginWithToken(credentials);
          res.json(userToken);
          return;
        case Provider.GOOGLE:
          let userGoogle = await service.loginWithGoogle(credentials);
          res.json(userGoogle);
          return;
        default:
          console.log("[ERROR]: No Provider to login");
          return;
      }
      //const users = await service.loginWithPassword();
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  // router.get("/user:userId", async (req, res) => {
  //   //get one user with userId as params
  //   try {
  //     //request
  //     const userId = new ObjectId(); // to get userId from request
  //     const user = await service.getUser(userId);
  //     res.json(user);
  //   } catch (e) {
  //     res.status(500).json({ error: e.message });
  //   }
  // });

  // router.post("/updateUser", async (req, res) => {
  //   //update a user into db
  //   try {
  //     const user = {
  //       _id: new ObjectId(),
  //       username: "",
  //       email: "",
  //       credentials: {
  //         hash: "",
  //         lastLogin: new Date(),
  //         isAdmin: true,
  //         loginToken: "",
  //         googleToken: "",
  //       },
  //       name: "",
  //       surname: "",
  //       address: "",
  //       title: "",
  //       phoneNumber: "",
  //     }; // comes from the req

  //     await service.updateUser(user);
  //     res.json(user);
  //   } catch (e) {
  //     res.status(500).json({ error: e.message });
  //   }
  // });

  // router.post("/deleteUser:userId", async (req, res) => {
  //   //delete a user into db
  //   try {
  //     const userId = new ObjectId(); // comes from the req

  //     const result = await service.deleteUser(userId);
  //     res.json(result);
  //   } catch (e) {
  //     res.status(500).json({ error: e.message });
  //   }
  // });

  // //post
  // router.post("/insertUser", async (req, res) => {
  //   try {
  //     //request
  //     //this data should come from the request body
  //     const insertedUser = User(
  //       "username",
  //       "email",
  //       {
  //         hash: "",
  //         lastLogin: new Date(),
  //         isAdmin: true,
  //         loginToken: "",
  //         googleToken: "",
  //       },
  //       "khaled",
  //       "benkhaled",
  //       "819-328-2743",
  //       "46 Rue Bedard",
  //       "F S W D"
  //     );
  //     //await dao.insertUser(insertedUser);
  //     await service.insertUser(insertedUser);

  //     const user = await service.getUser(insertedUser._id);
  //     //to return the inserted User object
  //     res.json(user);
  //   } catch (e) {
  //     res.status(500).json({ error: e.message });
  //   }
  // });

  return router;
};
