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
    collection : "taskList"
  }
);

export default mongoose.model( "Task" , taskSchema);