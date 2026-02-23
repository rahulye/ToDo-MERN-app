/** @format */

import { useState, type ChangeEvent, type FC } from "react";
import { Task } from "./Tasks";

export const MainPage: FC = () => {
	const [task, setTask] = useState<string>("");
	const addTask = (): void => {
		console.log(task);
		setTask("");
	};

	const handleInputEvent = (event : ChangeEvent<HTMLInputElement>) : void => {
		setTask(event.target.value);
	}
	return (
		<main>
			<section className="flex gap-3 mt-3">
				<input
					className="hover:ring cursor-text flex-1 rounded border
				 w-full outline-none px-3"
				 	value={task}
					onChange={handleInputEvent}
				/>
				<button
					className="bg-green-500 cursor-pointer text-white
				 p-2 rounded hover:ring ring-green-600"
					onClick={addTask}
				>
					ADD
				</button>
				<button
					className="text-white hover:ring cursor-pointer
				 ring-gray-500 bg-gray-600 p-2 rounded"
				>
					CLEAR ALL
				</button>
			</section>
			<Task />
		</main>
	);
};


