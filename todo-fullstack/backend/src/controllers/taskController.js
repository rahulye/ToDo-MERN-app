/** @format */
import Task from "../models/task.js";

// READ ALL TASK
const getAllTask = async (req, res , next) => {
  try {
    const tasks = await Task.find().sort({createdAt : 1});
		res.status(200).json(tasks);
  } catch (err) {
    next(err)
  }
};


// ADD TASK
const createTask = async (req, res , next) => {
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

export { createTask, getAllTask };
