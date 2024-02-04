import { Router } from "express";
import * as userController from "../controllers/userController.js";

const router = Router();

router.post("/user", userController.createUser);

export default router;
