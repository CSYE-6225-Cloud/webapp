import { Router } from "express";
import * as userController from "../controllers/userController.js";

const router = Router();

router.post("/user", userController.createUser);
router.get("/user/self", userController.authorizeAndGetUser);
router.put("/user/self", userController.updateUser);

export default router;
