import {defineConfig} from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		port: 3000,
	},
	resolve: {
		alias: [
			{
				find: "@assets",
				replacement: path.resolve(__dirname, "./src/assets"),
			},
			{
				find: "@UI",
				replacement: path.resolve(__dirname, "./src/UI"),
			},
		],
	},
});
