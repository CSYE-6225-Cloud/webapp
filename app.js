import express from "express";
import { config } from "dotenv";
import router from "./routes/index.js";


config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((request, response, next) => {
  response.set("Cache-Control", "no-cache, no-store, must-revalidate");
  response.set("X-Content-Type-Options", "nosniff");
  next();
});

router(app);

app.listen(port, function () {
  console.log(`App is listening on port :${port}!`);
});
