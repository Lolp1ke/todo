import { createContext, ReactNode, useContext } from "react";
import axios, { AxiosResponse } from "axios";

import { IAddTask, IDeleteTask, IGetAll, IGetAllResponse, TTask } from "@shared/types/Task/TaskTypes.ts";
import { useAuth } from "@context/AuthContext.tsx";

interface TaskContextProps {
	addTask: ({ title, description, time }: IAddTask) => Promise<void>;
	deleteTask: ({ id }: IDeleteTask) => Promise<void>;
	getAll: ({ userID }: IGetAll) => Promise<TTask[] | null>;
}

const TaskContext = createContext({} as TaskContextProps);

export function useTask(): TaskContextProps {
	return useContext(TaskContext);
}

export function TaskProvider({ children }: { children: ReactNode }) {
	const { currentUser } = useAuth();

	async function addTask({ userID, title, description, time }: IAddTask) {
		if (!currentUser) return;

		await axios({
			method: "POST",
			url: `${import.meta.env.VITE_BACKEND_URL}/api/task/add`,
			data: {
				userID: userID,
				title: title,
				description: description,
				time: time,
			} satisfies IAddTask,
		});
	}

	async function deleteTask({ id }: IDeleteTask) {
		await axios({
			method: "POST",
			url: `${import.meta.env.VITE_BACKEND_URL}/api/task/delete`,
			data: {
				id: id,
			} satisfies IDeleteTask,
		});
	}

	async function getAll() {
		if (!currentUser) return null;

		return await axios({
			method: "POST",
			url: `${import.meta.env.VITE_BACKEND_URL}/api/task/get-all`,
			data: {
				userID: currentUser._id,
			},
		}).then((response: AxiosResponse<IGetAllResponse>) => {
			return response.data.data.tasks;
		});
	}

	const values: TaskContextProps = { addTask, deleteTask, getAll };
	return <TaskContext.Provider value={values}>{children}</TaskContext.Provider>;
}
