import { IDefaultResponse } from "../DefaultResponse";

export interface IGetMe {
	token: string;
}

export interface IGetUser {
	userID: string;
}

export interface IChangeProfilePicture {
	base64: string;
	userID?: string;
}

export interface IChangePassword {
	userID: string;
	oldPassword: string;
	newPassword: string;
}

export interface IChangeName {
	userID: string;
	newName: string;
}

export type TUser = {
	_id: string;
	username: string;
	name: string;
	profilePictureURL: string;
	createdAt: number;
	alteredAt: number;
};

export interface IGetMeResponse extends IDefaultResponse {
	data: {
		currentUser: TUser;
	};
}

export interface IGetUserResponse extends IDefaultResponse {
	data: {
		currentUser: TUser;
	};
}
