import express from "express";
const router = express.Router();

import * as healthzController from "../controllers/healthzController.js";

router
  .route("/")
  .head(healthzController.healthzHeadOptions)
  .get(healthzController.healthzGet)
  .all(healthzController.heathzAllMethods);

router.route("*").all(healthzController.heathzOtherRoutes);

export default router;
