/** @format */

import mongoose from "mongoose";

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.DATABASE_URL);
		console.log("DB Connected");
	} catch (err) {
		console.error("DB is not connected ", err);
	}
};

const disconnectDB = async () => {
	try {
		await mongoose.disconnect();
	} catch (err) {
		console.error("DB is not disconnected", err);
	}
};

export { connectDB, disconnectDB };
