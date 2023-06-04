import { Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { compareSync, hashSync } from "bcryptjs";

import User from "@mongo/Schemas/User";

import { IChangeName, IChangePassword, IChangeProfilePicture, IGetMe, IGetUser } from "@shared/types/User/UserTypes";
import { IToken } from "@shared/types/Auth/AuthTypes";

class UserLogic {
	public async getUser(req: Request<any, any, IGetUser>, res: Response) {
		const { userID } = req.body;

		try {
			const currentUser = await User.findById(userID);
			if (!currentUser) return res.status(404).json({ message: "User not found" });

			return res.status(200).json({ message: "User successfully found", data: { currentUser } });
		} catch (error) {
			console.log("Error in Controllers/User getMe", error);
			return res.status(500).json({ message: "Something went wrong" });
		}
	}

	public async getMe(req: Request<any, any, IGetMe>, res: Response) {
		const { token } = req.body;

		try {
			const tokenData = verify(token, process.env.BACKEND_JWT_SALT!) as IToken;
			const currentUser = await User.findById(tokenData.id);

			if (!currentUser) return res.status(404).json({ message: "User not found" });
			currentUser.password = "SIKE";

			return res.status(200).json({ message: "User data successfully transmitted", data: { currentUser } });
		} catch (error) {
			console.log("Error in Controllers/User getMe", error);
			return res.status(500).json({ message: "Something went wrong" });
		}
	}

	public async changeProfilePicture(req: Request<any, any, IChangeProfilePicture>, res: Response) {
		const { base64, userID } = req.body;

		try {
			const currentUser = await User.findById(userID);
			if (!currentUser) return res.status(404).json({ message: "User not found" });

			currentUser.profilePictureURL = base64;
			await currentUser.save();
			return res.status(200).json({ message: "User profile picture changed" });
		} catch (error) {
			console.log("Error in Controllers/User changeProfilePicture", error);
			return res.status(500).json({ message: "Something went wrong" });
		}
	}

	public async changePassword(req: Request<any, any, IChangePassword>, res: Response) {
		const { userID, oldPassword, newPassword } = req.body;

		try {
			const currentUser = await User.findById(userID);
			if (!currentUser) return res.status(404).json({ message: "User not found" });

			const checkPassword: boolean = compareSync(oldPassword, currentUser.password);
			if (!checkPassword) return res.status(401).json({ message: "Password is incorrect" });

			currentUser.password = hashSync(newPassword);
			await currentUser.save();
			return res.status(200).json({ message: "Password successfully updated" });
		} catch (error) {
			console.log("Error in Controllers/User changePassword", error);
			return res.status(500).json({ message: "Something went wrong" });
		}
	}

	public async changeName(req: Request<any, any, IChangeName>, res: Response) {
		const { userID, newName } = req.body;

		try {
			const currentUser = await User.findById(userID);
			if (!currentUser) return res.status(404).json({ message: "User not found" });

			currentUser.name = newName;
			await currentUser.save();
			return res.status(200).json({ message: "User name successfully updated" });
		} catch (error) {
			console.log("Error in Controllers/User changeName", error);
			return res.status(500).json({ message: "Something went wrong" });
		}
	}
}

export default new UserLogic();
