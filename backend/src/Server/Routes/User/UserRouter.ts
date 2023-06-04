import { Router } from "express";

import UserLogic from "@controllers/User/UserLogic";

class UserRouter {
	router: Router;
	private logic: typeof UserLogic;

	constructor() {
		this.router = Router();
		this.logic = UserLogic;

		this.router.post("/get-me", this.logic.getMe);
		this.router.post("/get-user", this.logic.getUser);
		this.router.post("/change-profile-picture", this.logic.changeProfilePicture);
		this.router.post("/change-password", this.logic.changePassword);
		this.router.post("/change-name", this.logic.changeName);
	}
}

export default new UserRouter();
