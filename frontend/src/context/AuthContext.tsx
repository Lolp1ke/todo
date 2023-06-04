import { createContext, ReactNode, useContext } from "react";

interface AuthContextProps {}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export function useAuth(): AuthContextProps {
	return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
	const values: AuthContextProps = {};

	return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}
