/** @format */

import jwt from "jsonwebtoken";

const generateToken = (userId, res) => {
	const payload = userId;
	const token = jwt.sign({ payload }, process.env.JWT_SECRETKEY, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});

	res.cookie("jwt", token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: true,
		maxAge: 1000 * 60 * 60 * 24 * 1,
	});

	return token;
};

export default generateToken;
