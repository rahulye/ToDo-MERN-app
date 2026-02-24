/** @format */

import express from "express";
import { config } from "dotenv";
config({ quiet: true });
const app = express();
import Task from "./models/task.js";
import { connectDB, disconnectDB } from "./config/db.js";

//ROUTES
app.get("/", async (req, res) => {
	const task = await Task.create({ task: "hey" });
	res.json({ message: task });
});

// START SERVER & CONNECT DB
const PORT = process.env.PORT || 5001;
const server = app.listen(PORT, async () => {
	console.log("Server starts....");
	console.log(`Server running at http://localhost:${PORT}`);
	await connectDB();
});

// SHUTDOWN SERVER and DB 
const gracefulShutdown = async (signal, err) => {
	if (err) console.error(signal, err);

	console.log(`${signal} received`);
	console.log("Shutting down server...");
	
	server.close(async () => {
		try {
			await disconnectDB();
			console.log("DB disconnected");
			console.log("Server shutdown completed");
			process.exit(0);
		} catch (error) {
			console.error("Shutdown failed", error);
			process.exit(1);
		}
	});
};
// OS signals
process.on("SIGINT", gracefulShutdown);  // here shutdownDB is a callback()
process.on("SIGTERM", gracefulShutdown);  //doorbell.on("ring", openDoor);
// Runtime errors
process.on("unhandledRejection", (err) =>
	gracefulShutdown("unhandledRejection", err)
);
process.on("uncaughtException", (err) =>
	gracefulShutdown("uncaughtException", err)
);