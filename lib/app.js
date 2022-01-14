import express, { json, urlencoded } from "express";
import morgan from "morgan";
import helmet from "helmet";
// import router
import { router } from "./router.js";

const app = express();

// MIDDLEWARE
app.use(morgan("tiny"));
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(helmet());

// ROUTER
app.use("/api", router);

export default app;
