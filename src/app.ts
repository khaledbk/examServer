import express, { Router } from "express";
import { connect } from "./db";
import { routes } from "./routes";
import cors from "cors";

const CORS_ORIGIN = ["http://localhost:3000"];
//<Array <EmployeeModuleInterface |UserModuleInterface >>
export const myExamServer = () => {
  const app = express();
  app.use(
    cors({
      origin: CORS_ORIGIN,
      credentials: true,
    })
  );
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
  app.use(express.json());

  //Routes
  routes.forEach((route: Router) => {
    app.use(route);
  });

  return app;
};

connect("exam");
const port = 3001; //should comes from the .env file
const app = myExamServer();

app.listen(port, () => {
  // eslint-disable-next-line no-console
  return console.log(`Express is listening at http://localhost:${port}`);
});
