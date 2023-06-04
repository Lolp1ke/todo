import { Route, Routes } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext.tsx";

import "@assets/styles/default.scss";

import Home from "./pages/Home/Home.tsx";
import Auth from "./pages/Auth/Auth.tsx";

export default function App() {
	return (
		<AuthProvider>
			<Routes>
				<Route path={"/"}>
					<Route path={""} element={<Home />} />
					<Route path={"home"} element={<Home />} />
				</Route>
				<Route path={"/auth"} element={<Auth />} />
			</Routes>
		</AuthProvider>
	);
}
