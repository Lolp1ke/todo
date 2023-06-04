import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";

import { useCustomCookies } from "@context/CustomCookiesContext.tsx";

import { IAuth, ISignInResponse, ISignUpResponse } from "@shared/types/Auth/AuthTypes.ts";
import {
	IGetMe,
	IGetUser,
	IGetUserResponse,
	IGetMeResponse,
	TUser,
	IChangeProfilePicture,
	IChangeName,
	IChangePassword,
} from "@shared/types/User/UserTypes.ts";

interface AuthContextProps {
	currentUser: TUser | null;
	signUp: ({ username, password }: IAuth) => Promise<ISignUpResponse>;
	signIn: ({ username, password }: IAuth) => Promise<ISignInResponse>;
	getUser: ({ userID }: IGetUser) => Promise<TUser>;
	changeProfilePicture: ({ base64 }: IChangeProfilePicture) => Promise<void>;
	changeName: ({ userID, newName }: IChangeName) => Promise<void>;

	changePassword: ({ userID, oldPassword, newPassword }: IChangePassword) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export function useAuth(): AuthContextProps {
	return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
	const { cookies, setCookies } = useCustomCookies();

	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [currentUser, setCurrentUser] = useState<TUser | null>(null);

	async function signUp({ username, password }: IAuth) {
		return await axios({
			method: "POST",
			url: `${import.meta.env.VITE_BACKEND_URL}/api/auth/sign-up`,
			data: {
				username: username,
				password: password,
			} satisfies IAuth,
		}).then((response: AxiosResponse<ISignUpResponse>) => {
			return response.data;
		});
	}

	async function signIn({ username, password }: IAuth) {
		return await axios({
			method: "POST",
			url: `${import.meta.env.VITE_BACKEND_URL}/api/auth/sign-in`,
			data: {
				username: username,
				password: password,
			} satisfies IAuth,
		}).then((response: AxiosResponse<ISignInResponse>) => {
			setCookies("token", response.data.data.token, { maxAge: response.data.data.tokenLife });
			return response.data;
		});
	}

	async function getMe() {
		if (!cookies.token) return null;

		return await axios({
			method: "POST",
			url: `${import.meta.env.VITE_BACKEND_URL}/api/user/get-me`,
			data: {
				token: cookies.token,
			} satisfies IGetMe,
		}).then((response: AxiosResponse<IGetMeResponse>) => {
			return response.data.data.currentUser;
		});
	}

	async function getUser({ userID }: IGetUser) {
		return await axios({
			method: "POST",
			url: `${import.meta.env.VITE_BACKEND_URL}/api/auth/get-user`,
			data: {
				userID: userID,
			} satisfies IGetUser,
		}).then((response: AxiosResponse<IGetUserResponse>) => {
			return response.data.data.currentUser;
		});
	}

	async function changeProfilePicture({ base64 }: IChangeProfilePicture) {
		await axios({
			method: "POST",
			url: `${import.meta.env.VITE_BACKEND_URL}/api/user/change-profile-picture`,
			data: {
				base64: base64,
				userID: currentUser?._id,
			} satisfies IChangeProfilePicture,
		});
	}

	async function changeName({ userID, newName }: IChangeName) {
		await axios({
			method: "POST",
			url: `${import.meta.env.VITE_BACKEND_URL}/api/user/change-name`,
			data: {
				userID: userID,
				newName: newName,
			} satisfies IChangeName,
		});
	}

	async function changePassword({ userID, oldPassword, newPassword }: IChangePassword) {
		await axios({
			method: "POST",
			url: `${import.meta.env.VITE_BACKEND_URL}/api/user/change-password`,
			data: {
				userID: userID,
				oldPassword: oldPassword,
				newPassword: newPassword,
			} satisfies IChangePassword,
		});
	}

	useEffect(() => {
		Promise.all([getMe()]).then((data) => {
			setCurrentUser(data[0]);
		});
		setIsLoading(false);
	}, []);

	const values: AuthContextProps = {
		currentUser,
		signUp,
		signIn,
		getUser,
		changeProfilePicture,
		changeName,
		changePassword,
	};
	return <AuthContext.Provider value={values}>{!isLoading && children}</AuthContext.Provider>;
}
