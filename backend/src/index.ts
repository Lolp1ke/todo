import "module-alias/register";
import "dotenv/config";

import Server from "./Server/Server";
import MongoDB from "@mongo/MongoDB";

class index {
	private server: typeof Server;
	private mongo: typeof MongoDB;

	constructor() {
		this.server = Server;
		this.mongo = MongoDB;

		this.initApp().then(() => {
			console.log("Application started");
		});
	}

	private async initApp() {
		await this.mongo.connect();

		this.server.startServer();
	}
}

new index();
