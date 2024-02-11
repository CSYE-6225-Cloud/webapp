import { app } from "../app.js";
import { config } from "dotenv";
config();

const port = process.env.PORT;

const server = app.listen(port, function () {
  console.log(`App is listening on port :${port}!`);
});

export default server;
