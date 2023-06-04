declare global {
	namespace NodeJS {
		interface ProcessEnv {
			BACKEND_SUPABASE_DB_PASSWORD: string;
			BACKEND_SUPABASE_URL: string;
			BACKEND_SUPABASE_API_KEY: string;

			BACKEND_MONGO_DB_USERNAME: string;
			BACKEND_MONGO_DB_PASSWORD: string;
			BACKEND_MONGO_DB_NAME: string;
			BACKEND_MONGO_DB_HOST: string;
			BACKEND_MONGO_DB_PORT: string;

			BACKEND_JWT_SALT: string;
		}
	}
}

export {};
