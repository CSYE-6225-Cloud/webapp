import express from "express";
import { config } from "dotenv";
import healthzRoute from "./routes/healthz.js";
config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", healthzRoute);

app.listen(port, function () {
  console.log(`App is listening on port :${port}!`);
});
