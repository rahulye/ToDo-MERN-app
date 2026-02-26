/** @format */

const errorMiddleware = (err, req, res, next) => {
	//In Express, error middleware MUST have 4 parameters:
	console.error(err);

	let statusCode = err.statusCode || 500;
	let message = err.message || "Internal Server Error";

	if (err.name === "CastError") {
		statusCode = 400;
		message = "Invalid ID format";
	}

	if (err.name === "CastError") {
		statusCode = 400;
		message = "Invalid ID format";
	}

	res.status(statusCode).json({
		status: "Error",
		message,
	});
};

export default errorMiddleware;
