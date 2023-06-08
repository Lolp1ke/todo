class Log {
	public info(text: string) {
		const message: string =
			"[INFO]" +
			`[${new Date().toLocaleDateString("EN-en", {
				year: "numeric",
				month: "long",
				day: "numeric",
				hour: "numeric",
				hour12: false,
				hourCycle: "h24",
				minute: "numeric",
				second: "numeric",
			})}]` +
			`${text}`;

		return console.log("", message);
	}
}

export default new Log();

// new Log().info("s");
