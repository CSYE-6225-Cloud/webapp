import express from "express";
import { config } from "dotenv";
import router from "./routes/index.js";

config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router(app);

app.listen(port, function () {
  console.log(`App is listening on port :${port}!`);
});
