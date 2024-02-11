import express from "express";
import { config } from "dotenv";
import router from "./routes/index.js";
import { syncDb } from "./modules/user.js";

config();
syncDb();
export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((request, response, next) => {
  response.set("Cache-Control", "no-cache, no-store, must-revalidate");
  response.set("X-Content-Type-Options", "nosniff");
  next();
});

router(app);
