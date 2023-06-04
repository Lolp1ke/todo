import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";
import path from "path";

// https://vitejs.dev/config/

const manifest: Partial<VitePWAOptions> = {
	registerType: "autoUpdate",
	includeAssets: ["favicon.ico"],
	manifest: {
		name: "Todo app",
		short_name: "Todo",
		theme_color: "#ffffff",
		background_color: "#ffffff",
		display: "standalone",
		start_url: ".",
		icons: [
			{
				src: "assets/logos/android-chrome-192x192.png",
				sizes: "192x192",
				type: "image/png",
			},
			{
				src: "assets/logos/android-chrome-512x512.png",
				sizes: "512x512",
				type: "image/png",
				purpose: "any maskable",
			},
		],
	},
	manifestFilename: "manifest.json",
};

export default defineConfig({
	base: "./",
	plugins: [react(), VitePWA(manifest)],
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
				find: "@components",
				replacement: path.resolve(__dirname, "./src/components"),
			},
			{
				find: "@context",
				replacement: path.resolve(__dirname, "./src/context"),
			},
			{
				find: "@UI",
				replacement: path.resolve(__dirname, "./src/UI"),
			},
			{
				find: "@shared",
				replacement: path.resolve(__dirname, "../shared"),
			},
		],
	},
});
