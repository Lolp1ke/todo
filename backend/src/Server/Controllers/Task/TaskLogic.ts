import { Request, Response } from "express";

import { IAddTask, IDeleteTask, IGetAll } from "@shared/types/Task/TaskTypes";

import Task from "@mongo/Schemas/Task";
import { ObjectId } from "mongodb";

class TaskLogic {
	public async add(req: Request<any, any, IAddTask>, res: Response) {
		const { userID, title, description, time } = req.body;

		try {
			const newTask = new Task({
				userID: new ObjectId(userID),
				title: title,
				description: description,
				time: time,
			});
			await newTask.save();

			return res.status(201).json({ message: "Task successfully created" });
		} catch (error) {
			console.log("Error in Controllers/Task add", error);
			return res.status(500).json({ message: "Something went wrong" });
		}
	}

	public async deleteTask(req: Request<any, any, IDeleteTask>, res: Response) {
		const { id } = req.body;

		try {
			await Task.findByIdAndDelete(id);
			return res.status(200).json({ message: "Task successfully deleted" });
		} catch (error) {
			console.log("Error in Controllers/Task deleteTask", error);
			return res.status(500).json({ message: "Something went wrong" });
		}
	}

	public async getAll(req: Request<any, any, IGetAll>, res: Response) {
		const { userID } = req.body;
		try {
			const tasks = await Task.find({ userID: userID });

			return res.status(200).json({ message: "Tasks successfully retrieved", data: { tasks } });
		} catch (error) {
			console.log("Error in Controllers/Task getAll", error);
			return res.status(500).json({ message: "Something went wrong" });
		}
	}
}

export default new TaskLogic();
