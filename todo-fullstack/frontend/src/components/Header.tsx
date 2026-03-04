/** @format */

import axios from "axios";
import type { FC } from "react";
import { useNavigate } from "react-router-dom";

const apiURL = import.meta.env.VITE_API_URL;

export const Header: FC = () => {
	const navigate = useNavigate();
	const logOut = async (): Promise<void> => {
		await axios.post(`${apiURL}/auth/logout`, {}, { withCredentials: true });
		 setTimeout(() => {
			navigate("/login");
    }, 100);
	};
	return (
		<header>
			<div className="border-red-700 flex justify-between ">
				<h2 className="p-2 text-2xl font-medium">ToDo List</h2>
				<button  className="cursor-pointer bg-blue-600 text-white m-1 px-3 hover:bg-blue-400 rounded" onClick={() => logOut()}>Logout</button>
			</div>
		</header>
	);
};
