import { Router } from "express";

import TaskLogic from "@controllers/Task/TaskLogic";

class TaskRouter {
	router: Router;
	private logic: typeof TaskLogic;

	constructor() {
		this.router = Router();
		this.logic = TaskLogic;

		this.router.post("/add", this.logic.add);
		this.router.post("/get-all", this.logic.getAll);
		this.router.post("/delete", this.logic.deleteTask);
	}
}

export default new TaskRouter();
