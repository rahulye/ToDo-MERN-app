/** @format */

import express from "express";
import { config } from "dotenv";
config({ quiet: true });
const app = express();
import Task from "./models/Message.js";
import mongoose from "mongoose";

// DB CONNECTION
mongoose
	.connect(process.env.DATABASE_URL)
	.then(() => {
		console.log("DB Connected");
	})
	.catch((err) => console.log("DB not connected :" + err));

//ROUTES
app.get("/", async (req, res) => {
	const task = await Task.create({ task : "hey"})
  res.json({ message: task });
	console.log("hey");
});

// START SERVER
const PORT = process.env.PORT || 5001;
const server = app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
});
