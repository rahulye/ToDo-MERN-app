/** @format */
import User from "../models/auth.js";
import jwt from "jsonwebtoken";

const authmiddleware = async (req, res, next) => {
	try {
		let token;
		if (
			req.headers.authorization &&
			req.headers.authorization.startsWith("Bearer ")
		) {
			token = req.headers.authorization.split(" ")[1];
		} else if (req.cookies?.jwt) {
			token = req.cookies.jwt;
		}
		if (!token) {
			return res.status(401).json({
				status: "Error",
				message: "Invalid or expired token",
			});
		}

		if (!token || token === "null" || token === "undefined") {
			return res.status(401).json({
				status: "Error",
				message: "Not authorized",
			});
		}

		//decode user id

		const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);
		const user = await User.findById(decoded.id);
		if (!user) {
			return res.status(401).json({
				status: "Error",
				message: "User not found. Authorization failed",
			});
		}
		req.user = user;
		next();
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			status: "Error",
			message: "Server Error",
		});
	}
};

export default authmiddleware;
