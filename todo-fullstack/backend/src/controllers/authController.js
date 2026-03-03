/** @format */

import User from "../models/auth.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

// REGISTER
const register = async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res.status(400).json({
				status: "Error",
				message: "Email and password are required",
			});
		}
		const userExist = await User.findOne({
			email,
		});

		if (userExist) {
			return res.status(400).json({
				status: "Error",
				message: "User already exist",
			});
		}

		const salt = await bcrypt.genSalt(10);
		const hashPassword = await bcrypt.hash(password, salt);

		const user = await User.create({
			email: email,
			password: hashPassword,
		});

		const token = generateToken(user._id, res);

		res.status(201).json({
			status: "Success",
			message: "Registered Successfully",
			data : {
				token
			}
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			status: "Error",
			message: "Server error",
		});
	}
};

// LOGIN
const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res.status(400).json({
				status: "Error",
				message: "Email and password are required",
			});
		}
		const userExist = await User.findOne({ email });
		if (!userExist) {
			return res.status(401).json({
				status: "Error",
				message: "User not founzd",
			});
		}

		const isValidPassword = await bcrypt.compare(password, userExist.password);
		if (!isValidPassword) {
			return res.status(400).json({
				status: "Error",
				message: "Invalid Password or Email",
			});
		}

		const token = generateToken(userExist._id, res);

		res.status(201).json({
			status: "Success",
			message: "Login Successfully",
			data : {
				userExist,
				token
			}
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			status: "Error",
			message: "Server Error",
		});
	}
};

// LOGOUT
const logout = async (req, res) => {
	try {
		res.cookie("jwt", "", {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			expires: new Date(0),
			sameSite: true,
			maxAge: 0,
		});

		res.status(201).json({
			status: "Success",
			message: "Logout Successfully",
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			status: "Error",
			message: "Server Error",
		});
	}
};

export { register, login, logout };
