import express, { json } from "express";
import morgan from "morgan";
import { Connect } from "./db.js";
// import router
import { router } from "./routes.js";

const app = express();
const port = process.env.PORT || 3009;

// MIDDLEWARE
app.use(morgan("tiny"));
app.use(json());

// ROUTER
app.use("/api", router);

// connect to database
Connect();

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
