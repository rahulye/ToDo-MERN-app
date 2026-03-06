/** @format */

import express from "express";
import { register, login, logout, getMe } from "../controllers/authController.js";
import authmiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/me",authmiddleware,getMe);
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

export default router;
