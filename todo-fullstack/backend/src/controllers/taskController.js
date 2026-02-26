/** @format */
import Task from "../models/task.js";

// READ ALL TASK
const getAllTask = async (req, res, next) => {
	try {
		const tasks = await Task.find().sort({ createdAt: 1 });
		res.status(200).json(tasks);
	} catch (err) {
		next(err);
	}
};

// ADD TASK
const createTask = async (req, res, next) => {
	try {
		const { task } = req.body;
		if (!task) {
			return res.status(400).json({
				error: "Missing task field",
			});
		}
		const data = await Task.create({
			task,
		});
		res.status(201).json({
			status: "Success",
			message: "Task added",
			data,
		});
	} catch (err) {
		next(err); // looks for next middleware in this case its next error middleware
	}
};

// UPDATE STATUS
const toggleTaskStatus = async (req, res, next) => {
	try {
		const { id } = req.params;
		const task = await Task.findById(id);
		if (!task) {
			return res.status(404).json({
				error: "Task not found",
			});
		}
		task.taskStatus = !task.taskStatus;
		await task.save();        // USE await when DB result matters
		return res.status(200).json({   // we can add return or not yet there is no code to execute below so function finishs it
			status: "Success",
			message: "Task Status changed",
			data: task,
		});
	} catch (err) {
		next(err);
	}
};

//DELETE TASK
const deleteTask = async (req, res, next) => {
	try {
		const id = req.params.id;
		const task = await Task.findById(id);
		if (!task) {
			return res.status(404).json({
				error: "Task not found",
			});
		}
		await Task.findByIdAndDelete(id);
		res.status(201).json({
			status: "Success",
			message: "Task Deleted Successfully",
			task,
		});
	} catch (err) {
		next(err);
	}
};

export { createTask, getAllTask, deleteTask, toggleTaskStatus };
