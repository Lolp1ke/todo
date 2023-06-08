import { Router } from "express";

import TaskLogic from "@controllers/Task/TaskLogic";

class TaskRouter {
	router: Router;
	private logic: typeof TaskLogic;

	constructor() {
		this.router = Router();
		this.logic = TaskLogic;

		this.router.post("/add", this.logic.addTask);
		this.router.post("/complete", this.logic.completeTask);
		this.router.post("/delete", this.logic.deleteTask);
		this.router.post("/archive", this.logic.archiveTask);
		this.router.post("/get-all", this.logic.getAll);
	}
}

export default new TaskRouter();
