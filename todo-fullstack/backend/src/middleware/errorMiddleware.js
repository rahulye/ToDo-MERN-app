/** @format */

const errorMiddleware = async (err, req, res, next) => {	//In Express, error middleware MUST have 4 parameters:
	console.error(err);
	res.status(err.statusCode || 500).json({
		status: "error",
		message: err.message || "Internal Server Error",
	});
};

export default errorMiddleware;
