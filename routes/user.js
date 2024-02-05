import * as userController from "../controllers/userController.js";
import express from "express";
const router = express.Router();

router.route("/").post(userController.createUser);

router
  .route("/self")
  .get(userController.authorizeAndGetUser)
  .put(userController.updateUser);

router.route("*").all(userController.userOtherRoutes);

export default router;
