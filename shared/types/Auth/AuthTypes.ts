import { IDefaultResponse } from "../DefaultResponse";

export interface IAuth {
	username: string;
	password: string;
}

export interface IToken {
	id: string;
	expiresIn: number;
	iat: number;
	exp: number;
}

export interface ISignUpResponse extends IDefaultResponse {}

export interface ISignInResponse extends IDefaultResponse {
	data: {
		token: string;
		tokenLife: number;
	};
}
