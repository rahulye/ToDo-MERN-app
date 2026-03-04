/** @format */

import { type FC } from "react";
import "./App.css";
import { Header } from "./components/Header";
import { MainPage } from "./components/pages/MainPage";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Login from "./components/auth/LoginPage";
import Register from "./components/auth/RegisterPage";

const App: FC = () => {
	return (
		<div className="flex flex-col items-center px-5">
			<div className="max-w-150 w-full p-4 border-green-700 m-10">
				<Routes>
					<Route path="/register" element={<Register />}></Route>
					<Route path="/login" element={<Login />}></Route>
					<Route element={<ProtectedRoute />}>
						<Route
							path="/"
							element={
								<>
									<Header />
									<MainPage />
								</>
							}
						></Route>
					</Route>
				</Routes>

				{/*  */}
			</div>
		</div>
	);
};

export default App;
