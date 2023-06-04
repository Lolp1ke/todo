import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@context/AuthContext.tsx";

import Layout from "@components/Layout/Layout.tsx";
import Tasks from "@components/Tasks/Tasks.tsx";

export default function Home() {
	const { currentUser } = useAuth();
	const redirectTo = useNavigate();

	useEffect(() => {
		if (!currentUser) return redirectTo("/auth");
	}, [currentUser]);
	return (
		<Layout>
			<Tasks />
		</Layout>
	);
}
