/** @format */

import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
	{
		task: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	},
	{
		collection: "taskList",
	},
);

const Task = mongoose.model("Task", taskSchema);
export default Task;
