import app from "./app.js";
import { Connect } from "../config/db.js";

const port = process.env.PORT || 3009;

// connect to database
Connect();

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
