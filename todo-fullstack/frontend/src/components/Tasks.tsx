/** @format */

import type { FC } from "react";

interface TaskProps {
	id: string;
	taskStatus: boolean;
	task: string;
	toggleStatus: (id: string) => void;
	deletetask: (id: string) => void;
}

export const Task: FC<TaskProps> = ({
	id,
	taskStatus,
	task,
	toggleStatus,
	deletetask,
}) => {
	return (
		<section className="flex bg-gray-100 px-4 py-2 m-2 mt-5 items-center">
			<div
				onClick={() => toggleStatus(id)}
				className={`flex-1 cursor-pointer ${taskStatus ? "line-through text-gray-500" : ""}`}
			>
				{task}
			</div>
			<input
				className="cursor-pointer"
				type="checkbox"
				checked={taskStatus}
				onChange={() => {
					toggleStatus(id);
				}}
			></input>
			<img
				src="src\assets\trash_icon.png"
				alt="delete icon"
				className="h-5 ml-5 cursor-pointer"
				onClick={() => deletetask(id)}
			></img>
		</section>
	);
};
