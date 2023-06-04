import { createContext, ReactNode, useContext } from "react";
import { useCookies } from "react-cookie";
import { CookieSerializeOptions } from "cookie";

type TCookies = "token" | "other";

interface CustomCookiesContextProps {
	cookies: Partial<Record<TCookies, string>>;
	setCookies: (name: TCookies, value: any, options?: CookieSerializeOptions | undefined) => void;
	removeCookies: (name: TCookies, options?: CookieSerializeOptions | undefined) => void;
}

const CustomCookiesContext = createContext({} as CustomCookiesContextProps);

export function useCustomCookies(): CustomCookiesContextProps {
	return useContext(CustomCookiesContext);
}

export function CustomCookiesProvider({ children }: { children: ReactNode }) {
	const [cookies, setCookies, removeCookies] = useCookies([] as TCookies[]);
	
	const values: CustomCookiesContextProps = {
		cookies,
		setCookies,
		removeCookies,
	};
	return <CustomCookiesContext.Provider value={values}>{children}</CustomCookiesContext.Provider>;
}
