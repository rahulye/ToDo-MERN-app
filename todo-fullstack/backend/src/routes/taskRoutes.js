/** @format */

import express from "express";
import {
	createTask,
	getAllTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.get("/", getAllTask);
router.post("/", createTask);

export default router;