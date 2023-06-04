import express, { Application, json, urlencoded } from "express";
import cors from "cors";
import AuthRouter from "@routes/Auth/AuthRouter";

class Server {
	private server: Application;
	private readonly _PORT: number = 8000;

	private AuthRoutes: typeof AuthRouter;

	constructor() {
		this.server = express();

		this.server.use(cors());
		this.server.use(json());
		urlencoded({ limit: "50mb", extended: true });

		this.AuthRoutes = AuthRouter;

		this.server.use("/api/auth", this.AuthRoutes.router);
	}

	public startServer() {
		this.server.listen(this._PORT, () => {
			console.log("Server is listening on port:", this._PORT);
		});
	}
}

export default new Server();
