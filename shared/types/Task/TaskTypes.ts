import { IDefaultResponse } from "../DefaultResponse";

export interface IAddTask {
	userID: string;
	title: string;
	description: string;
	time: number;
}

export type TTask = {
	_id: string;
	title: string;
	description: string;
	time: number;
	createdAt: number;
	alteredAt: number;
};

export interface IGetAll {
	userID: string;
}

export interface IGetAllResponse extends IDefaultResponse {
	data: {
		tasks: TTask[];
	};
}

export interface IDeleteTask {
	id: string;
}
