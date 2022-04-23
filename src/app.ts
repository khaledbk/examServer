import express from "express";
import { userRouter } from "./api/users/routers";
import { UserModule, UserModuleInterface } from "./api/users";
import { connect } from "./db";

export const myExamServer = (userModule: UserModuleInterface) => {
  const app = express();
  app.use(express.json());
  //Routes
  const userRouterInstance = userRouter(userModule.userService);
  app.use(userRouterInstance);

  return app;
};

connect("exam");
const port = 3000; //should comes from the .env file
const app = myExamServer(UserModule);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
