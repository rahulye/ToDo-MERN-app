/** @format */

import express from "express";
import {
	createTask,
	deleteAllTask,
	deleteTask,
	getAllTask,
	toggleTaskStatus,
} from "../controllers/taskController.js";
import authmiddleware from "../middleware/authMiddleware.js"

const router = express.Router();


router.use(authmiddleware);
router.get("/", getAllTask);
router.post("/", createTask);
router.delete("/clear",deleteAllTask)
router.delete("/:id", deleteTask);
router.patch("/:id", toggleTaskStatus);

export default router;
