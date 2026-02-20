/** @format */

import type { FC } from "react";
import "./App.css";
import { Header } from "./components/Header";
import { MainPage } from "./components/MainPage";

const App: FC = () => {
	return (
		<div className="flex border flex-col items-center px-5">
			<div className="max-w-150 w-full p-4 border-green-700 border m-10 ">
				<Header/>
				<MainPage/>
			</div>
		</div>
	);
};

export default App;
