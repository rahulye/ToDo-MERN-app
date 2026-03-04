/** @format */

import axios, { AxiosError } from "axios";
import { useState, type FC } from "react";
import { Link, useNavigate } from "react-router-dom";
const apiURL = import.meta.env.VITE_API_URL;

const Login: FC = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");
	const [isError, setIsError] = useState(false);
	const navigate = useNavigate();
	const handleLogin = async (
		e: React.MouseEvent<HTMLButtonElement>,
	): Promise<void> => {
		e.preventDefault();
		try {
			const response = await axios.post(
				`${apiURL}/auth/login`,
				{
					email,
					password,
				},
				{ withCredentials: true },
			);
			setMessage(response.data.message);
			setIsError(false);
			setTimeout(() => {
				navigate("/");
			}, 700);
		} catch (err) {
			setIsError(true);
			const error = err as AxiosError<{ message: string }>;
			console.log(error);
			const errMessage = error?.response?.data?.message || "Login Failed";
			setMessage(errMessage);
			setTimeout(() => {
				setMessage("");
			}, 1000);
		}
	};

	return (
		<div className="flex justify-center">
			<form className="rounded p-4 flex items-center flex-col justify-center gap-1 w-70 h-70 bg-gray-400">
				<div className="text-lg font-bold mb-5">Login</div>
				<input
					autoComplete="email"
					className="flex mb-2 bg-white rounded outline-none  px-3 py-2"
					type="email"
					placeholder="Email"
					onChange={(e) => setEmail(e.target.value)}
				></input>
				<input
					type="password"
					className="rounded  mb-2 bg-white outline-none px-3 py-2"
					placeholder="Password"
					onChange={(e) => setPassword(e.target.value)}
				></input>
				<button
					type="button"
					onClick={handleLogin}
					className="p-2  mb-2 bg-green-800 text-white w-30 px-3 rounded hover:cursor-pointer"
				>
					Login
				</button>
				<div className="text-sm mt-1">
					Create new account?
					<Link
						className="text-blue-700 cursor-pointer pl-1 hover:underline"
						to="/register"
					>
						register
					</Link>
				</div>
				{message && (
					<div
						className={`text-sm text-center mt-2 ${
							isError ? "text-red-800" : "text-green-700"
						}`}
					>
						{message}
					</div>
				)}
			</form>
		</div>
	);
};

export default Login;
