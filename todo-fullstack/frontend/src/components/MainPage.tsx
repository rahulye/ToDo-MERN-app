/** @format */

import { useEffect, useState, type ChangeEvent, type FC } from "react";
import { Task } from "./Tasks";
import axios from "axios";

const apiURL = import.meta.env.VITE_API_URL;
interface TaskType {
	_id: string;
	taskStatus: boolean;
	task: string;
}

export const MainPage: FC = () => {
	const [tasks, setTasks] = useState<TaskType[]>([]);
	const [inputTask, setInputTask] = useState<string>("");
	const [error, setError] = useState<boolean>(false);

	//FETCH WHEN REFRESH
	useEffect(() => {
		try {
			const fetchTasks = async (): Promise<void> => {
				const response = await axios(`${apiURL}/tasks`);
				setTasks(response.data);
			};
			fetchTasks();
		} catch (error) {
			console.log(error);
		}
	}, []);

	//TOGGLE TASK
	const toggleStatus = async (id: string): Promise<void> => {
		try {
			const response = await axios.patch(`${apiURL}/tasks/${id}`);
			const updatedTask = response.data.data;
			console.log(updatedTask);
			setTasks((prev) => {
				return prev.map((task) => (task._id === id ? updatedTask : task));
			});
		} catch (error) {
			console.log(error);
		}
	};

	//ADD TASK
	const addTask = async (): Promise<void> => {
		if (!inputTask.trim()) {
			setError(true);
			setTimeout(() => {
				setError(false);
				setInputTask("");
			}, 500);
			return;
		}
		const response = await axios.post(`${apiURL}/tasks`, {
			task: inputTask,
		});
		console.log(response.data);
		setTasks((prev) => [...prev, response.data.data]);
		setInputTask("");
	};

	const handleInputEvent = (event: ChangeEvent<HTMLInputElement>): void => {
		setInputTask(event.target.value);
	};

	//DELETE TASK
	const deleteTask = async (id: string): Promise<void> => {
		try {
			await axios.delete(`${apiURL}/tasks/${id}`);
			setTasks((prev) => {
				return prev.filter((task) => task._id !== id);
			});
		} catch (error) {
			console.log(error);
		}
	};

	// DELETE ALL TASK
	const deletAllTask = async (): Promise<void> => {
		try {
			if (tasks.length === 0) return;
			await axios.delete(`${apiURL}/tasks/clear`);
			setTasks([]);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<main>
			<section className="flex gap-3 mt-3">
				<input
					className={`hover:ring cursor-text flex-1 rounded border
					 w-full outline-none px-3 ${error ? "animate-shake ring-red-500 ring-1" : ""}`}
					value={inputTask}
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
					className={
						tasks.length === 0
							? "hover:bg-gray-400 bg-gray-600 hover:ring cursor-no-drop text-white p-2 rounded"
							: "text-white hover:ring cursor-pointer ring-gray-500 bg-gray-600 p-2 rounded"
					}
					onClick={deletAllTask}
					disabled={tasks.length === 0}
				>
					CLEAR ALL
				</button>
			</section>
			<div className="mt-8">
				{tasks.length === 0 ? (
					<p className="text-xs">No tasks yet. Add one 👆</p>
				) : (
					tasks.map((t) => {
						return (
							<Task
								key={t._id}
								id={t._id}
								taskStatus={t.taskStatus}
								task={t.task}
								toggleStatus={toggleStatus}
								deletetask={deleteTask}
							/>
						);
					})
				)}
			</div>
		</main>
	);
};
