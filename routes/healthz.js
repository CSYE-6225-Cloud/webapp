import { Router } from "express";
import * as healthzController from "../controllers/healthzController.js";

const router = Router();

router.head("/healthz", healthzController.healthzHeadOptions);
router.get("/healthz", healthzController.healthzGet);
router.all("/healthz", healthzController.heathzAllMethods);

export default router;
