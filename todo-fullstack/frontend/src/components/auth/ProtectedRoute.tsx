/** @format */

import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const aspiURL = import.meta.env.VITE_API_URL;

const ProtectedRoute = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [isAuthorized, setIsAuthorized] = useState(false);

	useEffect(() => {
		const fetchAuth = async () => {
			try {
				await axios.get(`${aspiURL}/auth/me`, {
					withCredentials: true,
				});
				setIsAuthorized(true);
			} catch {
				setIsAuthorized(false);
			} finally {
				setIsLoading(false);
			}
		};
		fetchAuth();
	}, []);
	if (isLoading) return <div>Checking authentication...</div>;
	return isAuthorized ? <Outlet /> : <Navigate to={"/login"} />;
};

export default ProtectedRoute;
