import * as userController from "../controllers/userController.js";
import express from "express";
const router = express.Router();

router
  .route("/")
  .post(userController.createUser)
  .head(userController.userHeadOptions)
  .all(userController.userAllMethods);

router
  .route("/self")
  .get(userController.authorizeAndGetUser)
  .put(userController.updateUser)
  .head(userController.userHeadOptions)
  .all(userController.userAllMethods);

router.route("*").all(userController.userOtherRoutes);

export default router;
