import express, { json } from "express";
import morgan from "morgan";
// import router
import { router } from "./router.js";

const app = express();

// MIDDLEWARE
app.use(morgan("tiny"));
app.use(json());

// ROUTER
app.use("/api", router);

export default app;
