/** @format */

import express from "express";
import {
	createTask,
	deleteTask,
	getAllTask,
	toggleTaskStatus,
} from "../controllers/taskController.js";

const router = express.Router();

router.get("/", getAllTask);
router.post("/", createTask);
router.delete("/:id", deleteTask);
router.patch("/:id", toggleTaskStatus);

export default router;
