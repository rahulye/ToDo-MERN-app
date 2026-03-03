/** @format */

import { useState, type FC } from "react";
import "./App.css";
import { Header } from "./components/Header";
import { MainPage } from "./components/MainPage";
import Register from "./components/auth/RegisterPage";

const App: FC = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const onLogin = () => {
		setIsLoggedIn(true);
	};

	const onLogout = () => {
		setIsLoggedIn(false);
	};

	return (
		<div className="flex flex-col items-center px-5">
			<div className="max-w-150 w-full p-4 border-green-700 m-10">
				{isLoggedIn ? (
					<>
						<Header onLogout={onLogout} />
						<MainPage />
					</>
				) : (
					<Register onLogin={onLogin} />
				)}
			</div>
		</div>
	);
};

export default App;
