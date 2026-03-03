/** @format */

import type { FC } from "react";

interface HeaderProps {
	onLogout : () => void
}

export const Header: FC<HeaderProps> = ({onLogout}) => {
	
	return (
		<header>
			<div className="border-red-700">
				<h2 className="p-2 text-2xl font-medium">ToDo List</h2>
				<button onClick={onLogout}>Logout</button>
			</div>
		</header>
	);
};
