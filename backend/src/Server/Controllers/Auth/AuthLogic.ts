import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { compareSync, hashSync } from "bcryptjs";

import { IAuth } from "@shared/types/Auth/AuthTypes";
import User from "@mongo/Schemas/User";

class AuthLogic {
	public async SignUp(req: Request<any, any, IAuth>, res: Response) {
		const { username, password } = req.body;

		try {
			const isExist = await User.findOne({ username: username });
			if (isExist) return res.status(409).json({ message: "User already exist" });

			const hashedPassword: string = hashSync(password);
			const newUser = new User({ username: username, password: hashedPassword });
			await newUser.save();

			return res.status(201).json({ message: "User successfully created" });
		} catch (error) {
			console.log("Error in Controllers/Auth SignUp", error);
			return res.status(500).json({ message: "Something went wrong" });
		}
	}

	public async SignIn(req: Request<any, any, IAuth>, res: Response) {
		const { username, password } = req.body;

		try {
			const currentUser = await User.findOne({ username: username });
			if (!currentUser) return res.status(404).json({ message: "User not found" });

			const checkPassword: boolean = compareSync(password, currentUser.password);
			if (!checkPassword) return res.status(401).json({ message: "Password is incorrect" });

			const token: string = sign(
				{
					id: currentUser.id,
					expiresIn: 60 * 60 * 24 * 7,
				},
				process.env.BACKEND_JWT_SALT!,
				{
					expiresIn: 60 * 60 * 24 * 7,
				}
			);
			return res.status(200).json({ message: "Successfully signed in", data: token });
		} catch (error) {
			console.log("Error in Controllers/Auth SignIn", error);
			return res.status(500).json({ message: "Something went wrong" });
		}
	}
}

export default new AuthLogic();
