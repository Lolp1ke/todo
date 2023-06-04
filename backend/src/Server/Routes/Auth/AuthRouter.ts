import { Router } from "express";

import AuthLogic from "@controllers/Auth/AuthLogic";

class AuthRouter {
	router: Router;
	private logic: typeof AuthLogic;

	constructor() {
		this.router = Router();
		this.logic = AuthLogic;

		this.router.post("/sign-up", this.logic.SignUp);
		this.router.post("/sign-in", this.logic.SignIn);
	}
}

export default new AuthRouter();
