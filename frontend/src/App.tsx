import { Route, Routes } from "react-router-dom";

import { CustomCookiesProvider } from "./context/CustomCookiesContext.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { TaskProvider } from "@context/TaskContext.tsx";

import "@assets/styles/default.scss";

import Home from "./pages/Home/Home.tsx";
import Auth from "./pages/Auth/Auth.tsx";
import Settings from "./pages/Settings/Settings.tsx";
import Account from "./pages/Settings/Account.tsx";

export default function App() {
	return (
		<CustomCookiesProvider>
			<AuthProvider>
				<TaskProvider>
					<Routes>
						<Route path={"/"}>
							<Route path={""} element={<Home />} />
							<Route path={"home"} element={<Home />} />
						</Route>
						<Route path={"/auth"} element={<Auth />} />
						<Route path={"/settings"}>
							<Route path={""} element={<Settings />} />
							<Route path={"account"} element={<Account />} />
						</Route>
					</Routes>
				</TaskProvider>
			</AuthProvider>
		</CustomCookiesProvider>
	);
}
