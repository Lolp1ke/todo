import { IDefaultResponse } from "../DefaultResponse";

export interface IAddTask {
	userID: string;
	title: string;
	description: string;
	time: number;
}

export interface IDeleteTask {
	id: string;
}

export interface ICompleteTask {
	id: string;
	status: boolean;
}

export interface IArchiveTask {
	id: string;
	archived: boolean;
}

export type TTask = {
	_id: string;
	title: string;
	description: string;
	status: boolean;
	archived: boolean;
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
