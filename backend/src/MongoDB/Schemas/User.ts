import { model, Schema } from "mongoose";

interface UserSchemaProps {
	username: string;
	password: string;
	name: string;
	profilePictureURL: string;
	createdAt: number;
	alteredAt: number;
}

const UserSchema = new Schema<UserSchemaProps>({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		unique: false,
	},
	name: {
		type: String,
		required: false,
		unique: false,
	},
	profilePictureURL: {
		type: String,
		required: false,
		unique: false,
	},
	createdAt: {
		type: Number,
		required: true,
		unique: false,
		default: new Date().getTime(),
	},
	alteredAt: {
		type: Number,
		required: true,
		unique: false,
		default: new Date().getTime(),
	},
});

const User = model<UserSchemaProps>("User", UserSchema, "Users");
export default User;
