import express, { Application, json, urlencoded } from "express";
import cors from "cors";

import AuthRouter from "@routes/Auth/AuthRouter";
import UserRouter from "@routes/User/UserRouter";
import TaskRouter from "@routes/Task/TaskRouter";

class Server {
	private server: Application;
	private readonly _PORT: number = 8000;

	private AuthRoutes: typeof AuthRouter;
	private UserRoutes: typeof UserRouter;
	private TaskRoutes: typeof TaskRouter;

	constructor() {
		this.server = express();

		this.server.use(cors());
		this.server.use(json({ limit: "50mb" }));
		this.server.use(urlencoded({ limit: "50mb", parameterLimit: 500000, extended: true }));
		this.server.setMaxListeners(0);

		this.AuthRoutes = AuthRouter;
		this.UserRoutes = UserRouter;
		this.TaskRoutes = TaskRouter;

		this.server.use("/api/auth", this.AuthRoutes.router);
		this.server.use("/api/user", this.UserRoutes.router);
		this.server.use("/api/task", this.TaskRoutes.router);
	}

	public startServer() {
		this.server.listen(this._PORT, () => {
			console.log("Server is listening on port:", this._PORT);
		});
	}
}

export default new Server();
