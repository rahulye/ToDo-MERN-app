/** @format */

import axios, { AxiosError } from "axios";
import { useState, type FC } from "react";
const apiURL = import.meta.env.VITE_API_URL;

const Login: FC = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");

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
		} catch (err) {
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
			<form className="rounded p-4 flex items-center flex-col justify-center gap-5 w-70 h-65 bg-gray-400">
				<div className="text-lg font-bold">Login</div>
				<input
					autoComplete="email"
					className="flex bg-white rounded outline-none  px-3 py-2"
					type="email"
					placeholder="Email"
					onChange={(e) => setEmail(e.target.value)}
				></input>
				<div>hey</div>
				<input
					type="password"
					className="rounded bg-white outline-none px-3 py-2"
					placeholder="Password"
					onChange={(e) => setPassword(e.target.value)}
				></input>
				<button
					type="button"
					onClick={handleLogin}
					className="p-2 bg-green-800 text-white w-30 px-3 rounded hover:cursor-pointer"
				>
					Login
				</button>
				{message && <div className="text-xs text-center mt-2">{message}</div>}
			</form>
		</div>
	);
};

export default Login;
