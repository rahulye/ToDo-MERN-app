/** @format */

import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
import { connectDB, disconnectDB } from "./config/db.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config();

app.use(cookieParser());
app.use(
	cors({
		origin: [process.env.ALLOWED_FRONTEND_URL],
		methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
		credentials: true,
	}),
);

//to handle POST
app.use(express.json());

//ROUTES
import taskRoutes from "./routes/taskRoutes.js";
import authRoutes from "./routes/authRoutes.js";

//http://localhost:5001/tasks
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

//error middleware
app.use(errorMiddleware);

// START SERVER & CONNECT DB
const PORT = process.env.PORT || 5001;
const server = app.listen(PORT, async () => {
	console.log("Server starts....");
	console.log(`Server running at http://localhost:${PORT}`);
	await connectDB();
});

app.get("/", (req, res) => {
	res.send("API is running...");
});

// SHUTDOWN SERVER & DB
const gracefulShutdown = async (reason, err) => {
	if (err) console.error(reason, err);
	console.log(`${reason} received`);
	console.log("Shutting down Server...");
	server.close(async () => {
		try {
			console.log("DB Disconnected Successfully");
			console.log("Server Shutdown Completed");
			await disconnectDB();
			process.exit(0);
		} catch (error) {
			console.error("Shutdown failed", error);
			process.exit(1);
		}
	});
};
// OS signals
process.on("SIGINT", () => gracefulShutdown("SIGINT")); //doorbell.on("ring", openDoor);
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
// Runtime errors
process.on("unhandledRejection", (err) =>
	gracefulShutdown("unhandledRejection", err),
);
process.on("uncaughtException", (err) =>
	gracefulShutdown("uncaughtException", err),
);
