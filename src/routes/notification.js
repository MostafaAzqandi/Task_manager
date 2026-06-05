import express from "express";
import { authMiddleware, notificationAccessMiddleware } from "../middlewares/index.js";
import notificationController from "../controllers/notificationController.js";


const router = express.Router({mergeParams: true });

router.post("/:notificationId/read",
    authMiddleware,
    notificationAccessMiddleware,
    notificationController.read
);



export default router;