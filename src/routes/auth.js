import express from "express";
import AuthController from "../controllers/authController.js";

const router = express.Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get("/register", AuthController.registerPage);
router.get("/login", AuthController.loginPage);
router.get("/logout", AuthController.logout);
export default router;
