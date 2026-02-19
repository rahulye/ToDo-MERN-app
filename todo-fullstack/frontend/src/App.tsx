/** @format */

import type { FC } from "react";
import "./App.css";

const App: FC = () => {
	return (
		<div className="flex border flex-col items-center">
			<div className="border ">
				<h1>ToDo List</h1>
				<input className="border" />
			</div>
		</div>
	);
};

export default App;
