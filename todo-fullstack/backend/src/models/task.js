/** @format */

import mongoose from "mongoose";

const taskSchema = new mongoose.Schema( //new mongoose.Schema(schemaDefinition, options) only two ({},{})
	{
		task: {
			type: String,
			required: true,
		},
		taskStatus: {
			type: Boolean,
			default: false,
			required: true,
		},
	},
	{
		collection: "tasks",
		timestamps: true,
	},
);

const Task = mongoose.model("Task", taskSchema);
export default Task;
