import { connect } from "mongoose";

class MongoDB {
	private readonly _USERNAME: string;
	private readonly _PASSWORD: string;
	private readonly _NAME: string;
	private readonly _HOST: string;
	private readonly _PORT: string;

	constructor() {
		this._USERNAME = process.env.BACKEND_MONGO_DB_USERNAME!;
		this._PASSWORD = process.env.BACKEND_MONGO_DB_PASSWORD!;
		this._NAME = process.env.BACKEND_MONGO_DB_NAME!;
		this._HOST = process.env.BACKEND_MONGO_DB_HOST!;
		this._PORT = process.env.BACKEND_MONGO_DB_PORT!;
	}

	public async connect() {
		await connect(`mongodb://${this._HOST}:${this._PORT}`, {
			auth: {
				username: this._USERNAME,
				password: this._PASSWORD,
			},
			dbName: this._NAME,
			authSource: this._NAME,
			authMechanism: "DEFAULT",
		}).then(() => {
			console.log("MongoDB connected");
		});
	}
}

export default new MongoDB();
