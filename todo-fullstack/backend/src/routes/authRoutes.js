/** @format */

import express from "express";
import { register, login, logout, getMe } from "../controllers/authController.js";
import authmiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me",authmiddleware,getMe);

export default router;
